// Data for Cart
let cart = {};

// 1. Function to Change Quantity (1 to 50)
function changeQty(id, delta) {
    let qtyElement = document.getElementById('qty-' + id);
    let currentQty = parseInt(qtyElement.innerText);
    let newQty = currentQty + delta;

    if (newQty >= 1 && newQty <= 50) {
        qtyElement.innerText = newQty;
    }
}

// 2. Add to Cart Logic
function addToCart(name, price, id) {
    let qty = parseInt(document.getElementById('qty-' + id).innerText);
    
    // Agar item pehle se hai toh quantity add karein, nahi toh naya banayein
    cart[id] = {
        name: name,
        price: price,
        qty: qty
    };

    updateCartUI();
    alert(name + " added to your Catalogue!");
}

// 3. Update UI (Total and Counts)
function updateCartUI() {
    let total = 0;
    let itemCount = 0;
    let listHTML = "";

    for (let id in cart) {
        let item = cart[id];
        let subtotal = item.price * item.qty;
        total += subtotal;
        itemCount += item.qty;

        // Catalogue Modal mein list dikhane ke liye HTML
        listHTML += `
            <div class="flex justify-between items-center bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700">
                <div>
                    <p class="font-bold text-white">${item.name}</p>
                    <p class="text-xs text-blue-400">₹${item.price} x ${item.qty}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-emerald-400">₹${subtotal}</p>
                    <button onclick="removeFromCart('${id}')" class="text-[10px] text-red-400 underline">Remove</button>
                </div>
            </div>
        `;
    }

    document.getElementById('modal-total').innerText = "₹" + total;
    document.getElementById('cart-items-list').innerHTML = listHTML || "<p class='text-gray-500'>Catalogue is empty</p>";
}

// 4. Remove Item
function removeFromCart(id) {
    delete cart[id];
    updateCartUI();
}

// 5. Open/Close Modal
function openCart() { document.getElementById('cartModal').style.display = 'flex'; }
function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

// 6. Professional WhatsApp Order
function sendOrder() {
    if (Object.keys(cart).length === 0) return alert("Catalogue is empty!");

    let message = "📦 *OFFICIAL TECH ORDER* 📦\n";
    message += "--------------------------------\n";
    
    let grandTotal = 0;
    for (let id in cart) {
        let item = cart[id];
        let subtotal = item.price * item.qty;
        grandTotal += subtotal;
        message += `✅ *${item.name}*\n   Qty: ${item.qty} | Price: ₹${subtotal}\n`;
    }

    message += "--------------------------------\n";
    message += `💰 *GRAND TOTAL: ₹${grandTotal}*\n`;
    message += "--------------------------------\n";
    message += "📍 *Delivery Details:* \nName: \nAddress: \nContact: \n";
    
    const myNumber = "911234567890"; // CHANGE TO YOUR NUMBER
    window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
