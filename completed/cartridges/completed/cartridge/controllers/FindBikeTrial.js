

'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');

server.get(
    'Show', function (req, res, next) {
      
        var actionUrl = URLUtils.url('FindBikeResultTrial-Show'); //sets the route to call for the form submit action
        var findmybikeForm = server.forms.getForm('findmybike'); //creates empty JSON object using the form definition
        findmybikeForm.clear();

        res.render('findBikeTrial', {
            actionUrl: actionUrl,
            findmybike: findmybikeForm
        });
        next();
    });

module.exports = server.exports();