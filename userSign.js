document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const name = document.getElementById("name").value.trim();
        const cedula = document.getElementById("cedula").value.trim();
        const userName = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const email = document.getElementById("email").value.trim();

        // Verificar que los campos obligatorios no estén vacíos
        if (!name || !cedula || !userName || !password || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        // Crear objeto con los datos del usuario
        const userData = {
            name: name,
            cedula: cedula,
            userName: userName,
            password: password,
            email: email
        };

        try {
            // Hacer la petición de registro
            const response = await fetch("http://localhost:3000/api/clientes/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error("Error: " + errorMessage);
            }

            const data = await response.json();

            // Guardar los datos en localStorage
            localStorage.setItem("username", userName);
            localStorage.setItem("token", data.token);
            localStorage.setItem("adminId", data.id); // Asumiendo que el backend devuelve un ID

            alert("Registro exitoso.");
            window.location.href = "productos.html"; // Redirigir a la página principal

        } catch (error) {
            console.error("Error:", error);
            alert("Algo salió mal. Intenta otra vez.");
        }
    });
});
