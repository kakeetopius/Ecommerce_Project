<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maison Delmancé</title>
    <!-- Montserrat Font from Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>

    <!-- ===================== HEADER ===================== -->
    <header>
        <button id="hamburger-menu" class="header-icon" aria-label="Open filters">
            <!-- Elegant thin filter icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        
        <div class="logo-container">
            <a href="/"><img id="brand-logo" src="../images/thelogo.png" alt="Maison Delmancé"></a>
        </div>
        
        <div class="header-actions">
            <button id="search-icon" class="header-icon" aria-label="Open search">
                <!-- Elegant thin search icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button id="login-icon" class="header-icon" aria-label="Open login/signup">
                <!-- Elegant thin user/login icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
            <a href="/view/pages/cart.php" id="shopping-cart-link" class="header-icon" aria-label="View shopping cart">
                <!-- Elegant thin cart icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10c0-2.21-1.79-4-4-4S8 7.79 8 10"></path></svg>
            </a>
        </div>
    </header>

    <!-- ===================== SUB NAVIGATION (CATEGORIES) ===================== -->
    <nav class="category-nav">
        <ul>
            <li><a href="#" id="main-link" data-category="all">Main</a></li>
            <li><a href="#" data-category="women">Women</a></li>
            <li><a href="#" data-category="men">Men</a></li>
            <li class="kids-menu-item">
                <a href="#" data-category="kids">Kids</a>
                <div class="kids-dropdown">
                    <a href="#" data-category="kids-boy">Boy</a>
                    <a href="#" data-category="kids-girl">Girl</a>
                </div>
            </li>
        </ul>
    </nav>

    <!-- ===================== PRODUCT CATALOG ===================== -->
    <main>
        <div id="product-catalog" class="product-grid">
            <!-- Products will be dynamically inserted here by JavaScript -->
        </div>
    </main>

    <!-- ===================== FILTER OVERLAY (Initially Hidden) ===================== -->
    <div id="filter-overlay" class="overlay">
        <div class="overlay-content filter-panel">
            <div class="overlay-header">
                <h2>Filter & Sort</h2>
                <button id="close-filter-btn" class="close-btn" aria-label="Close filters">×</button>
            </div>
            
            <div class="filter-group">
                <h3>Season</h3>
                <label><input type="checkbox" name="season" value="summer"> Summer</label>
                <label><input type="checkbox" name="season" value="autumn"> Autumn</label>
                <label><input type="checkbox" name="season" value="winter"> Winter</label>
                <label><input type="checkbox" name="season" value="spring"> Spring</label>
            </div>

            <div class="filter-group">
                <h3>Price</h3>
                <label><input type="radio" name="price-sort" value="default" checked> Default</label>
                <label><input type="radio" name="price-sort" value="asc"> Least Expensive</label>
                <label><input type="radio" name="price-sort" value="desc"> Most Expensive</label>
            </div>

            <div class="filter-actions">
                <button id="clear-filters-btn">Clear All Filters</button>
                <button id="apply-filters-btn">View Products</button>
            </div>
        </div>
    </div>

    <!-- ===================== SEARCH OVERLAY (Initially Hidden) ===================== -->
    <div id="search-overlay" class="overlay">
        <div class="overlay-content search-panel">
            <div class="search-input-wrapper">
                <svg class="search-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="search-input" placeholder="Search products...">
                <button id="close-search-btn" class="close-btn search-bar-close-btn" aria-label="Close search">×</button>
            </div>
            <div id="search-suggestions">
                <!-- Suggestions will appear here -->
            </div>
            <p id="no-results-message" class="hidden">
                Sorry, no results match your search. We invite you to try a new search.
            </p>
        </div>
    </div>
    
    <?php require_once("auth_section.html"); ?>
   <script type="module" src="../js/script.js"></script>
</body>
</html>
