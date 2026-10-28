function showCategory(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        if (product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}
let cartItems = [];

function addToCart() {
    const button = event.target;
    const productCard = button.closest(".product-card");

    const productName = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector("strong").textContent;
    const productImage = productCard.querySelector("img").src;

    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });

        button.outerHTML = `
            <div class="product-quantity">
                <button onclick="decreaseProductQuantity(this)">−</button>
                <span>1</span>
                <button onclick="increaseProductQuantity(this)">+</button>
            </div>
        `;
    }

    updateCartCount();
    updateCart();
}

function updateCartCount() {
    let count = 0;

    cartItems.forEach(item => {
        count += item.quantity;
    });

    document.querySelector(".cart-btn span").textContent = count;
}

function updateCart() {
    const cartContent = document.querySelector(".cart-content");

    if (cartItems.length === 0) {
        cartContent.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;

    cartContent.innerHTML = "";

    cartItems.forEach((item, index) => {
        const price = Number(item.price.replace(/[₹,]/g, ""));
        total += price * item.quantity;

        cartContent.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>

                    <div class="quantity">
                        <button onclick="decreaseQuantity(${index})">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartContent.innerHTML += `
        <div class="cart-total">
            <strong>Total</strong>
            <strong>₹${total.toLocaleString("en-IN")}</strong>
        </div>

        <button class="checkout-btn" onclick="checkout()">Checkout</button>
    `;
}

function increaseQuantity(index) {
    cartItems[index].quantity++;

    updateCartCount();
    updateCart();
}

function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }

    updateCartCount();
    updateCart();
}

function openCart() {
    document.getElementById("cartPanel").classList.add("active");
    updateCart();
}

function closeCart() {
    document.getElementById("cartPanel").classList.remove("active");
}

function increaseProductQuantity(button) {
    const productCard = button.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;

    const item = cartItems.find(item => item.name === productName);

    item.quantity++;

    button.previousElementSibling.textContent = item.quantity;

    updateCartCount();
    updateCart();
}

function decreaseProductQuantity(button) {
    const productCard = button.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;

    const itemIndex = cartItems.findIndex(item => item.name === productName);
    const item = cartItems[itemIndex];

    if (item.quantity > 1) {
        item.quantity--;

        button.nextElementSibling.textContent = item.quantity;
    } else {
        cartItems.splice(itemIndex, 1);

        const quantityDiv = button.closest(".product-quantity");

        quantityDiv.outerHTML = `
            <button onclick="addToCart()">Add to Cart</button>
        `;
    }

    updateCartCount();
    updateCart();
}

function toggleSearch() {
    const searchBox = document.getElementById("searchBox");

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        document.getElementById("searchInput").focus();
    }
}

function searchProducts() {
    const search = document.getElementById("searchInput").value
        .toLowerCase()
        .trim();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        const description = product.querySelector("p").textContent.toLowerCase();

        const match =
            search === "" ||
            name.includes(search) ||
            description.includes(search);

        product.style.display = "";
        product.hidden = !match;
    });

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("searchBox").classList.remove("active");
}

function showCategory(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        product.style.display = "";
        product.hidden = product.dataset.category !== category;
    });

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

function showAllProducts() {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        product.style.display = "";
        product.hidden = false;
    });

    document.getElementById("searchInput").value = "";
}   
function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Thank you for shopping with ShopEase!");

    cartItems = [];

    updateCartCount();
    updateCart();

    document.querySelectorAll(".product-quantity").forEach(quantityDiv => {
        quantityDiv.outerHTML = `
            <button onclick="addToCart()">Add to Cart</button>
        `;
    });
}
function showAllProducts() {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        product.style.display = "";
        product.hidden = false;
    });

    document.getElementById("searchInput").value = "";
}