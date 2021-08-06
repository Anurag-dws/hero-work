"use strict";
var server = require("server");
var Random = require("*/cartridge/models/random");
server.get("Show", function (req, res, next) {
    var Product;
    var ProductsLength;
    var pickedProduct;

    var CatalogMgr = require("dw/catalog/CatalogMgr");
    var SiteCatalog = CatalogMgr.getSiteCatalog();

    try {
        //1 - pick the random index form the L1 category;

        var L1Length = CatalogMgr.getSiteCatalog()
            .getRoot()
            .getOnlineSubCategories().length;

        if (L1Length === 0) {
            //no L1 category is there;
            //directly pick the product from the Catalog assign Products;
            ProductsLength = SiteCatalog.getRoot().getOnlineProducts().length;
            pickedProduct = Random.random_(0, ProductsLength);
            Product = SiteCatalog.getRoot().getOnlineProducts()[pickedProduct];
        } else {
            // L1 category is there;

            var pickedL1 = Random.random_(0, L1Length);
            var L1Category = CatalogMgr.getSiteCatalog()
                .getRoot()
                .getOnlineSubCategories()[pickedL1];

            // 2- pick the random index from the L2 Category(if have)
            var L2Length = L1Category.getSubCategories().length;

            if (L2Length === 0) {
                //no L2 category is there;
                //directly pick the product from the Catalog assign Products;
                ProductsLength = L1Category.getOnlineProducts().length;
                pickedProduct = Random.random_(0, ProductsLength);
                Product = SiteCatalog.getOnlineProducts()[pickedProduct];
            } else {
                // L2 category is there;
                var pickedL2 = Random.random_(0, L2Length);
                var L2Category = L1Category.getSubCategories()[pickedL2];

                // 3- pick the random index from the L3 Category(if have)
                var L3Length = L2Category.getSubCategories().length;
                if (L3Length === 0) {
                    //no L3 category is there;
                    //directly pick the product from the Catalog assign Products;
                    ProductsLength = L2Category.getOnlineProducts().length;
                    pickedProduct = Random.random_(0, ProductsLength);
                    Product = L2Category.getOnlineProducts()[pickedProduct];
                } else {
                    // L3 category is there;
                    var pickedL3 = Random.random_(0, L2Length);
                    var L3Category = L2Category.getSubCategories()[pickedL3]; //assuming this one is the last sub sub-category

                    // 4- now picked the random product index from the selected L3 Category ;
                    ProductsLength = L3Category.getOnlineProducts().length;
                    pickedProduct = Random.random_(0, ProductsLength);
                    Product = L3Category.getOnlineProducts()[pickedProduct];
                }
            }
        }
    } catch (e) {
        var catchedL1 = CatalogMgr.getSiteCatalog()
            .getRoot()
            .getOnlineSubCategories()[0];
        var catchedL2 = catchedL1.getSubCategories()[0];

        ProductsLength = catchedL2.getOnlineProducts().length;
        pickedProduct = Random.random_(0, ProductsLength);
        Product = catchedL2.getOnlineProducts()[pickedProduct];
    }
    var temp = "check";

    ////////////////////////////////////////////////////////////////////////////////////////////
    /////////--------------Copy pasting product Controller as of now ----------------///////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    var passObj = {
        pid: Product.ID,
    };
    //var customQueryString = "";
    //  for (var key in passObj) {
    //     if (customQueryString != "") {
    //         customQueryString += "&";
    //       }
    //       customQueryString += encodeURIComponent(key) + "=" + encodeURIComponent(passObj[key]);
    //  }

    // var customQueryString = 'lang' + "=" + encodeURIComponent(passObj[lang]) +'&'+ 'pid' + "=" + encodeURIComponent(passObj[pid]);
    var productHelper = require("*/cartridge/scripts/helpers/productHelpers");
    var showProductPageHelperResult = productHelper.showProductPage(
        passObj,
        req.pageMetaData
    );
    var productType = showProductPageHelperResult.product.productType;
    if (
        !showProductPageHelperResult.product.online &&
        productType !== "set" &&
        productType !== "bundle"
    ) {
        res.setStatusCode(404);
        res.render("error/notFound");
    } else {
        var pageLookupResult = productHelper.getPageDesignerProductPage(
            showProductPageHelperResult.product
        );

        if (
            (pageLookupResult.page &&
                pageLookupResult.page.hasVisibilityRules()) ||
            pageLookupResult.invisiblePage
        ) {
            // the result may be different for another user, do not cache on this level
            // the page itself is a remote include and can still be cached
            res.cachePeriod = 0; // eslint-disable-line no-param-reassign
        }

        if (pageLookupResult.page) {
            res.page(
                pageLookupResult.page.ID,
                {},
                pageLookupResult.aspectAttributes
            );
        } else {
            res.render(showProductPageHelperResult.template, {
                product: showProductPageHelperResult.product,
                addToCartUrl: showProductPageHelperResult.addToCartUrl,
                resources: showProductPageHelperResult.resources,
                breadcrumbs: showProductPageHelperResult.breadcrumbs,
                canonicalUrl: showProductPageHelperResult.canonicalUrl,
                schemaData: showProductPageHelperResult.schemaData,
            });
        }
    }

    next();
});
module.exports = server.exports();
