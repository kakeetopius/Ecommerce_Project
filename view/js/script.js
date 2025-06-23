// ===================== SCRIPT FOR MAISON DELMANCÉ (UPDATED) =====================
import { domElements } from './domElements.js';
import { renderProducts } from './product_rendering.js';

export let allProducts;
let currentProducts;
let activeCategory = "all";

document.addEventListener('DOMContentLoaded', () => {
    async function getProducts() {
	try {
	    let resp = await fetch("/index.php/product/all");
	    let data = await resp.json();
	    return data;
	}
	catch(e) {
	    console.log("Error: ", e);
	}
    }	    
    
    // --- Initial Product Load & Setup ---
    if (domElements.mainLink) domElements.mainLink.classList.add('active-category');
    
    getProducts()
    .then(data => {
	    allProducts = data;
	    currentProducts = [...allProducts];	    
	    renderProducts([...allProducts].sort((a,b) => a.id - b.id)); // Initial sort by ID
	    setUpSearchandFilter();
	})
});

function openOverlay(overlayElement) {
    if (overlayElement) {
	overlayElement.classList.add('active');
	document.body.style.overflow = 'hidden'; 
    } else {
	console.error("Attempted to open a null overlay element.");
    }
}

function closeOverlay(overlayElement) {
    if (overlayElement) {
	overlayElement.classList.remove('active');
	document.body.style.overflow = '';
	// Reset auth panel to initial state when closed
	if (overlayElement === domElements.authOverlay) {
	    domElements.authMessage.classList.add('hidden');
	    domElements.authMessage.textContent = '';
	    domElements.authInitialSection.classList.remove('hidden');
	    domElements.loginFormSection.classList.add('hidden');
	    domElements.signupFormSection.classList.add('hidden');
	    // Optional: clear form fields
	    domElements.loginNameInput.value = ''; domElements.loginSurnameInput.value = ''; domElements.loginPasswordInput.value = '';
	    domElements.signupNameInput.value = ''; domElements.signupSurnameInput.value = ''; domElements.signupPasswordInput.value = '';
	}
    } else {
	console.error("Attempted to close a null overlay element.");
    }
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
	clearTimeout(timeout);
	timeout = setTimeout(() => func.apply(this, args), delay);
    };
}


export function applyActiveFilters() {
    let productsToFilter = [...allProducts]; 

    // 1. Category Filter (based on `activeCategory` state)
    if (activeCategory && activeCategory !== 'all') {
	if (activeCategory === 'men') {
	    productsToFilter = productsToFilter.filter(p => p.gender === "M");
	}
	else if (activeCategory === 'women') {
	    productsToFilter = productsToFilter.filter(p => p.gender === "F");
	}
	else if (activeCategory === 'kids') {
	    productsToFilter = productsToFilter.filter(p => p.age_group === "kids");
	}
	else if (activeCategory === "kids-boy") {
	    productsToFilter = productsToFilter.filter(p => p.age_group==="kids"&&p.gender==='M');
	}
	else if (activeCategory === "kids-girl") {
	    productsToFilter = productsToFilter.filter(p => p.age_group==="kids"&&p.gender==='F');
	}
    }
    
    // 2. Season Filter
    const selectedSeasons = Array.from(domElements.seasonCheckboxes)
	.filter(checkbox => checkbox.checked)
	.map(checkbox => checkbox.value);

    if (selectedSeasons.length > 0) {
	productsToFilter = productsToFilter.filter(product => 
	    selectedSeasons.includes(product.season) || product.season === null
	);
    }

    // 3. Price Sort
    const selectedPriceSort = document.querySelector('input[name="price-sort"]:checked').value;
    if (selectedPriceSort === 'asc') {
	productsToFilter.sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === 'desc') {
	productsToFilter.sort((a, b) => b.price - a.price);
    }
    
    // 4. Season Display Order (if seasons selected)
    if (selectedSeasons.length > 0) {
	 const seasonOrder = { summer: 1, fall: 2, winter: 3, spring: 4, all: 5 };
	 productsToFilter.sort((a, b) => {
	    const aOrder = seasonOrder[a.season] || 99; 
	    const bOrder = seasonOrder[b.season] || 99;
	    if (selectedSeasons.includes(a.season) && selectedSeasons.includes(b.season)) {
		return aOrder - bOrder;
	    }
	    if (selectedSeasons.includes(a.season) && b.season === 'all') return -1;
	    if (a.season === 'all' && selectedSeasons.includes(b.season)) return 1;
	    if (selectedSeasons.includes(a.season) && !selectedSeasons.includes(b.season)) return -1;
	    if (!selectedSeasons.includes(a.season) && selectedSeasons.includes(b.season)) return 1;
	    return aOrder - bOrder; 
	});
    }
    
    currentProducts = productsToFilter;
    renderProducts(currentProducts);
    if (domElements.filterOverlay.classList.contains('active')) { 
	closeOverlay(domElements.filterOverlay);
    }
}

// --- Category Navigation & "Main" Button Logic ---

