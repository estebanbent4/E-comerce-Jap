document.addEventListener("DOMContentLoaded", function () {
     // Obtener el nombre de usuario del localStorage
  const nombreDeUsuario = localStorage.getItem("username");

    const navbar = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-1">
        <div class="container">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav w-100 justify-content-between">
              <li class="nav-item">
                <a class="nav-link active" href="index.html">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="categories.html">Categorías</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="sell.html">Vender</a>
              </li>
              <li class="nav-item" id="username-nav-item">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="nav-link" id="user-username">${nombreDeUsuario}</span>
                  </button>
                  <ul class="dropdown-menu" id="dropBoton" aria-labelledby="dropdownMenuButton1">
                    <li class="hover"><a class="hoover1" href="my-profile.html">Perfil</a> <i class="fa-solid fa-user"></i></li>
                    <li class="hover"><a class="hoover2" href="cart.html">Carrito</a> <i class="fa-solid fa-cart-shopping"></i></li>
                    <li class="hover"><a class="" id="logout-link" href="login.html">Cerrar sesión</a>  <i class="fa-solid fa-right-from-bracket"></i></li>
                    <li><div class="toggle-switch" id="darkmode">
                    <label class="switch-label">
                      <input type="checkbox" class="checkbox">
                      <span class="slider"></span>
                    </label></div></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  
    // Agrega el menú de navegación al elemento con el ID "navbar-container"
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
      navbarContainer.innerHTML = navbar;
    }
    // funcion para cambiar el color de fondo de la pagina //

    const darkmode = document.getElementById('darkmode'); // creamos una constante que toma el id del boton darkmode
    const body = document.body; // guardamos en otra variable el body
    let estadoDarkMode = false;
    
    // Verificar si el modo oscuro está habilitado en el almacenamiento local
    const savedStatus = localStorage.getItem('estadoDarkMode');
    if (savedStatus === 'true') {
      estadoDarkMode = true;
        body.classList.add('dark-mode'); // Agrega la clase 'dark-mode' si el modo oscuro está habilitado
    }
    
    darkmode.addEventListener('change', function () {
        // Invierte el estado y actualiza el almacenamiento local
        estadoDarkMode = !estadoDarkMode;
        localStorage.setItem('estadoDarkMode', estadoDarkMode);
    
        // Aplica o retira la clase 'dark-modea' según el estado
        if (estadoDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });
    
  });
  
// Selecciona todos los elementos <ul> en el documento
// Selecciona el elemento <ul> que deseas modificar

