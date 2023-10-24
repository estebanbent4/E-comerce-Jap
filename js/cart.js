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
   
    function addPaymentMethod() {
    
    }

    function showAlert(){


    

      let alert = `
      
      <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Felicitaciones!</strong> `+mensaje.msg+`
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`

    document.getElementById("alert").innerHTML  = alert;
      
 
}

      // Inicializa los modales de Bootstrap
    var myModal = new bootstrap.Modal(document.getElementById("modalMetodoPago"));

    function validateForm(){
 
        let texto = document.getElementById("tipoPago").outerText;
        
        if(texto === "No se selecciono metodo de pago"){
            document.getElementById("validacionMetodoPago").style.display= "block"
        }else{
    
            let tipoPago =  document.getElementById("tipoPago").outerText;
    
            if (tipoPago === "Tarjeta de Credito") {
    
                let resultNumeroTarjeta = document.getElementById("resultNumeroTarjeta");
                let resultnombreTitular = document.getElementById("resultnombreTitular");
                let resultnombreMonthYear = document.getElementById("resultnombreMonthYear");
                let resultModalCvc = document.getElementById("resultModalCvc");
            
                    if (resultNumeroTarjeta.value != "" && resultnombreTitular.value != "" && resultnombreMonthYear.value != "" && resultModalCvc.value != "") {
                    showAlert();
                    }else{
                        document.getElementById("alert").innerHTML = `<p>Atencion! falta ingresar datos de la tarjeta decredito</p>`
                    }
            }else{
    
                let resultModalnumeroCuenta = document.getElementById("resultModalnumeroCuenta");
                let resultnombreTitular = document.getElementById("resultnombreTitular");
    
                if (resultModalnumeroCuenta.value != "" && resultnombreTitular.value != "") {
                    showAlert();
                    }else{
                        document.getElementById("alert").innerHTML = `<p>Atencion! falta ingresar datos de la tarjeta decredito</p>`
                    }
            }
    
        }
        
    }


    
    function insertPaymentMethod( b ) {
        
        document.getElementById("validacionMetodoPago").style.display= "none"
        let nombreTitular;
        let numeroTarjeta;
        let monthYear;
        let cvc ;
        let numeroCuenta;
        let idButton = b.id;
        let cardwrapper;
    
        let data;
    
        if (idButton === "completarTarjeta") {
            nombreTitular = document.getElementById("modalName").value;
            numeroTarjeta = document.getElementById("modalNumberCard").value;
            monthYear = document.getElementById("modalMonthYear").value;
            cvc = document.getElementById("modalCvc").value;
            cardwrapper = document.getElementById("wrapper");
            newcardwrapper = cardwrapper.innerHTML
            
    
            data = `
            
            <h5 class="mb-2" id="tipoPago">Tarjeta de Credito</h5>
            
            <div class="card-body">
    
            <div class='card-wrapper' id="newCardWrapper"></div>
    
            
              <div class="row mt-5">
                <div class="form-group col-sm-6">
                <label for="resultNumeroTarjeta">Numero</label>
                  <input class="form-control form-control-rounded" id="resultNumeroTarjeta" placeholder="Numero de Tarjeta"
                    type="text" name="number" value="`+ numeroTarjeta +`" required readonly>
                </div>
                <div class="form-group col-sm-6">
                <label for="resultnombreTitular">Nombre</label>
                  <input class="form-control form-control-rounded" id="resultnombreTitular" placeholder="Nombre Titular"
                    type="text" name="name" value="`+ nombreTitular +`" required readonly/>
                </div>
                <div class="form-group col-sm-3">
                <label for="resultnombreMonthYear">MM/YY</label>
                  <input class="form-control form-control-rounded" placeholder="MM/YY" type="text"
                    name="expiry" id="resultnombreMonthYear" value="`+ monthYear +`" required readonly/>
                </div>
                <div class="form-group col-sm-3">
                  <label for="resultnombreTitular">CVC</label>
                  <input class="form-control form-control-rounded" id="resultModalCvc" placeholder="CVC" type="text"
                    name="cvc" value="`+ cvc +`" required readonly/>
                </div>
              </div>
            
            </div>
            
            <div id="alerta"></div>`
    
            document.getElementById("contMetodoEnvio").innerHTML = data;
    
            document.getElementById("newCardWrapper").innerHTML = newcardwrapper;
            
        } else {
    
            nombreTitular = document.getElementById("modalNameAcount").value;
            numeroCuenta = document.getElementById("modalNumberAcount").value;
    
            data = `
            
            <div class="card-body">
               <h3 class="text-center" id="tipoPago"><i class="fas fa-university"></i> Datos Cuenta bancaria </h3>
               <div class="row">
                 <div class="form-group col-sm-6">
                 <label for="resultnombreTitular">Nombre Cuenta</label>
                   <input class="form-control form-control-rounded" placeholder="Nombre"
                     type="text" name="text" id="resultnombreTitular" value="`+ nombreTitular +`" required readonly>
                 </div>
                 <div class="form-group col-sm-6">
                 <label for="resultModalnumeroCuenta">Numero Cuenta</label>
                   <input class="form-control form-control-rounded" placeholder="Numero de Cuenta"
                     type="number" name="name" id="resultModalnumeroCuenta" value="`+ numeroCuenta +`" readonly required>
                </div>
            </div>
    
            <div id="alerta"></div>`
            
            document.getElementById("contMetodoEnvio").innerHTML = data;
        }
    
    }
    
    function showcard() {
        
        var card = new Card({
            form: 'form',
            container: '.card-wrapper',
      
            placeholders: {
              number: '**** **** **** ****',
              name: 'Nombre Apellido',
              expiry: '**/**',
              cvc: '***'
            }
          });
    
     
    }

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
