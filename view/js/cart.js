import { domElements} from "./domElements.js";
import { setUpAuth} from "./auth.js";
import { addToCart } from "./product_rendering.js";

let products = []

// Get HTML elements for products, cart display, total, and buttons
const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout-btn");

document.addEventListener('DOMContentLoaded', async () => {
    await getCartContent();
    renderCart();
    setUpAuth();
    setUpCartButtons();
})

function setUpCartButtons() {
    clearCartBtn.addEventListener('click', clearCart);
}
async function getCartContent() {
    try {
        const response = await fetch("/index.php/cart/get");
        const data = await response.json();
        
        if (!data.success) return;
        
        const user_cart = data.cart;

        for (const product of user_cart) {
            await getProduct(product.pdt_id, product.qty);
        }
    } catch (e) {
        console.log("Error:", e);
    }
}

async function getProduct(pdt_id, qty) {
    try {
	const resp = await fetch(`/index.php/product/item/${pdt_id}`);
	const data = await resp.json();

	if(data.success) {
	    products.push({"id":data.id, "name":data.name, "price":data.price, "image":data.image, "quantity":qty});
	}
    }
    catch(e) {
	console.log("Error: ", e);
    }
}

// Render all cart items in the DOM
function renderCart(){
    cartContainer.innerHTML = "";
    console.log("Rendering Cart");
    console.log([...products]);
    console.log("Number of products:", products.length);
    
    products.forEach(pdt => {
	try {
	    const cartItem = CartItem(pdt);
	    cartContainer.appendChild(cartItem);
	}
	catch(e) {
	    console.log("Error: ", e)
	}
    });

    updateTotal();

}

// Add to Cart 
// Render a single Cart Item 
function CartItem(item){
    const div = document.createElement("div");
    div.className = "cart-item";
    div.setAttribute("data-id", item.id);

    div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>$${item.price}</p>
    <input type="number" min="1" value="${item.quantity}" class="quantity-input">
    <button class="remove-btn cartButton">Remove</button>    
    `;

    div.querySelector(".quantity-input").addEventListener("change", (e) => {
        updateQuantity(item.id, parseInt(e.target.value));
    });


    div.querySelector(".remove-btn").addEventListener("click", () => {
    removeFromCart(item.id);
 });
  return div;
}

async function updateQuantity(id, newQty) {
    const item = products.find(item => item.id === id);

    if (item && newQty >=1) {
	await addToCart(id, 'cart', newQty);
	updateTotal();
    }
}

async function removeFromCart(id) {
    const response = await fetch("/index.php/cart/remove", {
    method: "POST",
    headers: {
	"Accept": "application/json",
	"Content-Type": "application/json",
    },
    body: JSON.stringify(
	{
	    "product_id" : id,
	}
    )
    });
    const data = await response.json();

    if (data.success) {
	 // Remove the DOM element
	const itemElement = document.querySelector(`.cart-item[data-id="${id}"]`);
	if (itemElement) {
	    itemElement.remove(); // removes the element from DOM
	}

	// Remove from the products array 
	products = products.filter(item => item.id !== id);

        updateTotal();
    }

}

async function clearCart() {
    for(const pdt of products) {
	await removeFromCart(pdt.id);
    }
}

async function updateTotal() {
    const resp = await fetch("/index.php/cart/total")
    const data = await resp.json()

    if(data.success) {
	cartTotal.textContent = `Total: $${data.total.toFixed(2)}`;
    }
}
