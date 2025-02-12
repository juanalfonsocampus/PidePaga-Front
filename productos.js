document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

async function loadProducts() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Sin permiso: No existe un token.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/productos", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Error: " + errorMessage);
        }

        const products = await response.json();
        const productTable = document.getElementById("productTable");
        productTable.innerHTML = ""; // LIMPIAR LA TABLA

        products.forEach(product => {
            const row = `
                <tr>
                    <td>${product.idProducto}</td>
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                    <td>${product.disponibilidad ? "ACTIVO" : "INACTIVO"}</td>
                    <td></td>                
                </tr>
            `;
            productTable.innerHTML += row;
        });

    } catch (error) {
        console.error("Error:", error);
        alert("Algo falló al obtener los productos.");
    }
}

async function addProduct() {
    const productName = document.getElementById("productName").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();

    if (!productName || !productPrice) {
        alert("Debe llenar todos los campos.");
        return;
    }

    // Recuperar token
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Sin permiso: No existe un token.");
        return;
    }

    const productData = {
        nombre: productName,
        disponibilidad: true, // SIEMPRE ESTARÁ DISPONIBLE POR DEFECTO
        precio: parseFloat(productPrice)
    };

    try {
        const response = await fetch("http://localhost:3000/api/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Error: " + errorMessage);
        }

        const data = await response.json();
        alert("Producto añadido exitosamente.");
        location.reload(); 
    } catch (error) {
        console.error("Error:", error);
        alert("Algo falló. Intentar nuevamente.");
    }
}





