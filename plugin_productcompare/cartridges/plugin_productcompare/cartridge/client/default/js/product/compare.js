"use strict";

var $compareBar = $(".compare-bar-wrapper");
var maxSlots = parseInt($(".compare-bar").data("max-slots"), 10);
var productsForComparison = [];
var compareButtonText = $("button.compare").text();
var localStorageData = []; //stores the data coming from local storage of the Browser
var lastKnownUrl = location.href;

/**
 * @typedef ProductComparisonList
 * @type Object
 * @property {string} pid - ID for product to compare
 * @property {string} imgSrc - Image URL for selected product
 */

/**
 * Compiles the HTML for a single slot
 *
 * @param {ProductComparisonList} product - Selected product to compare
 * @param {number} idx - Slot number (zero-based)
 * @return {string} - HTML for a single slot
 */
function compileSlot(product, idx) {
  var pid = product.pid;
  var name = "pid" + idx;

  return (
    "" +
    '<div class="col-3 selected-product">' +
    '<div class="slot" data-pid="' +
    pid +
    '">' +
    '<img alt="' +
    product.altText +
    '" src="' +
    product.imgSrc +
    '">' +
    '<div class="close">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>' +
    "</div>" +
    "</div>" +
    '<input type="hidden" name="' +
    name +
    '" value="' +
    pid +
    '">' +
    "</div>\n"
  );
}

/**
 * Draw and render the Compare Bar product slots
 *
 * @param {ProductComparisonList []} productsToCompare - List of ID's of the products to compare
 */
function redrawCompareSlots(productsToCompare) {
  
  var html = productsToCompare
    .map(function (product, idx) {
    
      return compileSlot(product, idx);
    })
    .join("");

  // Render empty slots
  if (productsToCompare.length < maxSlots) {
    var numAvailableSlots = maxSlots - productsToCompare.length;

    for (var i = 0; i < numAvailableSlots; i++) {
      if (i === 0 && productsToCompare.length < 2) {
        html +=
          '<div class="col-3 selected-product"><div class="slot">' +
          '<div class="min-products-msg">' +
          $(".compare-bar").data("min-products-msg") +
          "</div></div></div>";
      } else {
        html +=
          '<div class="col-3 selected-product"><div class="slot"></div></div>';
      }
    }
  }

  $(".compare-bar .product-slots").empty().append(html);
}

/**
 * Enables/disables the Compare button, depending on whether at least two products have been
 * selected for comparison
 *
 * @param {number} numProducts - Number of products selected for comparison
 */
function setCompareButton(numProducts) {
  if (numProducts > 0) {
    $("button.compare").text(compareButtonText + "(" + numProducts + ")");
  } else {
    $("button.compare").text(compareButtonText);
  }
  if (numProducts < 2) {
    $("button.compare").attr("disabled", true);
  } else {
    $("button.compare").removeAttr("disabled");
  }
}

/**
 * Returns a copy of a list of products to compare
 *
 * @param {ProductComparisonList []} productsToCompare - List of ID's of the products to compare
 * @return {ProductComparisonList []} List of ID's of the products to compare
 */
function copyProducts(productsToCompare) {
  return productsToCompare.map(function (product) {
    var proxy = {};

    Object.keys(product).forEach(function (key) {
      proxy[key] = product[key];
    });

    return proxy;
  });
}

/**
 * Handles the selection of a product for comparison
 *
 * @param {ProductComparisonList []} products - List of ID's of the products to compare
 * @param {string} pid - ID for product to compare
 * @param {string} imgSrc - Image URL for selected product
 * @param {string} altText - Alt text for selected product image
 * @return {ProductComparisonList []} List of ID's of the products to compare
 */
function selectProduct(products, pid, imgSrc, altText) {
 
  var productsToCompare = copyProducts(products) || [];
 
  if (productsToCompare.length < maxSlots) {
    productsToCompare.push({
      pid: pid,
      imgSrc: imgSrc,
      altText: altText,
    });
   
    if (productsToCompare.length === maxSlots) {
      $("input[type=checkbox]:not(:checked)").attr("disabled", true);
    }
  
    redrawCompareSlots(productsToCompare);
    setCompareButton(productsToCompare.length);
    $compareBar.show();
  }

  return productsToCompare;
}

