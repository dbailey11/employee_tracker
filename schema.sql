-- schema.sql --

DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
  id INT PRIMARY KEY auto_increment,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)


);


-- seeds.sql data -----

-- INSERT INTO department(id, name) VALUES (1, "IT");
-- INSERT INTO department(id, name) VALUES (2, "Sales");
-- INSERT INTO department(id, name) VALUES (3, "Human Resources");
-- INSERT INTO department(id, name) VALUES (4, "Customer Service");

-- INSERT INTO role(id, title, salary, department_id) VALUES (1, "web developer", 70000.00, 1);
-- INSERT INTO role(id, title, salary, department_id) VALUES (2, "IT manager", 120000.00, 1);
-- INSERT INTO role(id, title, salary, department_id) VALUES (3, "Sales manager", 100000.00, 2);
-- INSERT INTO role(id, title, salary, department_id) VALUES (4, "Sales associate", 50000.00, 2);
-- INSERT INTO role(id, title, salary, department_id) VALUES (5, "HR Director", 100000.00, 3);
-- INSERT INTO role(id, title, salary, department_id) VALUES (6, "CS manager", 80000.00, 4);
-- INSERT INTO role(id, title, salary, department_id) VALUES (7, "Associate", 30000.00, 4);

-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (1, "Bob", "Smith", 2, 1);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (2, "Betty", "Boop", 1, null);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (3, "Davy", "Crocket", 3, 2);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (4, "Sandra", "Oleander", 6, 3);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (5, "Tom", "Green", 4, null);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (6, "Rob", "Schnider", 2, 2);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (7, "Kathy", "Bell", 7, null);
-- INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (8, "Minnie", "Lepler", 5, 3);