document.addEventListener('DOMContentLoaded', function() {
   
    const categoryButtons = document.querySelectorAll('.category-btn');
    const tipCards = document.querySelectorAll('.tip-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            
            tipCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    return;
                }

                const cardCategories = card.dataset.categories.split(',');
                card.style.display = cardCategories.includes(category) ? 'block' : 'none';
            });
        });
    });

    
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        tipCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || content.includes(searchTerm);
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    });

    
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const closeButtons = document.querySelectorAll('.close-details-btn');
    
  
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.tip-card');
            const details = card.querySelector('.tip-details');
            
            details.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.closest('.tip-details');
            details.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

 
    overlay.addEventListener('click', () => {
        document.querySelector('.tip-details.active')?.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    tipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

  
    const calculateBtn = document.querySelector('.calculate-btn');
    const calculatorHistory = [];
    
    calculateBtn.addEventListener('click', () => {
        const initialServings = parseFloat(document.querySelector('input[placeholder="Початкова кількість порцій"]').value);
        const desiredServings = parseFloat(document.querySelector('input[placeholder="Бажана кількість порцій"]').value);
        
        if (initialServings && desiredServings) {
            const ratio = desiredServings / initialServings;
            const result = {
                initial: initialServings,
                desired: desiredServings,
                ratio: ratio,
                date: new Date()
            };
            
            calculatorHistory.push(result);
            localStorage.setItem('calculatorHistory', JSON.stringify(calculatorHistory));
            
            showCalculatorResult(result);
        }
    });

   
    const calendar = document.querySelector('.calendar-grid');
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    const dailyTips = {
        'Пн': { title: 'Гостріння ножів', content: 'Як правильно точити кухонні ножі...' },
        'Вт': { title: 'Зберігання овочів', content: 'Оптимальні умови для зберігання...' },
        // ... добавьте советы для остальных дней
    };

    weekDays.forEach(day => {
        const dayElement = createCalendarDay(day, dailyTips[day]);
        calendar.appendChild(dayElement);
    });

   
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearch = document.createElement('input');
    faqSearch.type = 'text';
    faqSearch.placeholder = 'Пошук у запитаннях...';
    document.querySelector('.faq-section h2').after(faqSearch);

    faqSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = question.includes(searchTerm) ? 'block' : 'none';
        });
    });

    
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

      
        const noteBtn = document.createElement('button');
        noteBtn.textContent = '📝 Додати нотатку';
        noteBtn.classList.add('note-btn');
        
        noteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const note = prompt('Додайте свою нотатку:');
            if (note) {
                saveNote(card.querySelector('h3').textContent, note);
                showNotification('Нотатку збережено!');
            }
        });

        card.querySelector('.card-front').appendChild(noteBtn);
    });
});


function highlightText(element, searchTerm) {
    const content = element.innerHTML;
    const highlightedContent = content.replace(
        new RegExp(searchTerm, 'gi'),
        match => `<mark>${match}</mark>`
    );
    element.innerHTML = highlightedContent;
}

function createCalendarDay(day, tipData) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    dayElement.innerHTML = `
        <span class="day">${day}</span>
        <span class="tip-title">${tipData.title}</span>
    `;
    
    dayElement.addEventListener('click', () => {
        showDailyTip(tipData);
    });
    
    return dayElement;
}

function showCalculatorResult(result) {
    const resultDialog = document.createElement('dialog');
    resultDialog.classList.add('calculator-result');
    resultDialog.innerHTML = `
        <h3>Результат перерахунку</h3>
        <p>Коефіцієнт: ${result.ratio.toFixed(2)}</p>
        <table>
            <tr>
                <th>Інгредієнт</th>
                <th>Було</th>
                <th>Стало</th>
            </tr>
            <tr>
                <td>Приклад 1</td>
                <td>100 г</td>
                <td>${(100 * result.ratio).toFixed(0)} г</td>
            </tr>
        </table>
        <button onclick="this.parentElement.close()">Закрити</button>
    `;
    document.body.appendChild(resultDialog);
    resultDialog.showModal();
}

function saveNote(title, note) {
    const notes = JSON.parse(localStorage.getItem('cookingNotes') || '{}');
    notes[title] = note;
    localStorage.setItem('cookingNotes', JSON.stringify(notes));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 