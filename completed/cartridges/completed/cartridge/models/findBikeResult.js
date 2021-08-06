'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var URLUtils = require('dw/web/URLUtils');
var server= require('server');
function findBikeResult(productData) {
    var findmybikeForm = server.forms.getForm('findmybike').toObject(); 
    var temp="check";
    return collections.map(productData, function (product) {
        var temp= product;
        var apiImage = product.getImage('small', 0);
      
        if (!apiImage) {
            return {};
        }
      
        return {
            ID: product.ID,
            name: product.name,
            gender: product.custom.gender.value,
            age: product.custom.minAge,
            height: product.custom.minHeight,
            //description: product.pageDescription,
            images: {
                small: [{
                    alt: apiImage.alt,
                    url: apiImage.URL.toString(),
                    title: apiImage.title,
                    absURL: apiImage.absURL.toString()
                }]
            }
        };
    })

}

module.exports = findBikeResult;
