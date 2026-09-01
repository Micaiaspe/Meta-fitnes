
document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Menú Hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Simulación Iniciar Sesión (Redirige a home.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Al loguearse, entra al "index que hice antes" que ahora se llama home.html
            window.location.href = 'home.html'; 
        });
    }

    // 3. Simulación Registro (Redirige a login.html)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Usuario registrado con éxito! Ahora por favor inicia sesión.');
            window.location.href = 'login.html';
        });
    }
});

// Función para el botón Crear Rutina
function crearRutina() {
    alert('¡Rutina creada y guardada con éxito en tu panel!');
}
