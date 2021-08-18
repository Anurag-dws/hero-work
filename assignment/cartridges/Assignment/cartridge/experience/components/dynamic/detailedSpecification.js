"use strict";

/* global request */

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var PageRenderHelper = require("*/cartridge/experience/utilities/PageRenderHelper.js");
var productHelper = require("*/cartridge/scripts/helpers/productHelpers.js");
var ProductMgr = require('dw/catalog/ProductMgr');
/**
 * function to set all the attribute value of the associated product to the viewData
 * @function setAllAttribute
 * @param {viewData} - viewData
 *  @param {viewData} - pid - product id of the current product in the PDP
 * @param {returns} - set all the attribute value assocaited with the product
 */
function setAllAttribute(viewData,pid){
    var Product = ProductMgr.getProduct(pid); // will return the info of the product using the product id
    ////////////////////////////////////////
    // by Anurag
    // lets purify all the Custom attributes value from the Product;
    var attributesValue = {};
    var keys = Object.keys(Product.custom);
    keys.forEach((key) => {
        attributesValue[key] = Product.custom[key];
    });
    // lets find all the custom attribute group in array first;
    var allAttributeGroups = Product.attributeModel.attributeGroups;
    var allCustomAttributeGroups = []
    for (let i = 0; i < allAttributeGroups.length; i++) {
        if (!allAttributeGroups[i].system) {
            allCustomAttributeGroups.push(allAttributeGroups[i]);
        }
    }
     // now find all the custom attributes of the attribute groups;
    // now comes the refinment parts;
    // we need attributes group name(displayName)
    // need attrbute Definitions (attributeDefinitions)
    // in this i need only display name(displayName) and id(ID)
    for (let i = 0; i < allCustomAttributeGroups.length; i++) {
        // temp will going to contain the all the attribute name and ID of the each varying attribute group  
        var temp = allCustomAttributeGroups[i].attributeDefinitions;
        var groupName = allCustomAttributeGroups[i].displayName;
        var groupId = allCustomAttributeGroups[i].ID
        //viewData[groupId]=[];
        var curr=[];
        let noAttribute =true; //if no attibute is found of any attribute group then no need to push this into the ISML;
        for (let j = 0; j < temp.length; j++) {
            let ID = temp[j].ID;
            let name = temp[j].displayName;
            if (attributesValue.hasOwnProperty(ID)) {
                noAttribute=false;
                curr.push({attriID: ID, attriName: name, attriValue: attributesValue[ID]});
            }
        }
        if(noAttribute){
            delete curr[groupId];
        }
        else viewData.put(groupId,curr);
    }
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
  ///////////////////////////detailed  Specification //////////////////////////////
   setAllAttribute( model,product.ID) ;
  template = new Template(
    "experience/components/dynamic/detailedSpec"
  );
  return template.render(model).text;
};
