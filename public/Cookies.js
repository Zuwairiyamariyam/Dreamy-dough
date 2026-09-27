function updatePrice(selectElement, priceObj) {
    let selectedValue = selectElement.value;
    let priceElement = selectElement.parentElement.querySelector(".price");
    if (!priceElement) return;

    priceElement.textContent = "₹" + priceObj[selectedValue];
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = cart.findIndex(item => item.name === name);

    if (index > -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".cake-box li");

    items.forEach(item => {
        const name = item.querySelector("span").textContent;
        const priceElement = item.querySelector(".price");

        item.querySelector(".add-cart-btn").addEventListener("click", () => {
            const price = parseInt(priceElement.textContent.replace("₹", ""));
            addToCart(name, price);
        });

        item.querySelector(".buy-now-btn").addEventListener("click", () => {
            const price = parseInt(priceElement.textContent.replace("₹", ""));
            localStorage.setItem("buyNow", JSON.stringify({ name, price, quantity: 1 }));
            window.location.href = "payment.html";
        });
    });
});
