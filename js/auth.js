document.addEventListener("DOMContentLoaded", () => {
    // Verificar si el usuario está autenticado (usando localStorage)
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, redireccionar al formulario de inicio de sesión
      window.location.href = "login.html";
    }
  });