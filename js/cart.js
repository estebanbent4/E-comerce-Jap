document.addEventListener("DOMContentLoaded", async function () {
    
    const usuarioDePrueba = 25801;

    try {
        const response = await fetch(CART_INFO_URL + usuarioDePrueba + ".json");
        const data = await response.json();
        showCartItems(data);
    } catch (error) {
        console.error("Error trayendo:", error);
    }

    function showCartItems(data) {
        const cartItem = data.articles[0];

        // Llenar los campos de la tabla con los datos del JSON
        document.getElementById("itemName").textContent = cartItem.name;
        document.getElementById("itemCost").textContent = `${cartItem.currency} ${cartItem.unitCost}`;
        document.getElementById("itemQuantity").value = cartItem.count;
        document.getElementById("itemImage").src = cartItem.image;
        document.getElementById("itemImage").alt = cartItem.name;
        document.getElementById("itemSubtotal").textContent = `${cartItem.currency} ${(cartItem.unitCost * cartItem.count)} `;
        // Aplicar la clase "cart-item" a la fila, para poder estilizarlos
         const cartItemRow = document.getElementById("cartItem");
         cartItemRow.classList.add("cart-item");
    }
});
