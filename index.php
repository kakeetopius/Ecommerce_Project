<?php
// start session
// check for page from get array
// if not set go to homepage
// get page and switch to the right Controller
// paramters will be passed by the get array or post array
// or session array
// the controllers will include the data and the data 
// will be loaded to the pages with the view pages and
// sent back]
// If async json is sent back for js to load in the page.

//setup the session information

$received_url = $_SERVER['REQUEST_URI'];

if ($received_url === "/") {
    header("Location: /view/pages/index.html");
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
        case 'cart':
            
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



?>
