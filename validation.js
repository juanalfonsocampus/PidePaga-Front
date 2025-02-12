document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("NO ESTÁ PERMITIDO");
        window.location.href = "index.html"; // Redirige al login si no hay token
    } else {
        document.body.style.display = "block"; // Muestra la página si el usuario está autenticado
    }
});