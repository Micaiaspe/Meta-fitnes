<?php
session_start();
include 'conexion.php';
$usuario_id = $_SESSION['usuario_id'] ?? 0;
$query_mis_rutinas = "SELECT * FROM Rutinas WHERE admin_id = '$usuario_id' ORDER BY rutinas_id DESC";
$res_mis_rutinas = $conexion->query($query_mis_rutinas);

$query_comunidad = "SELECT * FROM Rutinas WHERE admin_id != '$usuario_id' OR admin_id IS NULL ORDER BY rutinas_id DESC";
$res_comunidad = $conexion->query($query_comunidad);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meta Fitness - Ver Rutinas</title>
    <link rel="stylesheet" href="ver-rutinas.css">
</head>
<body>

    <header>
        <div class="logo">META <span>FITNESS</span></div>
        
        <button class="hamburger" id="hamburger-btn" aria-label="Abrir menú">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>

        <nav id="nav-menu">
            <ul>
                <li><a href="home.html">INICIO</a></li>
                <li><a href="crear-rutinas.html">CREAR RUTINAS</a></li>
                <li><a href="ver-rutinas.php" class="active">VER RUTINAS</a></li>
                <li><a href="calorias.html">CALORÍAS</a></li>
                <li><a href="#" id="logout-btn">CERRAR SESIÓN</a></li>
            </ul>
        </nav>
    </header>

    <main class="container">
        <h2>EXPLORAR RUTINAS</h2>
            <div class="tabs-container">
            <button class="tab-btn active" data-tab="mis-rutinas">MIS RUTINAS</button>
            <button class="tab-btn" data-tab="comunidad">COMUNIDAD Y APP</button>
        </div>

        <section id="mis-rutinas" class="tab-content active">
            <div class="rutinas-grid">
                <?php if ($res_mis_rutinas && $res_mis_rutinas->num_rows > 0): ?>
                    <?php while ($rutina = $res_mis_rutinas->fetch_assoc()): ?>
                        <div class="rutina-card mi-rutina">
                            <div class="rutina-header">
                                <h3>RUTINA PERSONAL</h3>
                                <span class="badge-calorias">🔥 <?php echo htmlspecialchars($rutina['contcalorias']); ?> kcal</span>
                            </div>
                            <div class="rutina-body">
                                <p><strong>Enfoque:</strong> <?php echo htmlspecialchars($rutina['secciones']); ?></p>
                            </div>
                            <div class="rutina-footer">
                                <button class="btn-secundario">EDITAR</button>
                                <button class="btn-danger">ELIMINAR</button>
                            </div>
                        </div>
                    <?php endwhile; ?>
                <?php else: ?>
                    <div class="rutina-card mi-rutina">
                        <div class="rutina-header">
                            <h3>PECHO Y TRÍCEPS - DÍA 1</h3>
                            <span class="badge-calorias">🔥 420 kcal</span>
                        </div>
                        <div class="rutina-body">
                            <p><strong>Enfoque:</strong> Hipertrofia Tren Superior</p>
                            <ul class="lista-ejercicios">
                                <li><span>Press de Banca Plano</span> <span>4 x 10</span></li>
                                <li><span>Press Inclinado Mancuernas</span> <span>3 x 12</span></li>
                                <li><span>Extensión Tríceps Polea</span> <span>4 x 12</span></li>
                            </ul>
                        </div>
                        <div class="rutina-footer">
                            <button class="btn-danger">ELIMINAR</button>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </section>

        <section id="comunidad" class="tab-content">
            <div class="rutinas-grid">
                <div class="rutina-card app-rutina">
                    <div class="badge-autor">OFICIAL META FITNESS</div>
                    <div class="rutina-header">
                        <h3>FULL BODY PRINCIPIANTES</h3>
                        <span class="badge-calorias">🔥 350 kcal</span>
                    </div>
                    <div class="rutina-body">
                        <p><strong>Enfoque:</strong> Fuerza General / Adaptación</p>
                        <ul class="lista-ejercicios">
                            <li><span>Sentadilla Libre</span> <span>3 x 10</span></li>
                            <li><span>Remo con Barra</span> <span>3 x 12</span></li>
                            <li><span>Flexiones de Brazo</span> <span>3 x Máx</span></li>
                        </ul>
                    </div>
                    <div class="rutina-footer">
                        <button class="btn-principal-card">GUARDAR EN MIS RUTINAS</button>
                    </div>
                </div>
                <div class="rutina-card comunidad-rutina">
                    <div class="badge-autor">POR: @FitnessPro_22</div>
                    <div class="rutina-header">
                        <h3>PIERNA Y GLÚTEO INTENSO</h3>
                        <span class="badge-calorias">🔥 580 kcal</span>
                    </div>
                    <div class="rutina-body">
                        <p><strong>Enfoque:</strong> Hipertrofia Tren Inferior</p>
                        <ul class="lista-ejercicios">
                            <li><span>Prensa 45°</span> <span>4 x 12</span></li>
                            <li><span>Hip Thrust</span> <span>4 x 10</span></li>
                            <li><span>Peso Muerto Rumano</span> <span>3 x 12</span></li>
                        </ul>
                    </div>
                    <div class="rutina-footer">
                        <button class="btn-principal-card">GUARDAR EN MIS RUTINAS</button>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <script src="app.js"></script>
    <script>
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
            });
        });
    </script>
</body>
</html>