function updatePrice(select, basePrice) {
    const qty = parseInt(select.value) || 1;
    const itemElement = select.closest("li") || select.closest(".cake-row") || select.closest("tr");
    if (!itemElement) return;
    const priceElement = itemElement.querySelector(".price");
    if (priceElement) {
        priceElement.textContent = `₹${basePrice * qty}`;
    }
}

function addToCart(button) {
    const itemElement = button.closest("li") || button.closest(".cake-row") || button.closest("tr") || button.parentElement.parentElement;
    if (!itemElement) return;

    // Cake Name
    const nameElement = itemElement.querySelector("span") || itemElement.querySelector(".cake-name") || itemElement.children[0];
    const name = nameElement ? nameElement.textContent.trim() : "Delicious Cake";

    // Quantity (Custom hidden input or fallback select tag)
    const qtyInput = itemElement.querySelector(".cake-qty-input");
    const selectElement = itemElement.querySelector("select");
    const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : (selectElement ? (parseInt(selectElement.value, 10) || 1) : 1);

    // Price
    const priceElement = itemElement.querySelector(".price");
    let price = 400;
    if (priceElement) {
        const priceClean = priceElement.textContent.replace(/[^0-9]/g, "");
        price = parseInt(priceClean, 10) || 400;
    }

    const item = { name, quantity: qty, price };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cart badge update
    const badge = document.getElementById("cart-count") || document.querySelector("header sup") || document.querySelector(".cart-count");
    if (badge) {
        const count = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
        badge.textContent = count;
    }

    alert(`${name} (${qty} Kg) added to cart!`);
}

function buyNow(button) {
    const itemElement = button.closest("li") || button.closest(".cake-row") || button.closest("tr") || button.parentElement.parentElement;
    if (!itemElement) return;

    const nameElement = itemElement.querySelector("span") || itemElement.querySelector(".cake-name") || itemElement.children[0];
    const name = nameElement ? nameElement.textContent.trim() : "Delicious Cake";

    const qtyInput = itemElement.querySelector(".cake-qty-input");
    const selectElement = itemElement.querySelector("select");
    const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : (selectElement ? (parseInt(selectElement.value, 10) || 1) : 1);

    const priceElement = itemElement.querySelector(".price");
    let price = 400;
    if (priceElement) {
        const priceClean = priceElement.textContent.replace(/[^0-9]/g, "");
        price = parseInt(priceClean, 10) || 400;
    }

    const item = { name, quantity: qty, price };
    localStorage.setItem("cart", JSON.stringify([item]));

    window.location.href = "payment.html";
}

window.addEventListener("DOMContentLoaded", () => {
    // Buttons attach
    document.querySelectorAll(".item-buttons button:first-child")
        .forEach(btn => btn.addEventListener("click", () => addToCart(btn)));

    document.querySelectorAll(".item-buttons button:last-child")
        .forEach(btn => btn.addEventListener("click", () => buyNow(btn)));

    // Initial cart badge count check
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const badge = document.getElementById("cart-count") || document.querySelector("header sup") || document.querySelector(".cart-count");
    if (badge) {
        const count = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
        badge.textContent = count;
    }
});