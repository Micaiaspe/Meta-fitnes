<?php
// Configuración de parámetros para XAMPP / MySQL
$servidor   = "localhost";
$usuario    = "root";          // Usuario por defecto en XAMPP
$password   = "";              // Contraseña por defecto en XAMPP (vacía)
$base_datos = "meta_fitness";  // Nombre de la base de datos en phpMyAdmin

// Crear la conexión
$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar si hubo algún error de conexión
if ($conexion->connect_error) {
    die("Error crítico de conexión: " . $conexion->connect_error);
}

// Configurar caracteres a UTF-8 para evitar problemas con acentos y caracteres especiales
$conexion->set_charset("utf8mb4");
?>