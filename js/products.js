document.addEventListener("DOMContentLoaded", function () {

  // cargamos el catID del local store (pauta 2 de la entrega 2)
  const catID = localStorage.getItem("catID");

  // creo una constante para traer el elemento del HTML donde quiero que aparezcan los títulos
  const container = document.querySelector(".pb-5.container .container");

  // creo una constante para traer el elemento del HTML donde quiero que aparezca la lista de productos
  const containerDeProductos = document.querySelector(".pb-5.container .container-de-productos");

  // creo una constante para traer el elemento del HTML que tengo que eliminar (alerta de función en desarrollo)
  const alert = document.querySelector(".pb-5.container .alert.alert-danger.text-center");

  //FUNCIÓN PARA MOSTRAR LA INFO
  function showData(dataArray) {
    const catName = dataArray.catName;
    console.log(dataArray)
    container.innerHTML += `<br> <h1> Productos </h1> <br> <h4> Verás aquí todos los productos de la categoría ${catName} </h4> <br> <hr>`
    // El for...of itera sobre los elementos del arreglo
    for (const item of dataArray.products) {

      // En la siguiente línea se crea un elemento div que sirva como contenedor para cada producto
      const containerParaProducto = document.createElement("div");
      // Acá se le agrega la clase datos-del-producto al elemento creado
      containerParaProducto.classList.add("container-para-producto");

      // En la siguiente línea se crea un elemento img que sirva para traer las imágenes de cada producto
      const imagenDelProducto = document.createElement("img");
      // Acá se le especifica de dónde tomarla, cuál es la descripción y su clase
      imagenDelProducto.src = item.image;
      imagenDelProducto.alt = "Imagen del producto";
      imagenDelProducto.classList.add("imagen-del-producto");

      // En la siguiente línea se crea un elemento div para contener el texto descriptivo de los productos y se le agrega la clase datos-del-producto
      const datosDelProducto = document.createElement("div");
      datosDelProducto.classList.add("datos-del-producto");
      // Acá se le carga al elemento creado el texto en cuestión usando template strings
      datosDelProducto.innerHTML += `
      <span class="texto-destacado"> ${item.name} - ${item.currency} ${item.cost} </span> <span class="vendidos"> ${item.soldCount} vendidos </span>
      <br> ${item.description}
    `;

      // En las siguientes líneas agregamos los elementos creados a los container individuales (containerParaProducto)
      containerParaProducto.appendChild(imagenDelProducto);
      containerParaProducto.appendChild(datosDelProducto);
    
      // En esta línea agregamos los containers individuales de los productos al container general de productos
      containerDeProductos.appendChild(containerParaProducto);
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
