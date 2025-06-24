// Load cart items from localStorage if available; otherwise, start with an empty array
let products = []
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Get HTML elements for products, cart display, total, and buttons
const productList = document.getElementById("product-list");
const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout-btn");

// Fetch Products from JSON File 
fetch("db.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts();
  })
 .catch(error => console.error("Failed to load products:", error));


// Render all products cards
function renderProducts() {
    productList.innerHTML = "";
    products.forEach (product => {
        const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
        <img src = "${product.image}" alt = "${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart </button>
        `;
        productList.appendChild(div);
});
}

// Add to Cart 
function addToCart (productId) {
    const product =products.find(p => p.id === productId);
    const existing =cartItems.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    }else {
        cartItems.push({...product, quantity: 1});
    }

    saveCart();
    renderCart();
}

// Render all cart items in the DOM
function renderCart(){
    cartContainer.innerHTML = "";

    cartItems.forEach(item => {
        const cartItem = CartItem(item, updateQuantity, removeFromCart);
        cartContainer.appendChild(cartItem);
    });
    updateTotal();
}

// Render a single Cart Item 
function CartItem(item, updateQuantity, removeFromCart){
    const div = document.createElement("div");
    div.className = "cart-item";
    div.setAttribute("data-id", item.id);

    div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>$${item.price}</p>
    <input type="number" min="1" value="${item.quantity}" class="quantity-input">
    <button class="remove-btn">Remove</button>    
    `;

    div.querySelector(".quantity-input").addEventListener("change", (e) => {
        updateQuantity(item.id, parseInt(e.target.value));
    });

    div.querySelector(".remove-btn").addEventListener("click", () => {
    removeFromCart(item.id);
 });

  return div;
}

// Update Quantity
function updateQuantity(id, newQuantity) {
  const item = cartItems.find(i => i.id === id);
  if (item && newQuantity >= 1) {
    item.quantity = newQuantity;
    saveCart();
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

// Calc total based on cart items
function updateTotal() {
  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

  // Clear Cart
  clearCartBtn.addEventListener("click", () => {
  cartItems = [];
  saveCart();
  renderCart();
});

// Checkout
checkoutBtn.addEventListener("click", () => {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    alert("Please log in before checking out.");
    window.location.href = "login.html";
    return;
  }
    if (cartItems.length === 0){
        alert ("Your cart is empty!");
        return;
    }

    //Checkout summary
let summary = "🧾 Checkout Summary:\n\n";
  cartItems.forEach(item => {
    summary += `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  summary += `\nTotal: $${total.toFixed(2)}\n\n`;
  summary += "Proceeding to payment...";

  alert(summary);

  // 🔘 Get selected payment method
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;

  if (selectedMethod === "mpesa") {
    const phone = prompt("📱 Enter your M-Pesa phone number (e.g. 07XXXXXXXX):");
    if (!phone || !/^07\d{8}$/.test(phone)) {
      alert("❌ Invalid phone number. Payment cancelled.");
      return;
    }
    alert("✅ STK Push sent to " + phone + ". Please enter your PIN...");
  } else if (selectedMethod === "card") {
    const card = prompt("💳 Enter your credit/debit card number:");
    if (!card || !/^\d{12,19}$/.test(card)) {
      alert("❌ Invalid card number. Payment cancelled.");
      return;
    }
    alert("✅ Payment successful using card!");
  } else if (selectedMethod === "paypal") {
    const email = prompt("📧 Enter your PayPal email:");
    if (!email || !email.includes("@")) {
      alert("❌ Invalid PayPal email. Payment cancelled.");
      return;
    }
    alert("✅ Payment successful via PayPal!");
  } else {
    alert("❌ No payment method selected.");
    return;
  }

  // Simulate payment delay
  setTimeout(() => {
    alert("🎉 Payment confirmed and is successful ✅!");


//Save to order history
  const order ={
    items: [...cartItems],
    total: total.toFixed(2),
    timestamp: new Date().toLocaleString()
  };

  saveOrderHistory(order);

  cartItems = [];
  saveCart ();
  renderCart ();
  renderOrderHistory();

}, 2000);
});
 

  //logout button if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const logoutBtn = document.getElementById("logout-btn");
  const welcomeUser = document.getElementById("welcome-user");

  if (currentUser) {
    logoutBtn.style.display = "inline-block";
    welcomeUser.textContent = `Welcome, ${currentUser.username}`;
  } else {
  logoutBtn.style.display = "none";
  welcomeUser.textContent = "";
  }

  // Logout event
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });

 //Save order history to localStorage
function saveOrderHistory(order) {
  const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
  history.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(history));
}

 // Save cart to Local Storage
function saveCart(){
  localStorage.setItem("cartItems" , JSON.stringify(cartItems));
}

//Render order History
function renderOrderHistory() {
  const historyContainer = document.getElementById("order-history");
  const history = JSON.parse(localStorage.getItem("orderHistory")) || [];

  historyContainer.innerHTML = "<h3>Order History</h3>";

  if (history.length === 0) {
    historyContainer.innerHTML += "<p>No past orders.</p>";
    return;
  }

  history.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "order";
    div.innerHTML = `
      <p><strong>Order #${index + 1}</strong> - ${order.timestamp} - Total: $${order.total}</p>
      <ul>
        ${order.items.map(item => `
          <li class="order-item" data-id="${item.id}">
            ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
            <button class="reorder-btn" data-id="${item.id}">Order Again</button>
          </li>
        `).join("")}
      </ul>
    `;
    historyContainer.appendChild(div);
  });

  // event listeners for rendering
  const reorderButtons = document.querySelectorAll(".reorder-btn");
  reorderButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      addToCart(id);
      alert("Item added back to cart!");
    });
  });
}

//Re-oder Item from order history
document.querySelectorAll(".reorder-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      addToCart(id);
      alert("Item added back to cart!");
    });
  });

// Get the clear history button
const clearHistoryBtn = document.getElementById("clear-history");

// Clear order history from localStorage 
clearHistoryBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete your entire order history?")) {
    localStorage.removeItem("orderHistory");
    renderOrderHistory(); 
    alert("Order history has been cleared.");
  }
});

// Render products after fetch
renderCart();



