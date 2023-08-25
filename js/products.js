document.addEventListener("DOMContentLoaded", function () {

  // cargamos el catID del local store (pauta 2 de la entrega 2)
  const catID= localStorage.getItem("catID");
  
  // creo una constante para traer el elemento del HTML donde quiero que aparezcan los datos
  const container = document.querySelector(".pb-5.container");

  // creo una constante para traer el elemento del HTML que tengo que eliminar (alerta de función en desarrollo)
  const alert = document.querySelector(".pb-5.container .alert.alert-danger.text-center");

  //FUNCIÓN PARA MOSTRAR LA INFO
  function showData(dataArray) {
    const catName = dataArray.catName;
    console.log(dataArray)
    container.innerHTML = `<br> <h1> Productos </h1> <br> <h4> Verás aquí todos los productos de la categoría ${catName} </h4> <br> <hr>`
    // El for...of itera sobre los elementos del arreglo
    for (const item of dataArray.products) {
      // En la siguiente línea se utilizan "backticks" para armar el String
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
  
 const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
  //FUNCIÓN PARA TRAER LA INFO DE LA API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      alert.remove();
      showData(data);
    })
    .catch(error => {
      console.error("Error trayendo:", error);
    });
 });