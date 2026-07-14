// ===============================
// Ummer Bakery 3D Final V2 JS
// ===============================


// 3D Product Card Effect

const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e)=>{

        if(window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 20;
        const rotateX = (rect.height / 2 - y) / 20;

        card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    });


    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

});


// Reviews Popup

function showReviews(){

    const box = document.getElementById("reviewPopup");

    if(box.style.display === "block"){

        box.style.display = "none";

    }else{

        box.style.display = "block";

    }

}


// Scroll Top Button

window.onscroll = function(){

    const btn = document.getElementById("topBtn");

    if(document.documentElement.scrollTop > 300){

        btn.style.display = "block";

    }else{

        btn.style.display = "none";

    }

};


function topFunction(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}



// Search Products

function searchProducts(){

    const input =
    document.getElementById("searchInput").value.toLowerCase();


    const cards =
    document.querySelectorAll(".product-card");


    cards.forEach(card=>{

        const text = card.innerText.toLowerCase();


        if(text.includes(input)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}



// Cart System

let cart = [];


function addToCart(product){

    cart.push(product);

    document.getElementById("cartCount").innerText =
    cart.length;

    showMessage("✅ Added to Cart");

}



// Message Popup

function showMessage(text){

    let msg = document.createElement("div");

    msg.innerText = text;

    msg.style.position="fixed";
    msg.style.bottom="30px";
    msg.style.left="50%";
    msg.style.transform="translateX(-50%)";
    msg.style.background="#ff9800";
    msg.style.color="white";
    msg.style.padding="15px 25px";
    msg.style.borderRadius="30px";
    msg.style.zIndex="9999";
    msg.style.fontWeight="bold";


    document.body.appendChild(msg);


    setTimeout(()=>{

        msg.remove();

    },2500);

}



// WhatsApp Checkout

function checkoutCart(){

    if(cart.length === 0){

        showMessage("🛒 Cart is empty");

        return;

    }


    let phone="923059642006";


    let message =
    "🍞 Ummer Bakery Order\n\n";


    cart.forEach((item,index)=>{

        message +=
        (index+1)+". "+item+"\n";

    });


    window.open(
        "https://wa.me/"+phone+"?text="+encodeURIComponent(message),
        "_blank"
    );

}


console.log("Ummer Bakery JS Loaded");
