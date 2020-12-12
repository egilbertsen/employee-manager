DROP DATABASE IF EXISTS employeesdb;

CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE departments (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO departments (name)
VALUES ("Accounting"), ("Finance"), ("Retail");

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL UNIQUE,
    salary DECIMAL,
    department_id INT,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Accountant", 50000, 1), ("Finance Manager", 75000, 2), ("Senior Accountant", 70000, 1);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Edna", "Millay", 1, 0),("W.H.", "Auden", 3, 0),("Pablo", "Naruda", 2, 0);