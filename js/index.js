document.addEventListener("DOMContentLoaded", function() {
    const categoryElements = document.querySelectorAll(".custom-card[id]");

    categoryElements.forEach(function(element) {
        element.addEventListener("click", function() {
            const categoryName = element.getAttribute("id");
            localStorage.setItem("catID", categoryName);
            window.location = "products.html";
        });
    });
});
/*
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", "autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", "juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", "muebles");
        window.location = "products.html"
    });
});
*/