document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Validación de campos no vacíos
      if (username.trim() === "" || password.trim() === "") {
        alert("Por favor, ingrese usuario y contraseña.");
      } else {
        // Guardar autenticación en localStorage
        localStorage.setItem("isAuthenticated", "true");

        // al loguear guardamos en localstore el nombre de usuario
        localStorage.setItem("username", username); 

        // Redireccionar a la página de portada
        window.location.href = "index.html";
      }
    });
  });