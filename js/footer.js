document.addEventListener("DOMContentLoaded", function () {
    // Función para obtener los nombres de las categorías y agregarlos al footer como enlaces
    // En lugar de agregar los enlaces a una lista, agrégalos al contenedor div
    function addCategoryNamesToFooter(categoriesArray) {
        const footerContainer = document.getElementById("footer-div");
        const categoryLinksContainer = document.getElementById("category-links-container");

        if (!footerContainer) return;

        categoriesArray.forEach(category => {
            const categoryNameLink = document.createElement("a");
            categoryNameLink.href = "javascript:void(0);";
            categoryNameLink.textContent = category.name;

            // Agrega el enlace al contenedor de enlaces de categorías
            categoryLinksContainer.appendChild(categoryNameLink);

            categoryNameLink.addEventListener("click", function () {
                localStorage.setItem("catID", category.id);
                window.location.href = "products.html";
            });
        });

        footerContainer.appendChild(categoryLinksContainer);
    }


    // Obtén las categorías usando tu función existente
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            addCategoryNamesToFooter(currentCategoriesArray); // Llama a la función para agregar nombres al footer
        }
    });

    const footer =
        `    <footer class="text-muted">
        <div class="container">
            <!-- Contenedor para las categorías -->
            <div id="category-links-container" class="mb-3"></div>
            <p id="p-footer">En este sitio esta trabajando el equipo cinco del grupo 279 de DW y forma parte de <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jóvenes a Programar</a></p>
            <p class="float-end">
            <a href="#">Volver arriba</a>
        </p>
            </div>
    </footer>
        `;

    // Agrega el menú de navegación al elemento con el ID "navbar-container"
    const footerContainer = document.getElementById("footer-div");
    if (footerContainer) {
        footerContainer.innerHTML = footer;
    }
});
