document.addEventListener("DOMContentLoaded", async function () {
  // function ()   estaba en lugar de async cunction 

  // cargamos el catID del local store (pauta 2 de la entrega 2)
  const catID = localStorage.getItem("catID");

  // creo una constante para traer el elemento del HTML donde quiero que aparezcan los títulos
  const container = document.querySelector(".pb-5.container .container");

  // creo una constante para traer el elemento del HTML donde quiero que aparezca la lista de productos
  const containerDeProductos = document.querySelector(".pb-5.container .container-de-productos");

  // creo una constante para traer del HTML el botón "limpiar"
  const botonLimpiar = document.querySelector("#limpiar");

  // creo una constante para traer el elemento del HTML que tengo que eliminar (alerta de función en desarrollo)
  const alert = document.querySelector(".pb-5.container .alert.alert-danger.text-center");

  //FUNCIONALIDAD PARA FILTROS:
  // Agrega los elementos HTML y el botón para los filtros de precio
  const precioMinInput = document.getElementById("precio-min");
  const precioMaxInput = document.getElementById("precio-max");
  const aplicarFiltroBtn = document.getElementById("aplicar-filtro");
  const ordenRelevanciaBtn = document.getElementById("orden-relevancia");
  const ordenarDesc = document.getElementById("orden-precio-desc")
  const ordenarAsc = document.getElementById("orden-precio-asc")

  let originalData; // Almacenar los datos originales
  /*
  originalData se utiliza como una copia de respaldo de los datos originales obtenidos de la API. 
  Esto asegura que las operaciones de filtrado, ordenamiento y búsqueda se realicen en copias de los datos, 
  sin afectar los datos originales. De esta manera, siempre puedes volver a la configuración original si es necesario.
  */


  // Función para el botón limpiar, limpia los campos de input
  botonLimpiar.addEventListener("click", function () {
    document.querySelector("#precio-min").value = "";
    document.querySelector("#precio-max").value = "";

    //funcionalidad para restablecer los productos
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: originalData.products });

  });

  const buscadorInput = document.getElementById("buscador-productos");


  //Aquí se agrega un evento que escucha cambios en el campo de búsqueda(buscadorInput) cada vez que el usuario ingresa texto en él.  
  buscadorInput.addEventListener("input", function () {
    const searchText = buscadorInput.value.toLowerCase(); // Obtiene el valor del campo de búsqueda y lo convierte a minúsculas.

    const productosFiltrados = originalData.products.filter(producto => {
      const titulo = producto.name.toLowerCase();
      const descripcion = producto.description.toLowerCase();
      return titulo.includes(searchText) || descripcion.includes(searchText);
    });

    // Limpia el contenedor de productos y muestra los productos filtrados
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosFiltrados });
  });


  aplicarFiltroBtn.addEventListener("click", function () {
    const precioMin = parseFloat(precioMinInput.value);
    const precioMax = parseFloat(precioMaxInput.value);

    // isNaN significa isNotaNumber, es decir, verifica que el dato ingresado sea un numero
    if (isNaN(precioMin)
      || isNaN(precioMax)
      || precioMinInput.value.trim() === ""
      || precioMaxInput.value.trim() === ""
      // || precioMin>precioMax
    ) {
      //Si no cumplen con los requisitos, se muestra una alerta usando window.alert.
      window.alert("Por favor, ingresa valores numéricos en ambos campos de precio.");
    } else {
      const productosFiltrados = originalData.products.filter(producto => {
        return producto.cost >= precioMin && producto.cost <= precioMax;
      });

      // Limpia el contenedor de productos y muestra los productos filtrados
      containerDeProductos.innerHTML = "";
      showData({ catName: originalData.catName, products: productosFiltrados });
    }
  });

  /*
  originalData.products.slice(): Aquí se realiza una copia superficial (shallow copy) 
  del arreglo products contenido en el objeto originalData. Esto se hace utilizando el método slice() sin argumentos.
  La idea detrás de esto es evitar que se modifiquen los datos originales mientras se realiza el proceso de ordenamiento.

  sort((a, b) => { ... }): Después de crear la copia, se aplica el método sort() al arreglo copiado. 
  El método sort() permite ordenar los elementos de un arreglo en función de un criterio específico. 
  En este caso, se utiliza una función de comparación (a, b) => { ... } 
  que determina cómo se deben comparar los elementos para ordenarlos.
  */

  ordenRelevanciaBtn.addEventListener("click", function () {
    const productosOrdenados = originalData.products.slice().sort((a, b) => {
      return b.soldCount - a.soldCount;
    });
    // Limpia el contenedor de productos y muestra los productos ordenados
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosOrdenados });
  });

  ordenarAsc.addEventListener("click", function () {
    const productosOrdenados = originalData.products.slice().sort((a, b) => {
      return a.cost - b.cost;
    });
    // Limpia el contenedor de productos y muestra los productos ordenados
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosOrdenados });
  });

  ordenarDesc.addEventListener("click", function () {
    const productosOrdenados = originalData.products.slice().sort((a, b) => {
      return b.cost - a.cost;
    });
    // Limpia el contenedor de productos y muestra los productos ordenados
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosOrdenados });
  });

  //FUNCIÓN PARA MOSTRAR LA INFO
  function showData(dataArray, includeCategoryInfo = true) {
    const catName = dataArray.catName;
    console.log(dataArray)

    // se repetia el siguiente texto 
    if (includeCategoryInfo) {
      const categoryInfoElement = document.getElementById("category-info");
      categoryInfoElement.innerHTML = `
        <br> <h1> Productos </h1>
        <br> <h4> Verás aquí todos los productos de la categoría ${catName} </h4>
        <br> <hr>
      `;
    }

    //container.innerHTML += `<br> <h1> Productos </h1> <br> <h4> Verás aquí todos los productos de la categoría ${catName} </h4> <br> <hr>`

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
  try {
    const response = await fetch(url);
    const data = await response.json();

    alert.remove();
    originalData = data; // Almacenar los datos originales
    showData(data);
  } catch (error) {
    console.error("Error trayendo:", error);
  }
  // //FUNCIÓN PARA TRAER LA INFO DE LA API
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     alert.remove();
  //     originalData = data; // Almacenar los datos originales
  //     showData(data);
  //   })
  //   .catch(error => {
  //     console.error("Error trayendo:", error);
  //   });
});

