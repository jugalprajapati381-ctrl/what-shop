// INITIAL DATA
const defaultProducts = [
    { id: 1, name: "Arduino Uno", price: 550, desc: "...", img: "...", category: "PCB" }, // Yahan category add karein
    { id: 2, name: "IR Sensor", price: 45, desc: "...", img: "...", category: "Sensor" }  // Yahan bhi
];



// Memory: Check if products exist in LocalStorage, else use defaults
let products = JSON.parse(localStorage.getItem('myStoreData')) || defaultProducts;
let cart = [];
let currentItem = null;
let currentQty = 1;

// 1. RENDER GRID
function renderGrid() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="glass-effect p-4 border border-gray-800 hover:border-blue-500 transition">
            <img src="${p.img}" onclick="openDetail(${p.id})" class="h-40 w-full object-contain cursor-pointer">
            <h3 class="mt-4 font-bold text-blue-400">${p.name}</h3>
            <p class="text-xl font-black">₹${p.price}</p>
            <button onclick="openDetail(${p.id})" class="w-full mt-3 bg-gray-800 py-2 rounded-lg text-xs font-bold uppercase">View & Add</button>
        </div>
    `).join('');
}

// 2. DETAIL & QTY LOGIC
window.openDetail = (id) => {
    currentItem = products.find(p => p.id === id);
    currentQty = 1;
    document.getElementById('detail-name').innerText = currentItem.name;
    document.getElementById('detail-desc').innerText = currentItem.desc;
    document.getElementById('detail-price').innerText = "₹" + currentItem.price;
    document.getElementById('detail-img').src = currentItem.img;
    document.getElementById('qty-num').innerText = currentQty;
    document.getElementById('productModal').classList.remove('hidden');
};

window.updateQty = (val) => {
    currentQty = Math.max(1, Math.min(50, currentQty + val));
    document.getElementById('qty-num').innerText = currentQty;
};

// 3. CART LOGIC
window.addToCatalogue = () => {
    cart.push({ ...currentItem, qty: currentQty });
    updateCartUI();
    closeModal('productModal');
};

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = 0;
    const list = document.getElementById('cart-items');
    list.innerHTML = cart.map(i => {
        total += (i.price * i.qty);
        return `<div class="bg-black/30 p-3 rounded-lg flex justify-between">
            <span class="text-xs font-bold">${i.name} (x${i.qty})</span>
            <span class="text-blue-400">₹${i.price * i.qty}</span>
        </div>`;
    }).join('');
    document.getElementById('final-total').innerText = "₹" + total;
}

// 4. ADMIN PANEL (The Secret Door)
window.openAdmin = () => document.getElementById('adminModal').classList.remove('hidden');
window.checkAdmin = () => {
    if(document.getElementById('admin-pass').value === "robo123") {
        document.getElementById('admin-login-area').classList.add('hidden');
        document.getElementById('admin-form').classList.remove('hidden');
    } else { alert("Wrong Key!"); }
};

window.saveProduct = () => {
    const name = document.getElementById('new-name').value;
    const price = document.getElementById('new-price').value;
    const img = document.getElementById('new-img').value;
    const desc = document.getElementById('new-desc').value;

    const newItem = { id: Date.now(), name, price: parseInt(price), img, desc };
    products.push(newItem);
    localStorage.setItem('myStoreData', JSON.stringify(products)); // SAVE PERMANENTLY
    renderGrid();
    closeModal('adminModal');
    alert("Live updated!");
};

// 5. WHATSAPP & TRACKING
window.confirmOrder = () => {
    const trackingID = "TRK" + Math.floor(Math.random() * 99999);
    const name = document.getElementById('cust-name').value;
    let msg = `📦 *ROBOCON ORDER* | ID: ${trackingID}\nCustomer: ${name}\nItems:\n`;
    cart.forEach(i => msg += `• ${i.name} x${i.qty} - ₹${i.price * i.qty}\n`);
    msg += `\n💰 *Total: ${document.getElementById('final-total').innerText}*`;
    
    window.open(`https://wa.me/917977088862?text=${encodeURIComponent(msg)}`, '_blank');
    alert(`Order Placed! Your ID: ${trackingID}\nKeep it for tracking.`);
};

// UTILS
window.toggleSidebar = () => document.getElementById('cartSidebar').classList.toggle('hidden');
window.closeModal = (id) => document.getElementById(id).classList.add('hidden');
window.openInfoLayout = () => {
    if(cart.length === 0) return alert("Select products first!");
    document.getElementById('infoLayout').classList.remove('hidden');
};
window.clearStore = () => { localStorage.removeItem('myStoreData'); location.reload(); };

renderGrid();
// POINT 1: script.js ke sabse niche ye function type karein
function toggleNav() {
    let menu = document.getElementById("sideMenu");
    
    // Check karein: Kya width abhi 250px (Khuli hui) hai?
    if (menu.style.width === "250px") {
        // Haan! Toh isse band (0) kar do
        menu.style.width = "0";
    } else {
        // Nahi! Toh isse khol (250px) do
        menu.style.width = "250px";
    }
}

// Point 4: File ke sabse niche ye type karein (Line 49 se shuru karein)

window.filterCategory = (catName) => {
    // 1. Logic: Agar 'All' select kiya toh saare products dikhao
    if (catName === 'all') {
        renderGrid(products);
    } else {
        // 2. Logic: Sirf wahi products nikaalo jinka category name match kare
        const filtered = products.filter(p => p.category === catName);
        renderGrid(filtered); // Grid ko refresh karo sirf filtered items ke saath
    }
    
    // 3. Logic: Click hone ke baad sidebar menu band ho jaye
    toggleNav(); 
};
