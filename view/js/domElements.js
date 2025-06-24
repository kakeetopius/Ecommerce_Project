export const domElements = {

	// --- DOM Elements ---
    productCatalog : document.getElementById('product-catalog'),

    // Filter Elements
    hamburgerMenu : document.getElementById('hamburger-menu'),
    filterOverlay : document.getElementById('filter-overlay'),
    closeFilterBtn : document.getElementById('close-filter-btn'),
    seasonCheckboxes : document.querySelectorAll('input[name="season"]'),
    priceSortRadios : document.querySelectorAll('input[name="price-sort"]'),
    clearFiltersBtn : document.getElementById('clear-filters-btn'),
    applyFiltersBtn : document.getElementById('apply-filters-btn'),

    // Search Elements
    searchIcon : document.getElementById('search-icon'),
    searchOverlay : document.getElementById('search-overlay'),
    closeSearchBtn : document.getElementById('close-search-btn'),
    searchInput : document.getElementById('search-input'),
    searchSuggestions : document.getElementById('search-suggestions'),
    noResultsMessage : document.getElementById('no-results-message'),

    // Category Navigation Elements
    mainLink : document.getElementById('main-link'),
    categoryLinks : document.querySelectorAll('.category-nav ul li a'),

    // Authentication Elements
    loginIcon : document.getElementById('login-icon'),
    authOverlay : document.getElementById('auth-overlay'),
    closeAuthBtn : document.getElementById('close-auth-btn'),

    authInitialSection : document.getElementById('auth-initial-section'),
    loginFormSection : document.getElementById('login-form-section'),
    signupFormSection : document.getElementById('signup-form-section'),

    showLoginFormBtn : document.getElementById('show-login-form-btn'),
    showSignupFormBtn : document.getElementById('show-signup-form-btn'),
    backToAuthInitialFromLoginBtn : document.getElementById('back-to-auth-initial-from-login'),
    backToAuthInitialFromSignupBtn : document.getElementById('back-to-auth-initial-from-signup'),

    loginForm : document.getElementById('login-form'),
    loginEmailInput : document.getElementById('login-email'),
    loginPasswordInput : document.getElementById('login-password'),
    loginSubmitBtn : document.getElementById('login-submit-btn'),

    signupForm : document.getElementById('signup-form'),
    signupEmailInput : document.getElementById('signup-email'),
    signupNameInput : document.getElementById('signup-name'),
    signupSurnameInput : document.getElementById('signup-surname'),
    signupPasswordInput : document.getElementById('signup-password'),
    signupSubmitBtn : document.getElementById('signup-submit-btn'),

    authMessage : document.getElementById('auth-message')

}
