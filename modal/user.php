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
        
        public function __construct($id, $fname, $lname, $email, $pass) {
            $this->userid = $id; 
            $this->fname = $fname; 
            $this->lname = $lname; 
            $this->email = $email; 
            $this->pass = $pass; 
            $this->cart = array();
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

    }
    
?>
