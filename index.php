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

session_start();

$received_url = $_SERVER['REQUEST_URI'];
$received_url = trim($received_url, "/");
$segments = explode("/", $received_url);

$route = $segments[1];
$function = $segments[2];

if ($route === "product") {
    switch($function) {
        case 'all':
            
    }
}

?>
