

'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var CustomObjectMgr = require('dw/object/CustomObjectMgr'); 
var SystemObjectMgr = require('dw/object/SystemObjectMgr'); 

server.get(
    'Show', function (req, res, next) {
      
        var actionUrl = URLUtils.url('FindBikeResult-Show'); //sets the route to call for the form submit action
        var findmybikeForm = server.forms.getForm('findmybike'); //creates empty JSON object using the form definition
        findmybikeForm.clear();
        // res.json({hello : "hello this is sent from res.json()" });
        // res.json({helloAgain : "hello Again is sent from res.json()" });
        var news="news";
        var customObjectSampleId = 'NO00gdgsegdgfdgdfdhgfdfsdfgnrghfgdfhfddfnfsf000000000000000000001';
        //var customObject = CustomObjectMgr.createCustomObject('demo',"jefjuejferfjrfijrnfrjrf");
///////////////////////////////////////////////////////////////////////////

var Transaction = require('dw/system/Transaction');
   Transaction.begin();

// try {

//     var randomID = 'NO00000001';
//     var customObject = CustomObjectMgr.createCustomObject('demo',randomID);

//     customObject.custom.mail = "ak4032777@gmail.com";

//     Transaction.commit();

// } catch (e) {

//     Transaction.rollback();

// }
///////////////////////////////////////////////////////////////////////////////////////
    //    var customObject = CustomObjectMgr.getAllCustomObjects('demo');
     
    
        var t4mp= "check";
       var t4mp2 ="check2";
        res.render('findBike', {
            actionUrl: actionUrl,
            findmybike: findmybikeForm
           
        });
        next();
    });

module.exports = server.exports();