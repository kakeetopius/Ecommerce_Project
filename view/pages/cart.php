<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CartItem</title>
    <link rel="stylesheet" href="/view/css/style.css">
    <link rel="stylesheet" href="/view/css/cart.css">
</head>
<body>
    <header>
        <div class="logo-container">
            <a href="/"><img id="brand-logo" src="../images/thelogo.png" alt="Maison Delmancé"></a>
        </div>

        <div class="header-actions">
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

    <h1>Shopping Cart🛒🛒</h1>

    <h1>Your Cart</h1>
    <div id="cart-container" class = "cart-container"></div>

    <div class="cart-actions">
    <h2 id="cart-total">Total: $0.00</h2>
    <button class="cartButton" id="clear-cart">Clear Cart</button>
    <button class="cartButton" id="checkout-btn">Checkout</button>
   </div>

    
    <?php require_once("auth_section.html"); ?>
   <script type="module" src="/view/js/cart.js"></script>

</body>
</html>
