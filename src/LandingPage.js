//LandingPage.js
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';
import { EntryForm } from './EntryForm';
import SavedWorkouts from './SavedWorkouts';
import NavigationBar from './NavigationBar';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function LandingPage() {
  // States related to the Healthy Innovations features
  const [currentPlan, setCurrentPlan] = useState(null);
  const [savedChats, setSavedChats] = useState([]);
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [showWorkoutQuestion, setShowWorkoutQuestion] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
  const [showCalorieQuestion, setShowCalorieQuestion] = useState(false);
  const [showSavedWorkouts, setShowSavedWorkouts] = useState(false); // Ensure this is defined if used
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [editableWorkoutSplit, setEditableWorkoutSplit] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [workoutSplit, setWorkoutSplit] = useState('');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [showSavedWorkoutButton, setShowSavedWorkoutButton] = useState(false);
  
  
  console.log(chatHistory); 
  
  const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser; 

useEffect(() => {
  if (user) {
      const userDocRef = doc(db, "users", user.uid);
      console.log("Attempting to save to: ", userDocRef.path);
      // Fetch or handle data involving userDocRef here
  }
}, [user, db]);


  
const handleNavigationChange = (view) => {
  console.log(`Navigating to ${view}`);
  resetViews();
  setShowSuggestions(false);
  setShowWorkoutQuestion(false);
  setShowCalorieQuestion(false);
  setShowCalorieCalculator(false);
  switch(view) {
    case 'home':
      setShowSuggestions(true);
      break;
    case 'workout':
      setShowWorkoutQuestion(true);
      break;
    case 'calories':
      setShowCalorieCalculator(true);
      break;
      case 'savedWorkout':
        setShowSavedWorkouts(true);  // Set the state to show saved workouts
        break;
      default:
      break;
  }
};
  
const resetViews = () => {
  setShowSuggestions(false);
  setShowWorkoutQuestion(false);
  setShowCalorieQuestion(false);
  setShowCalorieCalculator(false);
  setShowSavedWorkouts(false);
};

  const createNewChat = () => {
    setChatInput('');
    setCurrentTitle(null);
    setChatHistory([]);
  };

  const renderChatHistory = () =>
  chatHistory.map((chat, index) => (
    <div key={index} className="chat-history">
      <p><strong>{chat.role}:</strong> {chat.content}</p>
    </div>
  ));

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setChatInput(inputValue);
  };

  const renderDynamicRecommendations = () => {
    // Filter suggestions based on search input
    const filteredSuggestions = staticSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(search.toLowerCase())
    ); 

    return (
      <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelectSuggestion(suggestion)} style={{ cursor: 'pointer' }}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  const loadChatHistory = (title) => {
    const chat = previousChats.find(c => c.title === title);
    if (chat) {
      setChatHistory(chat.chats);
      setCurrentTitle(chat.title);
    }
  };

  const getMessages = async () => {
    if (!chatInput.trim()) return; 
    setShowSuggestions(false); // Hide suggestions when submitting chat
    setIsLoading(true);
    setIsLoading(false);  // Hide suggestions as soon as the button is clicked
    const SERVER_URL = "http://localhost:8000/completions";
    
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const resData = await response.json();
      const newMessage = { role: 'User', content: chatInput };
      const botResponse = { role: 'Healthy Innovations Bot', content: resData.message || "No response from AI." };
      setChatHistory([...chatHistory, newMessage, botResponse]);
      setPreviousChats([...previousChats, {
        title: chatInput,
        chats: [...chatHistory, newMessage, botResponse]
      }]);

      setShowSuggestions(false); 
      setChatInput(''); // Clear the input field
    } catch (error) {
      console.error('Fetch error:', error);
      setChatHistory(prev => [...prev, { role: 'User', content: chatInput }, { role: 'Healthy Innovations Bot', content: "Error communicating with AI." }]);
    }  finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentTitle && chatInput && chatHistory.length > 0) {
      setCurrentTitle(chatInput);
    }
  }, [chatHistory, chatInput, currentTitle]);


  const renderSavedChats = () => (
    <div className="saved-chats">
      {savedChats.map((chat, index) => (
        <div key={index} className="saved-chat" onClick={() => loadChatHistory(chat.id)}>
          {chat.chats && chat.chats.map(entry => `${entry.role}: ${entry.content.substring(0, 30)}...`).join(' | ')}
        </div>
      ))}
    </div>
  );

  const saveWorkoutPlan = async (userId, workoutPlanDetails) => {
    if (!userId) return;
    const userDocRef = doc(db, "users", userId);
    try {
        // Ensure you're saving detailed information about the workout plan
        await setDoc(userDocRef, { workoutPlan: workoutPlanDetails }, { merge: true });
        console.log("Workout plan saved successfully!");
    } catch (error) {
        console.error("Error saving workout plan:", error);
    }
};

  const getWorkoutPlan = async (userId) => {
    if (!userId) return;
    const userDocRef = doc(db, "users", userId);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        console.log("Workout Plan:", docSnap.data().workoutPlan);
        return docSnap.data().workoutPlan;
      } else {
        console.log("No such workout plan!");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving workout plan: ", error);
    }
  };

