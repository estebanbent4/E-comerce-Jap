document.addEventListener("DOMContentLoaded", () => {
    // Verificar si el usuario está autenticado (usando localStorage)
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
   // manejo del nombre de usuario
   const loginNavItem = document.getElementById("login-nav-item");
   const usernameNavItem = document.getElementById("username-nav-item");
   const userUsername = document.getElementById("user-username");
 
   // si esta logueado ocultamos el Login-nav-item y mostramos el username-nav-item, 
   // gestionado por CSS a travez del display
   if (isAuthenticated) {
     const storedUsername = localStorage.getItem("username");
     if (storedUsername) {
       userUsername.textContent = storedUsername;
    }
     loginNavItem.style.display = "none";
     usernameNavItem.style.display = "block"; 
    } else {
     loginNavItem.style.display = "block"; 
     usernameNavItem.style.display = "none";
    }
 
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redireccionar al formulario de inicio de sesión
      window.location.href = "login.html";
    }
  });