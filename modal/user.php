<?php
    
    require_once __DIR__."/../includes/db.php";
    require_once __DIR__."/order.php";
    
    class User { 
        private $userid = 0;
        private $fname = "";
        private $lname = "";
        private $email = "";
        private $pass = "";
        private $cart;
        private ?Order $orders;
        
        public function __construct($id, $fname, $lname, $email, $pass) {
            $this->userid = $id; 
            $this->fname = $fname; 
            $this->lname = $lname; 
            $this->email = $email; 
            $this->pass = $pass; 
            $this->cart = array();
            $this->orders = null;
        }
        
        
        public static function getUserByEmail($email) { 
            $dbCon = new DBCon(); 
            $query = "SELECT * FROM User WHERE email = ?";
            $query = $dbCon->prepareStatement($query);
            $query->bind_param("s", $email);

            $users = $dbCon->execute_and_getResult($query);
            if ($users == null) {
                return null;
            }
            $user1 = $users[0];
            
            $user = new User($user1['user_id'], $user1['fname'], $user1['lname'], $user1['email'], $user1['password']);
            return $user; 
        }

        public static function getUserById($id) {
            
            $dbCon = new DBCon();
            $query = "SELECT * FROM User WHERE user_id = ?";
            $query = $dbCon->prepareStatement($query);
            $query->bind_param("i", $id);

            $users = $dbCon->execute_and_getResult($query);
            if ($users == null) {
                echo "User doesn't exist";
                return null;
            }
            $user1 = $users[0];
            
            $user = new User($user1['user_id'], $user1['fname'], $user1['lname'], $user1['email'], $user1['password']);
            return $user; 
        }
        
        public static function addUser(User $user) {
            $db = new DBCon();
            $query = "INSERT INTO User(fname, lname, email, password) VALUES (?, ?, ?, ?)";
            $query = $db->prepareStatement($query);

            $fname = $user->get_fname();
            $lname = $user->get_lname();
            $email = $user->get_email();
            $password = $user->get_pass();
            $password = password_hash($password, PASSWORD_DEFAULT);


            $query->bind_param("ssss", $fname, $lname, $email, $password);

            $status = $db->execute_query($query);
            if ($status == false) {
                echo "Error Adding User";
                return false;
            }
            return true;
        }
        
        public static function deleteUserByEmail($email) {
            $db = new DBCon();
            $query = "DELETE FROM User WHERE email = ?";
            $query = $db->prepareStatement($query);

            $query->bind_param("s", $email);
            $status = $db->execute_query($query);
            if ($status == false) {
                echo "Error deleting User";
                return false;
            }
        }
        
        public function getOrder() {
            if ($this->orders === null)  { 
                $this->orders = Order::getUserOrder($this->userid);
            }
            
            return $this->orders;

        }
         
        public function getcart() {
            return $this->cart;
        }
        
        public function setcart(array $cart) {
            $this->cart = $cart;
        }

        public function add_to_cart($product_id, $quantity) {
            if (isset($this->cart[$product_id])) {
                return;
            }

            $this->cart[$product_id] = $quantity;
        }
        
        public function remove_from_cart($product_id) {
            if (!isset($this->cart[$product_id])) {
                return;
            }

            unset($this->cart[$product_id]);
        }

        public function change_qty_in_cart($product_id, $new_quantity) {
            $this->cart[$product_id] = $new_quantity;
        }

        public function cartToOrder() {
            if (count($this->cart) == 0) {
                return;
            }
            
            $user_order = Order::createOrder($this->userid);
            
            if ($user_order == null) {
                echo "Order object is null\n";
                return;
            }

            foreach($this->cart as $pdt_id => $quantity) {
                $user_order->addtoOrder($pdt_id, $quantity);
            }
        }

        public function getcartTotal() {
            
            if (count($this->cart) == 0) {
                return 0;
            }

            $sum = 0;

            foreach ($this->cart as $pdt_id => $qty) {
                $product = Product::getProductByID($pdt_id);
                $sum = $sum + ($product->get_price() * $qty);
            }

            return $sum;
        }

        public function empty_cart() {
            if (count($this->cart) == 0) {
                return;
            }

            foreach (array_keys($this->cart) as $key) {
                unset($this->cart[$key]);
            }
        }

        public function get_fname() {
            return $this->fname;
        }

        public function get_lname() {
            return $this->lname;
        }

        public function get_name() {
            return "{$this->fname} {$this->lname}";
        }

        public function get_email() {
            return $this->email;
        }
 
        public function get_pass() {
            return $this->pass;
        }
        
        public function get_UserId() {
            return $this->userid;
        }
        
        public function get_cart() {
            return $this->cart;
        }

        public function __toString() {
            return "UserID: {$this->get_UserId()}\nName: {$this->get_name()}\nEmail: {$this->get_email()}";
        }
    }
    
?>
