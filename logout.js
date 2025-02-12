function logout() {
    const confirmLogout = confirm("¿Está seguro de que desea cerrar sesión?");
    
    if (confirmLogout) {
        localStorage.clear(); // Borra todos los datos de localStorage
        alert("Sesión cerrada exitosamente.");
        window.location.href = "index.html"; // Redirige a la página de inicio de sesión
    }
}
