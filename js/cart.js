document.addEventListener("DOMContentLoaded", async function () {
    const totalAmountElement = document.getElementById("total-amount");
    const subtotalAmountElement = document.getElementById("subtotal-amount");
    const shippingCostElement = document.getElementById("shipping-cost");
    const cartTableBody = document.getElementById("cartTableBody");
    let totalDelCarrito = 0;
    let subtotalDelCarrito = 0;
    let totalFinal = 0;
    let costoEnvio = 0;
    let subTotalFinal = 0;
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let valorDolar = 38.8 // Este es un valor predeterminado que se ajusta con la info del Fetch
    let peogeotYaAgregado = false;
    const usuarioDePrueba = 25801;
    const urlCarritoUsuario = `https://japceibal.github.io/emercado-api/user_cart/${usuarioDePrueba}.json`;
    //const urlCotizacionesBROU = `https://cotizaciones-brou-v2-e449.fly.dev/currency/latest` Da problemas de carga, retirado
    const valorDolarP = document.getElementById("valorDolar")
    const nombreUsuario = document.getElementById("nombUsuario")
    const nombreUsuarioGuardado = localStorage.getItem("username")
    nombreUsuario.textContent = nombreUsuarioGuardado.toString();
    
    valorDolarP.textContent += `Valor del dolar hoy: $${valorDolar}`;
    // Fetch para traer cotización del dólar actualizada
    // try {
    //     const response = await fetch(urlCotizacionesBROU);
    //     const currencyData = await response.json();
    //     valorDolar = currencyData.rates.USD.buy;
    //     valorDolarP.textContent += `Valor del dolar hoy: $${valorDolar}`;
    //     console.log(valorDolar);
    // } catch (error) {
    //     console.error("Error trayendo:", error);
    // }

    // Fetch para traer producto ya cargado
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

        //  Función para actualizar el subtotal del carrito al cargar la página
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
            updateSubTotal(); // Actualizar el subTotal del carrito cuando cambia la cantidad
            updateTotal()
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


            updateSubTotal(); // Actualizar el total del carrito al eliminar un producto
            updateTotal()
        });

        itemQuantityElement.addEventListener("input", updateSubtotal);
    });

    // Llamada a la función para actualizar el subtotal del carrito al cargar la página
    updateSubTotal();

    // Actualizar el subtotal
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
        const subTotalFinalString = subTotalFinal !== 0 ? `USD ${subTotalFinal}` : "";
        const subTotalCarritoEsCero = totalUYU === 0 && totalUSD === 0 ? "0" : "";
        console.log(valorDolar)

        // Mostrar el total
        subtotalAmountElement.textContent = `${subTotalFinalString} ${subTotalCarritoEsCero}`;
    }

    // Actualizar el costo de envío
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


   
})

    updateTotal();


    //pauta 3- entrega 6
    // validaciones antes de compra
    const confirmarCompraBtn = document.getElementById("confirmarCompraBtn")
    confirmarCompraBtn.addEventListener("click", function () {

        var calle = document.getElementById('form-envio-calle');
        var numero = document.getElementById('input-numero');
        var esquina = document.getElementById('form-envio-esquina');
        var formaEnvio = document.querySelector('input[name="input-tipo-envio"]:checked');

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

        if (!formaEnvio) {
            alert('Debe seleccionar una forma de envío.');
            return;
        }
        // Mostrar un mensaje de éxito (puedes personalizar esto según tus necesidades)
        alert('Compra confirmada. Gracias por tu compra!');

        //FALTA AGREGAR VALIDACION DE TIPO DE PAGO


        // Limpiar los campos del formulario después de la confirmación
        document.getElementById('direccion-envio').reset();
        document.getElementById('tipo-envio').reset();


    })


});
