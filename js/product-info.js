document.addEventListener("DOMContentLoaded", async function () {

    // Cargamos el id del producto desde el local storage
    const productID = localStorage.getItem("ProductoID");

    // Traemos los elementos del HTML 
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("product-price");
    const productImages = document.getElementById("product-images");
    const productComments = document.getElementById("product-comments");

    function showDataProduct(dataArrayProduct) {
        productName.innerHTML = dataArrayProduct.name;
        productDescription.innerHTML = dataArrayProduct.description;
        productPrice.innerHTML = dataArrayProduct.cost;
        for (const item of dataArrayProduct.images) {

            const imagenDelProducto = document.createElement("img");
            imagenDelProducto.src = item;
            imagenDelProducto.alt = "Imagen del producto";
            imagenDelProducto.classList.add("imagen-del-producto");
            productImages.appendChild(imagenDelProducto);
        }
    }

    const urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`

    try {
        const response = await fetch(urlProduct);
        const data = await response.json();
        originalData = data; // Almacenar los datos originales
        showDataProduct(data);
    } catch (error) {
        console.error("Error trayendo:", error);
    }

})




