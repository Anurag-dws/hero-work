'use strict';

var processInclude = require('base/util');
// "use strict";

// var $compareBar = $(".compare-bar-wrapper");
// var maxSlots = parseInt($(".compare-bar").data("max-slots"), 10);
// var productsForComparison = [];
// var compareButtonText = $("button.compare").text();
// var localStorageData = []; //stores the data coming from local storage of the Browser


// /**
//  * @typedef ProductComparisonList
//  * @type Object
//  * @property {string} pid - ID for product to compare
//  * @property {string} imgSrc - Image URL for selected product
//  */

// /**
//  * Compiles the HTML for a single slot
//  *
//  * @param {ProductComparisonList} product - Selected product to compare
//  * @param {number} idx - Slot number (zero-based)
//  * @return {string} - HTML for a single slot
//  */
// function compileSlot(product, idx) {
//   var pid = product.pid;
//   var name = "pid" + idx;

//   return (
//     "" +
//     '<div class="col-3 selected-product">' +
//     '<div class="slot" data-pid="' +
//     pid +
//     '">' +
//     '<img alt="' +
//     product.altText +
//     '" src="' +
//     product.imgSrc +
//     '">' +
//     '<div class="close">' +
//     '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>' +
//     "</div>" +
//     "</div>" +
//     '<input type="hidden" name="' +
//     name +
//     '" value="' +
//     pid +
//     '">' +
//     "</div>\n"
//   );
// }

// /**
//  * Draw and render the Compare Bar product slots
//  *
//  * @param {ProductComparisonList []} productsToCompare - List of ID's of the products to compare
//  */
// function redrawCompareSlots(productsToCompare) {
  
//   var html = productsToCompare
//     .map(function (product, idx) {
    
//       return compileSlot(product, idx);
//     })
//     .join("");

//   // Render empty slots
//   if (productsToCompare.length < maxSlots) {
//     var numAvailableSlots = maxSlots - productsToCompare.length;

//     for (var i = 0; i < numAvailableSlots; i++) {
//       if (i === 0 && productsToCompare.length < 2) {
//         html +=
//           '<div class="col-3 selected-product"><div class="slot">' +
//           '<div class="min-products-msg">' +
//           $(".compare-bar").data("min-products-msg") +
//           "</div></div></div>";
//       } else {
//         html +=
//           '<div class="col-3 selected-product"><div class="slot"></div></div>';
//       }
//     }
//   }

//   $(".compare-bar .product-slots").empty().append(html);
// }

// /**
//  * Enables/disables the Compare button, depending on whether at least two products have been
//  * selected for comparison
//  *
//  * @param {number} numProducts - Number of products selected for comparison
//  */
// function setCompareButton(numProducts) {
//   if (numProducts > 0) {
//     $("button.compare").text(compareButtonText + "(" + numProducts + ")");
//   } else {
//     $("button.compare").text(compareButtonText);
//   }
//   if (numProducts < 2) {
//     $("button.compare").attr("disabled", true);
//   } else {
//     $("button.compare").removeAttr("disabled");
//   }
// }

// /**
//  * Returns a copy of a list of products to compare
//  *
//  * @param {ProductComparisonList []} productsToCompare - List of ID's of the products to compare
//  * @return {ProductComparisonList []} List of ID's of the products to compare
//  */
// function copyProducts(productsToCompare) {
//   return productsToCompare.map(function (product) {
//     var proxy = {};

//     Object.keys(product).forEach(function (key) {
//       proxy[key] = product[key];
//     });

//     return proxy;
//   });
// }

// /**
//  * Handles when the page/reload scenerio
//  *
//  * @param {ProductComparisonList []} products - List of ID's of the products available in the localStorage
//  * @return {ProductComparisonList []} List of ID's of the products For comparison
//  */
// function localStorageOnLoad(products) {
//   var productsToCompare = copyProducts(products) || [];

//   if (productsToCompare.length === maxSlots) {
//     //if(!$("input[type=checkbox]").is(":checked")){
//        $("input[type=checkbox]:not(:checked)").attr("disabled", true);
//    // }
    
//   }
//   // when the page refresh then don't add the product which is alreday there in the comparison list ;
//   // for that check the product id and add the product accordingly ;
  
//   redrawCompareSlots(productsToCompare);
  
//   setCompareButton(productsToCompare.length);

//   // handle case when the user open the same page  side by side on the browser ,
//   // or when the page reload this code automatically pick the selected checkbox and mark as selected and 
//   // enable the enable the selection of the checkbox that is alreday selected ;  
//   if (products.length != 0) $compareBar.show();
//   products.forEach(function (product) {
//     $("input#" + product.pid).prop("checked", true);
//     $("input#" + product.pid).removeAttr("disabled");
//   });
 
//   return productsToCompare;
// }
$(document).ready(function () {
    processInclude(require('base/search'));
    processInclude(require('./product/compare'));
});
$( document ).ajaxComplete(function() {
    var callthis =require('./product/compare');
    callthis.handlePageOnLoad() ;
   console.log('calling the ajax complete');
  });