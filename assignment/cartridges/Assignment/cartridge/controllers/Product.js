'use strict'
var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
/**
 * function to set all the attribute value of the associated product to the viewData
 * @function setAllAttribute
 * @param {viewData} - viewData
 * @param {returns} - set all the attribute value assocaited with the product
 */
function setAllAttribute(viewData){
    var pid = viewData.queryString.split("=")[1];//product.id;//queryString.split("=")[1];
   
    var Product = ProductMgr.getProduct(pid); // will return the info of the product using the product id
    ////////////////////////////////////////
    // by Anurag
    // lets purify all the Custom attributes value from the Product;
    var attributesValue = {};
    const keys = Object.keys(Product.custom);
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
        viewData[groupId]=[];
        let noAttribute =true; //if no attibute is found of any attribute group then no need to push this into the ISML;
        for (let j = 0; j < temp.length; j++) {
            let ID = temp[j].ID;
            let name = temp[j].displayName;
            if (attributesValue.hasOwnProperty(ID)) {
                noAttribute=false;
                viewData[groupId].push({ attriID: ID, attriName: name, attriValue: attributesValue[ID] });
            }
        }
        if(noAttribute){
            delete viewData[groupId];
        }
    }
    return ;
}

/**
 * function to set all the  essentials products set in the viewData
 * @function setAlllinkedProducts
 * @param {viewData} - viewData
 * @param {returns} - set all the essentials products assocaited with the product
 */
function setAlllinkedProducts(viewData){
    var Proudct_ = ProductMgr.getProduct( viewData.product.id); 
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    viewData.esssentialProducts =[];
    viewData.esssentialProducts.empty=true;
     var allProductLinks =  Proudct_.getAllProductLinks(); //will get the list of all the linked essential Products;
     for(let i=0;i<allProductLinks.size();i++){
        let obj={}
        obj.pid=allProductLinks[i].targetProduct.ID ; //we need to create the string as query parameter and send in to product factory
        viewData.esssentialProducts.push(ProductFactory.get(obj));
        viewData.esssentialProducts.empty=false;
     } 
     return ;
}

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
       ///////////////////////////detailed Specification //////////////////////////////
      //setAllAttribute( res.getViewData()) ; // will set all the attribute group in the viewData
       ///////////////////////////THE Essentials//////////////////////////////
      //setAlllinkedProducts( res.getViewData());  //will set all the essentials product set in the viewData
    next()
});

module.exports = server.exports();
