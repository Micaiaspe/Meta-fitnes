<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recogemos los datos tal cual los envuelve tu formulario HTML (username y password)
    $nombre    = trim($_POST['nombre']);
    $apellido  = trim($_POST['apellido']);
    $fechanac  = trim($_POST['fechanac']);
    $telefono  = trim($_POST['telefono']);
    $login     = trim($_POST['username']);
    $clave     = trim($_POST['password']);
    $rutinas   = "Sin rutinas";

    // 1. Verificar si el nombre de usuario ya existe en la base de datos
    $stmt_check = $conexion->prepare("SELECT usuarios_id FROM Usuarios WHERE login = ?");
    $stmt_check->bind_param("s", $login);
    $stmt_check->execute();
    $res_check = $stmt_check->get_result();

    if ($res_check->num_rows > 0) {
        // Si ya existe, lo mandamos de vuelta con un aviso
        header("Location: registro.html?error=existe");
        exit();
    }

    // 2. Insertar el nuevo usuario en la tabla Usuarios (7 campos / 7 interrogaciones)
    $stmt = $conexion->prepare("INSERT INTO Usuarios (nombre, apellido, fechanac, telefono, login, clave, rutinas) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    // Los 7 parámetros son de tipo texto ("sssssss")
    $stmt->bind_param("sssssss", $nombre, $apellido, $fechanac, $telefono, $login, $clave, $rutinas);

    if ($stmt->execute()) {
        // Si guardó joya, lo mandamos al login para que entre
        header("Location: login.html?registro=ok");
        exit();
    } else {
        // Si hubo algún drama con la query
        header("Location: registro.html?error=fallo");
        exit();
    }
}
?>