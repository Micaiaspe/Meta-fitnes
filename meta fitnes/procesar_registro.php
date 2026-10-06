<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre   = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $fechanac = trim($_POST['fechanac']);
    $telefono = trim($_POST['telefono']);
    $login    = trim($_POST['username']);
    $clave    = trim($_POST['password']);
    $rutinas  = 'Sin rutinas';

    $stmt_check = $conexion->prepare("SELECT usuarios_id FROM Usuarios WHERE login = ?");
    $stmt_check->bind_param("s", $login);
    $stmt_check->execute();
    $res_check = $stmt_check->get_result();

    if ($res_check->num_rows > 0) {
        header("Location: registro.html?error=existe");
        exit();
    }

    $stmt = $conexion->prepare("INSERT INTO Usuarios (nombre, apellido, fechanac, telefono, login, clave, rutinas) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $nombre, $apellido, $fechanac, $telefono, $login, $clave, $rutinas);

    if ($stmt->execute()) {
        header("Location: login.html?registro=ok");
        exit();
    } else {
        header("Location: registro.html?error=fallo");
        exit();
    }
}
?>