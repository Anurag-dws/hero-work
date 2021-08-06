



'use strict';
var server = require('server');
var ProductModel = require('*/cartridge/models/findBikeResult');
var URLUtils = require('dw/web/URLUtils');


server.post('Show', server.middleware.https,
    function (req, res, next) {
        var findmybikeForm = server.forms.getForm('findUpgrade'); 
        var findmybikeFormObject =  findmybikeForm.toObject();
        var temp="test ";
        
        var category_ = findmybikeForm.category.htmlValue; //bike category
        var gender_ = findmybikeForm.gender.htmlValue;
         var firefox_ = findmybikeForm.firefox.htmlValue; // do you have firefox bike or not ?
         var name_ = findmybikeForm.name.htmlValue; // name of the bike that u have ? 
         

         var CatalogMgr = require('dw/catalog/CatalogMgr');  
         var Category = CatalogMgr.getCategory(category_);
            ///got the category 
         var allProducts = Category.getOnlineProducts();
           // now find the gender in that category;
           var Products = new ProductModel(allProducts);
            ///////////////////////////////////////
             ///refining the resultant proudct accordingly to the user input value;
             var refinedProducts=[] ; 
          for(let i=0;i<Products.length; i++){
              if(Products[i].gender == gender_ || Products[i].gender == null  ){
               
                   
                      refinedProducts.push(Products[i]);
               }
           }




         ///////////////////////////////////////

                var temp="check";
                var temp_check="check";
        res.render('findUpgradeResult', {
            Products :refinedProducts,
        });
        next();
    });

module.exports = server.exports();