// When confirming to save the workout
const confirmSaveWorkout = async () => {
  if (user && selectedPlan) {
    await saveWorkoutPlan(user.uid, selectedPlan);
    setShowSavedWorkoutButton(true);  // Display the Saved Workouts button
    setShowWorkoutPlan(false);
    setShowCalorieQuestion(true);
    setShowSaveConfirmation(false);
    showToast("Workout Saved!");
  } else {
    console.log("No plan selected or no user logged in");
  }
};

useEffect(() => {
  const userId = 'user123'; // Replace with actual user ID from authentication
  getWorkoutPlan(userId).then(plan => {
    if (plan) {
      setWorkoutSplit(plan);
    }
  });
}, []);

const handleSelectWorkoutPlan = async (plan) => {
  const userId = 'user123'; // Ideally, this would come from your auth context or similar
  await saveWorkoutPlan(userId, workoutPlans[plan]);
  setWorkoutSplit(workoutPlans[plan]); // Update local state
};


  const workoutPlans = {
    "3 days": `3-Day Split

    Day 1: Full Body
  - Barbell Bench Press: 3 sets of 8-12 reps, 2 min rest
  - Dumbbell Flyes: 3 sets of 10-15 reps, 90 sec rest
  - Bent-Over Barbell Rows: 3 sets of 8-12 reps, 60-90 sec rest
  - Pull-Ups: 3 sets of 6-10 reps, 2 min rest
  - Barbell Back Squats: 3 sets of 8-12 reps, 2 min rest
  - Romanian Deadlifts: 3 sets of 8-12 reps, 60-90 sec rest

  Day 2: Full Body
  - Incline Dumbbell Press: 3 sets of 8-12 reps, 2 min rest
  - Tricep Dips: 3 sets of 8-12 reps, 2 min rest
  - Single-Arm Dumbbell Rows: 3 sets of 10-12 reps per arm, 45 sec rest
  - Barbell Curls: 3 sets of 8-12 reps, 60 sec rest
  - Dumbbell Lunges: 3 sets of 10-12 reps per leg, 2 min rest
  - Leg Press: 3 sets of 12-15 reps, 1-2 min rest 

  Day 3: Full Body
  - Shoulder Press: 3 sets of 10-12 reps, 60 sec rest
  - Plank: 3 sets, hold for 30-60 sec, 30 sec rest
  - Lateral Raises: 3 sets of 12-15 reps, 45 sec rest
  - Push-ups & Seated Cable Rows: 3 sets of 10-12 reps, 60 sec rest between sets
  - Close-Grip Bench Press & Lat Pulldowns: 3 sets of 10-12 reps, 60 sec rest between sets
  - Bulgarian Split Squats: 3 sets of 10-12 reps per leg, 1 min rest`,
    
  "4 days": ` 4-Day Split

  Day 1: Push (Chest, Shoulders, Triceps)
  - Barbell Bench Press: 3 sets of 8-12 reps, 2 min rest
  - Incline Dumbbell Press: 3 sets of 8-12 reps, 2 min rest
  - Tricep Dips: 3 sets of 8-12 reps, 2 min rest
  - Shoulder Press: 3 sets of 10-12 reps, 60 sec rest
  - Lateral Raises: 3 sets of 12-15 reps, 45 sec rest

  Day 2: Pull (Back, Biceps)
  - Bent-Over Barbell Rows: 4 sets of 8-12 reps, 60-90 sec rest
  - Pull-Ups: 3 sets of 6-10 reps, 2 min rest
  - Single-Arm Dumbbell Rows: 3 sets of 10-12 reps per arm, 45 sec rest
  - Barbell Curls: 3 sets of 8-12 reps, 60 sec rest
  - Hammer Curl: 3 sets of 8-12 reps, 60 sec rest

  Day 3: Legs & Abs
  - Romanian Deadlifts: 4 sets of 8-12 reps, 60-90 sec rest
  - Barbell Back Squats: 4 sets of 8-12 reps, 2 min rest
  - Dumbbell Lunges: 3 sets of 10-12 reps per leg, 2 min rest
  - Plank: 3 sets, hold for 30-60 sec, 30 sec rest

  Day 4: Full Body & Supersets
  - Push-ups & Seated Cable Rows: 3 sets of 10-12 reps, 60 sec rest between sets
  - Close-Grip Bench Press & Lat Pulldowns: 3 sets of 10-12 reps, 60 sec rest between sets
  - Dumbbell Overhead Tricep Extensions & Barbell Bicep Curls: 3 sets of 12-15 reps, 45 sec rest between sets
  - Bulgarian Split Squats: 3 sets of 10-12 reps per leg, 1 min rest`,
    "5 days": ` 5-Day Split
    
    Day 1: Chest and Triceps
    - Barbell Bench Press: 3 sets of 8-12 reps, 2 min rest
    - Dumbbell Flyes: 3-4 sets of 10-15 reps, 90 sec rest
    - Incline Dumbbell Press: 4-5 sets of 8-12 reps, 2 min rest
    - Tricep Dips: 4-5 sets of 8-12 reps, 2 min rest
    - Cable Tricep Pulldowns: 4-5 sets of 8-12 reps, 2 min rest
    
    Day 2: Back and Biceps
    - Bent-Over Barbell Rows: 4 sets of 8-12 reps, 60-90 sec rest
    - Pull-Ups: 3 sets of 6-10 reps, 2 min rest
    - Single-Arm Dumbbell Rows: 3 sets of 10-12 reps per arm, 45 sec rest
    - Barbell Curls: 3 sets of 8-12 reps, 60 sec rest
    - Hammer Curl: 3 sets of 8-12 reps, 60 sec rest
    
    Day 3: Legs (Hamstrings Focus)
    - Romanian Deadlifts: 4 sets of 8-12 reps, 60-90 sec rest
    - Single-Leg Glute Bridges: 3 sets of 10-12 reps per leg, 45-60 sec rest
    - Nordic Hamstring Curls: 3 sets of 6-8 reps, 60-90 sec rest
    - Seated Leg Curl Machine: 3 sets of 8-12 reps per leg, 45-60 sec rest
    - Barbell Hip Thrusts: 3 sets of 8-12 reps, 2 min rest
   
    Day 4: Shoulders and Abs
    - Shoulder Press: 3 sets of 10-12 reps, 60 sec rest
    - Plank: 3 sets, hold for 30-60 sec, 30 sec rest
    - Lateral Raises: 3 sets of 12-15 reps, 45 sec rest
    - Arnold Press: 3 sets of 8-10 reps, 60 sec rest
   
    Day 5: Push/Pull Supersets & Quads
    - Push-ups & Seated Cable Rows: 3 sets of 10-12 reps, 60 sec rest between sets
    - Close-Grip Bench Press & Lat Pulldowns: 3 sets of 10-12 reps, 60 sec rest between sets
    - Dumbbell Overhead Tricep Extensions & Barbell Bicep Curls: 3 sets of 12-15 reps, 45 sec rest between sets
    - Barbell Back Squats: 4 sets of 8-12 reps, 2 min rest
    - Leg Press: 3 sets of 12-15 reps, 1-2 min rest`,
    "6 days": ` 6-Day Split
    
    Day 1: Push - Chest and Triceps
    - Barbell Bench Press: 3 sets of 8-12 reps, 2 min rest
    - Dumbbell Flyes: 3-4 sets of 10-15 reps, 90 sec rest
    - Incline Dumbbell Press: 4-5 sets of 8-12 reps, 2 min rest
    - Tricep Dips: 4-5 sets of 8-12 reps, 2 min rest
    - Cable Tricep Pulldowns: 4-5 sets of 8-12 reps, 2 min rest
    
    Day 2: Pull - Back and Biceps
    - Bent-Over Barbell Rows: 4 sets of 8-12 reps, 60-90 sec rest
    - Pull-Ups: 3 sets of 6-10 reps, 2 min rest
    - Single-Arm Dumbbell Rows: 3 sets of 10-12 reps per arm, 45 sec rest
    - Barbell Curls: 3 sets of 8-12 reps, 60 sec rest
    - Hammer Curl: 3 sets of 8-12 reps, 60 sec rest
    
    Day 3: Leg Day - Hamstrings Focus
    - Romanian Deadlifts: 4 sets of 8-12 reps, 60-90 sec rest
    - Single-Leg Glute Bridges: 3 sets of 10-12 reps per leg, 45-60 sec rest
    - Nordic Hamstring Curls: 3 sets of 6-8 reps, 60-90 sec rest
    - Seated Leg Curl Machine: 3 sets of 8-12 reps per leg, 45-60 sec rest
    - Barbell Hip Thrusts: 3 sets of 8-12 reps, 2 min rest
    
    Day 4: Shoulders and Abs
    - Shoulder Press: 3 sets of 10-12 reps, 60 sec rest
    - Plank: 3 sets, hold for 30-60 sec, 30 sec rest
    - Lateral Raises: 3 sets of 12-15 reps, 45 sec rest
    - Arnold Press: 3 sets of 8-10 reps, 60 sec rest
    
    Day 5: Push/Pull Supersets
    - Push-ups & Seated Cable Rows: 3 sets of 10-12 reps, 60 sec rest between sets
    - Close-Grip Bench Press & Lat Pulldowns: 3 sets of 10-12 reps, 60 sec rest between sets
    - Dumbbell Overhead Tricep Extensions & Barbell Bicep Curls: 3 sets of 12-15 reps, 45 sec rest between sets
    
    Day 6: Leg Day - Quad Focus
    - Barbell Back Squats: 4 sets of 8-12 reps, 2 min rest
    - Dumbbell Lunges: 3 sets of 10-12 reps per leg, 2 min rest
    - Leg Press: 3 sets of 12-15 reps, 1-2 min rest
    - Bulgarian Split Squats: 3 sets of 10-12 reps per leg, 1 min rest`
  };

  const handleEditWorkoutPlan = (plan) => {
    setEditableWorkoutSplit(workoutPlans[plan]); // Load the current plan for editing
    setIsEditing(true); // Set editing mode to true
    setCurrentPlan(plan); // Set the current plan being edited
  };
  


  const selectWorkoutPlan = (plan) => {
    if (!isEditing) {
        const planDetails = {
            planName: plan,
            details: workoutPlans[plan] // Make sure this contains all the necessary details
        };

        setWorkoutSplit(workoutPlans[plan]);
        setShowWorkoutPlan(false);
        setShowCalorieQuestion(true);
        setSelectedPlan(planDetails); // Save detailed plan information
        setShowSaveConfirmation(true);
    }
};
const cancelSaveWorkout = () => {
    setShowSaveConfirmation(false); 
    setWorkoutSplit(''); // Simply hide the confirmation without saving
};

  const staticSuggestions = [
    'Alternative to ice cream',
    'Alternative to rice crispies',
    'Alternative to chocolate cake',
  ];

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setSelectedSuggestion(suggestion);
  };

  const handleWorkoutPlanChange = (event) => {
    setEditableWorkoutSplit(event.target.value);  // Update the workout plan as the user types
  };

  const handleSaveWorkoutPlan = () => {
    workoutPlans[currentPlan] = editableWorkoutSplit; // Update the plan with new content using currentPlan
    setWorkoutSplit(editableWorkoutSplit); // Set the workout split to the new edited text
    setIsEditing(false); // Exit editing mode
    setCurrentPlan(null); // Reset current plan after saving
  };

  const handleWorkoutPlanClick = () => {
    setShowWorkoutQuestion(true); // Show the workout question and hide recipe details
  };

  const handleCalorieQuestion = (answer) => {
    setShowCalorieQuestion(false); // Hide calorie question
    if (answer === 'yes') {
      setShowCalorieQuestion(false); // Make sure to hide calorie question
    } else {
        setShowCalorieCalculator(false); // Stay on current view
        setShowCalorieQuestion(false); // Hide calorie question if "No"
    }
  };


  useEffect(() => {
    const storedRecipe = localStorage.getItem('recipeDetails');
    if (storedRecipe) {
      setRecipeDetails(JSON.parse(storedRecipe));
    } else {
      setIsLoading(true);
      setTimeout(() => {
        const recipe = {
          ingredients: [
            "Full-fat coconut milk",
            "Protein powder (vanilla)",
            "Granulated sweetener or dates",
            "Vanilla extract (optional)"
          ],
          instructions: [
            "Freeze a loaf pan for at least an hour.",
            "Blend chilled coconut milk until smooth.",
            "Add protein powder and sweetener, blend until creamy.",
            "Transfer to the loaf pan, freeze, stirring every 20 mins for the first hour.",
            "Thaw for 10-15 mins before serving."
          ],
          nutritionalFacts: {
            calories: "55kcal",
            protein: "9g",
            carbohydrates: "3g",
            fat: "1g"
          }
        };
        setRecipeDetails(recipe);
        setIsLoading(false); // Stop loading once the recipe is loaded
      }, 2000);
    }
  }, []);

  const workoutDayButtons = ["3 days", "4 days", "5 days", "6 days"].map(day => (
    <button key={day} className="login-button" onClick={() => selectWorkoutPlan(day)} style={{ margin: '10px' }}>
      {day}
    </button>
  ));

      const handleSaveMacros = () => {
        console.log("Macros saved!");
        setShowSaveConfirmation(false);  // Reset the confirmation state after saving
    };

    const handleCancelSave = () => {
        console.log("Not saving macros.");
        setShowSaveConfirmation(false);  // Reset the confirmation state without saving
    };

    


  if (showCalorieCalculator) {
    return (
      <div className="App">
        <NavigationBar handleNavigationChange={handleNavigationChange} />
        <div className="branding">
          <h1 className="logo">Healthy Innovations</h1>
          <h2>Calculate your calories!</h2>
        </div>
        <div className="form-container fade-in"> 
          <EntryForm />
        </div>
      </div>
    );
}


