'use strict';

var server = require('server');
var ProductModel = require('*/cartridge/models/heroCategory');


server.get('Show', function (req, res, next) {

    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var CategoryMgr = require('dw/catalog/Category');
    var ProductMgr = require('dw/catalog/ProductMgr');

    var category = CatalogMgr.getCategory("womens-outfits");
    var womenProducts = category.getOnlineProducts();
    var productModel = new ProductModel(womenProducts);

    var category1 = CatalogMgr.getCategory("mens-clothing-suits");
    var mensProducts = category1.getOnlineProducts();
    var productModel1 = new ProductModel(mensProducts);

    res.render('heroCategory', {
        productModel1: productModel1,
        productModel: productModel
    });

    next();
});

module.exports = server.exports();
