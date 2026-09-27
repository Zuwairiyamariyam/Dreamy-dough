function updatePriceDonut(select, prices) {
    let selectedSize = select.value;
    let priceSpan = select.parentElement.querySelector('.price');
    priceSpan.textContent = "₹" + prices[selectedSize];
}

document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".cake-box li");

    items.forEach(item => {
        const name = item.querySelector("span").textContent;
        const addBtn = item.querySelector(".item-buttons button:first-child");
        const buyBtn = item.querySelector(".item-buttons button:last-child");

        addBtn.addEventListener("click", () => {
            const priceText = item.querySelector(".price").textContent;
            const price = parseInt(priceText.replace("₹", ""));

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: name, price: price, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(name + " added to cart!");  
        });

        buyBtn.addEventListener("click", () => {
            const priceText = item.querySelector(".price").textContent;
            const price = parseInt(priceText.replace("₹", ""));

            localStorage.setItem("buyNow", JSON.stringify({ name: name, price: price, quantity: 1 }));

            window.location.href = "payment.html";  
        });
    });
});

