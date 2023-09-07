document.addEventListener("DOMContentLoaded", async function () {
    // Recuperar el identificador del producto seleccionado del almacenamiento local
    const selectedProductID = localStorage.getItem("selectedProductID");
    
    
    if (selectedProductID) {
      // Realizar la solicitud para obtener la información del producto
      const productInfo = await fetch(`https://japceibal.github.io/emercado-api/products/${selectedProductID}`);
      const productData = await productInfo.json();
  
      // Mostrar la información del producto en la página
      // Aquí puedes usar el productData para mostrar los detalles del producto en la página
    } else {
      // Manejar el caso en el que no se haya seleccionado ningún producto
      console.error("No se ha seleccionado ningún producto.");
    }
  });
  