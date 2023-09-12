document.addEventListener("DOMContentLoaded", async function () {

    // Cargamos el id del producto desde el local storage
    const productID = localStorage.getItem("ProductoID");

    // Traemos los elementos del HTML 
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("product-price");
    const productImages = document.getElementById("product-images");
    const divImages = document.getElementById("div-images");

    const productComments = document.getElementById("product-comments");

    function showDataProduct(dataArrayProduct) {
        /**
         *        productName.innerHTML = dataArrayProduct.name
        productPrice.innerHTML = `<hr> <span class="texto-negrita"> Precio </span> <br> ${dataArrayProduct.currency} ${dataArrayProduct.cost}`;
        productDescription.innerHTML = `<span class="texto-negrita"> Descripción </span> <br> ${dataArrayProduct.description}`;
        productImages.innerHTML = `<span class="texto-negrita"> Imágenes ilustrativas </span> <br> `
         */
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
    function showComents(dataComents) {

        dataComents.forEach(comment => {
            const commentDiv = document.createElement('div');

            // Agrega contenido HTML al div del comentario usando los datos del JSON.
            commentDiv.innerHTML = `
                <h3>${comment.user} - ${comment.dateTime} - Calificación: ${comment.score}</h3>
               
                <p>${comment.description}</p>
                
            `;
            // <p>Calificación: ${comment.score}</p>
            //<p>Fecha y Hora: ${comment.dateTime}</p>
            // Agrega el div del comentario al contenedor 'productComments'.
            productComments.appendChild(commentDiv);
        });
    }

    try {
        const urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
        const urlComent = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

        // Realizamos ambas solicitudes HTTP al mismo tiempo usando Promise.all
        const [productResponse, commentsResponse] = await Promise.all([
            fetch(urlProduct),
            fetch(urlComent)
        ]);

        const productData = await productResponse.json();
        const commentsData = await commentsResponse.json();

        // Llamamos a las funciones para mostrar los datos del producto y los comentarios.
        showDataProduct(productData);
        showComents(commentsData);
    } catch (error) {
        console.error("Error trayendo datos:", error);
    }
})




