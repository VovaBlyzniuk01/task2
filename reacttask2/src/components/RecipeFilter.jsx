import React from 'react';

const RecipeFilter = ({ onCategoryChange, onSearchChange, onFilterChange }) => {
  return (
    <div className="filters">
      <div className="category-buttons">
        <button 
          className="category-btn active" 
          onClick={() => onCategoryChange('усі страви')}
        >
          Усі страви
        </button>
        {/* Додайте інші кнопки категорій */}
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Пошук рецептів..." 
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-selects">
        <select 
          className="filter-select" 
          onChange={(e) => onFilterChange('time', e.target.value)}
        >
          <option value="">Час приготування</option>
          {/* Додайте опції */}
        </select>

        <select 
          className="filter-select"
          onChange={(e) => onFilterChange('difficulty', e.target.value)}
        >
          <option value="">Складність</option>
          {/* Додайте опції */}
        </select>
      </div>
    </div>
  );
};

export default RecipeFilter; 