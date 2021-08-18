'use strict';

/**
 * @namespace Login
 */

var server = require('server');
server.extend(module.superModule);
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Login-Register : This endpoint is called to for Register page
 * @name Base/Login-ShowCustom
 * @function
 * @memberof Login
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {querystringparameter} - rurl - Redirect URL
 * @param {querystringparameter} - action - Action on submit of Login Form
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 server.get(
    'Register',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var URLUtils = require('dw/web/URLUtils');
        var Resource = require('dw/web/Resource');

        var target = req.querystring.rurl || 1;
        
        var rememberMe = false;
        var userName = '';
        var actionUrl = URLUtils.url('Account-Login', 'rurl', target);
        var createAccountUrl = URLUtils.url('Account-SubmitRegistration', 'rurl', target).relative().toString();
        var navTabValue = req.querystring.action;

        if (req.currentCustomer.credentials) {
            rememberMe = true;
            userName = req.currentCustomer.credentials.username;
        }

        var breadcrumbs = [
            {
                htmlValue: Resource.msg('global.home', 'common', null),
                url: URLUtils.home().toString()
            }
        ];

        var profileForm = server.forms.getForm('profile');
        profileForm.clear();

        res.render('/account/register', {
            navTabValue: navTabValue || 'login',
            rememberMe: rememberMe,
            userName: userName,
            actionUrl: actionUrl,
            profileForm: profileForm,
            breadcrumbs: breadcrumbs,
            oAuthReentryEndpoint: 1,
            createAccountUrl: createAccountUrl
        });

        next();
    }
);
/**
 * Login-ForgotPassword : This endpoint is called to load the ForgotPassword page
 * @name Base/Login-ForgotPassword
 * @function
 * @memberof Login
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 server.get(
    'ForgotPassword',
    server.middleware.https,
    function (req, res, next) { 
        res.render('account/password/requestPasswordResetModal');
        next();
    }
);
module.exports = server.exports();
