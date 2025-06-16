// Cart State
let cart = {
    items: [],
    total: 0
};

// DOM Elements
const cartDrawer = document.getElementById('cart-drawer');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');

// Cart Functions
function addToCart(dish) {
    const existingItem = cart.items.find(item => item.id === dish.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            quantity: 1,
            image: dish.image,
            category: dish.category
        });
    }
    
    updateCart();
    openCart();
    showNotification(`${dish.name} added to cart`);
}

function removeFromCart(dishId) {
    const item = cart.items.find(item => item.id === dishId);
    if (item) {
        showNotification(`${item.name} removed from cart`);
    }
    cart.items = cart.items.filter(item => item.id !== dishId);
    updateCart();
}

function cancelOrder() {
    if (cart.items.length > 0) {
        showNotification('Order cancelled');
        cart.items = [];
        updateCart();
        closeCartDrawer();
    }
}

function updateCart() {
    // Update cart items display
    cartItems.innerHTML = cart.items.map(item => `
        <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cart-item-enter">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-medium text-gray-900">${item.name}</h4>
                <p class="text-sm text-gray-500">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                        class="text-gray-500 hover:text-gray-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    </svg>
                </button>
                <span class="text-gray-900">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})"
                        class="text-gray-500 hover:text-gray-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
                <button onclick="removeFromCart(${item.id})"
                        class="text-red-500 hover:text-red-700 ml-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Update subtotal
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${cart.total.toFixed(2)}`;

    // Update cart count badge
    const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    updateCartBadge(cartCount);

    // Show/hide empty cart message
    if (cart.items.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <p>Your cart is empty</p>
                <button onclick="closeCartDrawer()" class="mt-4 text-primary hover:text-primary/80">
                    Continue Browsing
                </button>
            </div>
        `;
    } else {
        // Add cancel order button
        const cancelButton = document.createElement('button');
        cancelButton.className = 'w-full mt-2 text-red-500 hover:text-red-700 px-6 py-2 rounded-lg font-medium transition';
        cancelButton.textContent = 'Cancel Order';
        cancelButton.onclick = cancelOrder;
        cartItems.appendChild(cancelButton);
    }
}

function updateQuantity(dishId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(dishId);
        return;
    }

    const item = cart.items.find(item => item.id === dishId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

function updateCartBadge(count) {
    let badge = document.getElementById('cart-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'cart-badge';
        badge.className = 'absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center cart-badge';
        cartToggle.appendChild(badge);
    }
    
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

function openCart() {
    cartDrawer.classList.add('cart-drawer-open');
}

function closeCartDrawer() {
    cartDrawer.classList.remove('cart-drawer-open');
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);

    // Remove notification
    setTimeout(() => {
        notification.style.transform = 'translateY(full)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event Listeners
cartToggle.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartDrawer);

// Close cart when clicking outside
document.addEventListener('mousedown', (e) => {
    if (
        cartDrawer.classList.contains('cart-drawer-open') &&
        !cartDrawer.contains(e.target) &&
        !cartToggle.contains(e.target)
    ) {
        closeCartDrawer();
    }
});

// Initialize cart
updateCart(); 