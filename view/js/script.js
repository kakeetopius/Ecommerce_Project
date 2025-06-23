// ===================== SCRIPT FOR MAISON DELMANCÉ (UPDATED) =====================

document.addEventListener('DOMContentLoaded', () => {
    // --- Product Data Get Product if asynchronously from server(/index.php/product/all) ---
    const allProducts = [
        { id: 1, name: 'Silk Blend Blouse', price: 45000.00, image: 'images/product1.webp', category: 'women', season: 'spring' },
        { id: 2, name: 'Cashmere Knit Sweater', price: 68000.00, image: 'images/product2.webp', category: 'women', season: 'winter' },
        { id: 3, name: 'Tailored Wool Trousers', price: 52000.00, image: 'images/product3.webp', category: 'men', season: 'fall' },
        { id: 4, name: 'Linen Summer Shirt', price: 32000.00, image: 'images/product4.webp', category: 'men', season: 'summer' },
        { id: 5, name: 'Organic Cotton Tee - Boy', price: 9500.00, image: 'images/product5.webp', category: 'kids-boy', season: 'summer' },
        { id: 6, name: 'Denim Jacket - Girl', price: 15000.00, image: 'images/product6.webp', category: 'kids-girl', season: 'spring' },
        { id: 7, name: 'Pleated Midi Skirt', price: 49000.00, image: 'images/product7.webp', category: 'women', season: 'fall' },
        { id: 8, name: 'Leather Ankle Boots', price: 75000.00, image: 'images/product8.webp', category: 'women', season: 'winter' },
        { id: 9, name: 'Classic Trench Coat', price: 98000.00, image: 'images/product9.webp', category: 'men', season: 'spring' },
        { id: 10, name: 'Swim Shorts', price: 18000.00, image: 'images/product10.webp', category: 'men', season: 'summer' },
        { id: 11, name: 'Knitted Cardigan - Boy', price: 12000.00, image: 'images/product11.webp', category: 'kids-boy', season: 'fall' },
        { id: 12, name: 'Floral Print Dress - Girl', price: 17000.00, image: 'images/product12.webp', category: 'kids-girl', season: 'summer' },
        { id: 13, name: 'Slim Fit Chinos', price: 35000.00, image: 'images/product13.webp', category: 'men', season: 'spring' },
        { id: 14, name: 'Wool Scarf', price: 22000.00, image: 'images/product14.webp', category: 'women', season: 'winter' },
        { id: 15, name: 'Polo Shirt', price: 28000.00, image: 'images/product15.webp', category: 'men', season: 'summer' },
        { id: 16, name: 'Raincoat - Kids', price: 19000.00, image: 'images/product16.webp', category: 'kids', season: 'fall' },
        { id: 17, name: 'V-Neck Pullover', price: 42000.00, image: 'images/product17.webp', category: 'men', season: 'winter' },
        { id: 18, name: 'Satin Camisole Top', price: 29000.00, image: 'images/product18.webp', category: 'women', season: 'summer' },
        { id: 19, name: 'Corduroy Trousers - Boy', price: 11000.00, image: 'images/product19.webp', category: 'kids-boy', season: 'winter' },
        { id: 20, name: 'Tulle Skirt - Girl', price: 13000.00, image: 'images/product20.webp', category: 'kids-girl', season: 'spring' },
        { id: 21, name: 'Leather Belt', price: 19000.00, image: 'images/product21.webp', category: 'men', season: 'all' },
        { id: 22, name: 'Silk Scarf Print', price: 25000.00, image: 'images/product22.webp', category: 'women', season: 'all' },
        { id: 23, name: 'Basic Joggers - Kids', price: 10000.00, image: 'images/product23.webp', category: 'kids', season: 'all' },
        { id: 24, name: 'Sunglasses Aviator', price: 31000.00, image: 'images/product24.webp', category: 'unisex', season: 'summer' },
    ];

    let currentProducts = [...allProducts];
    let activeCategory = 'all'; 

    // --- DOM Elements ---
    const productCatalog = document.getElementById('product-catalog');
    
    // Filter Elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const filterOverlay = document.getElementById('filter-overlay');
    const closeFilterBtn = document.getElementById('close-filter-btn');
    const seasonCheckboxes = document.querySelectorAll('input[name="season"]');
    const priceSortRadios = document.querySelectorAll('input[name="price-sort"]');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');

    // Search Elements
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const noResultsMessage = document.getElementById('no-results-message');

    // Category Navigation Elements
    const mainLink = document.getElementById('main-link');
    const categoryLinks = document.querySelectorAll('.category-nav ul li a');

    // Authentication Elements
    const loginIcon = document.getElementById('login-icon');
    const authOverlay = document.getElementById('auth-overlay');
    const closeAuthBtn = document.getElementById('close-auth-btn');
    
    const authInitialSection = document.getElementById('auth-initial-section');
    const loginFormSection = document.getElementById('login-form-section');
    const signupFormSection = document.getElementById('signup-form-section');
    
    const showLoginFormBtn = document.getElementById('show-login-form-btn');
    const showSignupFormBtn = document.getElementById('show-signup-form-btn');
    const backToAuthInitialFromLoginBtn = document.getElementById('back-to-auth-initial-from-login');
    const backToAuthInitialFromSignupBtn = document.getElementById('back-to-auth-initial-from-signup');

    const loginNameInput = document.getElementById('login-name');
    const loginSurnameInput = document.getElementById('login-surname');
    const loginPasswordInput = document.getElementById('login-password');
    const loginSubmitBtn = document.getElementById('login-submit-btn');
    
    const signupNameInput = document.getElementById('signup-name');
    const signupSurnameInput = document.getElementById('signup-surname');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupSubmitBtn = document.getElementById('signup-submit-btn');
    
    const authMessage = document.getElementById('auth-message');

    // Simulated user database (stores first name, last name, password)
    let simulatedUsers = [
        { firstName: "User", lastName: "Test", password: "password123" }
    ];


    // --- Product Rendering Function ---
    function renderProducts(productsToRender) {
        productCatalog.innerHTML = ''; 
        if (!productsToRender || productsToRender.length === 0) {
            productCatalog.innerHTML = '<p class="no-products-found">No products match your current selection.</p>';
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
            productCatalog.appendChild(productCard);
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

    // --- Overlay Toggle Functions ---
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
            if (overlayElement === authOverlay) {
                authMessage.classList.add('hidden');
                authMessage.textContent = '';
                authInitialSection.classList.remove('hidden');
                loginFormSection.classList.add('hidden');
                signupFormSection.classList.add('hidden');
                // Optional: clear form fields
                loginNameInput.value = ''; loginSurnameInput.value = ''; loginPasswordInput.value = '';
                signupNameInput.value = ''; signupSurnameInput.value = ''; signupPasswordInput.value = '';
            }
        } else {
            console.error("Attempted to close a null overlay element.");
        }
    }
    
    // --- Filter Logic ---
    if (hamburgerMenu && filterOverlay && closeFilterBtn) {
        hamburgerMenu.addEventListener('click', () => openOverlay(filterOverlay));
        closeFilterBtn.addEventListener('click', () => closeOverlay(filterOverlay));
        filterOverlay.addEventListener('click', (event) => { // Close on backdrop click
            if (event.target === filterOverlay) {
                closeOverlay(filterOverlay);
            }
        });
    } else {
        console.error("Filter UI elements not found. Check IDs in HTML.");
    }
    
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function applyActiveFilters() {
        let productsToFilter = [...allProducts]; 

        // 1. Category Filter (based on `activeCategory` state)
        if (activeCategory && activeCategory !== 'all') {
            if (activeCategory === 'kids') {
                productsToFilter = productsToFilter.filter(p => p.category.startsWith('kids'));
            } else {
                productsToFilter = productsToFilter.filter(p => p.category === activeCategory);
            }
        }
        
        // 2. Season Filter
        const selectedSeasons = Array.from(seasonCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedSeasons.length > 0) {
            productsToFilter = productsToFilter.filter(product => 
                selectedSeasons.includes(product.season) || product.season === 'all'
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
        if (filterOverlay.classList.contains('active')) { 
            closeOverlay(filterOverlay);
        }
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyActiveFilters);
    }
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            seasonCheckboxes.forEach(checkbox => checkbox.checked = false);
            priceSortRadios.forEach(radio => radio.checked = (radio.value === 'default'));
            applyActiveFilters(); 
        });
    }

    // --- Search Logic ---
    if (searchIcon && searchOverlay && closeSearchBtn && searchInput) {
        searchIcon.addEventListener('click', () => {
            openOverlay(searchOverlay);
            searchInput.focus();
        });
        closeSearchBtn.addEventListener('click', () => {
            closeOverlay(searchOverlay);
            searchInput.value = '';
            searchSuggestions.innerHTML = '';
            noResultsMessage.classList.add('hidden');
            applyActiveFilters(); // Show products based on current category/filters
        });
        searchOverlay.addEventListener('click', (event) => { // Close on backdrop click
            if (event.target === searchOverlay) {
                closeOverlay(searchOverlay);
                applyActiveFilters(); // Show products based on current category/filters
            }
        });

        searchInput.addEventListener('input', debounce(() => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            searchSuggestions.innerHTML = ''; 
            noResultsMessage.classList.add('hidden');

            if (searchTerm.length === 0) {
                productCatalog.innerHTML = ''; // Clear main product grid if search is empty
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
                        searchInput.value = product.name; 
                        searchSuggestions.innerHTML = ''; // Clear suggestions
                        noResultsMessage.classList.add('hidden');
                        // Do not close overlay here, user sees the single product
                        // If you want to close, uncomment: closeOverlay(searchOverlay);
                    });
                    searchSuggestions.appendChild(suggestionItem);
                });
                productCatalog.innerHTML = ''; // Clear main product grid while suggestions are shown
            } else {
                noResultsMessage.classList.remove('hidden');
                productCatalog.innerHTML = ''; // Clear main product grid
            }
        }, 300)); 
    } else {
        console.error("Search UI elements not found. Check IDs in HTML.");
    }

    // --- Category Navigation & "Main" Button Logic ---
    function updateActiveCategoryLink(clickedLink) {
        categoryLinks.forEach(l => l.classList.remove('active-category'));
        if (clickedLink) {
            clickedLink.classList.add('active-category');
        } else if (mainLink) { 
            mainLink.classList.add('active-category');
        }
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            activeCategory = category; 
            updateActiveCategoryLink(link);
            
            seasonCheckboxes.forEach(checkbox => checkbox.checked = false);
            priceSortRadios.forEach(radio => radio.checked = (radio.value === 'default'));
            applyActiveFilters(); 
            searchInput.value = ''; 
            searchSuggestions.innerHTML = '';
            noResultsMessage.classList.add('hidden');
        });
    });
    
    // --- Authentication Logic ---
    if (loginIcon && authOverlay && closeAuthBtn) {
        loginIcon.addEventListener('click', () => openOverlay(authOverlay));
        closeAuthBtn.addEventListener('click', () => closeOverlay(authOverlay));
        authOverlay.addEventListener('click', (event) => { // Close on backdrop click
            if (event.target === authOverlay) {
                closeOverlay(authOverlay);
            }
        });

        // Show Login Form
        showLoginFormBtn.addEventListener('click', () => {
            authInitialSection.classList.add('hidden');
            loginFormSection.classList.remove('hidden');
            signupFormSection.classList.add('hidden');
            authMessage.classList.add('hidden');
        });

        // Show Signup Form
        showSignupFormBtn.addEventListener('click', () => {
            authInitialSection.classList.add('hidden');
            signupFormSection.classList.remove('hidden');
            loginFormSection.classList.add('hidden');
            authMessage.classList.add('hidden');
        });
        
        // Back to Initial Auth View
        function goBackToAuthInitial() {
            loginFormSection.classList.add('hidden');
            signupFormSection.classList.add('hidden');
            authInitialSection.classList.remove('hidden');
            authMessage.classList.add('hidden');
        }
        backToAuthInitialFromLoginBtn.addEventListener('click', (e) => { e.preventDefault(); goBackToAuthInitial(); });
        backToAuthInitialFromSignupBtn.addEventListener('click', (e) => { e.preventDefault(); goBackToAuthInitial(); });


        // Handle Login Submission
        loginSubmitBtn.addEventListener('click', () => {
            const firstName = loginNameInput.value.trim();
            const lastName = loginSurnameInput.value.trim();
            const password = loginPasswordInput.value;

            if (!firstName || !lastName || !password) {
                authMessage.textContent = "Please fill in all fields.";
                authMessage.className = 'auth-feedback error';
                authMessage.classList.remove('hidden');
                return;
            }

            const foundUser = simulatedUsers.find(u => 
                u.firstName.toLowerCase() === firstName.toLowerCase() &&
                u.lastName.toLowerCase() === lastName.toLowerCase() &&
                u.password === password
            );

            if (foundUser) {
                authMessage.textContent = "Successful login!";
                authMessage.className = 'auth-feedback success';
            } else {
                authMessage.textContent = "User not found or incorrect password. Please create an account.";
                authMessage.className = 'auth-feedback error';
            }
            authMessage.classList.remove('hidden');
        });

        // Handle Signup Submission
        signupSubmitBtn.addEventListener('click', () => {
            const firstName = signupNameInput.value.trim();
            const lastName = signupSurnameInput.value.trim();
            const password = signupPasswordInput.value;

            if (!firstName || !lastName || !password) {
                authMessage.textContent = "Please fill in all fields.";
                authMessage.className = 'auth-feedback error';
                authMessage.classList.remove('hidden');
                return;
            }
            
            const userExists = simulatedUsers.some(u => 
                u.firstName.toLowerCase() === firstName.toLowerCase() &&
                u.lastName.toLowerCase() === lastName.toLowerCase()
            );

            if (userExists) {
                authMessage.textContent = "A User with this name and surname was found. Please login.";
                authMessage.className = 'auth-feedback error';
            } else {
                simulatedUsers.push({ firstName, lastName, password });
                authMessage.textContent = "Successful sign up! You can now login.";
                authMessage.className = 'auth-feedback success';
                // console.log("Current users:", simulatedUsers); // For debugging
            }
            authMessage.classList.remove('hidden');
        });

    } else {
        console.error("Authentication UI elements not found. Check IDs in HTML.");
    }


    // --- Initial Product Load & Setup ---
    if (mainLink) mainLink.classList.add('active-category'); 
    renderProducts([...allProducts].sort((a,b) => a.id - b.id)); // Initial sort by ID
});