/**
 * Handles the deselection of a product
 *
 * @param {ProductComparisonList []} products - List of ID's of the products to compare
 * @param {string} pid - ID for product to compare
 * @return {ProductComparisonList []} List of ID's of the products to compare
 */
function deselectProduct(products, pid) {
  var productsToCompare = copyProducts(products) || [];

  productsToCompare = productsToCompare.filter(function (product) {
    return product.pid !== pid;
  });

  if (productsToCompare.length === 0) {
    $compareBar.hide();
  }

  $("input#" + pid).prop("checked", false);
  $("input[type=checkbox]:not(:checked)").removeAttr("disabled");

  redrawCompareSlots(productsToCompare);
  setCompareButton(productsToCompare.length);
  return productsToCompare;
}

/**
 * Clears the Compare Bar and hides it
 * @return {undefined}
 */
function clearCompareBar() {
  productsForComparison.forEach(function (product) {
    $(this).trigger("compare:deselected", { pid: product.pid });
  });

  productsForComparison = [];
  $(".compare input").prop("checked", false);
  $(".compare input[type=checkbox]:not(:checked)").removeAttr("disabled");
  $compareBar.hide();
}

/**
 * Update form action url to not have query string
 * @returns {undefined}
 */
function updateSubmitUrl() {
  var form = $(".compare-products-form");
  var targetUrl = form.attr("action");
  var urlParts = targetUrl.split("?");
  if (urlParts[1]) {
    urlParts[1].split("&").forEach(function (keyValue) {
      var splittedValues = keyValue.split("=");
      var key = decodeURIComponent(splittedValues[0]);
      var value = decodeURIComponent(splittedValues[1]);
      if (key && value) {
        if (form.find('[name="' + key + '"]').length === 0) {
          form.append(
            '<input type="hidden" name="' + key + '" value="' + value + '" />'
          );
        }
      }
    });
    form.attr("action", urlParts[0]);
  }
}
/**
 * Handles when the page/reload scenerio
 *
 * @param {ProductComparisonList []} products - List of ID's of the products available in the localStorage
 * @return {ProductComparisonList []} List of ID's of the products For comparison
 */
