const params = new URLSearchParams(window.location.search);
const customerName = params.get("name") || "";
const destination = params.get("location") || "Your Doorstep";


if (customerName) {
  document.getElementById("user-greeting").textContent = `Thank You, ${customerName}!`;
}


document.getElementById("dest-location").textContent = destination;


const randomToken = Math.floor(1000 + Math.random() * 9000);
document.getElementById("order-token").textContent = `#DD-${randomToken}`;


let eta = Math.floor(Math.random() * (35 - 20 + 1)) + 20; // 20 to 35 mins
const destLower = destination.toLowerCase();

if (destLower.includes("near")) eta = 15;
if (destLower.includes("far")) eta = 40;

document.getElementById("arrival-msg").textContent = 
  `Freshly baked & arriving at your doorstep in ${eta} minutes! 🎉`;


document.getElementById("home-btn").addEventListener("click", () => {
  window.location.href = "home.html";
});


localStorage.removeItem("cart");