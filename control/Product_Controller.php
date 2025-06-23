<?php
    
    require_once("../modal/product.php");

    class ProductControl {

        public static function returnAllProducts() {
            $products = Product::getProducts();
            $product_array = array();
            foreach($products as $prod) {
               $pdt_dict = [
                
               ];
            }
        }

        public static function showProductByID() {

        }

        public static function filterByCategory() {

        }

        public static function searchByKeyword() {

        }


    }

?>
