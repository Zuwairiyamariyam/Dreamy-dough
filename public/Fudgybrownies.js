function updatePrice(select, basePrice) {
    const qty = parseInt(select.value);
    const price = Number(basePrice) * qty; 
    const priceSpan = select.parentElement.querySelector(".price");
    priceSpan.textContent = "₹" + price;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cake-box li").forEach(item => {
        const addBtn = item.querySelector(".add-cart-btn");
        const buyBtn = item.querySelector(".buy-now-btn");
        const name = item.querySelector("span").textContent;

        addBtn.addEventListener("click", () => {
            const priceText = item.querySelector(".price").textContent.replace("₹","").trim();
            const select = item.querySelector("select");
            const quantity = parseInt(select.value);

            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name, quantity, price: parseInt(priceText) });  
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        });

        buyBtn.addEventListener("click", () => {
            const priceText = item.querySelector(".price").textContent.replace("₹","").trim();
            const select = item.querySelector("select");
            const quantity = parseInt(select.value);

            const cart = [{ name, quantity, price: parseInt(priceText) }];
            localStorage.setItem("cart", JSON.stringify(cart));

            window.location.href = "payment.html";
        });
    });
});
