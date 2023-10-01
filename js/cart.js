document.addEventListener("DOMContentLoaded", async function () {
    const usuarioDePrueba = 25801;
    const urlCarritoUsuario = `https://japceibal.github.io/emercado-api/user_cart/${usuarioDePrueba}.json`

    try {
        const response = await fetch(urlCarritoUsuario);
        const data = await response.json();
        showCartItems(data);
    } catch (error) {
        console.error("Error trayendo:", error);
    }

    function showCartItems(data) {
        const cartItem = data.articles[0];

        // Obtener referencias a elementos HTML
        const itemNameElement = document.getElementById("itemName");
        const itemCostElement = document.getElementById("itemCost");
        const itemQuantityElement = document.getElementById("itemQuantity");
        const itemImageElement = document.getElementById("itemImage");
        const itemSubtotalElement = document.getElementById("itemSubtotal");
        const cartItemRow = document.getElementById("cartItem");

        // Llenar los campos de la tabla con los datos del JSON
        itemNameElement.textContent = cartItem.name;
        itemCostElement.textContent = `${cartItem.currency} ${cartItem.unitCost}`;
        itemQuantityElement.value = cartItem.count;
        itemImageElement.src = cartItem.image;
        itemImageElement.alt = cartItem.name;

        // PAUTA 3: Función para calcular y actualizar el subtotal cuando se cambia la cantidad
        function updateSubtotal() {
            const newQuantity = parseInt(itemQuantityElement.value);
            const newSubtotal = newQuantity * cartItem.unitCost;
            itemSubtotalElement.textContent = `${cartItem.currency} ${newSubtotal}`;
        }

        // Aplicar la clase "cart-item" a la fila, para poder estilizarlos
        cartItemRow.classList.add("cart-item");

        // Agregar un evento de escucha al campo de cantidad
        itemQuantityElement.addEventListener("input", updateSubtotal);

        // Llamar a updateSubtotal para calcular el subtotal inicial
        updateSubtotal();
    }
});

