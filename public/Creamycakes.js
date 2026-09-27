function updatePrice(select, basePrice) {
    const qty = parseInt(select.value);
    const priceElement = select.closest("li").querySelector(".price");
    priceElement.textContent = `₹${basePrice * qty}`;
}

function addToCart(button) {
    const itemElement = button.closest("li");
    const name = itemElement.querySelector("span").textContent;
    const qty = parseInt(itemElement.querySelector("select").value);
    const priceText = itemElement.querySelector(".price").textContent.replace("₹", "");
    const price = parseInt(priceText);

    const item = { name, quantity: qty, price };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} (${qty} Kg) added to cart!`);
}

function buyNow(button) {
    const itemElement = button.closest("li");
    const name = itemElement.querySelector("span").textContent;
    const qty = parseInt(itemElement.querySelector("select").value);
    const priceText = itemElement.querySelector(".price").textContent.replace("₹", "");
    const price = parseInt(priceText);

    const item = { name, quantity: qty, price };
    localStorage.setItem("cart", JSON.stringify([item]));

    window.location.href = "payment.html";
}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".item-buttons button:first-child")
        .forEach(btn => btn.addEventListener("click", () => addToCart(btn)));

    document.querySelectorAll(".item-buttons button:last-child")
        .forEach(btn => btn.addEventListener("click", () => buyNow(btn)));
});
