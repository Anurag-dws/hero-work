'use strict'
/**
 * @namespace Show- first run the controller to know the product id whom we want to know the details spec;
 * @param  pid - need to know the product id of the Product whom details the user is requesting
 */

var server= require('server');
var URLUtils = require('dw/web/URLUtils');

server.get('Show',function(req,res,next){
     

    var actionUrl = URLUtils.url('ProductIdResult-Show');


res.render('productId',{
    actionUrl: actionUrl
});
 next();
});

module.exports = server.exports();
