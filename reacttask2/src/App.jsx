import React, { useState, useEffect } from 'react';
import RecipeCard from './components/RecipeCard';
import RecipeFilter from './components/RecipeFilter';
import Pagination from './components/Pagination';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'усі страви',
    searchTerm: '',
    time: '',
    difficulty: '',
  });

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    // Тут можна додати завантаження рецептів з API
    // Наразі використовуємо тестові дані
    setRecipes(testRecipes);
  }, []);

  useEffect(() => {
    let result = recipes;

    // Фільтрація за категорією
    if (filters.category !== 'усі страви') {
      result = result.filter(recipe => 
        recipe.tags.includes(filters.category.toLowerCase())
      );
    }

    // Пошук
    if (filters.searchTerm) {
      result = result.filter(recipe =>
        recipe.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Інші фільтри
    if (filters.time) {
      result = result.filter(recipe => recipe.cookingTime.includes(filters.time));
    }
    if (filters.difficulty) {
      result = result.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    setFilteredRecipes(result);
  }, [recipes, filters]);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentPage(1);
  };

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCurrentPageRecipes = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRecipes.slice(startIndex, endIndex);
  };

  return (
    <div className="app">
      <RecipeFilter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <div className="recipes-grid">
        {getCurrentPageRecipes().map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App; 