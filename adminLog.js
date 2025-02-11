document.addEventListener("DOMContentLoaded", function () {
    localStorage.clear(); // Borra todos los datos de localStorage
    const loginButton = document.querySelector("button"); // Botón de Login

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Evitar recarga de la página

        // Obtener valores de los inputs
        const email = document.getElementById("typeEmailX").value;
        const password = document.getElementById("typePasswordX").value;

        // Verificar que los campos no estén vacíos
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Crear parámetros de solicitud
        const params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);

        try {
            // Hacer la petición de login con ParamRequest
            const response = await fetch(`http://localhost:3000/api/admins/login?${params.toString()}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json(); // Convertir respuesta a JSON

            // Guardar el token y email en localStorage
            localStorage.setItem("email", email);
            localStorage.setItem("token", data.token);

            alert("Inicio de sesión Exitoso.");
            window.location.href = "productos.html"; // Redirigir a la página principal

        } catch (error) {
            console.error("Error:", error);
            alert("Algo falló.");
        }
    });
});
