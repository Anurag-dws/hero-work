"use strict";
var base = require("./base");
var count = 0;
var innerCount = 0;
/**
 * Enable/disable UI elements
 * @param {boolean} enableOrDisable - true or false
 */
function updateAddToCartEnableDisableOtherElements(enableOrDisable) {
                //ISSUE-7
    var Essential = $("button.add-to-cart-global").attr('essential');  //check whether the variation is of essential kit or not ; 
      if(typeof Essential === typeof undefined || Essential === false){
  $("button.add-to-cart-global").attr("disabled", enableOrDisable);
}
}
function essentialAddAllToCartButton(currentEssentialSetClass){
   // got the current essential product class(basically the productSet Id) now check whether all of the product set of that particular class is having readToOrder and available or  not;
  // console.log("selected one class is ");
   //console.log(currentEssentialSetClass);

   var essentialGlobalButton = $(`.${currentEssentialSetClass} .product-availability`)
     .toArray().every(function (item) {
      //console.log(item);
        return $(item).data("available") && $(item).data("ready-to-order");
      });
     //console.log("essentialGlobalButton value is ");
    // console.log(essentialGlobalButton);
   /////////////////////
   // now find the current global addToCart button of our current clicked Essential kit variation and checked whether all
   // the product set of the current product is selected or not and accordingly it will enable or disable the AddAllToCart button
  
    var tet = $(`button.${currentEssentialSetClass}`).attr("disabled", !essentialGlobalButton );
      //console.log(tet);
      return ;
}
 function onLoadAddToCart() {
  //  $("body").on( "load", function () {
      //ISSUE- 7
     // console.log("onLoadAddToCart");
      var essentialSetId = [];
      //console.log(essentialSetId);
      //got all the addAlltoCart Button ;
      // now check whether all the selected button is esential kits or not ;
     $("button.add-to-cart-global").each(function(){
      // console.log(this);
       var Essential = $(this).attr('essential');  //check whether the variation is of essential kit or not ; 
        if(typeof Essential !== typeof undefined && Essential !== false){
         // console.log(this) ;
          essentialSetId.push($(this).data('pid'));
          essentialAddAllToCartButton($(this).data('pid')) ;
        }
      });
      //got all the id of the Essential set in our array;
     
      //console.log(essentialSetId);
      
  //  }
  //   );
  }
