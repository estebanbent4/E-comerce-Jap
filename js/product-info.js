document.addEventListener("DOMContentLoaded", async function () {
    // Recuperar el identificador del producto seleccionado del almacenamiento local
    const selectedProductID = localStorage.getItem("selectedProductID");
  
    if (selectedProductID) {
      // Realizar la solicitud para obtener la información del producto
      const productInfo = await fetch(`https://tu-api.com/products/${selectedProductID}`);
      const productData = await productInfo.json();
  
      // Llamar a una función para mostrar la información del producto
      showProductData(productData);
    } else {
      // Manejar el caso en el que no se haya seleccionado ningún producto
      console.error("No se ha seleccionado ningún producto.");
    }
  });
  
  function showProductData(productData) {
    // Crear elementos HTML dinámicamente para mostrar la información del producto
    const productNameElement = document.getElementById("product-name");
    const productDescriptionElement = document.getElementById("product-description");
    const productPriceElement = document.getElementById("product-price");
    const productImageElement = document.getElementById("product-image");
  
    // Verifica si los elementos existen antes de intentar crear los elementos
    if (productNameElement && productDescriptionElement && productPriceElement && productImageElement) {
      // Crear elementos para mostrar la información
      const productName = document.createElement("h1");
      const productDescription = document.createElement("p");
      const productPrice = document.createElement("p");
      const productImage = document.createElement("img");
  
      // Llenar los elementos con la información del producto
      productName.textContent = productData.name;
      productDescription.textContent = productData.description;
      productPrice.textContent = `${productData.currency} ${productData.cost}`;
      productImage.src = productData.image;
      productImage.alt = productData.name;
  
      // Agregar los elementos al DOM
      productNameElement.appendChild(productName);
      productDescriptionElement.appendChild(productDescription);
      productPriceElement.appendChild(productPrice);
      productImageElement.appendChild(productImage);
    } else {
      console.error("Los elementos HTML para mostrar la información del producto no se encontraron en la página.");
    }
  }
  