document.addEventListener("DOMContentLoaded", function () {
  const imagenInput = document.getElementById("imagen");
  const imagenPreview = document.getElementById("imagen-preview");

  // Comprueba si hay una imagen almacenada en el localStorage
  const storedImage = localStorage.getItem("perfilImagen");
  if (storedImage) {
    imagenPreview.src = storedImage;
  }

  imagenInput.addEventListener("change", function () {
    if (imagenInput.files.length > 0) {
      const selectedImage = imagenInput.files[0];

      // Convierte la imagen a Base64
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageURL = e.target.result;

        // Almacena la imagen en el localStorage
        localStorage.setItem("perfilImagen", imageURL);

        imagenPreview.src = imageURL;
      };
      reader.readAsDataURL(selectedImage);
    } else {
      // Si no se selecciona ninguna imagen, muestra la imagen por defecto
      imagenPreview.src = "imagen-por-defecto.jpg";

      // Elimina la imagen del localStorage
      localStorage.removeItem("perfilImagen");
    }
  });
  
  // mostramos el mismo correo que el login del usuario
  const emailLocal = document.getElementById("email-local");
  const userLocal = localStorage.getItem("username");

   emailLocal.value = userLocal;

});
