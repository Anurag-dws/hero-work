

'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');

server.get(
    'Show', function (req, res, next) {
      
        var actionUrl = URLUtils.url('FindUpgradeResult-Show'); //sets the route to call for the form submit action
        var FindUpgradeForm = server.forms.getForm('findUpgrade'); //creates empty JSON object using the form definition
        FindUpgradeForm.clear();

        res.render('findUpgrade', {
            actionUrl: actionUrl,
            FindUpgrade: FindUpgradeForm
        });
        next();
    });

module.exports = server.exports();