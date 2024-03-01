import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function LandingPage() {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [showWorkoutQuestion, setShowWorkoutQuestion] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [workoutSplit, setWorkoutSplit] = useState('');

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

  const selectWorkoutPlan = (days) => {
    setWorkoutSplit(workoutPlans[days]);
    setShowWorkoutPlan(false); // Hide workout plan question after selection
  };

  const staticSuggestions = [
    'Alternative to ice cream',
    'Alternative to rice crispies',
    'Alternative to chocolate cake',
  ];

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestion(suggestion);
  };

  const handleWorkoutPlanClick = () => {
    setShowWorkoutQuestion(true); // Show the workout question and hide recipe details
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
  
  return (
    <div className="App">
      <div className="branding">
        <h1 className="logo">Healthy Innovations</h1>
        {!showWorkoutQuestion && <p className="tagline">Helping individuals find healthy alternatives to junk food</p>}
      </div>
      <div className="search-section">
        {showSuggestions && !showWorkoutQuestion && (
          <>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for healthy alternatives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="dynamic-recommendations">
              <ul>
                {staticSuggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSelectSuggestion(suggestion)} style={{ cursor: 'pointer' }}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {isLoading && <div className="loading-spinner"></div>}
        {!showWorkoutQuestion && !workoutSplit && selectedSuggestion && recipeDetails && !isLoading && (
          <div className="fade-in" style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
            <h2>{selectedSuggestion}</h2>
            <h3>Ingredients</h3>
            <ul>
              {recipeDetails.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {recipeDetails.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
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
          </div>
        )}
        {workoutSplit && (
          <div className="fade-in" style={{ marginTop: '20px' }}>
            <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{workoutSplit}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;