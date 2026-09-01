document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA DEL MENÚ HAMBURGUESA
    // ==========================================
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll("nav ul li a").forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // ==========================================
    // 2. LÓGICA DE CERRAR SESIÓN
    // ==========================================
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
                localStorage.removeItem("userSession"); // Limpia la sesión almacenada
                window.location.href = "login.html"; // Redirige al login
            }
        });
    }

    // ==========================================
    // 3. LÓGICA DE CREAR RUTINAS (crear-rutinas.html)
    // ==========================================
    const rutinaForm = document.getElementById("rutina-form");
    const listaEjercicios = document.getElementById("lista-ejercicios");
    const agregarEjercicioBtn = document.getElementById("agregar-ejercicio-btn");

    // Agregar un nuevo campo de ejercicio dinámicamente
    if (agregarEjercicioBtn && listaEjercicios) {
        agregarEjercicioBtn.addEventListener("click", () => {
            const div = document.createElement("div");
            div.classList.add("ejercicio-item");
            div.innerHTML = `
                <input type="text" placeholder="Nombre del ejercicio (ej: Press de Banca)" class="input-ejercicio" required>
                <input type="number" placeholder="Series" class="input-series" min="1" required>
                <input type="number" placeholder="Reps" class="input-reps" min="1" required>
                <button type="button" class="btn-eliminar">&times;</button>
            `;
            
            // Eliminar fila de ejercicio
            div.querySelector(".btn-eliminar").addEventListener("click", () => {
                div.remove();
            });

            listaEjercicios.appendChild(div);
        });
    }

    // Guardar Rutina en LocalStorage
    if (rutinaForm) {
        rutinaForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nombreRutina = document.getElementById("nombre-rutina").value;
            const items = document.querySelectorAll(".ejercicio-item");
            const ejercicios = [];

            items.forEach(item => {
                ejercicios.push({
                    nombre: item.querySelector(".input-ejercicio").value,
                    series: item.querySelector(".input-series").value,
                    reps: item.querySelector(".input-reps").value
                });
            });

            const nuevaRutina = {
                id: Date.now(),
                nombre: nombreRutina,
                ejercicios: ejercicios
            };

            // Recuperar rutinas guardadas o inicializar arreglo
            const rutinasGuardadas = JSON.parse(localStorage.getItem("rutinas")) || [];
            rutinasGuardadas.push(nuevaRutina);
            localStorage.setItem("rutinas", JSON.stringify(rutinasGuardadas));

            alert("¡Rutina guardada con éxito!");
            rutinaForm.reset();
            listaEjercicios.innerHTML = ""; // Limpia los ejercicios dinámicos
        });
    }

    // ==========================================
    // 4. LÓGICA CALCULADORA DE CALORÍAS (calorias.html)
    // ==========================================
    const caloriasForm = document.getElementById("calorias-form");
    const resultadoContenedor = document.getElementById("resultado-calorias");

    if (caloriasForm) {
        caloriasForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const genero = document.getElementById("genero").value;
            const edad = parseInt(document.getElementById("edad").value);
            const peso = parseFloat(document.getElementById("peso").value);
            const altura = parseFloat(document.getElementById("altura").value);
            const actividad = parseFloat(document.getElementById("actividad").value);

            // Fórmula de Mifflin-St Jeor para Tasa Metabólica Basal (TMB)
            let tmb = (10 * peso) + (6.25 * altura) - (5 * edad);
            tmb += (genero === "hombre") ? 5 : -161;

            // Calorías de mantenimiento (TDEE)
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