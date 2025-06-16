// Menu Data
const dishes = [
    {
        id: 1,
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
        price: 24.99,
        rating: 4.8,
        image: "assets/grill salmon.jpg",
        category: "Main Course",
        ingredients: ["Salmon", "Herbs", "Lemon", "Butter"],
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: 2,
        name: "Truffle Pasta",
        description: "Homemade pasta with black truffle and parmesan",
        price: 19.99,
        rating: 4.6,
        image: "assets/truffle pasta.jpg",
        category: "Pasta",
        ingredients: ["Pasta", "Truffle", "Parmesan", "Cream"],
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: 3,
        name: "Beef Wellington",
        description: "Premium beef tenderloin wrapped in puff pastry",
        price: 34.99,
        rating: 4.9,
        image: "assets/beef wellington.jpg",
        category: "Main Course",
        ingredients: ["Beef", "Puff Pastry", "Mushrooms", "Herbs"],
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: 4,
        name: "Chocolate Soufflé",
        description: "Warm chocolate soufflé with vanilla ice cream",
        price: 12.99,
        rating: 4.7,
        image: "assets/chocalate.jpg",
        category: "Dessert",
        ingredients: ["Chocolate", "Eggs", "Sugar", "Vanilla"],
        isSpicy: false,
        isVegetarian: true
    },
    // --- Additional Main Course Dishes ---
    {
        id: 5,
        name: "Lamb Chops Provençal",
        description: "Herb-crusted lamb chops with garlic and rosemary jus",
        price: 29.99,
        rating: 4.7,
        image: "assets/lamb chob.jpg",
        category: "Main Course",
        ingredients: ["Lamb", "Herbs", "Garlic", "Rosemary"],
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: 6,
        name: "Seared Duck Breast",
        description: "Seared duck breast with cherry-port reduction",
        price: 27.99,
        rating: 4.8,
        image: "assets/duck.jpg",
        category: "Main Course",
        ingredients: ["Duck", "Cherry", "Port Wine", "Spices"],
        isSpicy: false,
        isVegetarian: false
    },
    // --- Additional Pasta Dishes ---
    {
        id: 7,
        name: "Lobster Ravioli",
        description: "Handmade ravioli stuffed with lobster and ricotta in a saffron cream sauce",
        price: 22.99,
        rating: 4.7,
        image: "assets/lobster ravoli.jpg",
        category: "Pasta",
        ingredients: ["Lobster", "Ricotta", "Saffron", "Pasta"],
        isSpicy: false,
        isVegetarian: false
    },
    {
        id: 8,
        name: "Spinach Ricotta Cannelloni",
        description: "Baked cannelloni filled with spinach and ricotta, topped with tomato sauce",
        price: 17.99,
        rating: 4.5,
        image: "assets/spinach.jpg",
        category: "Pasta",
        ingredients: ["Spinach", "Ricotta", "Tomato Sauce", "Pasta"],
        isSpicy: false,
        isVegetarian: true
    },
    // --- Additional Dessert Dishes ---
    {
        id: 9,
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream",
        price: 10.99,
        rating: 4.8,
        image: "assets/tiramisu.jpg",
        category: "Dessert",
        ingredients: ["Espresso", "Ladyfingers", "Mascarpone", "Cocoa"],
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: 10,
        name: "Crème Brûlée",
        description: "Rich vanilla custard with a caramelized sugar crust",
        price: 11.99,
        rating: 4.9,
        image: "assets/creme.jpg",
        category: "Dessert",
        ingredients: ["Cream", "Eggs", "Vanilla", "Sugar"],
        isSpicy: false,
        isVegetarian: true
    },
    {
        id: 11,
        name: "Lemon Tart",
        description: "Tangy lemon tart with a buttery shortcrust base",
        price: 9.99,
        rating: 4.6,
        image: "assets/lemon tarrt.jpg",
        category: "Dessert",
        ingredients: ["Lemon", "Butter", "Flour", "Sugar"],
        isSpicy: false,
        isVegetarian: true
    }
];

// DOM Elements
const menuSection = document.querySelector('.overflow-x-auto');
const navLinks = document.querySelectorAll('nav a');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Render Dishes
function renderDishes(dishesToRender = dishes) {
    const container = document.querySelector('.grid');
    container.innerHTML = dishesToRender.map(dish => `
        <div class="bg-white rounded-lg shadow-sm overflow-hidden group" data-dish-id="${dish.id}">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-300">
            </div>
            <div class="p-4">
                <h4 class="font-medium text-gray-900">${dish.name}</h4>
                <p class="text-sm text-gray-500 mt-1">${dish.description}</p>
                <div class="flex items-center mt-2">
                    <div class="flex text-yellow-400">
                        ${renderStars(dish.rating)}
                    </div>
                    <span class="text-sm text-gray-500 ml-2">(${dish.rating})</span>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-lg font-bold text-gray-900">$${dish.price.toFixed(2)}</span>
                    <button onclick="addToCart(${JSON.stringify(dish).replace(/\"/g, '&quot;')})"
                            class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to render stars
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span>★</span>';
    }
    if (hasHalfStar) {
        stars += '<span>★</span>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="text-gray-300">★</span>';
    }
    
    return stars;
}

// Filter dishes by category
function filterDishesByCategory(category) {
    if (category === 'all') {
        renderDishes();
    } else {
        const filteredDishes = dishes.filter(dish => dish.category === category);
        renderDishes(filteredDishes);
    }
}

// Search dishes
function searchDishes(query) {
    if (!query.trim()) {
        renderDishes();
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

    renderDishes(results);
}

// Mobile menu functionality
function toggleMobileMenu() {
    mobileMenu.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('overflow-hidden');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // View Menu button
    const viewMenuButton = document.getElementById('view-menu-btn');
    if (viewMenuButton) {
        viewMenuButton.addEventListener('click', () => {
            const menuSection = document.querySelector('.overflow-x-auto');
            menuSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.textContent.toLowerCase();
            
            // Remove active state from all links
            navLinks.forEach(l => l.classList.remove('text-primary'));
            // Add active state to clicked link
            link.classList.add('text-primary');

            // Handle section navigation
            switch(section) {
                case 'home':
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'menu':
                    const menuSection = document.querySelector('.overflow-x-auto');
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'about':
                    // Add about section navigation when implemented
                    break;
                case 'contact':
                    // Add contact section navigation when implemented
                    break;
            }

            // Close mobile menu if open
            if (mobileMenu.classList.contains('mobile-menu-open')) {
                toggleMobileMenu();
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('mobile-menu-open') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Initialize dishes
    renderDishes();
});