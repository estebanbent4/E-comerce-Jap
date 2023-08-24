
document.addEventListener("DOMContentLoaded", () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  const usernameNavItem = document.getElementById("username-nav-item");
  const userUsername = document.getElementById("user-username");
  const logoutLink = document.getElementById("logout-link");

  if (isAuthenticated) {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      userUsername.textContent = storedUsername;
    }
    usernameNavItem.style.display = "flex";
  } else {
    usernameNavItem.style.display = "none";
  }

  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    window.location.href = "login.html";
  });

  if (!isAuthenticated) {
    window.location.href = "login.html";
  }
});

/*
document.addEventListener("DOMContentLoaded", () => {
    // Verificar si el usuario está autenticado (usando localStorage)
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
   // manejo del nombre de usuario
   const loginNavItem = document.getElementById("login-nav-item");
   const usernameNavItem = document.getElementById("username-nav-item");
   const userUsername = document.getElementById("user-username");
   const logoutLink = document.getElementById("logout-link");

   // si esta logueado ocultamos el Login-nav-item y mostramos el username-nav-item, 
   // gestionado por CSS a travez del display
   if (isAuthenticated) {
     const storedUsername = localStorage.getItem("username");
     if (storedUsername) {
       userUsername.textContent = storedUsername;
    }
     loginNavItem.style.display = "none";
     usernameNavItem.style.display = "flex"; 
    } else {
     loginNavItem.style.display = "flex"; 
     usernameNavItem.style.display = "none";
    }
 
    // Manejo del enlace de cierre de sesión
   logoutLink.addEventListener("click", () => {
    // Eliminar la autenticación y redirigir a la página de inicio de sesión
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    window.location.href = "login.html";
   });


    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redireccionar al formulario de inicio de sesión
      window.location.href = "login.html";
    }
  });
  */