"use strict";
var server = require("server");
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
  // by Anurag
  var ProductMgr = require("dw/catalog/ProductMgr");
  var Proudct_ = ProductMgr.getProduct(req.querystring.pid);
  var ProductFactory = require('*/cartridge/scripts/factories/product');
  var viewData = res.getViewData();
  viewData.esssentialProducts = [];
  var allProductLinks = Proudct_.getAllProductLinks(); //will get the list of all the linked essential Products;
  //var allLinkedProducts =[] ;
  for (let i = 0; i < allProductLinks.size(); i++) {
    let obj={}
    obj.pid=allProductLinks[i].targetProduct.ID ;
    viewData.esssentialProducts.push(ProductFactory.get(obj));
  }
  res.setViewData(viewData);
  var temp = "check";

  next();
});

module.exports = server.exports();