module.exports = {
  methods: {
    updateAddToCartEnableDisableOtherElements:
      updateAddToCartEnableDisableOtherElements,
  },
  availability: base.availability,
  addToCart: base.addToCart,

  updateAttributesAndDetails: function () {
    $("body").on("product:statusUpdate", function (e, data) {
    //   console.log("updateAttributesAndDetails");
      //console.log(`product is ${data.id}`);
      var $productContainer = $('.product-detail[data-pid="' + data.id + '"]');

      $productContainer
        .find(".description-and-detail .product-attributes")
        .empty()
        .html(data.attributesHtml);

      if (data.shortDescription) {
        $productContainer
          .find(".description-and-detail .description")
          .removeClass("hidden-xl-down");
        $productContainer
          .find(".description-and-detail .description .content")
          .empty()
          .html(data.shortDescription);
      } else {
        $productContainer
          .find(".description-and-detail .description")
          .addClass("hidden-xl-down");
      }

      if (data.longDescription) {
        $productContainer
          .find(".description-and-detail .details")
          .removeClass("hidden-xl-down");
        $productContainer
          .find(".description-and-detail .details .content")
          .empty()
          .html(data.longDescription);
      } else {
        $productContainer
          .find(".description-and-detail .details")
          .addClass("hidden-xl-down");
      }
    });
  },

  showSpinner: function () {
    $("body").on(
      "product:beforeAddToCart product:beforeAttributeSelect",
      function () {
        $.spinner().start();
      }
    );
  },
  updateAttribute: function () {
    $("body").on("product:afterAttributeSelect", function (e, response) {
    //   console.log("hey i am the one ");
    //   console.log(response);
      if ($(".product-detail>.bundle-items").length) {
        response.container.data("pid", response.data.product.id);
        response.container.find(".product-id").text(response.data.product.id);
      } else if ($(".product-set-detail").eq(0)) {
        response.container.data("pid", response.data.product.id);
        response.container.find(".product-id").text(response.data.product.id);
      } else {
        $(".product-id").text(response.data.product.id);
        $('.product-detail:not(".bundle-item")').data(
          "pid",
          response.data.product.id
        );
      }
    });
  },
  onLoadAddToCart: onLoadAddToCart,
  updateAddToCart: function () {
    $("body").on("product:updateAddToCart", function (e, response) {
      // update local add to cart (for sets)
    //   console.log("current test for addtocart");
    //   console.log(response);
      $("button.add-to-cart", response.$productContainer).attr(
        "disabled",
        !response.product.readyToOrder || !response.product.available
      );

      /////////////////////    ISSUE-5
      var Essential = $(response.$productContainer).data('essential');  //check whether the variation is of essential kit or not ; 
      if(typeof Essential !== typeof undefined && Essential !== false){
        var currentEssentialSetClass = $(response.$productContainer)
        .attr("class")
        .split(" ")[0];
        essentialAddAllToCartButton(currentEssentialSetClass) ;
    }
    else{
     
     
      var enable = $(".product-availability")
        .toArray()
        .every(function (item) {
          var temp =
            $(item).data("available") && $(item).data("ready-to-order");
          //console.log(item);
          //console.log(temp);
          innerCount++;
          return temp;
          //return $(item).data('available') && $(item).data('ready-to-order');
        });
      count++;
    //   console.log(`count is : ${count}`);
    //   console.log(`innerCount is : ${innerCount}`);
      module.exports.methods.updateAddToCartEnableDisableOtherElements(!enable);
    }
    });
  },
  updateAvailability: function () {
    $("body").on("product:updateAvailability", function (e, response) {
      $("div.availability", response.$productContainer)
        .data("ready-to-order", response.product.readyToOrder)
        .data("available", response.product.available);

      $(".availability-msg", response.$productContainer)
        .empty()
        .html(response.message);

      if ($(".global-availability").length) {
        var allAvailable = $(".product-availability")
          .toArray()
          .every(function (item) {
            return $(item).data("available");
          });

        var allReady = $(".product-availability")
          .toArray()
          .every(function (item) {
            return $(item).data("ready-to-order");
          });

        $(".global-availability")
          .data("ready-to-order", allReady)
          .data("available", allAvailable);

        $(".global-availability .availability-msg")
          .empty()
          .html(
            allReady ? response.message : response.resources.info_selectforstock
          );
      }
    });
  },
  sizeChart: function () {
    $(".size-chart a").on("click", function (e) {
      e.preventDefault();
      var url = $(this).attr("href");
      var $prodSizeChart = $(this)
        .closest(".size-chart")
        .find(".size-chart-collapsible");

      if ($prodSizeChart.is(":empty")) {
        $.ajax({
          url: url,
          type: "get",
          dataType: "json",
          success: function (data) {
            $prodSizeChart.append(data.content);
          },
        });
      }
      $prodSizeChart.toggleClass("active");
    });

    var $sizeChart = $(".size-chart-collapsible");
    $("body").on("click touchstart", function (e) {
      if ($(".size-chart").has(e.target).length <= 0) {
        $sizeChart.removeClass("active");
      }
    });
  },
  copyProductLink: function () {
    $("body").on("click", "#fa-link", function () {
      event.preventDefault();
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($("#shareUrl").val()).select();
      document.execCommand("copy");
      $temp.remove();
      $(".copy-link-message").attr("role", "alert");
      $(".copy-link-message").removeClass("d-none");
      setTimeout(function () {
        $(".copy-link-message").addClass("d-none");
      }, 3000);
    });
  },

  focusChooseBonusProductModal: base.focusChooseBonusProductModal(),
};
