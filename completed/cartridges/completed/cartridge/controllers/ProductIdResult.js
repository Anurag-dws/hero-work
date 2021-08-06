'use strict'
/**
 * @namespace Show- run the controller and find all the rquired attribute and send to the ISML for render
 * @param  pid - prouct ID which is coming from the ISML;
 */

var server= require('server');

server.post('Show',function(req,res,next){
    
    var pid = req.form.pid;
    var ProductMgr = require('dw/catalog/ProductMgr');
    var Product = ProductMgr.getProduct(pid); // will return the info of the product using the product id
    var prouductAttributes;
    var temp="hcfb";
    // now pass all the required attribute to the prouductAttributes from the Product;


res.render('productIdResult',{
    Pattributes: prouductAttributes
});
next();
}

);

module.exports = server.exports();
