'use strict';


var server = require('server');
server.extend(module.superModule);
/**
 * Cart-Show : The Cart-Show endpoint renders the cart page with the current basket
 * @name Base/Cart-Show
 * @function
 * @memberof Cart
 * @param {middleware} - server.middleware.https
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 server.append(
    'Show',
    function (req, res, next) {


        var viewData= res.getViewData();

        
var AccountModel = require('*/cartridge/models/account');
viewData.registeredUser =false;
 var accountModel = new AccountModel(req.currentCustomer);
 if(accountModel.registeredUser){
    viewData.registeredUser =true;
 }
  res.setViewData(viewData);
        next();
});


module.exports = server.exports();