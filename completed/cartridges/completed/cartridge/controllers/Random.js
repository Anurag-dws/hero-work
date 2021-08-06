"use strict";
var server = require("server");
var randomModel = require("*/cartridge/models/random");
server.get("Show", function (req, res, next) {
    var CategoryMgr = require("dw/catalog/Category");
    var Product;
    var ProductsLength;
    var pickedProduct;

    var CatalogMgr = require("dw/catalog/CatalogMgr");
    var SiteCatalog = CatalogMgr.getSiteCatalog();
    var noProduct = false;
    try {
        //1 - pick the random index form the L1 category(main category);

        var L1Length = CatalogMgr.getSiteCatalog()
            .getRoot()
            .getOnlineSubCategories().length;

        if (L1Length === 0) {
            //no L1 category is there;
            //directly pick the product from the Catalog assign Products as this will be the leaf Category;
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
            var count = 0; //count the number of times we got the catergory which has 0 product;
            var rejectedCategory = []; //stores(id of the category) all the category which has 0 assigned product)so that will not choose again ,provide better performance) ;
            var numberOfRejectedCat = 0; // count the number of current child category rejected and if it fond more than total child of the parent then go to grand-parent or throw error accordingly

            while (true) {
                var parentLength = Parent.getSubCategories().length;
                if (parentLength === 0) {
                    //reached at the root of the Categories;
                    //no child category is there;
                    //directly pick the product from the  assign Products of the Parent;
                    var parentProductsLength =
                        Parent.getOnlineProducts().length;

                    if (!parentProductsLength) {
                        // this category has 0 products, assign this to the rejectedCategory array;

                        var rejectCat = Parent.ID;
                        rejectedCategory.push(rejectCat);

                        if (count > 1000) {
                            // if Catalog have more than 1000 product's category having 0 Products then throw error(for better time complexity if will throw an error)
                            throw error;
                        }
                        count++;
                        // if chosen category has zero products
                        // then again assign the different L1Category by running the random model;

                        var newL1Cat = [randomModel.random_(0, L1Length)];
                        Parent = CatalogMgr.getSiteCatalog()
                            .getRoot()
                            .getOnlineSubCategories()[newL1Cat];
                        numberOfRejectedCat = 0;
                        while (true) {
                            if (numberOfRejectedCat > L1Length) {
                                // site catalog have  0 online assigned product ;
                                throw error;
                            } else if (rejectedCategory.includes(Parent.ID)) {
                                // selected category is a rejected category;
                                // then  select new category ;
                                newL1Cat = (newL1Cat + 1) % L1Length;
                                Parent = CatalogMgr.getSiteCatalog()
                                    .getRoot()
                                    .getOnlineSubCategories()[newL1Cat];
                                numberOfRejectedCat++;
                            } else {
                                break; // not a rejected category;
                            }
                        }
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
                numberOfRejectedCat = 0;
                while (true) {
                    var Child = Parent.getSubCategories()[pickedChild];
                    // check whether selected cateogry is alreday picked and has 0 product or not;
                    // if  not go ahead else make another choice and choose different category;
                    let catCheck = Child.ID;

                    if (numberOfRejectedCat > parentLength) {
                        // every child of the parent category belongs to the rejected category hence
                        // break the loop and go back to the parent of the Parent category;
                        // and also reject the current parent catrgory as it has no produts in his child category;
                        rejectedCategory.push(Parent.ID);
                        Parent = Parent.getParent(); // going 1 step back for finding the better result;
                        break;
                    } else if (rejectedCategory.includes(catCheck)) {
                        // selected category is a rejected category;
                        // then  select new catgory ;
                        pickedChild = (pickedChild + 1) % parentLength;
                        numberOfRejectedCat++;
                    } else {
                        // picked child is not in the rejected list so we can go ahead;
                        /// now make child as the parent;
                        Parent = Child;
                        break;
                    }
                }
            }
        }
    } catch (e) {
        noProduct = true;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    /////////--------------Copy pasting product Controller as of now ----------------///////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    if (noProduct) {
        // no Product assigned to the catalog
        res.setStatusCode(404);
        res.render("error/notFound");
    } else {
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
    }

    next();
});
module.exports = server.exports();
