function updatePrice(selectElement, basePrice) {
    let selectedValue = parseInt(selectElement.value);
    let priceElement = selectElement.parentElement.querySelector(".price");

    if (!priceElement) {
        console.error("⚠ Price element not found for:", selectElement);
        return;
    }

    if (isNaN(selectedValue)) {
        priceElement.textContent = "₹" + basePrice;
        return;
    }

    let totalPrice = basePrice * selectedValue;
    priceElement.textContent = "₹" + totalPrice;
}

function addToCart(name, price, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = cart.findIndex(item => item.name === name);

    if (index > -1) {
        cart[index].quantity += quantity;
        cart[index].price = price; 
    } else {
        cart.push({ name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".cake-box li");

    items.forEach(item => {
        const name = item.querySelector("span").textContent;
        const priceElement = item.querySelector(".price");
        const qtySelect = item.querySelector("select");
        const [addBtn, buyBtn] = item.querySelectorAll(".item-buttons button");

        addBtn.addEventListener("click", () => {
            const price = parseInt(priceElement.textContent.replace("₹", ""));
            const quantity = parseInt(qtySelect.value);
            addToCart(name, price, quantity);
        });

        buyBtn.addEventListener("click", () => {
            const price = parseInt(priceElement.textContent.replace("₹", ""));
            const quantity = parseInt(qtySelect.value);
            localStorage.setItem("buyNow", JSON.stringify({ name, price, quantity }));
            window.location.href = "payment.html";
        });
    });
});
