//FUNCION PARA MOSTRAR LA INFO
function showData(dataArray) {
    // El for...of itera sobre los elementos del arreglo
    for (const item of dataArray) {
      // En la siguiente línea se utilizan "backticks" para armar el String.
      container.innerHTML += `
        <p>ID: ${item.id}</p>
        <p>Nombre: ${item.name}</p>
        <p>Precio: ${item.cost} ${item.currency}</p>
        <p>Descripción: ${item.description}</p>
        <p>Vendidos: ${item.soldCount}</p>
        <img src="${item.image}" alt="Imagen del producto">
        <hr>
      `;
    }
  }

  //FUNCION PARA TRAER LA INFO DE LA API PRODUCTOS
  fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
      const autosArray = data.products; // Asignamos el arreglo de productos del JSON a autosArray
      showData(autosArray);
    })
    .catch(error => {
      console.error("Error trayendo:", error);
    });