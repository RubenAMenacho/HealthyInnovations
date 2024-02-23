import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function LandingPage() {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true); // Initially show suggestions
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [askForAnother, setAskForAnother] = useState(false); 
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

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

  useEffect(() => {
    // Check if recipe details are already stored in localStorage
    const storedRecipe = localStorage.getItem('recipeDetails');
    if (storedRecipe) {
      setRecipeDetails(JSON.parse(storedRecipe));
      setAskForAnother(true);
    } else {
      // Simulate fetching recipe details
      setIsLoading(true);
      // Simulate fetching recipe details
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
        setIsLoading(false);
        setShowSuggestions(false); // Hide suggestions
      }, 2000);
    }
  }, []);

  return (
    <div className="App">
      <div className="branding">
        <h1 className="logo">Healthy Innovations</h1>
        <p className="tagline">Helping individuals find healthy alternatives to junk food</p>
      </div>
      <div className="search-section">
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
        {showSuggestions && (
          <div className="dynamic-recommendations">
            <ul>
              {staticSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSelectSuggestion(suggestion)} style={{ cursor: 'pointer' }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && <p>Loading recipe...</p>}
        {selectedSuggestion && (
          <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
            <h2>{selectedSuggestion}</h2>
            <h3>Ingredients</h3>
            <ul>{recipeDetails.ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ))}
</ul>
<h3>Instructions</h3>
<ol>{recipeDetails.instructions.map((step, index) => (
  <li key={index}>{step}</li>
))}</ol>
<h3>Nutritional Facts</h3>
<p>Calories: {recipeDetails.nutritionalFacts.calories}</p>
<p>Protein: {recipeDetails.nutritionalFacts.protein}</p>
<p>Carbohydrates: {recipeDetails.nutritionalFacts.carbohydrates}</p>
<p>Fat: {recipeDetails.nutritionalFacts.fat}</p>
<button onClick={() => setShowSuggestions(true)} style={{ marginTop: '20px' }}>
  Want to search for another alternative?
</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage