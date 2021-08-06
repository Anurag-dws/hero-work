"use strict";
var server = require("server");
var randomModel = require("*/cartridge/models/random");
server.get("Show", function (req, res, next) {
    var CategoryMgr = require('dw/catalog/Category')
    var Product;
    var ProductsLength;
    var pickedProduct;

    var CatalogMgr = require("dw/catalog/CatalogMgr");
    var SiteCatalog = CatalogMgr.getSiteCatalog();

    try {
        //1 - pick the random index form the L1 category(main category);

        var L1Length = CatalogMgr.getSiteCatalog()
            .getRoot()
            .getOnlineSubCategories().length;

        if (L1Length === 0) {
            //no L1 category is there;
            //directly pick the product from the Catalog assign Products;
            ProductsLength = SiteCatalog.getRoot().getOnlineProducts().length;
            pickedProduct = randomModel.random_(0, ProductsLength);
            Product = SiteCatalog.getRoot().getOnlineProducts()[pickedProduct];
        } else {
            // L1 category is there(main category);

            var pickedL1 = randomModel.random_(0, L1Length);
            var L1Category = CatalogMgr.getSiteCatalog()
                .getRoot()
                .getOnlineSubCategories()[pickedL1];
           
            var Parent = L1Category;
            var count = 0; //count the number of times we got the catergory which has 0 products;
            while (true) {
                var parentLength = Parent.getSubCategories().length;
                if (parentLength === 0) {
                    //reached at the root of the Categories ;
                    //no child category is there;
                    //directly pick the product from the  assign Products of the Parent;
                    var parentProductsLength =
                        Parent.getOnlineProducts().length;

                    if (!parentProductsLength) {
                        // if chosen category has zero products
                        // then again assign the different L1Category by running the random model;
                        if (count > 1000) {
                            // if I will get empty product's category more than 100 times then throw error(for better time complexity if will throw an error)
                            throw error;
                        }
                        count++;
                        Parent = CatalogMgr.getSiteCatalog()
                            .getRoot()
                            .getOnlineSubCategories()[
                            randomModel.random_(0, L1Length)
                        ];
                        continue;
                    }
                    pickedProduct = randomModel.random_(
                        0,
                        parentProductsLength
                    );
                    Product = Parent.getOnlineProducts()[pickedProduct];
                    break; //got the prduct now break the loop;
                }
                // child category is there;
                var pickedChild = randomModel.random_(0, parentLength);
                var Child = Parent.getSubCategories()[pickedChild];

                /// now make child as the parent;
                Parent = Child;
            }
        }
    } catch (e) {
        //////----------(very rare case)-----------\\\\\\
        //even after running 100 times if I will get the 0 product's category
        //then specifiy a well known category which has at least 1 product. 
        var catchedL1 = CatalogMgr.getSiteCatalog()
            .getRoot()
            .getOnlineSubCategories()[0];
        var catchedL2 = catchedL1.getSubCategories()[0];

        ProductsLength = catchedL2.getOnlineProducts().length;
        pickedProduct = randomModel.random_(0, ProductsLength);
        Product = catchedL2.getOnlineProducts()[pickedProduct];
    }
    var temp = "check";
    ////////////////////////////////////////////////////////////////////////////////////////////
    /////////--------------Copy pasting product Controller as of now ----------------///////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    var passObj = {
        pid: Product.ID,
    };
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
