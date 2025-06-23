<?php
    
    
    require_once __DIR__."/../modal/product.php";

    class ProductControl {

        public static function returnAllProducts() {
            $products = Product::getProducts();
            $product_array = array();
            foreach($products as $prod) {
                $categories = $prod->getCategories();
                $pdt_dict = [
                        "id" => $prod->get_productID(),
                        "name" => $prod->get_productName(),
                        "price"=> $prod->get_price(),
                        "image" => $prod->get_imagePath(),
                        "season" => $categories['season'],
                        "gender" => $categories['gender'],
                        "age_group" => $categories['age_group']
                ];

                $product_array[] = $pdt_dict;
            }

            $products_json = json_encode($product_array, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            return $products_json;
        }

        public static function showProductByID() {

        }

        public static function filterByCategory() {

        }

        public static function searchByKeyword() {

        }

    }

    
?>
