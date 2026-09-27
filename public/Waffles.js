function updatePrice(selectElement, basePrice) {
    let selectedValue = parseInt(selectElement.value);
    let priceElement = selectElement.parentElement.querySelector(".price");
    if (!priceElement) return;

    if (isNaN(selectedValue)) {
        priceElement.textContent = "₹" + basePrice;
        return;
    }

    let totalPrice = basePrice * selectedValue;
    priceElement.textContent = "₹" + totalPrice;
}

document.addEventListener("DOMContentLoaded", function () {
    const addButtons = document.querySelectorAll(".item-buttons button:first-child");
    const buyButtons = document.querySelectorAll(".item-buttons button:last-child");

    function addToCart(name, quantity, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name, quantity, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart!");
    }

    addButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const li = button.closest("li");
            const name = li.querySelector("span").textContent;
            const select = li.querySelector("select");
            const quantity = parseInt(select.value);
            const priceText = li.querySelector(".price").textContent.replace("₹", "");
            const price = parseInt(priceText);

            addToCart(name, quantity, price);
        });
    });

    buyButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const li = button.closest("li");
            const name = li.querySelector("span").textContent;
            const select = li.querySelector("select");
            const quantity = parseInt(select.value);
            const priceText = li.querySelector(".price").textContent.replace("₹", "");
            const price = parseInt(priceText);

            localStorage.setItem("cart", JSON.stringify([{ name, quantity, price }]));
            window.location.href = "payment.html";
        });
    });
});
