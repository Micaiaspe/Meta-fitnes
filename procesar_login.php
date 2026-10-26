<?php
session_start();
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = trim($_POST['username']);
    $clave = trim($_POST['password']);

    $stmt = $conexion->prepare("SELECT usuarios_id, nombre, clave FROM Usuarios WHERE login = ?");
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        if ($clave === $usuario['clave']) {
            $_SESSION['usuario_id'] = $usuario['usuarios_id'];
            $_SESSION['nombre'] = $usuario['nombre'];
            
            header("Location: home.html");
            exit();
        } else {
            header("Location: login.html?error=clave");
            exit();
        }
    } else {
        header("Location: login.html?error=no_existe");
        exit();
    }
}
?>