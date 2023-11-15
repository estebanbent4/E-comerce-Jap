
document.addEventListener("DOMContentLoaded", async function () {

    // ELEMENTOS DE LA TABLA DE COSTOS
    const totalAmountElement = document.getElementById("total-amount");
    const subtotalAmountElement = document.getElementById("subtotal-amount");
    const shippingCostElement = document.getElementById("shipping-cost");
    const cartTableBody = document.getElementById("cartTableBody");

    // VARIABLES PARA CALCULAR COSTOS
    let totalFinal = 0;
    let costoEnvio = 0;
    let subTotalFinal = 0;
    let valorDolar = 38.8

    // VARIABLES PARA MOSTRAR ARTÍCULOS
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Acá si no hay nada guardado, se inicializa vacío
    let peugeotYaAgregado = JSON.parse(localStorage.getItem("peugeotYaAgregado")) || false; // Acá si no hay nada guardado, se falso
    
    // ELEMENTOS DEL ENCABEZADO
    const nombreUsuario = document.getElementById("nombUsuario");
    const nombreUsuarioGuardado = localStorage.getItem("username");
    // Muestra el nombre del usuario en el encabezado
    nombreUsuario.textContent = nombreUsuarioGuardado.toString();
    
    // COTIZACIÓN DEL DOLAR
    const valorDolarP = document.getElementById("valorDolar");
    valorDolarP.textContent += `Valor del dolar hoy: $${valorDolar}`;

    // Fetch para traer producto ya cargado
    const usuarioDePrueba = 25801;
    const urlCarritoUsuario = `https://japceibal.github.io/emercado-api/user_cart/${usuarioDePrueba}.json`;

    try {
        if (!peugeotYaAgregado) { // Verificar si aún no se ha agregado el artículo
            const response = await fetch(urlCarritoUsuario);
            const data = await response.json();
            const peugeot = data.articles[0]; // Tomar el primer artículo de los datos
    
            // Verificar si el artículo ya existe en el carrito antes de agregarlo
            const itemExists = cartItems.some(item => item.id === peugeot.id);
    
            // Verificar si el artículo no existe en el carrito y tampoco ha sido agregado ya, si se cumple añadirlo
            if (!itemExists && !peugeotYaAgregado) {
                cartItems.push(peugeot);
                peugeotYaAgregado = true; // Marcar que el artículo se ha agregado
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                localStorage.setItem("peugeotYaAgregado", JSON.stringify(peugeotYaAgregado));
            }
        }
    } catch (error) {
        console.error("Error trayendo:", error);
    }

    // Bucle para visualizar los productos del carrito
    cartItems.forEach((cartItem) => {

        // Crear una nueva fila para el producto
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><img src="${cartItem.image}" alt="${cartItem.name}"></td>
            <td>${cartItem.name}</td>
            <td>${cartItem.currency} ${cartItem.unitCost}</td>
            <td><input type="number" class="itemQuantity" value="${cartItem.count}" min="1"></td>
            <td>${cartItem.currency} <span class="itemSubtotal">${cartItem.unitCost * cartItem.count}</span></td>
            <td><button class="btnEliminar">Eliminar</button></td>
        `;

        cartTableBody.appendChild(newRow);

        const itemQuantityElement = newRow.querySelector(".itemQuantity");
        const itemSubtotalElement = newRow.querySelector(".itemSubtotal");
        const deleteButton = newRow.querySelector(".btnEliminar");

        //  Función para actualizar el subtotal de cada elemento del carrito al cargar la página
        function updateSubtotal() {
            let newQuantity = parseInt(itemQuantityElement.value);
            const newSubtotal = newQuantity * cartItem.unitCost;
            itemSubtotalElement.textContent = `${newSubtotal}`;
            cartItem.count = newQuantity;
            updateSubTotal(); // Actualizar el subTotal general del carrito cuando cambia la cantidad
            updateTotal() // Actualizar el total general del carrito cuando cambia la cantidad
        }

        //  Función para eliminar un item con el botón eliminar
        deleteButton.addEventListener("click", () => {
            newRow.remove();

            const index = cartItems.indexOf(cartItem);
            if (index !== -1) {
                cartItems.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Actualizar localStorage al eliminar un producto
            }

            updateSubTotal(); // Actualizar el subTotal general del carrito al eliminar un producto
            updateTotal() // Actualizar el total general del carrito al eliminar un producto
        });

        itemQuantityElement.addEventListener("input", updateSubtotal);
    });

    // Función para actualizar el subtotal
    function updateSubTotal() {
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

        let totalUYUenUSD = Math.round(totalUYU / valorDolar);

        subTotalFinal = totalUYUenUSD + totalUSD;
        const subTotalFinalString = subTotalFinal !== 0 ? `USD ${subTotalFinal}` : "USD 0";

        // Mostrar el total
        subtotalAmountElement.textContent = `${subTotalFinalString}`;
    }

    // Función para actualizar el costo de envío
    const envioPremium = document.getElementById("form-tipo-envio-premium");
    const envioExpress = document.getElementById("form-tipo-envio-express");
    const envioStandard = document.getElementById("form-tipo-envio-standard");

    function updateCostoEnvio() {

        if (envioPremium.checked) {
            costoEnvio = Math.round(subTotalFinal * 0.15);
        } else if (envioExpress.checked) {
            costoEnvio = Math.round(subTotalFinal * 0.07);
        } else if (envioStandard.checked) {
            costoEnvio = Math.round(subTotalFinal * 0.05);
        } else if (totalFinal == 0) {
            costoEnvio = 0;
        } else if (!envioExpress.checked && !envioPremium.checked && !envioStandard.checked) {
            costoEnvio = 0;
        }
        // Mostrar el costo
        shippingCostElement.textContent = `USD ${costoEnvio}`;
    }

    // Permite deseleccionar los radio buttons clickeando sobre ellos
    // y actualiza el costo de envío y el total
    let radios = document.querySelectorAll("[type='radio']");
    radios.forEach((x) => {
        x.dataset.val = x.checked; // Guarda el estado del radio button dentro del elemento
        x.addEventListener('click', (e) => {
            let element = e.target;
            if (element.dataset.val == 'false') {
                element.dataset.val = 'true';
                element.checked = true;
                updateCostoEnvio();
                updateTotal();
            } else {
                element.dataset.val = 'false';
                element.checked = false;
                updateCostoEnvio();
                updateTotal();
            }
        }, true);
    });

    //  Función para actualizar el total del carrito 
    function updateTotal() {
        updateCostoEnvio()
        totalFinal = costoEnvio + subTotalFinal;
        console.log("totalFinal:" + totalFinal + "subTotalFinal:" + subTotalFinal);

        // Mostrar total final
        totalAmountElement.textContent = `USD ${totalFinal}`;
    }

    // Llamadas a las funciones para actualizar el subTotal y Total del carrito al cargar la página
    updateSubTotal();
    updateTotal();

    // Validaciones antes de compra
    const confirmarCompraBtn = document.getElementById("confirmarCompraBtn")
    const tipoPago = document.getElementById("tipoPago");

    confirmarCompraBtn.addEventListener("click", function () {

        var calle = document.getElementById('form-envio-calle');
        var numero = document.getElementById('input-numero');
        var esquina = document.getElementById('form-envio-esquina');
        var formaEnvio = document.querySelector('input[name="input-tipo-envio"]:checked');
        const htipoEnvio = document.getElementById("tipo-envio-")
        
        if (!formaEnvio) {
            htipoEnvio.innerHTML = "Debe seleccionar un tipo de envío.";
            htipoEnvio.classList.add('is-invalid');
            return;
        } else {
            htipoEnvio.classList.remove('is-invalid');
            htipoEnvio.innerHTML = "Tipo de envío";
        }

        if (!calle.value) {
            calle.classList.add('is-invalid');
            return;
        } else {
            calle.classList.remove('is-invalid');
        }

        if (!numero.value) {
            numero.classList.add('is-invalid');
            return;
        } else {
            numero.classList.remove('is-invalid');
        }

        if (!esquina.value) {
            esquina.classList.add('is-invalid');
            return;
        } else {
            esquina.classList.remove('is-invalid');
        }

        // Validación de método de pago
        const tarjetaCredito = document.getElementById("completarTarjeta");
        const transferenciaBancaria = document.getElementById("completarCuenta");

        if (!tarjetaCredito.classList.contains("active") && !transferenciaBancaria.classList.contains("active")) {
            tipoPago.classList.add("is-invalid"); // Marca el título del método de pago
            return;
        }
        // Mostrar un mensaje de éxito (puedes personalizar esto según tus necesidades)
        alert('Compra confirmada. Gracias por tu compra!');

        // Limpiar los campos del formulario después de la confirmación
        tipoPago.innerHTML = "No se ha seleccionado método  de pago"
        document.getElementById('direccion-envio').reset();
        document.getElementById('tipo-envio').reset();
    })

})