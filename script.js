// ===============================
// Professional Cart System V3
// ===============================

let cart = [];

try {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

}
catch(error){

    cart = [];

}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {

    let item = cart.find(p => p.name === product.name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    showMessage("✅ Added to Cart");
}

function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}

function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

    showMessage("❌ Item Removed");
}

function clearCart() {

    cart = [];

    saveCart();

    updateCart();

    showMessage("🗑 Cart Cleared");
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
        "<p class='empty-cart'>Your cart is empty.</p>";

        cartCount.innerText = "0";
        cartTotal.innerText = "Total: Rs. 0";

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

            <div>
                <strong>${item.name}</strong><br>
                Rs. ${item.price} × ${item.quantity}
            </div>

            <div>

                <button onclick="decreaseQty(${index})">−</button>

                <button onclick="increaseQty(${index})">+</button>

                <button onclick="removeFromCart(${index})">❌</button>

            </div>

        </div>
        `;

    });

    cartCount.innerText = count;
    cartTotal.innerText = "Total: Rs. " + total;

}

function checkoutCart() {

    if (cart.length === 0) {

        showMessage("🛒 Cart is Empty");

        return;

    }

    let phone = "923059642006";

    let message = "🍞 Ummer Bakery Order\n\n";

    let total = 0;

    cart.forEach((item, i) => {

        total += item.price * item.quantity;

        message +=
`${i+1}. ${item.name}
Qty: ${item.quantity}
Price: Rs. ${item.price * item.quantity}

`;

    });

    message += "---------------------\n";
    message += "Grand Total: Rs. " + total;

    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message),
        "_blank"
    );

}

window.addEventListener("DOMContentLoaded",()=>{

    updateCart();

});

// ===============================
// V4 Premium Effects
// ===============================

// Toast Message
function showMessage(text){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = text;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add("show");
    },100);

    setTimeout(()=>{
        toast.classList.remove("show");

        setTimeout(()=>{
            toast.remove();
        },400);

    },2000);

}


// Product Search
function searchProducts(){

    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card=>{

        let text = card.innerText.toLowerCase();

        if(text.includes(input)){

    card.style.display="flex";

}else{

    card.style.display="none";

}

    });

}


// Reviews Popup
function showReviews(){

    const popup = document.getElementById("reviewPopup");

    if(popup.style.display === "block"){

        popup.style.display = "none";

    }else{

        popup.style.display = "block";

        window.scrollTo({

            top: popup.offsetTop - 100,

            behavior:"smooth"

        });

    }

}


// Scroll To Top
const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});


function topFunction(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


// Premium 3D Mouse Effect
window.addEventListener("DOMContentLoaded", () => {

    if(window.innerWidth > 768){

        document.querySelectorAll(".product-card").forEach(card => {

            card.addEventListener("mousemove", (e) => {

                let rect = card.getBoundingClientRect();

                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                let rotateY = (x - rect.width / 2) / 12;
                let rotateX = -(y - rect.height / 2) / 12;

                card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }

});
