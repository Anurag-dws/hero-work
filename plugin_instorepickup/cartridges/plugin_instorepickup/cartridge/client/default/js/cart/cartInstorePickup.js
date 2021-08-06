'use strict';
var processInclude = require('base/util');

$(document).ready(function () {
    
    processInclude(require('./instoreCart'));
});
module.exports = {
    setShippingMethodSelection: function () {
        $('body').on('setShippingMethodSelection', function (e, basket) {
            if (basket.disableShippingMethod === '') {
                $('#shippingMethods').removeAttr('disabled');
            }
        });
    }
};
