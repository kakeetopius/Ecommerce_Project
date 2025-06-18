CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL, 
    password VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    description VARCHAR(100),
    price DECIMAL(6,2),
    quantity INT,
    image_path VARCHAR(80)
);

CREATE TABLE Orders (
    order_no INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    state ENUM('pending', 'confirmed', 'enroute', 'delivered'),

    FOREIGN KEY (user_id) REFERENCES User(user_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);


CREATE TABLE Order_Item(
    order_no INT,
    product_id INT,
    quantity INT, 
    
    PRIMARY KEY(order_no, product_id),
    FOREIGN KEY(product_id) REFERENCES Product(product_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE Category (
    product_id INT PRIMARY KEY, 
    gender ENUM('M', 'F'), 
    season ENUM ('winter', 'summer', 'spring', 'autumn'), 
    age_group ENUM ('adult', 'kids'),

    FOREIGN KEY (product_id) REFERENCES Product(product_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

