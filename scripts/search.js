// Search functionality
const searchInput = document.querySelector('input[type="text"]');
const searchResults = document.createElement('div');
searchResults.className = 'absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 max-h-96 overflow-y-auto z-50 hidden';

// Add search results container after search input
searchInput.parentElement.appendChild(searchResults);

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search function
const performSearch = debounce((query) => {
    if (!query.trim()) {
        searchResults.classList.add('hidden');
        return;
    }

    const results = dishes.filter(dish => 
        dish.name.toLowerCase().includes(query.toLowerCase()) ||
        dish.description.toLowerCase().includes(query.toLowerCase()) ||
        dish.category.toLowerCase().includes(query.toLowerCase()) ||
        dish.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(query.toLowerCase())
        )
    );

    if (results.length > 0) {
        searchResults.innerHTML = results.map(dish => `
            <div class="p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-4"
                 onclick="selectDish(${dish.id})">
                <img src="${dish.image}" alt="${dish.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-medium text-gray-900">${dish.name}</h4>
                    <p class="text-sm text-gray-500">${dish.category} • $${dish.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
        searchResults.classList.remove('hidden');
    } else {
        searchResults.innerHTML = `
            <div class="p-4 text-gray-500 text-center">
                No dishes found
            </div>
        `;
        searchResults.classList.remove('hidden');
    }
}, 300);

// Event listeners
searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
    }
});

// Select dish from search results
function selectDish(dishId) {
    const dish = dishes.find(d => d.id === dishId);
    if (dish) {
        // Scroll to dish
        const dishElement = document.querySelector(`[data-dish-id="${dishId}"]`);
        if (dishElement) {
            dishElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight dish briefly
            dishElement.classList.add('ring-2', 'ring-primary');
            setTimeout(() => {
                dishElement.classList.remove('ring-2', 'ring-primary');
            }, 2000);
        }
        // Clear search
        searchInput.value = '';
        searchResults.classList.add('hidden');
    }
}

// Add keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    const results = searchResults.querySelectorAll('div[onclick]');
    const currentIndex = Array.from(results).findIndex(result => 
        result.classList.contains('bg-gray-50')
    );

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < results.length - 1) {
                results[currentIndex]?.classList.remove('bg-gray-50');
                results[currentIndex + 1].classList.add('bg-gray-50');
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
                results[currentIndex]?.classList.remove('bg-gray-50');
                results[currentIndex - 1].classList.add('bg-gray-50');
            }
            break;
        case 'Enter':
            e.preventDefault();
            const selectedResult = searchResults.querySelector('.bg-gray-50');
            if (selectedResult) {
                selectedResult.click();
            }
            break;
        case 'Escape':
            searchResults.classList.add('hidden');
            break;
    }
});

// Add search filters
const filterContainer = document.createElement('div');
filterContainer.className = 'flex space-x-2 mt-2';
searchInput.parentElement.appendChild(filterContainer);

const filters = [
    { label: 'All', value: 'all' },
    { label: 'Main Course', value: 'Main Course' },
    { label: 'Pasta', value: 'Pasta' },
    { label: 'Dessert', value: 'Dessert' }
];

filters.forEach(filter => {
    const button = document.createElement('button');
    button.className = 'px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition';
    button.textContent = filter.label;
    button.onclick = () => {
        filterDishesByCategory(filter.value);
        // Update active state
        filterContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-600');
        });
        button.classList.remove('bg-gray-100', 'text-gray-600');
        button.classList.add('bg-primary', 'text-white');
    };
    filterContainer.appendChild(button);
}); 