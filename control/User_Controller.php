<?php
    session_start();
    
    require_once __DIR__ . '/../modal/user.php';

    class UserControl {

        public static function login($email, $pass) {
           $user = User::getUserByEmail($email);

           if ($user === null) {
                return json_encode(['sucess'=>false, 'message'=>'Incorrect User']);
           }

           $_SESSION['user_id'] = $user->get_UserId();

           if (!password_verify($pass, $user->get_pass())) {
                return json_encode(['sucess'=>false, 'message'=>'Incorrect User']);
           }
            
            $fname = $user->get_fname();
            $lname = $user->get_lname();
            $email = $user->get_email();

            $user_info = array('success'=>true,'fname'=>$fname, 'lname'=>$lname, 'email'=>$email);
            return json_encode($user_info);
        }
        
        public static function signup($fname, $lname, $email, $pass) {
           $user = new User(0, $fname, $lname, $email, $pass);
           $status = User::addUser($user);

           if ($status === false) {
               return json_encode(['success'=>false]);
           }

            $user = User::getUserByEmail($email);
            $_SESSION['user_id'] = $user->get_UserId();
            
            $fname = $user->get_fname();
            $lname = $user->get_lname();
            $email = $user->get_email();

            $user_info = array('success'=>true,'fname'=>$fname, 'lname'=>$lname, 'email'=>$email);
            return json_encode($user_info);
        }

        public static function getProfile() {
            if (!isset($_SESSION['user_id'])) {
               return json_encode(['success'=>false]);
            }
            $user = User::getUserById($_SESSION['user_id']);

            $fname = $user->get_fname();
            $lname = $user->get_lname();
            $email = $user->get_email();

            $user_info = array('success'=>true,'fname'=>$fname, 'lname'=>$lname, 'email'=>$email);
            return json_encode($user_info);
        }

        public static function logout() {
            //clearing the session variables
            if (isset($_SESSION['user_id'])) {
                unset($_SESSION['user_id']);
            }
            if (isset($_SESSION['cart'])) {
                unset($_SESSION['cart']);
            }

            header("Location: /");

        }

    }

?>
