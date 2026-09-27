function getImageForItem(name) {
  if (!name) return "images/Cupcakes.jpg";
  const str = name.toLowerCase().trim();

  // Brownies
  if (str.includes("brownie")) return "images/Fudgybrownies.jpg";
  // Donuts
  if (str.includes("donut")) return "images/Donuts.jpg";
  // Cookies
  if (str.includes("cookie") || str.includes("classic") || str.includes("pistachio") || str.includes("kitkat") || str.includes("caramel")) {
    return "images/Cookies.jpg";
  }
  // Macarons
  if (str.includes("macaron")) return "images/Macarons.jpg";
  // Swiss rolls
  if (str.includes("swiss") || str.includes("roll")) return "images/Swissroll.jpg";
  // Waffles
  if (str.includes("waffle")) return "images/Waffles.jpg";
  // Arrivals
  if (str.includes("strawberry")) return "images/Strawberrydelight.jpg";
  // Creamy Cakes
  if (str.includes("cake") || str.includes("lava") || str.includes("velvet") || str.includes("cheese")) {
    return "images/Creamycakes.jpg";
  }
  // Default Cupcakes
  return "images/Cupcakes.jpg";
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const layout = document.getElementById("cart-layout");
  const emptyState = document.getElementById("empty-cart");
  const itemsContainer = document.getElementById("cart-items-list");
  const badgeCount = document.getElementById("badge-count");
  const grandTotalDisplay = document.getElementById("cart-grand-total");

  if (cart.length === 0) {
    layout.style.display = "none";
    emptyState.style.display = "block";
    badgeCount.textContent = "0";
    return;
  }

  layout.style.display = "block";
  emptyState.style.display = "none";
  itemsContainer.innerHTML = "";

  let totalAmount = 0;
  let totalItemsCount = 0;

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const unitPrice = item.unitPrice || Math.round(item.price / quantity);
    const itemSubtotal = unitPrice * quantity;
    
    totalAmount += itemSubtotal;
    totalItemsCount += quantity;

    const imgSrc = item.img || getImageForItem(item.name);

    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div class="item-info">
        <img src="${imgSrc}" alt="${item.name}" class="item-thumb" onerror="this.src='images/Cupcakes.jpg'">
        <div>
          <div class="item-name">${item.name}</div>
          <div class="item-type"><i class="fa-solid fa-leaf"></i> Freshly Baked</div>
        </div>
      </div>

      <div class="qty-control">
        <button class="qty-btn" onclick="updateQuantity(${index}, -1)" title="Decrease">-</button>
        <span class="qty-display">${quantity}</span>
        <button class="qty-btn" onclick="updateQuantity(${index}, 1)" title="Increase">+</button>
      </div>

      <div class="item-price">₹${unitPrice}</div>

      <div class="item-subtotal">₹${itemSubtotal}</div>

      <div>
        <button class="btn-delete" onclick="removeItem(${index})" title="Remove item">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    itemsContainer.appendChild(row);
  });

  if (grandTotalDisplay) {
    grandTotalDisplay.textContent = `₹${totalAmount}`;
  }
  badgeCount.textContent = totalItemsCount;
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;

  const currentQty = cart[index].quantity || 1;
  const unitPrice = cart[index].unitPrice || Math.round(cart[index].price / currentQty);
  
  const newQty = currentQty + change;
  if (newQty <= 0) {
    removeItem(index);
    return;
  }

  cart[index].quantity = newQty;
  cart[index].unitPrice = unitPrice;
  cart[index].price = unitPrice * newQty;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  if (confirm("Are you sure you want to empty your cart?")) {
    localStorage.removeItem("cart");
    renderCart();
  }
}

document.getElementById("proceed-btn").addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty! Please add some items to proceed.");
    return;
  }
  window.location.href = "payment.html";
});

// Render on page load
document.addEventListener("DOMContentLoaded", renderCart);