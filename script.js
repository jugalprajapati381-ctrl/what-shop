const products = [
    {
        id: 1,
        name: "Arduino Uno R3",
        price: 550,
        category: "micro",
        images: ["https://img.icons8.com/color/240/arduino.png", "https://img.icons8.com/color/240/circuits.png"],
        desc: "Original ATmega328P based microcontroller. Perfect for IoT projects and robotics.",
        reviews: ["Great quality!", "Best for B.Tech students."],
        stars: 5
    },
    {
        id: 2,
        name: "Ultrasonic Sensor",
        price: 85,
        category: "sensor",
        images: ["https://img.icons8.com/color/240/proximity-sensor.png"],
        desc: "HC-SR04 distance measuring sensor with 2cm-400cm range.",
        reviews: ["Fast shipping", "Works perfectly with Uno"],
        stars: 4
    }
];

let cart = [];
let selectedProduct = null;
let modalQty = 1;

// Load Products
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.images[0]}" onclick="viewProduct(${p.id})" class="w-full h-40 object-contain cursor-pointer">
            <h3 class="mt-4 font-bold">${p.name}</h3>
            <div class="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</div>
            <p class="text-blue-400 font-black text-xl">₹${p.price}</p>
            <button onclick="quickAdd(${p.id})" class="w-full mt-4 bg-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition">ADD TO CATALOGUE</button>
        </div>
    `).join('');
}

// View Product Details (The "Flipkart" Look)
window.viewProduct = function(id) {
    selectedProduct = products.find(p => p.id === id);
    modalQty = 1;
    document.getElementById('modal-qty').innerText = modalQty;
    document.getElementById('detail-title').innerText = selectedProduct.name;
    document.getElementById('detail-desc').innerText = selectedProduct.desc;
    document.getElementById('detail-price').innerText = "Price: ₹" + selectedProduct.price;
    document.getElementById('main-detail-img').src = selectedProduct.images[0];
    
    document.getElementById('modal-add-btn').onclick = () => {
        addToCart(selectedProduct.id, modalQty);
        closeDetail();
    };
    
    document.getElementById('productDetailModal').style.display = 'flex';
};

function updateModalQty(val) {
    modalQty = Math.max(1, Math.min(50, modalQty + val));
    document.getElementById('modal-qty').innerText = modalQty;
}

window.addToCart = function(id, qty) {
    const p = products.find(prod => prod.id === id);
    const existing = cart.find(c => c.id === id);
    if(existing) {
        existing.qty += qty;
    } else {
        cart.push({...p, qty});
    }
    updateCartUI();
};

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('final-total').innerText = "₹" + cart.reduce((s, i) => s + (i.price * i.qty), 0);
    // Add logic to display items in sidebar...
}

window.placeOrder = function() {
    if(cart.length === 0) return alert("Select products first!");
    
    // Tracking ID generation
    const trackingID = "TRK-" + Math.floor(Math.random() * 1000000);
    
    let message = `📦 *OFFICIAL ORDER* | Tracking: ${trackingID}\n\n`;
    cart.forEach(i => {
        message += `• ${i.name} [x${i.qty}] - ₹${i.price * i.qty}\n`;
    });
    message += `\n💰 Total: ${document.getElementById('final-total').innerText}`;
    
    window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank');
};

window.toggleCart = () => {
    document.getElementById('cartSidebar').classList.toggle('active');
};

window.closeDetail = () => document.getElementById('productDetailModal').style.display = 'none';

renderProducts();
