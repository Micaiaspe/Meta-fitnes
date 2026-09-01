-- Script de Base de Datos para Meta Fitness
CREATE DATABASE IF NOT EXISTS meta_fitness;
USE meta_fitness;

CREATE TABLE IF NOT EXISTS Usuarios (
    usuarios_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fechanac DATE NOT NULL,
    login VARCHAR(50) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    rutinas VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Administrador_Global (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    login VARCHAR(50) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES Usuarios(usuarios_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Rutinas (
    rutinas_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    secciones VARCHAR(50) NOT NULL,
    contcalorias VARCHAR(50) NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES Administrador_Global(admin_id) ON DELETE CASCADE
);
