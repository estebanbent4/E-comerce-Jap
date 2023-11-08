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
//mostramos el mismo nombre que el perfil del usuario
   const nombreLocal = document.getElementById("nombre");
    const nombre = localStorage.getItem("nombre");
    nombreLocal.value = nombre;

    const segundoNombreLocal = document.getElementById("segundo-nombre");
    const segundoNombre = localStorage.getItem("segundo-nombre");
    segundoNombreLocal.value = segundoNombre;


    const apellidoLocal = document.getElementById("apellido");
    const apellido = localStorage.getItem("apellido");
    apellidoLocal.value = apellido;

    

    const segundoApellidoLocal = document.getElementById("segundo-apellido");
    const segundoApellido = localStorage.getItem("segundo-apellido");
    segundoApellidoLocal.value = segundoApellido;


    


      const telefonoLocal = document.getElementById("telefono");
    const telefono = localStorage.getItem("telefono");
    telefonoLocal.value = telefono;


});


document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profile-form");

  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validar campos obligatorios usando la API de validación de HTML5
    if (profileForm.checkValidity()) {
      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value;
      const segundoNombre = document.getElementById("segundo-nombre").value;
      const apellido = document.getElementById("apellido").value;
      const segundoApellido = document.getElementById("segundo-apellido").value;
      const email = document.getElementById("email-local").value;
      const telefono = document.getElementById("telefono").value;

      // Crear un objeto con la información del perfil
      const perfilUsuario = {
        nombre: nombre,
        segundoNombre: segundoNombre,
        apellido: apellido,
        segundoApellido: segundoApellido,
        email: email,
        telefono: telefono
      };

      // Convertir el objeto a JSON y guardarlo en el localStorage
      localStorage.setItem("perfilUsuario", JSON.stringify(perfilUsuario));
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("segundo-nombre", segundoNombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("segundo-apellido", segundoApellido);
      localStorage.setItem("telefono", telefono);



      // Redirigir al usuario o mostrar un mensaje de éxito
      alert("Cambios guardados correctamente.");
    } else {
      // Si el formulario no es válido, mostrar mensajes de error de Bootstrap
      profileForm.classList.add("was-validated");

    
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profile-form");

  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validar campos obligatorios usando la API de validación de HTML5
    if (profileForm.checkValidity()) {
      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value;
      const segundoNombre = document.getElementById("segundo-nombre").value;
      const apellido = document.getElementById("apellido").value;
      const segundoApellido = document.getElementById("segundo-apellido").value;
      const email = document.getElementById("email-local").value;
      const telefono = document.getElementById("telefono").value;

      // Crear un objeto con la información del perfil
      const perfilUsuario = {
        nombre: nombre,
        segundoNombre: segundoNombre,
        apellido: apellido,
        segundoApellido: segundoApellido,
        email: email,
        telefono: telefono
      };

      // Convertir el objeto a JSON y guardarlo en el localStorage
      localStorage.setItem("perfilUsuario", JSON.stringify(perfilUsuario));

      // Redirigir al usuario o mostrar un mensaje de éxito
      alert("Cambios guardados correctamente.");
    } else {
      // Si el formulario no es válido, mostrar mensajes de error de Bootstrap
      profileForm.classList.add("was-validated");
    }
  });
});