function localStorageOnLoad(products) {
  var productsToCompare = copyProducts(products) || [];

  if (productsToCompare.length === maxSlots) {
   
       $("input[type=checkbox]:not(:checked)").attr("disabled", true);
  }
  // when the page refresh then don't add the product which is alreday there in the comparison list ;
  // for that check the product id and add the product accordingly ;
  
  redrawCompareSlots(productsToCompare);
  
  setCompareButton(productsToCompare.length);

  // handle case when the user open the same page  side by side on the browser ,
  // or when the page reload this code automatically pick the selected checkbox and mark as selected and 
  // enable the enable the selection of the checkbox that is alreday selected ; 
  $("input[type=checkbox]").prop("checked", false); 
  if (products.length != 0) $compareBar.show();
  products.forEach(function (product) {
    $("input#" + product.pid).prop("checked", true);
    $("input#" + product.pid).removeAttr("disabled");
  });

 //$(`input[type=checkbox][pdp=${true}]`).prop('checked',false);

  return productsToCompare;

}
module.exports = {
 
 
   /**
   * Handles when the Page load/reload ;
   */
  handlePageOnLoad: function () {
    localStorageData = localStorage.getItem("hero-cmp-data");
    console.log('handle page on load called');
    //if something is in our local storage then push it in to the productsForComparison array and render the compare bar;
    if (localStorageData) {
      
      productsForComparison = JSON.parse(localStorageData); // converts to an array ;
      productsForComparison = localStorageOnLoad(productsForComparison);
    }
    
  },
  /**
   * Handles Compare checkbox click
   */
  handleCompareClick: function () {
    
    
    $("div.page").on("click", ".compare input[type=checkbox]", function () {
     
       
      var pid = $(this).attr("id");
      console.log('hey! someone clicked me with pid of '+ pid);
      var checked = $(this).is(":checked");
      //if this is coming from pdp then
      // do this
      var pid = $(this).attr("id");
      var imgSrc;
      var altText;
      if ($(this).attr("pdp")) {
        imgSrc = $(this).attr("imgsrc");
      
        //console.log(`hey there this is PDP page`);
      } else {
        imgSrc = $(this)
          .closest(".product-tile")
          .find(".tile-image")
          .prop("src");
        altText = $(this)
          .closest(".product-tile")
          .find(".tile-image")
          .attr("alt");
        //console.log(`hey there this is PLP page`);
      }

      if (checked) {
       
        productsForComparison = selectProduct(
          productsForComparison,
          pid,
          imgSrc,
          altText
        );
        localStorage.setItem(
          "hero-cmp-data",
          JSON.stringify(productsForComparison)
        );
        $(this).trigger("compare:selected", { pid: pid });
      } else {
      
        productsForComparison = deselectProduct(productsForComparison, pid);
        localStorage.setItem(
          "hero-cmp-data",
          JSON.stringify(productsForComparison)
        );
        $(this).trigger("compare:deselected :", { pid: pid });
      }
    });
    
 
},

  /**
   * Handles the Clear All link
   */
  handleClearAll: function () {
    $(".compare-bar a.clear-all").on("click", function (e) {
      e.preventDefault();
      clearCompareBar();
      localStorageData = localStorage.getItem("hero-cmp-data");
      localStorageData = [];
      localStorage.setItem("hero-cmp-data", JSON.stringify(localStorageData));
    });
  },

  /**
   * Handles deselection of a product on the Compare Bar
   */
  deselectProductOnCompareBar: function () {
    $(".compare-bar").on("click", ".close", function () {
      var pid = $(this).closest(".slot").data("pid").toString();
      productsForComparison = deselectProduct(productsForComparison, pid);
      localStorage.setItem("hero-cmp-data", JSON.stringify(productsForComparison));
      $(this).trigger("compare:deselected", { pid: pid });
    });
  },

  // /**
  //  * Selects products for comparison based on the checked status of the Compare checkboxes in
  //  * each product tile.  Used when user goes back from the Compare Products page.
  //  */
  // selectCheckedProducts: function () {
  //   $(".product-grid").ready(function () {
  //     if (location.hash) {
  //       location.hash
  //         .replace("#", "")
  //         .split(",")
  //         .forEach(function (id) {
  //           $("input#" + id).prop("checked", "checked");
  //         });
  //     }
  //     $(".compare input:checked").each(function () {
  //       var pid = $(this).prop("id");
  //       var imgSrc = $(this)
  //         .closest(".product-tile")
  //         .find("img.tile-image")
  //         .prop("src");
  //       var altText = $(this)
  //         .closest(".product-tile")
  //         .find(".tile-image")
  //         .attr("alt");

  //       productsForComparison = selectProduct(
  //         productsForComparison,
  //         pid,
  //         imgSrc,
  //         altText
  //       );
  //       $(this).trigger("compare:selected", { pid: pid });
  //     });
  //   });
  // },

  /**
   * Sets the "backUrl" property to the last attribute selected URL to ensure that when the user
   * goes back from the Compare Products page, the previously selected attributes are still
   * selected and applied to the previous search.
   */
  // setBackUrl: function () {
  //   $(".search-results").on("click", ".refinements a", function () {
  //     $('input[name="backUrl"]').val($(this).prop("href"));
  //   });
  // },

  // /**
  //  * Sets the history.pushState for history.back() to work from the Compare Products page.
  //  */
  // setPushState: function () {
  //   $(".compare-products-form").on("submit", function () {
  //     updateSubmitUrl();
  //     var selectedProducts = $(".compare input:checked")
  //       .map(function () {
  //         return this.id;
  //       })
  //       .get()
  //       .join(",");
  //     history.pushState(
  //       {},
  //       document.title,
  //       lastKnownUrl + "#" + selectedProducts
  //     );
  //     location.hash = selectedProducts;

  //     $(this)
  //       .find('input[name="cgid"]')
  //       .attr("value", $("input.category-id").val());
  //   });
  // },
  // catchFilterChange: function () {
  //   $(".container").on(
  //     "click",
  //     ".refinements li a, .refinement-bar a.reset",
  //     function (e) {
  //       e.preventDefault();
  //       clearCompareBar();
  //     }
  //   );
  // },
  // listenToFilterChange: function () {
  //   $("body").on("search:filter", function (e, data) {
  //     lastKnownUrl = data.currentTarget.href;
  //   });
  // },
};
