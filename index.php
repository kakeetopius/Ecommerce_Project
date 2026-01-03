<?php
$received_url = $_SERVER['REQUEST_URI'];

if ($received_url === "/") {
    header("Location: /view/pages/index.php");
    exit;
}

$received_url = trim($received_url, "/");
$segments = explode("/", $received_url);
$page = $segments[0];
$route = $segments[1] ?? null;
$function = $segments[2] ?? null;

if ($route === "product") {
    switch($function) {
        case 'all':
            require_once("control/Product_Controller.php"); 
            header("Content-Type: application/json");
            echo ProductControl::returnAllProducts();
            exit;
        case 'item':
            $product_id = (int) $segments[3];
            require_once("control/Product_Controller.php"); 
            header("Content-Type: application/json");
            echo ProductControl::returnProduct($product_id);
    }
}
else if ($route === 'user') {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    require_once("control/User_Controller.php");
    header("Content-Type: application/json");

    switch($function) {
        case 'login':
            echo UserControl::login($data['email'], $data['password']);
            exit;
        case 'signup':
            echo UserControl::signup($data['fname'], $data['lname'], $data['email'], $data['pass']);
            exit;
        case 'userinfo':
            echo UserControl::getProfile();
            exit;
        case 'logout':
            UserControl::logout();
            exit;
    }

}
else if ($route === 'cart') {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    require_once("control/Cart_Controller.php");
    header("Content-Type: application/json");
    
    switch($function) {
        case 'add':
            $pdt_id = (int) $data['product_id']; 
            $qty = (int) $data['qty'];
            echo CartControl::addtoCart($pdt_id, $qty);
            exit;
        case 'get':
            echo CartControl::getCart();
            exit;
        case 'remove':
            $pdt_id = (int) $data['product_id'];
            echo CartControl::removefromCart($pdt_id);
            exit;
        case 'total':
            echo CartControl::getTotal();
            exit;
        case 'checkout':
            header("Location: /view/pages/payment_page.html");
            exit;
        case 'confirm':
            echo CartControl::confirmOrder();
            exit;
        case 'clear':
            echo CartControl::clearCart();
            exit;
    }
}


?>
