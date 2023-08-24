document.addEventListener("DOMContentLoaded", function () {

  // cargamos el catID del local store(pauta 2 de la entrega 2)
  const catName = localStorage.getItem("catID");

  // creo una constante para traer el elemento del HTML donde quiero que aparezcan los datos
  const container = document.querySelector(".pb-5.container");

  // creo una constante para traer el elemento del HTML que tengo que eliminar (alerta de función en desarrollo)
  const alert = document.querySelector(".pb-5.container .alert.alert-danger.text-center");

  //FUNCION PARA MOSTRAR LA INFO
  function showData(dataArray) {
    container.innerHTML = `<br> <h1> Productos </h1> <br> <h4> Verás aquí todos los productos de la categoría Autos </h4> <br> <hr>`
    // El for...of itera sobre los elementos del arreglo
    for (const item of dataArray) {
      // En la siguiente línea se utilizan "backticks" para armar el String.
      container.innerHTML += `
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
  fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json())
    .then(data => {
      const autosArray = data.products; // Asignamos el arreglo de productos del JSON a autosArray
      alert.remove();
      showData(autosArray);
    })
    .catch(error => {
      console.error("Error trayendo:", error);
    });

});
