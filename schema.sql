DROP DATABASE IF EXISTS employeesdb;

CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE departments (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL UNIQUE,
    salary DECIMAL,
    department_id INT,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL,
    CONSTRAINT fk_managers FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

