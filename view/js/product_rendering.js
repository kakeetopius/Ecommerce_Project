import { domElements } from "./domElements.js";

export function renderProducts(productsToRender) {
    domElements.productCatalog.innerHTML = ''; 
    if (!productsToRender || productsToRender.length === 0) {
	domElements.productCatalog.innerHTML = '<p class="no-products-found">No products match your current selection.</p>';
	return;
    }

    productsToRender.forEach(product => {
	const productCard = document.createElement('div');
	productCard.className = 'product-card';
	
	const formattedPrice = `Ksh ${product.price.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	
	const cartIconSvg = `
	    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
		<path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6z"></path>
		<line x1="3" y1="6" x2="21" y2="6"></line>
		<path d="M16 10c0-2.21-1.79-4-4-4S8 7.79 8 10"></path>
	    </svg>`;

	productCard.innerHTML = `
	    <img src="${product.image}" alt="${product.name}" loading="lazy">
	    <div class="product-info">
		<div class="product-details">
		    <h3>${product.name}</h3>
		    <p>${formattedPrice}</p>
		</div>
		<button class="add-to-cart-icon" data-product-id="${product.id}" aria-label="Add to cart">
		    ${cartIconSvg}
		</button>
	    </div>
	`;
	domElements.productCatalog.appendChild(productCard);
    });

    // Add event listeners for new cart icons
    document.querySelectorAll('.add-to-cart-icon').forEach(button => {
	button.addEventListener('click', (event) => {
	    const productId = event.currentTarget.dataset.productId;
	    console.log(`Product ${productId} clicked to add to cart (cart logic not implemented here).`);
	    // Placeholder for actual cart functionality
	});
    });
}



