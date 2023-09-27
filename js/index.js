
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("herramientas").addEventListener("click", function() {
        localStorage.setItem("catID", 104);
        window.location = "products.html"
    });
    document.getElementById("computadoras").addEventListener("click", function() {
        localStorage.setItem("catID", 105);
        window.location = "products.html"
    });
    document.getElementById("vestimenta").addEventListener("click", function() {
        localStorage.setItem("catID", 106);
        window.location = "products.html"
    });
    document.getElementById("electrodomésticos").addEventListener("click", function() {
        localStorage.setItem("catID", 107);
        window.location = "products.html"
    });
    document.getElementById("deporte").addEventListener("click", function() {
        localStorage.setItem("catID", 108);
        window.location = "products.html"
    });
    document.getElementById("celulares").addEventListener("click", function() {
        localStorage.setItem("catID", 109);
        window.location = "products.html"
    });

    // Función para cambiar entre modos y guardar la preferencia en localStorage
function toggleDarkMode() {
    const htmlElement = document.documentElement;
    if (htmlElement.id === 'theme-light')
   {
      htmlElement.id = 'theme-dark';
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.id = 'theme-light';
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Función para cargar la preferencia de tema desde localStorage al cargar la página
  function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
   
   if (savedTheme === 'dark') {
      document.documentElement.id = 'theme-dark';
    } else {
      document.documentElement.id = 'theme-light';
    }
  }
  
  // Función para cambiar entre modos y guardar la preferencia en localStorage
  function toggleDarkMode() {
    const htmlElement = document.documentElement;
  
    if (htmlElement.id === 'theme-light') {
      htmlElement.id = 'theme-dark';
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.id = 'theme-light';
     
  // Asigna el evento click al elemento que activa el cambio de modo
  const toggleSwitch = document.querySelector('.toggle-switch');
  toggleSwitch.addEventListener('click', toggleDarkMode);
  
  // Carga la preferencia de tema al cargar la página
  window.addEventListener('DOMContentLoaded', loadThemePreference);
    }
}
});