function updateActiveCategoryLink(clickedLink) {
    domElements.categoryLinks.forEach(l => l.classList.remove('active-category'));
    if (clickedLink) {
	clickedLink.classList.add('active-category');
    } else if (domElements.mainLink) { 
	domElements.mainLink.classList.add('active-category');
    }
}

//-----------Adding event handlers for different elements for searching and filtering-------------
export function setUpSearchandFilter() {
    
    if (domElements.hamburgerMenu && domElements.filterOverlay && domElements.closeFilterBtn) {
	domElements.hamburgerMenu.addEventListener('click', () => openOverlay(domElements.filterOverlay));
	domElements.closeFilterBtn.addEventListener('click', () => closeOverlay(domElements.filterOverlay));
	domElements.filterOverlay.addEventListener('click', (event) => { // Close on backdrop click
	    if (event.target === domElements.filterOverlay) {
		closeOverlay(domElements.filterOverlay);
	    }
	});
    } else {
	console.error("Filter UI elements not found. Check IDs in HTML.");
    }


    if (domElements.applyFiltersBtn) {
	domElements.applyFiltersBtn.addEventListener('click', applyActiveFilters);
    }
    if (domElements.clearFiltersBtn) {
	domElements.clearFiltersBtn.addEventListener('click', () => {
	    domElements.seasonCheckboxes.forEach(checkbox => checkbox.checked = false);
	    domElements.priceSortRadios.forEach(radio => radio.checked = (radio.value === 'default'));
	    applyActiveFilters(); 
	});
    }


    if (domElements.searchIcon && domElements.searchOverlay && domElements.closeSearchBtn && domElements.searchInput) {
	domElements.searchIcon.addEventListener('click', () => {
	    openOverlay(domElements.searchOverlay);
	    domElements.searchInput.focus();
	});
	domElements.closeSearchBtn.addEventListener('click', () => {
	    closeOverlay(domElements.searchOverlay);
	    domElements.searchInput.value = '';
	    domElements.searchSuggestions.innerHTML = '';
	    domElements.noResultsMessage.classList.add('hidden');
	    applyActiveFilters(); // Show products based on current category/filters
	});
	domElements.searchOverlay.addEventListener('click', (event) => { // Close on backdrop click
	    if (event.target === domElements.searchOverlay) {
		closeOverlay(domElements.searchOverlay);
		applyActiveFilters(); // Show products based on current category/filters
	    }
	});

	domElements.searchInput.addEventListener('input', debounce(() => {
	    const searchTerm = domElements.searchInput.value.toLowerCase().trim();
	    domElements.searchSuggestions.innerHTML = ''; 
	    domElements.noResultsMessage.classList.add('hidden');

	    if (searchTerm.length === 0) {
		domElements.productCatalog.innerHTML = ''; // Clear main product grid if search is empty
		applyActiveFilters(); // Then render based on category/filters
		return;
	    }

	    const productsToSearch = [...allProducts]; 
	    const matchedProducts = productsToSearch.filter(product =>
		product.name.toLowerCase().includes(searchTerm)
	    );

	    if (matchedProducts.length > 0) {
		// Render suggestions in the #search-suggestions div
		matchedProducts.slice(0, 8).forEach(product => { 
		    const suggestionItem = document.createElement('a');
		    suggestionItem.href = `#product-${product.id}`; 
		    suggestionItem.textContent = product.name;
		    suggestionItem.addEventListener('click', (e) => {
			e.preventDefault();
			renderProducts([product]); // Display only the clicked product
			domElements.searchInput.value = product.name; 
			domElements.searchSuggestions.innerHTML = ''; // Clear suggestions
			domElements.noResultsMessage.classList.add('hidden');
			// Do not close overlay here, user sees the single product
			// If you want to close, uncomment: closeOverlay(domElements.searchOverlay);
		    });
		    domElements.searchSuggestions.appendChild(suggestionItem);
		});
		domElements.productCatalog.innerHTML = ''; // Clear main product grid while suggestions are shown
	    } else {
		domElements.noResultsMessage.classList.remove('hidden');
		domElements.productCatalog.innerHTML = ''; // Clear main product grid
	    }
	}, 300)); 
    } else {
	console.error("Search UI elements not found. Check IDs in HTML.");
    }

    
    //-----Category Links to move between genders: male, female, kids, all.
    domElements.categoryLinks.forEach(link => {
	link.addEventListener('click', (e) => {
	    e.preventDefault();
	    const category = link.dataset.category;
	    activeCategory = category; 
	    updateActiveCategoryLink(link);
	    
	    domElements.seasonCheckboxes.forEach(checkbox => checkbox.checked = false);
	    domElements.priceSortRadios.forEach(radio => radio.checked = (radio.value === 'default'));
	    applyActiveFilters(); 
	    domElements.searchInput.value = ''; 
	    domElements.searchSuggestions.innerHTML = '';
	    domElements.noResultsMessage.classList.add('hidden');
	});
    });

}

