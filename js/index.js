
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

// Botón para activar el tema
const themeButton = document.getElementById('theme-button')
// Nombre de la clase con la que activamos el tema dark
const darkTheme = 'dark-theme'
// Tema seleccionado por el usuario anteriormente (si es que lo hizo)
const selectedTheme = localStorage.getItem('selected-theme')
// Preguntamos qué tema tiene el usuario en su sistema
// true = dark
// false = light
const userHasDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
// Obtenemos el tema actual que tiene la interfaz validando la clase dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'

// Validamos si el usuario anteriormente elegió un tema
if (selectedTheme) {
  // Si se cumple la validación, preguntamos cuál fue el tema para saber si activamos o desactivamos el dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
} else {
  // Preguntamos si el usuario tiene tema dark en su sistema
  // En caso de que sí, lo activamos en la interfaz
  if (userHasDarkTheme) document.body.classList.add(darkTheme)
}

// Activar/desactivar el tema manualmente con el botón
themeButton.addEventListener('click', () => {
  // Agregamos o quitamos el tema dark
  document.body.classList.toggle(darkTheme)
  // Guardamos el tema actual que eligió el usuario
  localStorage.setItem('selected-theme', getCurrentTheme())
})
});


