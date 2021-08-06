'use strict';

var CatalogMgr = require('dw/catalog/CatalogMgr');
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var productFactory = require('*/cartridge/scripts/factories/product');
var CompareAttributesModel = require('*/cartridge/models/compareAttributes');

server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    var compareProductsForm = req.querystring;
    var category = {};//CatalogMgr.getCategory(compareProductsForm.cgid);
    var pids = Object.keys(compareProductsForm)  
        .filter(function (key) { return key.indexOf('pid') === 0; })
        .map(function (pid) { return compareProductsForm[pid]; });
         //got all the product ids of the product to compare

////////--------------OWN IMPLEMENTATION-------------////////////////////////

  // find all the attrbute of the 'comparison' attribute group ;
  // we need to compare only the attribute of the 'comparison' named attibute group;

  //1- find all the attribute of the attribtue group ;
 var ProductMgr = require('dw/catalog/ProductMgr');
  var Product1 = ProductMgr.getProduct(pids[0]) ;
  var allAttributeGroups= Product1.getAttributeModel().getAttributeGroups();
  var allcmpAttribute= [];
 for(let i=0;i<allAttributeGroups.length;i++){
     if(allAttributeGroups[i].ID === 'comparison'){
         //got the comparison attri group 
         // now find all the associated attribute to this 'comparison' group;
        var cmpAttriGroup=allAttributeGroups[i].attributeDefinitions;  
        for(let j=0;j<cmpAttriGroup.length;j++){
            allcmpAttribute.push({
                id: cmpAttriGroup[j].ID,
                name:cmpAttriGroup[j].displayName
            })
        }
        break; //now got the comparison attribute break the loop;
     }
 }
var allProductAttributeValue= [] ; // store all the value of the comparison products attribute;

//first get all the name of the associated attribute ;
for(let i=0;i< allcmpAttribute.length;i++){
    var obj ={} ;
    obj.name =allcmpAttribute[i].name ;
    obj.product=[];
    allProductAttributeValue.push(obj) ;
}
for(let i=0;i<pids.length;i++){
    var Product = ProductMgr.getProduct(pids[i]) ;
for(let j=0;j< allcmpAttribute.length;j++){
    if(Product.custom.hasOwnProperty(allcmpAttribute[j].id)){
        //value is set for that particular product of that particular attribute
        let temp ;
        if(Product.custom[allcmpAttribute[j].id] === true){
            temp="Yes";
        }
        else if(Product.custom[allcmpAttribute[j].id] === false){
            temp="No";
        }
        else {
            temp=Product.custom[allcmpAttribute[j].id] ;
        }
        allProductAttributeValue[j].product.push(temp) ;
    }
    else{
        // value is not set hence set the value to be N/A ;
        allProductAttributeValue[j].product.push('No information') ;
    }
}
}

 
////////--------------OWN IMPLEMENTATION ENDS-------------////////////////////////

    var products = pids.map(function (pid) {
        return productFactory.get({ pid: pid });
    });
   
    category.displayName="test";
    category.image=null;
    res.render('product/comparison', {
        category: {
            name: category.displayName,
            imgUrl: category.image ? category.image.url.toString() : null
        },
        pids: pids,
        attributes: (new CompareAttributesModel(products)).slice(0),
        attributesTemp:   allProductAttributeValue
    });

    next();
});

module.exports = server.exports();
