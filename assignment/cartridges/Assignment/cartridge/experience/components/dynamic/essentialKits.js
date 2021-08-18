"use strict";

/* global request */

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var PageRenderHelper = require("*/cartridge/experience/utilities/PageRenderHelper.js");
var productHelper = require("*/cartridge/scripts/helpers/productHelpers.js");
var ProductMgr = require('dw/catalog/ProductMgr');
/**
 * function to set all the  essentials products set in the viewData
 * @function setAlllinkedProducts
 * @param {viewData} - viewData
 * @param {returns} - set all the essentials products assocaited with the product
 */
 function setAlllinkedProducts(viewData,pid){
     //by Anurag;
    var Proudct_ = ProductMgr.getProduct( pid); 
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var esssentialProductsArray=[];
     var allProductLinks =  Proudct_.getAllProductLinks(); //will get the list of all the linked essential Products;
     for(let i=0;i<allProductLinks.size();i++){
        let obj={};
        obj.pid=allProductLinks[i].targetProduct.ID ; //we need to create the object as query parameter and send in to product factory
        esssentialProductsArray.push(ProductFactory.get(obj));
     } 
     viewData.put("esssentialProducts", esssentialProductsArray);
     return ;
}

/**
 * Render logic for the gives Product Detailed Specification
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
  var model = modelIn || new HashMap();
  var component = context.component;
  model.regions = PageRenderHelper.getRegionModelRegistry(component);
  var product = context.content.product;

  var params = { pid: product.ID };
  var productHelperResult = productHelper.showProductPage(
    params,
    request.pageMetaData
  );
  var productType = productHelperResult.product.productType;

  var template;
  if (
    !productHelperResult.product.online &&
    productType !== "set" &&
    productType !== "bundle"
  ) {
    template = new Template("error/notFound");
    template.setStatusCode(404);
    return template.render().text;
  }
  ///////////////////////////THE Essentials//////////////////////////////
  setAlllinkedProducts( model,product.ID) ;
  template = new Template(
    "experience/components/dynamic/mysetDetails"
  );
  return template.render(model).text;
};
