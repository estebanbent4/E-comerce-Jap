var productInfo = {};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;

            showProductInfo();
            showImagesProducts();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data;

            showComments();
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){ //Llamo al json PRODUCTOS_URL
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showRelatedProducts()
        }
    });


});

