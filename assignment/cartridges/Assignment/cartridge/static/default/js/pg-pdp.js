!function(s){var e={};function t(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return s[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=s,t.c=e,t.d=function(s,e,a){t.o(s,e)||Object.defineProperty(s,e,{enumerable:!0,get:a})},t.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,e){if(1&e&&(s=t(s)),8&e)return s;if(4&e&&"object"==typeof s&&s&&s.__esModule)return s;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:s}),2&e&&"string"!=typeof s)for(var i in s)t.d(a,i,function(e){return s[e]}.bind(null,i));return a},t.n=function(s){var e=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(e,"a",e),e},t.o=function(s,e){return Object.prototype.hasOwnProperty.call(s,e)},t.p="",t(t.s=2)}({2:function(s,e){var t=$(window).width();function a(){(t=$(window).width())<992&&($(document).on("click",".js-mobileMenu",(function(s){s.stopPropagation(),$(this).addClass("active"),$(".nav-list").addClass("open")})),$(document).on("click",".js-mobileMenu.active",(function(s){s.stopPropagation(),$(this).removeClass("active"),$(".nav-list").removeClass("open")})),$(document).on("click",".cp-header .specfn-link",(function(){$(this).parents(".nav-list").removeClass("open"),$(".js-mobileMenu").removeClass("active")})),$(document).on("click",".js-price",(function(s){s.stopPropagation(),$(this).addClass("active"),$(".price-wrap").addClass("open")})),$(document).on("click",".js-close",(function(s){s.stopPropagation(),$(".price-wrap").removeClass("open")})))}$(document).ready((function(){!function(){var s=[];for(i=48;i<58;i++)s.push(i);$(document).on("click",".cp-input label",(function(){$(this).parents(".cp-input").find("input").focus()})),$(".email").blur((function(s){var e=$(this).parent().find(".error-text"),t=$(this).parent();$.email_validation($(this).val())?(e.html(""),e.css("display","none"),t.removeClass("error"),t.addClass("valid"),!1):(e.html("Invalid email ID"),e.css("display","inline-block"),t.addClass("error"),t.removeClass("valid"),!0)})),$(".email").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".alpha").keyup((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap"),a=/[^a-zA-Z]/g;a.test($(this).val())?($(this).val($(this).val().replace(a,"")),e.html("Please enter only alphabest"),e.css("display","inline-block"),t.addClass("error"),t.removeClass("valid"),!0):(e.html(""),e.css("display","none"),t.removeClass("error"),t.addClass("valid"),!1)})),$(".alpha").blur((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length?(e.html("This field is required"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):$(this).val().length<3?(e.html("Please enter a valid Name"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".alpha").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".mobileNumber").keyup((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap"),a=/[^0-9]/g;a.test($(this).val())?($(this).val($(this).val().replace(a,"")),e.html("Please enter only numbers"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".mobileNumber").blur((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length?(e.html("This field is required."),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid")):"0000000000"==$(this).val()||"0123456789"==$(this).val()||1234567890==$(this).val()||9999999999==$(this).val()||8888888888==$(this).val()||7777777777==$(this).val()||9898989898==$(this).val()?(e.html("Please enter valid Mobile Number."),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):$(this).val().length>0&&$(this).val().length<10?(e.html("Please enter valid Mobile Number."),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid")):(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".mobileNumber").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".pincode").keyup((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap"),a=/[^0-9]/g;a.test($(this).val())?($(this).val($(this).val().replace(a,"")),e.html("Please enter only numbers"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):$(this).val().length>0&&$(this).val().length<6?(e.html("Please enter valid pincode."),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),$(".js-checkPincode").show(),$(".cp-form .success-msg").removeClass("show"),$(".cp-form .icon-tick").addClass("hide")):(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".pincode").blur((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length?(e.html("This field is required."),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid")):$(this).val().length>0&&$(this).val().length<6?(e.html("Please enter valid pincode."),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid")):(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".pincode").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".password").blur((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length?(e.html("This field is required"),e.css("display","inline-block"),t.addClass("error"),t.removeClass("valid"),!0):(e.html(""),e.css("display","none"),t.removeClass("error"),t.addClass("valid"),!1)})),$(".password").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".new-password").blur((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length?(e.html("This field is required"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):$(this).val().length<8?(e.html("Password must be minimum of 8 character"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid"),!0):(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".new-password").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)})),$(".conf-password").blur((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");pwd1=$(this).val(),pwd2=$("#new-password").val(),$.empty_field_validation($(this).val())||pwd1==pwd?pwd1===pwd2?(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1):(e.html("Password does not matched"),e.css("display","inline-block"),t.addClass("error"),$(this).parents(".input-wrap").removeClass("valid")):(e.html("This field is required."),e.css("display","inline-block"),t.addClass("error"),!0,$(".js-btnEnabled").find(".btn-default").addClass("disabled"))})),$(".conf-password").focus((function(s){var e=$(this).parents(".input-wrap").find(".error-text"),t=$(this).parents(".input-wrap");""==$(this).val().length&&(e.html(""),e.css("display","none"),t.removeClass("error"),$(this).parents(".input-wrap").addClass("valid"),!1)}))}(),$(window).width()<=1024&&new Swiper(".js-essential",{slidesPerView:"auto",loop:!0}),$(window).width()<=768&&new Swiper(".js-expert",{slidesPerView:"auto",loop:!0}),0!=$(".js-bg").length&&$(".js-bg").each((function(){var s=$(this).find(".bg-img").attr("src");$(this).css({"background-image":"url("+s+")","background-size":"cover"})})),function(){if($(window).width()<=768)new Swiper(".js-specification",{slidesPerView:"auto",spaceBetween:20,clickable:!0})}(),function(){if($(window).width()<=768)new Swiper(".js-bikecard",{slidesPerView:"auto",loop:!0,spaceBetween:20,slideToClickedSlide:!0});else new Swiper(".js-bikecard",{effect:"coverflow",grabCursor:!0,centeredSlides:!0,slidesPerView:"auto",loop:!0,clickable:!0,coverflowEffect:{rotate:45,stretch:0,depth:240,modifier:1,slideShadows:!0},slideToClickedSlide:!0})}(),function(){if($(window).width()<=768)new Swiper(".js-baneerSlide",{spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination"}});else new Swiper(".js-baneerSlide",{spaceBetween:30,effect:"fade",navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination"}})}(),a(),l(),$(document).on("click",".cp-spec-cont .spec-link",(function(){var s=$(this).attr("data-image");$(this).parents(".specfn-pane").find(".cp-spec-img img").attr("src",s)})),r.each((function(){var s=$(this);$(this).css("cursor","pointer"),$(this).on("click",(function(){var e=s.offset().left-n.offset().left+n.scrollLeft();n.animate({scrollLeft:e})}))})),$(document).on("click",'button[data-toggle="modal"]',(function(){var s=$(this).attr("data-modal-id");s=s.replace("#",""),$(".cp-modal#"+s).addClass("modal-show show"),$(".cm-overlay").addClass("active"),$("body").css("overflow","hidden")})),$(document).on("click",".js-close, .cm-overlay, .js-cancel, .back-icon ",(function(){$(".cp-modal").removeClass("modal-show show"),$("body").css("overflow","auto"),$(".cm-overlay").removeClass("active"),$("#youtubevideo").attr("src","")})),$(document).on("click",".js-video",(function(s){var e=$(this).data("modal-id");console.log(e);var t=$(this).attr("data-video")+"?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0&html5=1";console.log(t),$(e+" iframe").attr("src",t)})),new Swiper(".js-customer",{spaceBetween:30,effect:"fade",slidesPerView:1,loop:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),l(),$(document).on("click",".js-showPassword",(function(){$(this).parents(".input-wrap").find(".password, .conf-password, .new-password").attr("type","input"),$(this).addClass("active")})),$(document).on("click",".js-showPassword.active",(function(){$(this).parents(".input-wrap").find(".password, .conf-password, .new-password").attr("type","password"),$(this).removeClass("active")})),0!=$(".cp-kit-list").length&&$(".kit-list").mCustomScrollbar({theme:"dark"}),$(document).on("keyup",".password, .conf-password, .new-password",(function(){0!=$(this).val().length?$(this).siblings(".icon-eye").addClass("show"):$(this).siblings(".icon-eye").removeClass("show")})),function(){$(".js-btnEnabled .input-wrap").length;$(document).on("click",".chk_tnc",(function(s){1==$(this).is(":checked")?($(this).parents(".input-wrap").addClass("valid"),$(".js-btnEnabled .inputDefault").each((function(){""!=$(this).val().length?$(".js-btnEnabled").find(".btn-default").removeClass("disabled"):$(".js-btnEnabled").find(".btn-default").addClass("disabled")}))):($(this).parents(".input-wrap").removeClass("valid"),$(".js-btnEnabled").find(".btn-default").addClass("disabled"))})),$(".js-btnEnabled input").focus((function(){$(this).parents(".js-btnEnabled").find(".btn-default").addClass("disabled"),$(this).parents(".js-btnEnabled").find(".chk_tnc").prop("checked",!1)}))}(),$(".js-btnEnabled2 .input-wrap .inputDefault").keyup((function(s){""!=$(".js-btnEnabled2 .email").val().length&&""!=$(".js-btnEnabled2 .password").val().length?$(this).parents(".js-btnEnabled2").find(".btn-default").removeClass("disabled"):$(this).parents(".js-btnEnabled2").find(".btn-default").addClass("disabled")})),$(".js-btnEnabled3 .input-wrap .inputDefault").keyup((function(s){""!=$(this).val().length?$(this).parents(".js-btnEnabled3").find(".btn-default").removeClass("disabled"):$(this).parents(".js-btnEnabled3").find(".btn-default").addClass("disabled")})),$(".minus").click((function(){var s=$(this).parent().find("input"),e=parseInt(s.val())-1;return e=e<1?1:e,s.val(e),s.change(),!1})),$(".plus").click((function(){var s=$(this).parent().find("input");return s.val(parseInt(s.val())+1),s.change(),!1})),$(".acc-head").click((function(s){var e=$(this),t=e.closest(".acc-item");e.hasClass("active")?(t.find(".acc-cont").removeClass("active"),e.removeClass("active"),t.find(".acc-cont").slideUp()):($(".cp-accordion").find(".acc-cont").removeClass("active"),$(".cp-accordion").find(".acc-head").removeClass("active"),$(".cp-accordion").find(".acc-cont").slideUp(),t.find(".acc-cont, .acc-head").addClass("active"),t.find(".acc-cont").slideDown())})),$(document).on("click",".js-checkPincode",(function(){$(this).parents(".input-wrap").hasClass("valid")&&($(this).hide(),$(this).parents(".input-wrap").find(".icon-tick").removeClass("hide"),$(this).parents(".input-wrap").find(".success-msg").addClass("show"))})),$(document).on("click",".prodcut-list .js-delate",(function(){$(this).parents(".item").remove()}))})),$(window).resize((function(){t=$(window).width(),$(".js-mobileMenu").removeClass("active"),$(".nav-list").removeClass("open"),t<992&&a()}));var n=$(".cp-specfn-tab .specfn-list"),r=$(".cp-specfn-tab .specfn-link");function l(){$(document).on("click",".specfn-item .specfn-link",(function(){$(this).parents(".specfn-list").find(".specfn-item").removeClass("active"),$(this).parents(".specfn-item").addClass("active");var s=$(this).parents(".swiper-slide").index();$(this).parents(".specfn-wrap").find(".specfn-pane").removeClass("active"),$(this).parents(".specfn-wrap").find(".specfn-pane").eq(s).addClass("active"),$(".spec-img").length&&($(".spec-img ul").removeClass("show"),$(this).parents(".specfn-wrap").find(".spec-img").children("ul").eq(s).addClass("show"))})),$(".spec-img").length&&$(document).on("click",".spec-cont .spec-link",(function(){$(this).parents(".spec-list").siblings().removeClass("active"),$(this).parents(".spec-list").addClass("active"),$(".spec-img ul.show li").removeClass("active");var s=$(this).parents("li").index();$(".spec-img ul").hasClass("show")&&$(".spec-img ul.show li").eq(s).addClass("active")}))}$.empty_field_validation=function(s){return""!=s.trim()},$.email_validation=function(s){return/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(s)},$.fn.serializeObject=function(){var s={},e=this.serializeArray();return $.each(e,(function(){s[this.name]?(s[this.name].push||(s[this.name]=[s[this.name]]),s[this.name].push(this.value||"")):s[this.name]=this.value||""})),s}}});