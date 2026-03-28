// DATABASE
const products = [
    {
        id: 1,
        name: "Brushless DC Motor",
        price: 1450,
        images: ["https://img.icons8.com/color/240/engine.png", "https://img.icons8.com/color/240/settings.png"],
        desc: "High torque 1000KV motor for racing drones and heavy robots.",
        stars: 5
    },
    {
        id: 2,
        name: "Lidar Sensor X2",
        price: 4200,
        images: ["https://img.icons8.com/color/240/radar.png"],
        desc: "360-degree laser scanning for autonomous navigation.",
        stars: 4
    }
];

let catalogue = [];
let currentProduct = null;
let currentQty = 1;

// INITIALIZE GRID
function init() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="glass-effect p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
            <img src="${p.images[0]}" onclick="openProduct(${p.id})" class="w-full h-40 object-contain cursor-pointer">
            <h3 class="mt-4 font-bold text-blue-400">${p.name}</h3>
            <p class="text-xl font-black">₹${p.price}</p>
            <button onclick="openProduct(${p.id})" class="w-full mt-3 py-2 bg-gray-800 text-xs rounded-lg hover:bg-blue-600">VIEW DETAILS</button>
        </div>
    `).join('');
}

// LAYOUT 1 LOGIC: Open Detail
window.openProduct = (id) => {
    currentProduct = products.find(p => p.id === id);
    currentQty = 1;
    document.getElementById('detail-name').innerText = currentProduct.name;
    document.getElementById('detail-desc').innerText = currentProduct.desc;
    document.getElementById('detail-price').innerText = "₹" + currentProduct.price;
    document.getElementById('detail-img').src = currentProduct.images[0];
    document.getElementById('qty-number').innerText = currentQty;
    document.getElementById('productModal').classList.remove('hidden');
};

window.updateQty = (val) => {
    currentQty = Math.max(1, Math.min(50, currentQty + val));
    document.getElementById('qty-number').innerText = currentQty;
};

// LAYOUT 2 LOGIC: Catalogue
window.addToCatalogue = () => {
    const existing = catalogue.find(c => c.id === currentProduct.id);
    if(existing) existing.qty += currentQty;
    else catalogue.push({...currentProduct, qty: currentQty});
    
    updateCatalogueUI();
    closeModal('productModal');
};

function updateCatalogueUI() {
    const list = document.getElementById('catalogue-list');
    document.getElementById('cart-count').innerText = catalogue.length;
    let total = 0;
    
    list.innerHTML = catalogue.map(item => {
        total += (item.price * item.qty);
        return `
            <div class="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border-l-2 border-blue-500">
                <div class="flex gap-3 items-center">
                    <img src="${item.images[0]}" class="h-10 w-10">
                    <div>
                        <p class="text-xs font-bold">${item.name}</p>
                        <p class="text-[10px] text-gray-500">Qty: ${item.qty}</p>
                    </div>
                </div>
                <p class="text-blue-400 font-bold">₹${item.price * item.qty}</p>
            </div>
        `;
    }).join('');
    document.getElementById('total-price').innerText = "₹" + total;
}

// LAYOUT 3: Final Details & WhatsApp
window.confirmDetails = () => {
    const name = document.getElementById('cust-name').value;
    const trackingID = "ROBO-" + Math.floor(Math.random() * 1000000);
    
    let msg = `🚀 *ROBOCON PRO ORDER*\nID: ${trackingID}\n\n`;
    catalogue.forEach(i => msg += `• ${i.name} [x${i.qty}] - ₹${i.price * i.qty}\n`);
    msg += `\n💰 Total: ${document.getElementById('total-price').innerText}\n`;
    msg += `📍 Address: ${document.getElementById('cust-address').value}\n`;
    
    window.open(`https://wa.me/917977088862?text=${encodeURIComponent(msg)}`, '_blank');
    showTracking(trackingID, name);
};

// LAYOUT 4: Tracking System
function showTracking(id, name) {
    document.getElementById('infoLayout').classList.add('hidden');
    document.getElementById('trackingLayout').classList.remove('hidden');
    
    document.getElementById('tracking-content').innerHTML = `
        <p>Order Status: <span class="text-blue-400 font-bold">Processing</span></p>
        <p>Customer: ${name}</p>
        <p>Tracking ID: <span class="text-white">${id}</span></p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Expected Delivery: 24-48 Hours</p>
    `;
    document.getElementById('delivery-boy').innerHTML = `Delivery Agent: Rahul (Code: 7712) | 📞 9876543210`;
}

// UTILS
window.toggleSidebar = (id) => document.getElementById('catalogueSidebar').classList.toggle('hidden');
window.closeModal = (id) => document.getElementById(id).classList.add('hidden');
window.showLayout = (num) => {
    if(num === 3) document.getElementById('infoLayout').classList.remove('hidden');
};

init();
