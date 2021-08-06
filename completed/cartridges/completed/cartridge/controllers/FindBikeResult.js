



'use strict';
var server = require('server');
var ProductModel = require('*/cartridge/models/findBikeResult');
var URLUtils = require('dw/web/URLUtils');


server.post('Show', server.middleware.https,
    function (req, res, next) {
       // var findmybikeForm = server.forms.getForm('profile'); 
         var age_ = req.form.age;
        var gender_ = req.form.gender;
         var height_ = req.form.height;
         var category_ = req.form.category;  


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
                if(Products[i].height <= height_ || Products[i].height==null) {
                    if( Products[i].age <= age_ || Products[i].age==null) {
                   
                      refinedProducts.push(Products[i]);
                    }
                 } 
               }
           }




         ///////////////////////////////////////

                var temp="check";
                var temp_check="check";
        res.render('findBikeResult', {
            Products :refinedProducts,
            age: age_,
            gender: gender_,
            height: height_,
            category : category_
        });
        next();
    });

module.exports = server.exports();