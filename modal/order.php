<?php
    require_once __DIR__. "/../includes/db.php";
    require_once __DIR__. "/product.php";

    class Order {
        private $order_no = 0;
        private $user_id = 0;
        private $status = "";
        private $order_items;
 
        public function __construct($order_no, $user_id, $status) {
            $this->order_no = $order_no;
            $this->user_id = $user_id;
            $this->status = $status;
            $this->order_items = array();
        }
        
        public static function createOrder($userid) {
            $status = "pending";
            $query = "INSERT INTO orders (user_id, status) VALUES (?, ?)";
            $db = new DBCon();
            $query = $db->prepareStatement($query);
            $query->bind_param("is", $userid, $status);

            if ($db->execute_query($query) == false) {
                return false;
            }

            return Order::getUserOrder($userid);
            
        }
        
        public static function getUserOrder($userid) {
            $db = new DBCon();
            $query =  "SELECT * FROM orders WHERE user_id = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("i", $userid);

            $results = $db->execute_and_getResult($query);
            if ($results == null) {
                return null;
            }
            
            $order = $results[0];
            $UserOrder = new Order($order['order_no'], $order['user_id'], $order['status']);
            $UserOrder->setOrderItems();
            return $UserOrder;
        }
        
        public function addtoOrder($product_id, $quantity) {
            
            $product = Product::getProductByID($product_id);
            if ($product->get_stock() < $quantity) {
                return false;
            }

            $db = new DBCon();
            $query = "INSERT INTO order_item VALUES (?, ?, ?)";
            $query = $db->prepareStatement($query);
            $query->bind_param("iii", $this->order_no, $product_id, $quantity);
             
            if ($db->execute_query($query)) {
                $product->change_stock(-$quantity);
                $this->order_items[$product_id] = $quantity;
                return true;
            }

            return false;
        }
        
        public function cancelOrder() {
            $items = $this->getOrderItems();

            $db = new DBCon();
            $query = "DELETE FROM orders WHERE order_no = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("i", $this->order_no);
            
            $db->execute_query($query);

            if ($items == null) {
                return;
            }
            
            foreach ($items as $pdt_id => $quantity) {
                $product = Product::getProductByID($pdt_id);
                $product->change_stock($quantity);
            }

        }

        public function confirmOrder() {
            $this->change_status("confirmed"); 
        }

        private function setOrderItems() {
            $db = new DBCon();
            $query = "SELECT * FROM order_item WHERE order_no = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("i", $this->order_no);

            $results = $db->execute_and_getResult($query);
            if ($results == null) {
                return null;
            }

            foreach($results as $row) {
                $this->order_items[$row['product_id']] = $row['quantity'];
            }
        }

        public function getOrderItems() {
            if (count($this->order_items) == 0) {
                return $this->setOrderItems();
            }
            
            return $this->order_items;
        }

        public function calculate_total() {
            if (count($this->order_items) == 0) {
                return 0;
            }

            $sum = 0;
            foreach($this->order_items as $product_id => $quantity) {
                $product = Product::getProductByID($product_id);
                $sum = $sum + ($product->get_price() * $quantity);
            }

            return $sum;
        }


        public function get_orderNum() {
            return $this->order_no;
        }

        public function get_userId() {
            return $this->user_id;
        }

        public function check_status() {
            return $this->status;
        }

        public function change_status($status) {
            $statuses = ["pending", "confirmed", "enroute", "delivered"];
            if (!in_array($status, $statuses)) {
                return false;
            }

            $db = new DBCon();
            $query = "UPDATE orders SET status = ? WHERE order_no = ?";
            $query = $db->prepareStatement($query);
            $query->bind_param("si", $status, $this->order_no);

            return $db->execute_query($query);
        }
    }
?>
