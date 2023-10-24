document.addEventListener("DOMContentLoaded", async function () {
    const totalAmountElement = document.getElementById("total-amount");
    let totalDelCarrito = 0;
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) ;


    const usuarioDePrueba = 25801;
    const urlCarritoUsuario = `https://japceibal.github.io/emercado-api/user_cart/${usuarioDePrueba}.json`;

    let peogeotYaAgregado = false; 
    try {
        if (!peogeotYaAgregado) { // Verificar si aún no se ha agregado el artículo
            const response = await fetch(urlCarritoUsuario);
            const data = await response.json();
            const peugeot = data.articles[0]; // Tomar el primer artículo de los datos

            // Verificar si el artículo ya existe en el carrito antes de agregarlo
            const itemExists = cartItems.some(item => item.id === peugeot.id);

            if (!itemExists) {
                cartItems.push(peugeot);
                peogeotYaAgregado = true; // Marcar que el artículo se ha agregado
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }
        }
    } catch (error) {
        console.error("Error trayendo:", error);
    }



    const cartTableBody = document.getElementById("cartTableBody");
        
    cartItems.forEach((cartItem) => {
        // Crear una nueva fila para el producto
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><img src="${cartItem.image}" alt="${cartItem.name}"></td>
            <td>${cartItem.name}</td>
            <td>${cartItem.currency } ${cartItem.unitCost}</td>
            <td><input type="number" class="itemQuantity" value="${cartItem.count}" min="1"></td>
            <td>${cartItem.currency } <span class="itemSubtotal">${cartItem.unitCost * cartItem.count}</span></td>
            <td><button class="btnEliminar">Eliminar</button></td>
        `;

        cartTableBody.appendChild(newRow);

        const itemQuantityElement = newRow.querySelector(".itemQuantity");
        const itemSubtotalElement = newRow.querySelector(".itemSubtotal");
        const deleteButton = newRow.querySelector(".btnEliminar");

        // Pauta 3
        function updateSubtotal() {
            let newQuantity = parseInt(itemQuantityElement.value);

            // Validar que el valor no sea menor que 1
            if (newQuantity < 1) {
                newQuantity = 1;
                itemQuantityElement.value = 1;
            }

            const newSubtotal = newQuantity * cartItem.unitCost;
            itemSubtotalElement.textContent = `${newSubtotal}`;

            cartItem.count = newQuantity;
            updateTotal(); // Actualizar el total del carrito cuando cambia la cantidad
        }

          deleteButton.addEventListener("click", () => {
            newRow.remove();
            totalDelCarrito -= cartItem.unitCost * cartItem.count;
            totalAmountElement.textContent = totalDelCarrito;

            const index = cartItems.indexOf(cartItem);
            if (index !== -1) {
                cartItems.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Actualizar localStorage al eliminar un producto
            }


            updateTotal(); // Actualizar el total del carrito al eliminar un producto
        });

        itemQuantityElement.addEventListener("input", updateSubtotal);
    });

    // Actualizar el total del carrito al cargar la página
    updateTotal();
    
    function updateTotal() {
        let totalUSD = 0;
        let totalUYU = 0;
    
        cartItems.forEach((item) => {
            const itemCost = item.unitCost || 0;
            const subtotal = itemCost * item.count;
    
            if (item.currency === "USD") {
                totalUSD += subtotal;
            } else if (item.currency === "UYU") {
                totalUYU += subtotal;
            }
        });
    
        const totalUSDString = totalUSD !== 0 ? `USD: ${totalUSD}` : "";
        const totalUYUString = totalUYU !== 0 ? `UYU: ${totalUYU}` : "";
        const totalCarritoEsCero = totalUYU === 0 && totalUSD === 0 ?  "0" : "";

        // Mostrar los totales por separado en elementos HTML solo si no son cero
        totalAmountElement.textContent = `${totalUSDString} ${totalUYUString} ${totalCarritoEsCero}`;
    }

    // inicio de la pauta 6 entrega 2 //
   
    const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year');
	  ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  getJSONData("https://japceibal.github.io/emercado-api/cart/buy.json").then(function(resultObj){ //Llamo al json de los productos para agregar al carrito
      if (resultObj.status === "ok") {
          cart = resultObj.data;

          showProductsCart();
          subTotalProduct();
          modifyPurchaseData();
          shipping();
          
          
      }
  });

  getJSONData(CART_BUY_URL).then(function(resultObj){ 
      if (resultObj.status === "ok") {
          mensaje = resultObj.data;

      }
  });


  showcard();
});

    // fin de la entrega 6 pauta 2 //

});
