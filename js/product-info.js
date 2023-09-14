document.addEventListener("DOMContentLoaded", async function () {
    // Cargamos el id del producto desde el local storage
    const productID = localStorage.getItem("ProductoID");
    const user = localStorage.getItem("username")
    // Traemos los elementos del HTML
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("product-price");
    const productImages = document.getElementById("product-images");
    const divImages = document.getElementById("div-images");
    const comentariosAnteriores = document.getElementById("comentariosAnteriores");

    function showDataProduct(dataArrayProduct) {
        productName.innerHTML = dataArrayProduct.name;
        productDescription.innerHTML = dataArrayProduct.description;
        productPrice.innerHTML =`Precio: ${dataArrayProduct.cost}`;

        for (const item of dataArrayProduct.images) {
            const imagenDelProducto = document.createElement("img");
            imagenDelProducto.src = item;
            imagenDelProducto.alt = "Imagen del producto";
            imagenDelProducto.classList.add("imagen-del-producto");
            productImages.appendChild(imagenDelProducto);
        }
    }
    function showComents(dataComents) {
        dataComents.reverse(); // Invierte el orden de los comentarios para agregar los nuevos al principio
        dataComents.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = "comentario";
    
            commentDiv.innerHTML = `
                <h3>${comment.user} - ${comment.dateTime} - Calificación: ${generarEstrellas(comment.score)}</h3>
                <p>${comment.description}</p>
            `;
    
            comentariosAnteriores.insertBefore(commentDiv, comentariosAnteriores.firstChild);
        });
    }


    try {
        const urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
        const urlComent = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

        // Realizamos ambas solicitudes HTTP al mismo tiempo usando Promise.all .
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

    document.getElementById("enviarComentario").addEventListener("click", function () {
        // Obtener la calificación y comentario desde los campos de entrada
        var puntos = document.getElementById("puntosComentario").value;
        var comentario = document.getElementById("textoComentario").value;

        // Validar que se haya ingresado un comentario
        if (comentario.trim() === "") {
            alert("Por favor, ingresa tu comentario.");
        } else {
            // Crear un nuevo comentario y agregarlo al contenedor existente
            var nuevoComentario = {
                user: user, // Puedes personalizar el nombre de usuario
                score: puntos,
                description: comentario,
                dateTime: formatDateTime(new Date()) // Fecha y hora actual formateada

            };

            // Mostrar el nuevo comentario en el mismo formato que los existentes
            showComents([nuevoComentario]);


            // Limpiar los campos del formulario después de enviar
            document.getElementById("puntosComentario").value = ""; // Restablecer la calificación a 3
            document.getElementById("textoComentario").value = ""; // Limpiar el campo de texto

            // Mostrar una alerta (puedes comentar o eliminar esta línea si no deseas la alerta)
            alert("¡Comentario enviado!");
        }
    });

    // Función para generar estrellas según la calificación
    function generarEstrellas(calificacion) {
        var estrellasHTML = "";
        for (var i = 1; i <= 5; i++) {
            if (i <= calificacion) {
                estrellasHTML += '<span class="fa fa-star checked"></span>';
            } else {
                estrellasHTML += '<span class="fa fa-star"></span>';
            }
        }
        return estrellasHTML;
    }
    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un 0 si es necesario
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
});
