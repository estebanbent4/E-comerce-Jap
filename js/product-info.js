document.addEventListener("DOMContentLoaded", async function () {
  // Recuperar el identificador del producto seleccionado del almacenamiento local
  const selectedProductID = localStorage.getItem("ProductoID");

  if (selectedProductID) {
    try {
      // Realizar la solicitud para obtener la información del producto
      const productInfo = await fetch(`https://japceibal.github.io/emercado-api/products/${selectedProductID}.json`);
      const productComments = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${selectedProductID}.json`);
      const productData = await productInfo.json();
      const productCommentsData = await productComments.json();

      // Llamar a una función para mostrar la información del producto y los comentarios
      showProductData(productData, productCommentsData);
    } catch (error) {
      console.error("Error al obtener los datos del producto o los comentarios:", error);
    }
  } else {
    // Manejar el caso en el que no se haya seleccionado ningún producto
    console.error("No se ha seleccionado ningún producto.");
  }
});

function showProductData(productData, productCommentsData) {
  // Crear elementos HTML dinámicamente para mostrar la información del producto y los comentarios
  const productNameElement = document.getElementById("product-name");
  const productDescriptionElement = document.getElementById("product-description");
  const productPriceElement = document.getElementById("product-price");
  const productImageElement = document.getElementById("product-images");
  const productCommentsDiv = document.getElementById("product-comments");


  // Crear elementos para mostrar la información del producto
  const productName = document.createElement("h1");
  const productDescription = document.createElement("p");
  const productPrice = document.createElement("p");
  const productImage = document.createElement("img");

  // Llenar los elementos con la información del producto
  productName.textContent = productData.name;
  productDescription.textContent = productData.description;
  productPrice.textContent = `${productData.currency} ${productData.cost}`;

  // Crear elementos para mostrar las imágenes del producto
  if (Array.isArray(productData.images)) {
    for (const imageUrl of productData.images) {
      const productImageItem = document.createElement("img");
      productImageItem.src = imageUrl;
      productImageItem.alt = productData.name;
      productImageItem.classList.add("product-image"); //  CSS
      productImageElement.appendChild(productImageItem); // Agregar la imagen al contenedor
    }
  }

  // Crear elementos para mostrar los comentarios del producto
  if (Array.isArray(productCommentsData)) {
    for (const comment of productCommentsData) {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const userElement = document.createElement("p");
      userElement.textContent = `Usuario: ${comment.user}`;

      const scoreElement = document.createElement("p");
      scoreElement.textContent = `Puntuación: ${comment.score}`;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Descripción: ${comment.description}`;

      const dateTimeElement = document.createElement("p");
      dateTimeElement.textContent = `Fecha y Hora: ${comment.dateTime}`;

      // Agregar elementos de comentario al div del comentario
      commentDiv.appendChild(userElement);
      commentDiv.appendChild(scoreElement);
      commentDiv.appendChild(descriptionElement);
      commentDiv.appendChild(dateTimeElement);

      // Agregar el div del comentario al contenedor de comentarios
      productCommentsDiv.appendChild(commentDiv);
    }
  }

  // Agregar los elementos al DOM
  productNameElement.appendChild(productName);
  productDescriptionElement.appendChild(productDescription);
  productPriceElement.appendChild(productPrice);

}
/*
document.addEventListener("DOMContentLoaded", async function () {
    // Recuperar el identificador del producto seleccionado del almacenamiento local
    const selectedProductID = localStorage.getItem("ProductoID");
  
    if (selectedProductID) {
      // Realizar la solicitud para obtener la información del producto
      const productInfo = await fetch(`https://japceibal.github.io/emercado-api/products/${selectedProductID}.json`);
      const productComments = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${selectedProductID}.json`);
      const productData = await productInfo.json();
      const  productCommen = await productComments.json();
      // Llamar a una función para mostrar la información del producto
      showProductData(productData, productCommen);

    } else {
      // Manejar el caso en el que no se haya seleccionado ningún producto
      console.error("No se ha seleccionado ningún producto.");
    }
  });
  
  function showProductData(productData, productCommen) {
    // Crear elementos HTML dinámicamente para mostrar la información del producto
    const productNameElement = document.getElementById("product-name");
    const productDescriptionElement = document.getElementById("product-description");
    const productPriceElement = document.getElementById("product-price");
    const productImageElement = document.getElementById("product-images");
    const productCommentsDiv = document.getElementById("product-comments");
  
    // Verifica si los elementos existen antes de intentar crear los elementos
    if (productNameElement && productDescriptionElement && productPriceElement && productImageElement) {
      // Crear elementos para mostrar la información
      const productName = document.createElement("h1");
      const productDescription = document.createElement("p");
      const productPrice = document.createElement("p");
      const productImage = document.createElement("img");
      const productCom = document.createElement("p");
  
      // Llenar los elementos con la información del producto
      productName.textContent = productData.name;
      productDescription.textContent = productData.description;
      productPrice.textContent = `${productData.currency} ${productData.cost}`;
      // Crear elementos para mostrar las imágenes del producto
    if (productData.images) {
      for (const imageUrl of productData.images) {
        const productImage = document.createElement("img");
        productImage.src = imageUrl;
        productImage.alt = productData.name;
        productImage.classList.add("product-images"); // Agrega una clase para estilos CSS
        console.log("imageurl: ", imageUrl)
      }
    }
   // Crear elementos para mostrar los comentarios del producto
   if (Array.isArray(productCommen)) {
    for (const comment of productCommen) {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const userElement = document.createElement("p");
      userElement.textContent = `Usuario: ${comment.user}`;

      const scoreElement = document.createElement("p");
      scoreElement.textContent = `Puntuación: ${comment.score}`;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Descripción: ${comment.description}`;

      const dateTimeElement = document.createElement("p");
      dateTimeElement.textContent = `Fecha y Hora: ${comment.dateTime}`;

      // Agregar elementos de comentario al div del comentario
      commentDiv.appendChild(userElement);
      commentDiv.appendChild(scoreElement);
      commentDiv.appendChild(descriptionElement);
      commentDiv.appendChild(dateTimeElement);

      // Agregar el div del comentario al contenedor de comentarios
      productCommentsDiv.appendChild(commentDiv);
    }
  }

      console.log("productdata: ", productData)//.name,productData.description,productData.currency, productData.cost,productData.image,productData.name)
      // Agregar los elementos al DOM
      productNameElement.appendChild(productName);
      productDescriptionElement.appendChild(productDescription);
      productPriceElement.appendChild(productPrice);
      productImageElement.appendChild(productImage);
    } else {
      console.error("Los elementos HTML para mostrar la información del producto no se encontraron en la página.");
    }
  }
  */