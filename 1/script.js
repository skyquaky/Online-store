// Состояние корзины
let cart = [];

// Элементы DOM
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');

// Открыть / Закрыть корзину
cartBtn.addEventListener('click', () => cartModal.style.display = 'flex');
closeModal.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

// Добавление товара в корзину
function addToCart(name, price) {
    // Проверяем, есть ли уже товар в корзине
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartUI();
}

// Обновление интерфейса корзины
function updateCartUI() {
    // Общее количество товаров
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Очищаем список перед рендером
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-message">Корзина пуста</p>';
        totalPrice.textContent = '0 ₽';
        return;
    }

    // Рендерим элементы
    let total = 0;
    cart.forEach(item => {
        const itemCost = item.price * item.quantity;
        total += itemCost;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>${itemCost.toLocaleString()} ₽</span>
        `;
        cartItems.appendChild(itemEl);
    });

    totalPrice.textContent = `${total.toLocaleString()} ₽`;
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
}
