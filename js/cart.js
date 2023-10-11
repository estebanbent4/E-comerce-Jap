document.addEventListener("DOMContentLoaded", async function () {
    const totalAmountElement = document.getElementById("total-amount");
    let totalDelCarrito = 0;
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const usuarioDePrueba = 25801;
    const urlCarritoUsuario = `https://japceibal.github.io/emercado-api/user_cart/${usuarioDePrueba}.json`

    try {
        const response = await fetch(urlCarritoUsuario);
        const data = await response.json();
        cartItems = data.articles; // Inicializar el carrito con los datos del fetch
        showCartItems(cartItems);
    } catch (error) {
        console.error("Error trayendo:", error);
    }

    // Función para actualizar el total del carrito
    function updateTotal() {
        totalDelCarrito = cartItems.reduce((total, item) => total + item.unitCost * item.count, 0);
        totalAmountElement.textContent = totalDelCarrito;
    }

    // Pauta 1
    // Para agregar productos al carrito se debe llamar a showCartItems() con un array como parametro. 
    // ejemplo para agregar al carrito: 
    //const addButton = document.getElementById("agregarProductoBtn");
    //addButton.addEventListener("click", function () {
    // const nuevoProducto = {
        // ...
    //};
    //let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    //cartItems.push(nuevoProducto);
    //localStorage.setItem("cartItems", JSON.stringify(cartItems))






    function showCartItems(cartItems) {
        const cartTableBody = document.getElementById("cartTableBody");

        //cartTableBody.innerHTML = "";

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
                }

                updateTotal(); // Actualizar el total del carrito al eliminar un producto
            });

            itemQuantityElement.addEventListener("input", updateSubtotal);
        });

        // Actualizar el total del carrito al cargar la página
        updateTotal();
    }
});
