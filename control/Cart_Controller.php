<?php
    session_start();
    
    require_once __DIR__ . '/../modal/user.php';


    class CartControl {
      
        public static function addtoCart($product_id, $qty) {
            if (!isset($_SESSION['user_id'])) {
                return json_encode(["success"=>false, "message"=>"notLoggedIn"]);
            }
            
            if (!isset($_SESSION['cart'])) {
                $_SESSION['cart'] = array();
            }

            else {
                $_SESSION['cart'][$product_id] = $qty;
            }  

            return json_encode([
                'success' => true,
            ]);
        
        }

        public static function getCart() {
            if (!isset($_SESSION['user_id'])) {
                return json_encode(["success"=>false, "message"=>"notLoggedIn"]);
            }

            if (isset($_SESSION['cart'])) {
               $cart = [];
               foreach($_SESSION['cart'] as $pdt=>$quantity) {
                    $cart[] = ['pdt_id'=>$pdt, 'qty'=>$quantity];
               }
                return json_encode([
                    "success" => true,
                    "cart" => $cart,
                ]);
            }
            else {
                return json_encode([
                    "success" => false,
                    "message" => "cartEmpty",
                ]);
            }
            

        }

        public static function removefromCart($product_id) {
            if (!isset($_SESSION['user_id'])) {
                return json_encode(["success"=>false, "message"=>"notLoggedIn"]);
            }
            
            if (!isset($_SESSION['cart'])) {
                return json_encode(["success"=>false, "message"=>"cartEmpty"]);
            }
            
            if (!isset($_SESSION['cart'][$product_id])){
                return json_encode(["success"=>false, "message"=>"ProductNotInCart"]);
            }

            unset($_SESSION['cart'][$product_id]);
            return json_encode(["success"=>true]);
        }
        
        public static function getTotal() {
            if (!isset($_SESSION['user_id'])) {
                return json_encode(["success"=>false, "message"=>"notLoggedIn"]);
            }

            if (!isset($_SESSION['cart']) || count($_SESSION['cart']) === 0) {
                return json_encode(["success"=>true, "total"=>0], JSON_NUMERIC_CHECK);
            }

            $sum = 0;

            foreach ($_SESSION['cart'] as $pdt_id => $qty) {
                $product = Product::getProductByID($pdt_id);
                $sum = $sum + ($product->get_price() * $qty);
            }

            return json_encode(["success"=>true, "total"=>$sum], JSON_NUMERIC_CHECK);
        }

        public static function updateQuantity() {

        }  

        public static function viewCart() {

        }

        public static function clearCart() {

        }

        public static function checkout() {
        }

    }
?>
