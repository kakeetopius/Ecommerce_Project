<?php
        
    require_once("../includes/db.php");

    class Product {
        private $product_id = 0;
        private $product_name = "";
        private $price = 0;
        private $stock = 0;
        private $image_path = "";
        private $categories;
        private static $AllProducts = array();

        public function __construct($id, $name, $price, $stock, $image_path) {
            $this->product_id = $id;
            $this->product_name = $name;
            $this->price = $price;
            $this->stock = $stock;
            $this->image_path = $image_path;
            $this->categories = array();
        }

        private static function loadProducts() {
            $db = new DBCon();
            $query = "SELECT * FROM Product";
            $query = $db->prepareStatement($query);
            
            $products = $db->execute_and_getResult($query);
            foreach($products as $prod) {
                $product = new Product($prod['product_id'], $prod['product_name'], $prod['price'], $prod['stock'], $prod['image_path']);
                $product->categories = Product::loadCategory($prod['product_id']);
                Product::$AllProducts[] = $product;
            }
        }
    
        private static function loadCategory($product_id) {
            $db = new DBCon();
            $query = "SELECT * FROM Category WHERE product_id = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("i", $product_id);
                     
            $results = $db->execute_and_getResult($query);
            if ($results == null) {
                return null;
            }
            $prod_cat = $results[0];

            return array('gender'=>$prod_cat['gender'], 'season'=>$prod_cat['season'], 'age_group'=>$prod_cat['age_group']);
    
    }
        public static function getProducts() {
            if (count(Product::$AllProducts) == 0) {
                Product::loadProducts();
            }

            return Product::$AllProducts;
        }

        public static function getProductByID($product_id) {
            $db = new DBCon();
            $query = "SELECT * FROM Product WHERE product_id = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("i", $product_id);

            $results = $db->execute_and_getResult($query);
            if ($results == null) {
                return null;
            }

            $prod = $results[0];
            $product = new Product($prod['product_id'], $prod['product_name'], $prod['price'], $prod['stock'], $prod['image_path']);
            $product->categories = Product::loadCategory($prod['product_id']);
            return $product;
        }
        
        public function change_stock($change_in_stock) {
            $current_stock = $this->stock;
            if ($current_stock == 0 && $change_in_stock < 0) {
                return;
            }
            
            $new_stock = $current_stock + $change_in_stock;

            $db = new DBCon();
            $query = "UPDATE Product SET stock = ? WHERE product_id = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("ii", $new_stock, $this->product_id);
            return $db->execute_query($query);
        }


        public function get_productID() {
            return $this->product_id;
        }

        public function get_productName() {
            return $this->product_name;
        }

        public function get_price() {
            return $this->price;
        }

        public function get_stock() {
            return $this->stock;
        }

        public function get_imagePath() {
            return $this->image_path;
        }
        
        public function getCategories() {
            if(count($this->categories) == 0) {
                Product::loadCategory($this->product_id);
            }

            return $this->categories;
        }
        
        public function isInCategory($category_name, $category_value) {
            if (count($this->categories) == 0) {
                Product::loadCategory($this->categories);
            }
            
            if (!array_key_exists($category_name, $this->categories)) {
                return false;
            }

            if($this->categories[$category_name] == $category_value) {
                return true;
            }
            
            return false;
        }

        public function getCatStr() {
            if (count($this->categories) == 0) {
                Product::loadCategory($this->product_id);
            }
            $cat_str = "";
            foreach($this->categories as $key => $value) {
                if (isset($value)) {
                    $cat_str = $cat_str . "{$key}: {$value}\n";
                }
            }
            return $cat_str;
        }

        public function __toString() {
            return "ID: {$this->get_productID()}\nProduct Name: {$this->get_productName()}\nPrice: {$this->get_price()}\nStock: {$this->get_stock()}\nCategories:\n{$this->getCatStr()}\n";
        }
    }
    
    
?>
