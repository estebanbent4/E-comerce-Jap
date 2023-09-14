document.addEventListener("DOMContentLoaded", async function () {
  const catID = localStorage.getItem("catID");
 
  const containerDeProductos = document.querySelector(".pb-5.container .container-de-productos");
  const botonLimpiar = document.querySelector("#limpiar");

  //FUNCIONALIDAD PARA FILTROS:
  const precioMinInput = document.getElementById("precio-min");
  const precioMaxInput = document.getElementById("precio-max");
  const aplicarFiltroBtn = document.getElementById("aplicar-filtro");
  const ordenRelevanciaBtn = document.getElementById("orden-relevancia");
  const ordenarDesc = document.getElementById("orden-precio-desc")
  const ordenarAsc = document.getElementById("orden-precio-asc")

  let originalData;
  // Función para el botón limpiar, limpia los campos de input
  botonLimpiar.addEventListener("click", function () {
    document.querySelector("#precio-min").value = "";
    document.querySelector("#precio-max").value = "";
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: originalData.products });

  });

  const buscadorInput = document.getElementById("buscador-productos");


  
  buscadorInput.addEventListener("input", function () {
    const searchText = buscadorInput.value.toLowerCase(); 

    const productosFiltrados = originalData.products.filter(producto => {
      const titulo = producto.name.toLowerCase();
      const descripcion = producto.description.toLowerCase();
      return titulo.includes(searchText) || descripcion.includes(searchText);
    });
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosFiltrados });
  });


  aplicarFiltroBtn.addEventListener("click", function () {
    const precioMin = parseFloat(precioMinInput.value);
    const precioMax = parseFloat(precioMaxInput.value);
    if (isNaN(precioMin)
      || isNaN(precioMax)
      || precioMinInput.value.trim() === ""
      || precioMaxInput.value.trim() === ""
    ) {
      window.alert("Por favor, ingresa valores numéricos en ambos campos de precio.");
    } else {
      const productosFiltrados = originalData.products.filter(producto => {
        return producto.cost >= precioMin && producto.cost <= precioMax;
      });
      containerDeProductos.innerHTML = "";
      showData({ catName: originalData.catName, products: productosFiltrados });
    }
  });

  ordenRelevanciaBtn.addEventListener("click", function () {
    const productosOrdenados = originalData.products.slice().sort((a, b) => {
      return b.soldCount - a.soldCount;
    });
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosOrdenados });
  });

  ordenarAsc.addEventListener("click", function () {
    const productosOrdenados = originalData.products.slice().sort((a, b) => {
      return a.cost - b.cost;
    });
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosOrdenados });
  });

  ordenarDesc.addEventListener("click", function () {
    const productosOrdenados = originalData.products.slice().sort((a, b) => {
      return b.cost - a.cost;
    });
    containerDeProductos.innerHTML = "";
    showData({ catName: originalData.catName, products: productosOrdenados });
  });
  function showData(dataArray, includeCategoryInfo = true) {
    const catName = dataArray.catName;
   
    if (includeCategoryInfo) {
      const categoryInfoElement = document.getElementById("category-info");
      categoryInfoElement.innerHTML = `
        <br> <h1> Productos </h1>
        <br> <h4> Verás aquí todos los productos de la categoría ${catName} </h4>
        <br> <hr>
      `;
    }
    for (const item of dataArray.products) {
      const containerParaProducto = document.createElement("div");
      containerParaProducto.classList.add("container-para-producto");
      const imagenDelProducto = document.createElement("img");
      imagenDelProducto.src = item.image;
      imagenDelProducto.alt = "Imagen del producto";
      imagenDelProducto.classList.add("imagen-del-producto");
      const datosDelProducto = document.createElement("div");
      datosDelProducto.classList.add("datos-del-producto");
      datosDelProducto.innerHTML += `
      <span class="texto-destacado"> ${item.name} - ${item.currency} ${item.cost} </span> <span class="vendidos"> ${item.soldCount} vendidos </span>
      <br> ${item.description}
    `
    ;
      containerParaProducto.appendChild(imagenDelProducto);
      containerParaProducto.appendChild(datosDelProducto);
      containerDeProductos.appendChild(containerParaProducto);


    //pauta 1 entrega3
    containerParaProducto.addEventListener("click", function () {
    // Guardar el identificador del producto en el almacenamiento local
     localStorage.setItem("ProductoID", item.id);
      console.log("ProductoID: ", item.id );
    // Redirigir a la página de detalles del producto
     window.location.href = "product-info.html";
  });
    }
  }

  const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
  try {
    const response = await fetch(url);
    const data = await response.json();
    originalData = data; 
    showData(data);
  } catch (error) {
    console.error("Error trayendo:", error);
  }
 
});

