-- CREAR LA BASE DE DATOS
  CREATE DATABASE IF NOT EXISTS companydb;

-- acceder ala base de datos 
  USE companydb;

-- crear la la tabla de empleados
CREATE TABLE employee ( 
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(5) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- mostrar todas las tablas
SHOW TABLES;
DESCRIBE employee;

-- insertar datos
INSERT INTO employee VALUES (1, 'Joe', 1000), (2, 'Henry', 2000), (3, 'Sam', 2500), (4, 'Max', 1500);

SELECT * FROM employee;