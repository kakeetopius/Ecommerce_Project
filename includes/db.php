<?php

class DBCon {
    private $uname = "";
    private $pass = "";
    private $host = "";
    private $port = 0;
    private $dbname = "";
    private $dbcon = null;

    function __construct() {
        $this->initialise_params();
        
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        try {
            $this->dbcon = new mysqli($this->host, $this->uname, $this->pass, $this->dbname, $this->port);
        }
        catch (mysqli_sql_exception $e) {
            echo "Error Connecting to Database: {$e->getMessage()}";         
            die();
        }
        
    }

    
    function __destruct() {
        $this->dbcon->close();
    }

    function prepareStatement($query): mysqli_stmt {
        return $this->dbcon->prepare($query);
    }

    
    function execute_query(mysqli_stmt $query) {

        try {
            $query->execute();
            return true;
        } catch (mysqli_sql_exception $e) {
            echo "Error executing Query: {$e->getMessage()}";
            return false;
        }

   }

   function execute_and_getResult($query) {
       if (!($query instanceof mysqli_stmt)) {
           $query = $this->prepareStatement($query);
       }

       try {
           $query->execute();
           $results = $query->get_result();
           $resultSet = $results->fetch_all(MYSQLI_ASSOC);
           return $resultSet;
       }
       catch (mysqli_sql_exception $e) {
           echo "Error executing query: {$e->getMessage()}";
           return null;
       }
   }

  function initialise_params() {
        $config_str = file_get_contents(__DIR__ ."/../config/config.json");
        $configs = json_decode($config_str, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "Error loading database configuration";
            echo json_last_error_msg();
            die();
        }

        $this->uname = $configs['uname'];
        $this->pass = $configs['pass'];
        $this->host = $configs['host'];
        $this->port = $configs['port'];
        $this->dbname = $configs['dbname'];
    }

    static function setfilepath() {
        $query = "UPDATE Product SET image_path = ? WHERE product_id = ?";
        $db = new DBCon();
        $pstmt = $db->prepareStatement($query);
        
        for ($i = 1; $i < 25; $i++) {
            $path = "/view/images/product{$i}.webp";
            $pstmt->bind_param("si", $path, $i);
            $db->execute_query($pstmt);
        }
    }
}
?>
