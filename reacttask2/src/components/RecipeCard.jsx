import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRatingClick = (rating) => {
    setCurrentRating(rating);
    // Тут можна додати API запит для збереження рейтингу
  };

  return (
    <div className="recipe-card" data-id={recipe.id}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      
      <div className="recipe-meta">
        <span>{recipe.cookingTime}</span>
        <span>{recipe.difficulty}</span>
      </div>

      <div className="tags">
        {recipe.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      <button 
        className={`recipe-favorite ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        style={{ backgroundColor: isFavorite ? '#ff4757' : 'rgba(255,255,255,0.9)' }}
      >
        ♥
      </button>

      <div className="rating-stars" data-current-rating={currentRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            data-rating={star}
            className={star <= currentRating ? 'active' : ''}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard; 