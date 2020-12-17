DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
  id INT PRIMARY KEY auto_increment,
  name VARCHAR(30)
);

CREATE TABLE  role(
  id INT PRIMARY KEY auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
  
);

CREATE TABLE employee (
  id INT PRIMARY KEY auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Betty", "Boop", 1, 1);

INSERT INTO role(title, salary, department_id) VALUES ("web developer", 50000.00, 1);

INSERT INTO department(name) VALUES ("IT");