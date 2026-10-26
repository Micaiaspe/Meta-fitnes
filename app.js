document.addEventListener('DOMContentLoaded', () => {

    const hamburgerBtn = document.getElementById('hamburger-btn') || document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu') || document.getElementById('nav-links');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('error') === 'no_existe') {
        alert('Error: El usuario ingresado no existe.');
    } else if (urlParams.get('error') === 'clave') {
        alert('Error: La contraseña ingresada es incorrecta.');
    }

    if (urlParams.get('registro') === 'ok') {
        alert('¡Usuario registrado con éxito! Ya puedes iniciar sesión.');
    } else if (urlParams.get('error') === 'existe') {
        alert('Error: El nombre de usuario ya está registrado. Elige otro.');
    } else if (urlParams.get('error') === 'fallo') {
        alert('Error al guardar en la base de datos. Intenta nuevamente.');
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                // Redirige al login o a la landing principal
                window.location.href = 'index.html';
            }
        });
    }

    const rutinaForm = document.getElementById('rutina-form');
    const listaEjercicios = document.getElementById('lista-ejercicios');
    const agregarEjercicioBtn = document.getElementById('agregar-ejercicio-btn');

    if (agregarEjercicioBtn && listaEjercicios) {
        agregarEjercicioBtn.addEventListener('click', () => {
            const div = document.createElement('div');
            div.classList.add('ejercicio-item');
            div.innerHTML = `
                <input type="text" placeholder="Ejercicio (ej: Press de Banca)" class="input-ejercicio" required>
                <input type="number" placeholder="Series" class="input-series" min="1" required>
                <input type="number" placeholder="Reps" class="input-reps" min="1" required>
                <button type="button" class="btn-eliminar">&times;</button>
            `;

            div.querySelector('.btn-eliminar').addEventListener('click', () => {
                div.remove();
            });

            listaEjercicios.appendChild(div);
        });
    }

    if (rutinaForm) {
        rutinaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombreRutina = document.getElementById('nombre-rutina').value;
            const items = document.querySelectorAll('.ejercicio-item');
            const ejercicios = [];

            items.forEach(item => {
                ejercicios.push({
                    nombre: item.querySelector('.input-ejercicio').value,
                    series: item.querySelector('.input-series').value,
                    reps: item.querySelector('.input-reps').value
                });
            });

            const nuevaRutina = { id: Date.now(), nombre: nombreRutina, ejercicios: ejercicios };
            const rutinasGuardadas = JSON.parse(localStorage.getItem('rutinas')) || [];
            rutinasGuardadas.push(nuevaRutina);
            localStorage.setItem('rutinas', JSON.stringify(rutinasGuardadas));

            alert('¡Rutina guardada con éxito!');
            rutinaForm.reset();
            if (listaEjercicios) listaEjercicios.innerHTML = '';
        });
    }

    const caloriasForm = document.getElementById('calorias-form');
    const resultadoContenedor = document.getElementById('resultado-calorias');

    if (caloriasForm) {
        caloriasForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const genero = document.getElementById('genero').value;
            const edad = parseInt(document.getElementById('edad').value);
            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            const actividad = parseFloat(document.getElementById('actividad').value);

            let tmb = (10 * peso) + (6.25 * altura) - (5 * edad);
            tmb += (genero === 'hombre') ? 5 : -161;

            const mantenimiento = Math.round(tmb * actividad);
            const perdidaGrasa = Math.round(mantenimiento - 500);
            const gananciaMusculo = Math.round(mantenimiento + 300);

            if (resultadoContenedor) {
                resultadoContenedor.innerHTML = `
                    <h3>TUS RESULTADOS:</h3>
                    <p>🔥 <strong>Mantenimiento:</strong> ${mantenimiento} kcal/día</p>
                    <p>📉 <strong>Perder Grasa:</strong> ${perdidaGrasa} kcal/día</p>
                    <p>💪 <strong>Ganar Músculo:</strong> ${gananciaMusculo} kcal/día</p>
                `;
            }
        });
    }
});

function crearRutina() {
    alert('¡Rutina creada y guardada con éxito!');
}