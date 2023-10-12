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
            <td>${cartItem.currency } ${cartItem.cost || cartItem.unitCost}</td>
            <td><input type="number" class="itemQuantity" value="${cartItem.count}" min="1"></td>
            <td>${cartItem.currency } <span class="itemSubtotal">${cartItem.cost|| cartItem.unitCost * cartItem.count}</span></td>
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

            const newSubtotal = newQuantity * cartItem.cost || cartItem.unitCost;
            itemSubtotalElement.textContent = `${newSubtotal}`;

            cartItem.count = newQuantity;
            updateTotal(); // Actualizar el total del carrito cuando cambia la cantidad
        }

          deleteButton.addEventListener("click", () => {
            newRow.remove();
            totalDelCarrito -= cartItem.cost || cartItem.unitCost * cartItem.count;
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
    
    // Función para actualizar el total del carrito
    function updateTotal() {
        totalDelCarrito = cartItems.reduce((total, item) => {
            const itemCost = item.cost || item.unitCost || 0; // Tomar "cost" si existe, de lo contrario, tomar "unitCost" o 0 si no hay ninguno = dolor de cabeza
            return total + itemCost * item.count;
        }, 0);
        totalAmountElement.textContent = totalDelCarrito;
    }
});
