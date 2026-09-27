function initCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalDisplay = document.getElementById("payable-total");

  if (cart.length === 0) {
    alert("Your cart is empty! Redirecting to menu...");
    window.location.href = "menu.html";
    return;
  }

  let grandTotal = 0;
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const unitPrice = item.unitPrice || Math.round(item.price / qty);
    grandTotal += unitPrice * qty;
  });

  if (totalDisplay) {
    totalDisplay.textContent = `₹${grandTotal}`;
  }
}

document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!name || !phone || !location) {
    alert("Please fill in your name, phone number, and delivery address!");
    return;
  }
const locationInput = document.getElementById("location");

if (locationInput) {
  locationInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
  });
}

  localStorage.removeItem("cart");

  const encodedLoc = encodeURIComponent(location);
  const encodedName = encodeURIComponent(name);
  
  alert(`Order Placed Successfully, ${name}! 🎉 We are pre-heating the oven.`);
  window.location.href = `orderplaced.html?name=${encodedName}&location=${encodedLoc}`;
});

document.addEventListener("DOMContentLoaded", initCheckout);