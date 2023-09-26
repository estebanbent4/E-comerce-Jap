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
                    <li><a class="" href="my-profile.html">Perfil</a> <i class="fa-solid fa-user"></i></li>
                    <li><a class="" href="cart.html">Carrito</a> <i class="fa-solid fa-cart-shopping"></i></li>
                    <li><a class="" id="logout-link" href="login.html">Cerrar sesión</a>  <i class="fa-solid fa-right-from-bracket"></i></li>
                    <li><div class="toggle-switch">
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
  });
  