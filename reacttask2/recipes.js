document.addEventListener('DOMContentLoaded', function() {
    // Функционал фильтрации
    const categoryButtons = document.querySelectorAll('.category-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const searchInput = document.querySelector('.search-bar input');
    const filterSelects = document.querySelectorAll('.filter-select');

   
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
           
            button.classList.add('active');

            const category = button.textContent.toLowerCase();
            
            recipeCards.forEach(card => {
                const cardCategories = Array.from(card.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                if (category === 'усі страви' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        recipeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });

    function applyFilters() {
        const selectedTime = document.querySelector('select[value=""]').value;
        const selectedDifficulty = document.querySelector('select[value="difficulty"]').value;
        const selectedCuisine = document.querySelector('select[value="cuisine"]').value;
        const selectedCalories = document.querySelector('select[value="calories"]').value;

        recipeCards.forEach(card => {
            const time = card.querySelector('.recipe-meta span:first-child').textContent;
            const difficulty = card.querySelector('.recipe-meta span:nth-child(2)').textContent;
            
            let shouldShow = true;

            if (selectedTime && !time.includes(selectedTime)) shouldShow = false;
            if (selectedDifficulty && !difficulty.includes(selectedDifficulty)) shouldShow = false;
            

            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

   
    const favoriteButtons = document.querySelectorAll('.recipe-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                button.style.backgroundColor = '#ff4757';
            } else {
                button.style.backgroundColor = 'rgba(255,255,255,0.9)';
            }
        });
    });

   
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const itemsPerPage = 6;
    let currentPage = 1;

    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '←') {
                if (currentPage > 1) currentPage--;
            } else if (button.textContent === '→') {
                if (currentPage < Math.ceil(recipeCards.length / itemsPerPage)) currentPage++;
            } else {
                currentPage = parseInt(button.textContent);
            }
            
            updatePagination();
            showCurrentPageItems();
        });
    });

    function updatePagination() {
        paginationButtons.forEach(button => {
            button.classList.remove('active');
            if (button.textContent === currentPage.toString()) {
                button.classList.add('active');
            }
        });
    }

    function showCurrentPageItems() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        recipeCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    
    const servingsButtons = document.querySelectorAll('.servings-btn');
    if (servingsButtons.length) {
        const servingsText = document.querySelector('.servings-control span');
        let currentServings = parseInt(servingsText.textContent);

        servingsButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent === '+' && currentServings < 12) {
                    currentServings += 2;
                } else if (button.textContent === '-' && currentServings > 2) {
                    currentServings -= 2;
                }
                servingsText.textContent = `${currentServings} порцій`;
                updateIngredientAmounts(currentServings);
            });
        });
    }

    function updateIngredientAmounts(newServings) {
        const ingredients = document.querySelectorAll('.ingredient-amount');
        ingredients.forEach(ingredient => {
           
        });
    }

   
    showCurrentPageItems();

    
    const ratingStars = document.querySelectorAll('.rating-stars span');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            const recipeId = this.closest('.recipe-card').dataset.id;
            submitRating(recipeId, rating);
        });

        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(this.parentElement, rating);
        });

        star.addEventListener('mouseout', function() {
            const currentRating = this.parentElement.dataset.currentRating;
            highlightStars(this.parentElement, currentRating);
        });
    });

    function highlightStars(container, rating) {
        const stars = container.querySelectorAll('span');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    function submitRating(recipeId, rating) {
        
        console.log(`Recipe ${recipeId} rated ${rating} stars`);
    }

    
    const startCookingButtons = document.querySelectorAll('.start-cooking-btn');
    startCookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cookingTime = this.dataset.cookingTime; // время в минутах
            startCookingTimer(cookingTime, this);
        });
    });

    function startCookingTimer(minutes, button) {
        button.disabled = true;
        let seconds = minutes * 60;
        
        const timer = setInterval(() => {
            const minutesLeft = Math.floor(seconds / 60);
            const secondsLeft = seconds % 60;
            
            button.textContent = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;
            
            if (seconds === 0) {
                clearInterval(timer);
                button.textContent = 'Готово!';
                notifyUserCookingDone();
            }
            seconds--;
        }, 1000);
    }

   
    function notifyUserCookingDone() {
        if (Notification.permission === 'granted') {
            new Notification('Страва готова!', {
                body: 'Час приготування закінчився',
                icon: '/icons/chef.png'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }

    
    const shoppingList = new Set();
    const addToShoppingListButtons = document.querySelectorAll('.add-to-shopping-list');
    
    addToShoppingListButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ingredient = this.dataset.ingredient;
            const amount = this.dataset.amount;
            addToShoppingList(ingredient, amount);
        });
    });

    function addToShoppingList(ingredient, amount) {
        shoppingList.add(`${amount} ${ingredient}`);
        updateShoppingListUI();
        saveShoppingList();
    }

    function updateShoppingListUI() {
        const shoppingListContainer = document.querySelector('.shopping-list-items');
        if (shoppingListContainer) {
            shoppingListContainer.innerHTML = '';
            shoppingList.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'shopping-list-item';
                itemElement.innerHTML = `
                    <span>${item}</span>
                    <button class="remove-item">✕</button>
                `;
                shoppingListContainer.appendChild(itemElement);
            });
        }
    }

    
    function saveShoppingList() {
        localStorage.setItem('shoppingList', JSON.stringify(Array.from(shoppingList)));
    }

    function loadShoppingList() {
        const saved = localStorage.getItem('shoppingList');
        if (saved) {
            shoppingList.clear();
            JSON.parse(saved).forEach(item => shoppingList.add(item));
            updateShoppingListUI();
        }
    }

   
    const printButtons = document.querySelectorAll('.print-recipe');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeCard = this.closest('.recipe-card');
            printRecipe(recipeCard);
        });
    });

    function printRecipe(recipeElement) {
        const printWindow = window.open('', '', 'width=800,height=600');
        const recipeContent = recipeElement.cloneNode(true);
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Рецепт для друку</title>
                    <style>
                        body { font-family: Arial; padding: 20px; }
                        img { max-width: 100%; }
                        .recipe-meta { margin: 20px 0; }
                        .ingredients-list { margin: 20px 0; }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    ${recipeContent.innerHTML}
                    <button class="no-print" onclick="window.print()">Друкувати</button>
                </body>
            </html>
        `);
    }

    
    const shareButtons = document.querySelectorAll('.share-recipe');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeCard = this.closest('.recipe-card');
            const recipeName = recipeCard.querySelector('h3').textContent;
            const recipeUrl = window.location.href;

            if (navigator.share) {
                navigator.share({
                    title: recipeName,
                    text: `Перевірте цей чудовий рецепт: ${recipeName}`,
                    url: recipeUrl
                });
            } else {
                
                const shareDialog = document.createElement('div');
                shareDialog.className = 'share-dialog';
                shareDialog.innerHTML = `
                    <div class="share-options">
                        <button onclick="window.open('https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}')">Facebook</button>
                        <button onclick="window.open('https://telegram.me/share/url?url=${encodeURIComponent(recipeUrl)}&text=${encodeURIComponent(recipeName)}')">Telegram</button>
                        <button onclick="navigator.clipboard.writeText('${recipeUrl}')">Копіювати посилання</button>
                    </div>
                `;
                document.body.appendChild(shareDialog);
            }
        });
    });

    
    const unitConverters = document.querySelectorAll('.unit-converter');
    unitConverters.forEach(converter => {
        converter.addEventListener('change', function() {
            const amount = this.dataset.amount;
            const fromUnit = this.dataset.fromUnit;
            const toUnit = this.value;
            const convertedAmount = convertUnits(amount, fromUnit, toUnit);
            this.closest('.ingredient-amount').textContent = `${convertedAmount} ${toUnit}`;
        });
    });

    function convertUnits(amount, from, to) {
        const conversions = {
            'г': {
                'кг': (x) => x / 1000,
                'фунт': (x) => x / 453.592
            },
            'мл': {
                'л': (x) => x / 1000,
                'склянка': (x) => x / 250
            }
          
        };

        if (conversions[from] && conversions[from][to]) {
            return conversions[from][to](parseFloat(amount)).toFixed(2);
        }
        return amount;
    }

    
    function calculateTotalCalories() {
        const ingredients = document.querySelectorAll('.ingredient');
        let totalCalories = 0;

        ingredients.forEach(ingredient => {
            const amount = parseFloat(ingredient.dataset.amount);
            const caloriesPer100g = parseFloat(ingredient.dataset.calories);
            totalCalories += (amount / 100) * caloriesPer100g;
        });

        document.querySelector('.total-calories').textContent = 
            `Загальна калорійність: ${Math.round(totalCalories)} ккал`;
    }

    
    loadShoppingList();
    
    
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        new Tooltip(tooltip, {
            placement: 'top',
            title: tooltip.dataset.tooltip
        });
    });
});


class Tooltip {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.tooltip = null;
        
        this.element.addEventListener('mouseenter', () => this.show());
        this.element.addEventListener('mouseleave', () => this.hide());
    }

    show() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        this.tooltip.textContent = this.options.title;
        document.body.appendChild(this.tooltip);

        const elementRect = this.element.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();

        this.tooltip.style.top = `${elementRect.top - tooltipRect.height - 10}px`;
        this.tooltip.style.left = `${elementRect.left + (elementRect.width - tooltipRect.width) / 2}px`;
    }

    hide() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    }
} 