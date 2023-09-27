document.addEventListener("DOMContentLoaded", async function () {
    // Cargamos el id del producto desde el local storage
    const productID = localStorage.getItem("ProductoID");
    const user = localStorage.getItem("username")
    const catID = localStorage.getItem("catID");

    // Traemos los elementos del HTML
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("product-price");
    const productImages = document.getElementById("product-images");
    const comentariosAnteriores = document.getElementById("comentariosAnteriores");
    const productosContainer = document.getElementById("productos-container");



    /*     function showDataProduct(dataArrayProduct) {
            productName.innerHTML = dataArrayProduct.name;
            productDescription.innerHTML = dataArrayProduct.description;
            productPrice.innerHTML = `Precio: ${dataArrayProduct.cost}`;
            for (const item of dataArrayProduct.images) {
                const imagenDelProducto = document.createElement("img");
                imagenDelProducto.src = item;
                imagenDelProducto.alt = "Imagen del producto";
                imagenDelProducto.classList.add("imagen-del-producto");
                productImages.appendChild(imagenDelProducto);
            }
        } */

    //NUEVA FUNCION MODIFICADA PARA APLICAR CARRUSEL

    function showDataProduct(dataArrayProduct) {
        productName.innerHTML = dataArrayProduct.name;
        productDescription.innerHTML = dataArrayProduct.description;
        productPrice.innerHTML = `Precio: ${dataArrayProduct.cost}`;

        const carouselInner = document.querySelector("#product-images .carousel-inner");
        carouselInner.innerHTML = ''; // Limpiar cualquier contenido anterior en el carrusel

        dataArrayProduct.images.forEach((item, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");

            const imagenDelProducto = document.createElement("img");
            imagenDelProducto.src = item;
            imagenDelProducto.alt = "Imagen del producto";
            imagenDelProducto.classList.add("d-block", "w-100");

            // Marcar el primer elemento como activo
            if (index === 0) {
                carouselItem.classList.add("active");
            }

            carouselItem.appendChild(imagenDelProducto);
            carouselInner.appendChild(carouselItem);
        });
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

    // Función para mostrar los productos relacionados, entrega 4
function showRelatedProducts(productosRelacionados) {

    // Si no hubiese productos relacionados, cambiamos el titulo por uno que dice "No hay productos relacionados"
    const tituloProdRel = document.getElementById("h3-prod-rel");

    if (productosRelacionados.length === 0) {
        tituloProdRel.textContent = "No hay productos relacionados";
    } else {
        productosRelacionados.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            // Agregamos un enlace que englobe tanto el nombre como la imagen del producto
            const enlaceProducto = document.createElement("a");
            enlaceProducto.href = `product-info.html?productID=${producto.id}`;

            // Agregamos el nombre del producto
            const nombreProducto = document.createElement("p");
            nombreProducto.textContent = producto.name;

            // Agregamos la imagen del producto
            const imagenProducto = document.createElement("img");
            imagenProducto.src = producto.image;
            imagenProducto.alt = producto.name;

            // Agregamos el nombre y la imagen al enlace
            enlaceProducto.appendChild(imagenProducto);
            enlaceProducto.appendChild(nombreProducto);

            // Agregamos el enlace al div del producto
            productoDiv.appendChild(enlaceProducto);

            // Agregamos el div del producto al contenedor
            productosContainer.appendChild(productoDiv);

            // Establecemos el ID del producto relacionado en el localStorage
            enlaceProducto.addEventListener("click", function () {
                localStorage.setItem("ProductoID", producto.id);
            });
        });
    }
}

    try {
        const urlProduct = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
        const urlComent = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
        const urlCategoria = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        // Realizar las tres solicitudes HTTP al mismo tiempo usando Promise.all
        const [productResponse, commentsResponse, categoriaResponse] = await Promise.all([
            fetch(urlProduct),
            fetch(urlComent),
            fetch(urlCategoria)
        ]);

        const productData = await productResponse.json();
        const commentsData = await commentsResponse.json();
        const categoriaData = await categoriaResponse.json();

        // Llamamos a las funciones para mostrar los datos del producto y los comentarios.
        showDataProduct(productData);
        showComents(commentsData);

        // Obtén la lista de productos de la categoría actual
        const productosCategoriaActual = categoriaData.products;

        // Filtra los productos relacionados excluyendo el producto actual
        const productosRelacionados = productosCategoriaActual.filter(producto => producto.id !== parseInt(productID));

        // Llamar a la función para mostrar los productos relacionados
        showRelatedProducts(productosRelacionados);

    } catch (error) {
        console.error("Error trayendo datos:", error);
    }

    document.getElementById("enviarComentario").addEventListener("click", function () {
        // Obtener la calificación y comentario desde los campos de entrada
        var puntos = document.getElementById("puntosComentario").value;
        var comentario = document.getElementById("textoComentario").value;

        // Validar que no se haya ingresado un comentario vacio 
        if (comentario.trim() === "") {
            alert("Por favor ingrese un comentario válido.");
        } else {
            // Crear un nuevo comentario y agregarlo al contenedor existente
            var nuevoComentario = {
                user: user,
                score: puntos,
                description: comentario,
                dateTime: formatDateTime(new Date()) // Fecha y hora actual formateada con la funcion formatDateTime

            };

            // Mostrar el nuevo comentario en el mismo formato que los existentes usando la funcion showComments
            showComents([nuevoComentario]);

            // Limpiar los campos del formulario después de enviar
            document.getElementById("puntosComentario").value = 3; // Restablecer la calificación a 3
            document.getElementById("textoComentario").value = ""; // Limpiar el campo de texto

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
    // Funcion para formatear la fecha e igualarla al que se carga en los otros comentarios
    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
});


//Carrusel

// Obtén la referencia al elemento del carrusel
const carousel = document.querySelector("#product-images");

// Inicializa el carrusel de Bootstrap con un intervalo de tiempo para cambiar automáticamente las imágenes
const myCarousel = new bootstrap.Carousel(carousel, {
  interval: 2000, // Intervalo en milisegundos 
  pause: "hover", // Pausa el carrusel cuando el cursor está sobre él.
});

