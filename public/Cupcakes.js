function updateCupcakePrice(selectElement, basePrice) {
    let selectedValue = selectElement.value;
    let priceElement = selectElement.parentElement.querySelector(".price");

    if (!priceElement) {
        console.error("⚠ Price element not found for:", selectElement);
        return;
    }

    if (selectedValue === "single") {
        priceElement.textContent = "₹" + basePrice;
    } else if (selectedValue === "box") {
        priceElement.textContent = "₹" + (basePrice * 6);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".add-cart-btn").forEach(button => {
        button.addEventListener("click", function() {
            let li = this.closest("li");
            let itemName = li.querySelector("span").textContent;
            let priceText = li.querySelector(".price").textContent;
            let price = parseInt(priceText.replace("₹", ""));

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: itemName, price: price, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(itemName + " added to cart!");
        });
    });

    document.querySelectorAll(".buy-now-btn").forEach(button => {
        button.addEventListener("click", function() {
            let li = this.closest("li");
            let itemName = li.querySelector("span").textContent;
            let priceText = li.querySelector(".price").textContent;
            let price = parseInt(priceText.replace("₹", ""));

            localStorage.removeItem("buyNow")
            localStorage.setItem("buyNow", JSON.stringify({ name: itemName, price: price, quantity: 1 }));

            window.location.href = "payment.html";
        });
    });
});
