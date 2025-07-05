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

-- Tablas para better-auth
CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    emailVerified BOOLEAN DEFAULT FALSE,
    name VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE session (
    id VARCHAR(255) PRIMARY KEY,
    expiresAt TIMESTAMP NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ipAddress VARCHAR(255),
    userAgent TEXT,
    userId VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE account (
    id VARCHAR(255) PRIMARY KEY,
    accountId VARCHAR(255) NOT NULL,
    providerId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt TIMESTAMP NULL,
    refreshTokenExpiresAt TIMESTAMP NULL,
    scope TEXT,
    password VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);