if (showCalorieCalculator) {

  
  return (
      <div className="App">
          <NavigationBar handleNavigationChange={handleNavigationChange} />
          <div className="branding">
              <h1 className="logo">Healthy Innovations</h1>
              <h2>Calculate your calories!</h2>
          </div>
          <div className="form-container fade-in">
              <EntryForm />
              <div>
                  {/* This button simulates the action of calculating calories */}
                  <button className="login-button" onClick={() => setShowSaveConfirmation(true)}>
                      Calculate my calories
                  </button>
                  {/* Conditional rendering for saving confirmation */}
                  {showSaveConfirmation && (
                      <div className="save-confirmation">
                          <p>Do you want to save these macros?</p>
                          <button className="login-button" onClick={() => {
                              console.log("Macros saved!");
                              setShowSaveConfirmation(false); // Reset the state or navigate away
                          }}>Yes</button>
                          <button className="login-button" onClick={() => setShowSaveConfirmation(false)}>No</button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
}

return (
  <div className="App">
    <NavigationBar handleNavigationChange={handleNavigationChange} showSavedWorkoutButton={showSavedWorkoutButton} />
    {showSavedWorkouts ? (
      <SavedWorkouts />  // Use the SavedWorkouts component directly
    ) : (
      <div>
        <div className="branding">
          <h1 className="logo">Healthy Innovations</h1>
          {!showWorkoutQuestion && <p className="tagline">Helping individuals find healthy alternatives to junk food</p>}
          {previousChats.length > 0 && (
            <>
              <h3>Chat History</h3>
              <ul className="history">
                {previousChats.map((chat, index) => (
                  <li key={index} onClick={() => loadChatHistory(chat.title)} className="chat-history-item">{chat.title}</li>
                ))}
              </ul>
            </>
          )}
          {renderSavedChats()}
        </div>
        <div className="search-section">
          {!showWorkoutQuestion && (
            <>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for healthy alternatives..."
                  value={chatInput}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button onClick={getMessages} className="submit-chat">➢</button>
              </div>
              <button onClick={createNewChat} className="login-button">+ New Chat</button>
              {isLoading && <p>Loading...</p>}
              <div>
                {chatHistory.map((chat, index) => (
                  <p key={index}><strong>{chat.role}:</strong> {chat.content}</p>
                ))}
              </div>
              {showSuggestions && <div className="dynamic-recommendations">{renderDynamicRecommendations()}</div>}
            </>
          )}
          {isLoading && <div className="loading-spinner"></div>}
          {!showWorkoutQuestion && !workoutSplit && selectedSuggestion && recipeDetails && !isLoading && (
            <div className="fade-in" style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
              <h2>{selectedSuggestion}</h2>
              <h3>Ingredients</h3>
              <ul>
                {recipeDetails.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
              </ul>
              <h3>Instructions</h3>
              <ol>
                {recipeDetails.instructions.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
              <h3>Nutritional Facts</h3>
              <p>Calories: {recipeDetails.nutritionalFacts.calories}</p>
              <p>Protein: {recipeDetails.nutritionalFacts.protein}</p>
              <p>Carbohydrates: {recipeDetails.nutritionalFacts.carbohydrates}</p>
              <p>Fat: {recipeDetails.nutritionalFacts.fat}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button className="login-button" onClick={() => setShowSuggestions(true)} style={{ marginRight: '10px' }}>
                  Want to search for another alternative?
                </button>
                <button className="login-button" onClick={handleWorkoutPlanClick}>
                  Do you want a workout plan?
                </button>
              </div>
            </div>
          )}
          {showWorkoutQuestion && (
            <div className="fade-in" style={{ marginTop: '20px' }}>
              <h2>How many days per week do you workout?</h2>
              <div>{workoutDayButtons}</div>
              {showSaveConfirmation && (
                <div>
                  <h2>Do you want to save this workout?</h2>
                  <button className="login-button" onClick={() => confirmSaveWorkout()} style={{ marginRight: '10px' }}>Yes</button>
                  <button className="login-button" onClick={cancelSaveWorkout}>No</button>
                </div>
              )}
              {workoutSplit && (
                <>
                  <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{workoutSplit}</pre>
                  {!showSaveConfirmation && (
                    <div>
                      {isEditing ? (
                        <div>
                          <textarea value={editableWorkoutSplit} onChange={handleWorkoutPlanChange} />
                          <button onClick={handleSaveWorkoutPlan} className="login-button">Save</button>
                        </div>
                      ) : (
                        <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{workoutSplit}</pre>
                      )}
                    </div>
                  )}
                </>
              )}
              {showCalorieQuestion && (
                <div className="fade-in" style={{ marginTop: '20px', animation: 'fadeIn 1s', margin: '10px' }}>
                  <p style={{ fontWeight: 'bold' }}>Do you want to calculate your calories?</p>
                  <button className="login-button" onClick={() => setShowCalorieCalculator(true)} style={{ marginRight: '10px' }}>Yes</button>
                  <button className="login-button" onClick={() => handleCalorieQuestion('no')}>No</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

  
  function showToast(message) {
    // Implement toast mechanism, or use a library like react-toastify
    alert("🎉 Boom! " + message + " You're crushing it! 🎉"); // Fun and positive feedback
  }
  
  }
  
  export default LandingPage;
