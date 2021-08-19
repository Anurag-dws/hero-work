var winWidth = $(window).width();

$(document).ready(function() {
    formValidation();

    if ($(window).width() <= 1024) {
        essentailSwiper();


    };
    if ($(window).width() <= 768) {
        expertSwiper();
    };
    if ($('.js-bg').length != 0) {
        bgImg();
    }
    specifiSwiper();
    bikeSwiper();
    baneerSlide();
    mobileMenu();
    tabs();
    productShow();
    scrollStuff();
    commonPopup();
    testimonialSwiper();
    tabs();
    showPassword();
    if ($('.cp-kit-list').length != 0) {
        $(".kit-list").mCustomScrollbar({
            theme: "dark",
        });
    }
    // if ($('.password, .new-password').length) {
    enablePasswordViewBtn();
    enableAccountBtn();
    enableLoginBtn();
    enableForgotPwdBtn();
    // }
    incrDecr();
    accordion();
    validPincode();
    cartProdDelete();
});

$(window).resize(function() {
    winWidth = $(window).width();
    $('.js-mobileMenu').removeClass('active');
    $('.nav-list').removeClass('open');
    if (winWidth < 992) {
        mobileMenu();
    }
});





function bgImg() {
    $('.js-bg').each(function() {
        var imgSrc = $(this).find('.bg-img').attr('src');
        $(this).css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover'
        });
    })
}

function specifiSwiper() {
    var ww = $(window).width();
    if (ww <= 768) {
        var swiper = new Swiper(".js-specification", {
            slidesPerView: 'auto',
            // slideToClickedSlide: true,
            spaceBetween: 20,
            // centeredSlides: true,
            clickable: true,
        })
    }
}

function essentailSwiper() {
    var swiper = new Swiper(".js-essential", {
        slidesPerView: 'auto',
        loop: true,
    });
}

function expertSwiper() {
    var swiper = new Swiper(".js-expert", {
        slidesPerView: 'auto',
        loop: true,
    });
}



function baneerSlide() {
    var ww = $(window).width();
    if (ww <= 768) {
        var swiper = new Swiper(".js-baneerSlide", {
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
    } else {
        var swiper = new Swiper(".js-baneerSlide", {
            spaceBetween: 30,
            effect: "fade",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
    }
}

function bikeSwiper() {
    var ww = $(window).width();
    if (ww <= 768) {
        var swiper = new Swiper(".js-bikecard", {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 20,
            slideToClickedSlide: true,
        })
    } else {
        var swiper = new Swiper(".js-bikecard", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            clickable: true,
            coverflowEffect: {
                rotate: 45,
                stretch: 0,
                depth: 240,
                modifier: 1,
                slideShadows: true,
            },
            slideToClickedSlide: true,
        });
    }
}

function testimonialSwiper() {
    var swiper = new Swiper(".js-customer", {
        spaceBetween: 30,
        effect: "fade",
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}


// vajid

function mobileMenu() {
    winWidth = $(window).width();
    if (winWidth < 992) {
        $(document).on('click', '.js-mobileMenu', function(e) {
            e.stopPropagation();
            $(this).addClass('active');
            $('.nav-list').addClass('open');
        });

        $(document).on('click', '.js-mobileMenu.active', function(e) {
            e.stopPropagation();
            $(this).removeClass('active');
            $('.nav-list').removeClass('open');
        });

        $(document).on('click', '.cp-header .specfn-link', function() {
            $(this).parents('.nav-list').removeClass('open');
            $('.js-mobileMenu').removeClass('active');
        });
        $(document).on('click', '.js-price', function(e) {
            e.stopPropagation();
            $(this).addClass('active');
            $('.price-wrap').addClass('open');
        });
        $(document).on('click', '.js-close', function(e) {
            e.stopPropagation();
            $('.price-wrap').removeClass('open');
        });
    }
}

function productShow() {
    $(document).on('click', '.cp-spec-cont .spec-link', function() {
        var imgData = $(this).attr('data-image');
        $(this).parents('.specfn-pane').find('.cp-spec-img img').attr('src', imgData);
    });
}


var scrollArea = $('.cp-specfn-tab .specfn-list');
var toScroll = $('.cp-specfn-tab .specfn-link');

function scrollStuff() {
    toScroll.each(function() {
        var self = $(this);
        $(this).css('cursor', 'pointer');
        $(this).on('click', function() {
            var leftOffset = self.offset().left - scrollArea.offset().left + scrollArea.scrollLeft();
            scrollArea.animate({ scrollLeft: leftOffset });
        });
    });
}



// modalPopup js start
function commonPopup() {
    $(document).on('click', 'button[data-toggle="modal"]', function() {
        var abc = $(this).attr('data-modal-id');
        abc = abc.replace("#", "");
        // alert(abc);
        $('.cp-modal#' + abc).addClass('modal-show show');
        $('.cm-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    $(document).on('click', '.js-close, .cm-overlay, .js-cancel, .back-icon ', function() {
        $('.cp-modal').removeClass('modal-show show');
        $('body').css('overflow', 'auto');
        $('.cm-overlay').removeClass('active');
        $('#youtubevideo').attr('src', '');
    });

    $(document).on('click', '.js-video', function(e) {
        var theModal = $(this).data("modal-id");
        console.log(theModal);
        var videoSRC = $(this).attr("data-video"),
            videoSRCauto =
            videoSRC + "?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0&html5=1";
        console.log(videoSRCauto);
        $(theModal + " iframe").attr("src", videoSRCauto);
    });


}

function formValidation() {
    var errors = false;
    var onlyDigits = [];
    for (i = 48; i < 58; i++)
        onlyDigits.push(i); 



    $(document).on('click', '.cp-input label', function() {
        $(this).parents('.cp-input').find('input').focus();
    });

    $('.email').blur(function(event) {
        var error_div = $(this).parent().find('.error-text');
        var field_container = $(this).parent();
        if (!$.email_validation($(this).val())) {
            error_div.html('Invalid email ID');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            field_container.removeClass('valid');
            errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            field_container.addClass('valid');
            errors = false;
        }
    });

    $('.email').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });

    $('.alpha').keyup(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        var alphaRegex = /[^a-zA-Z]/g;
        if (alphaRegex.test($(this).val())) {
            $(this).val($(this).val().replace(alphaRegex, ''));
            error_div.html('Please enter only alphabest');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            field_container.removeClass('valid');
            errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            field_container.addClass('valid');
            errors = false;
        }
    });
    $('.alpha').blur(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('This field is required');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        } else if ($(this).val().length < 3) {
            error_div.html('Please enter a valid Name');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });

    $('.alpha').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });

    $('.mobileNumber').keyup(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        var alphaRegex = /[^0-9]/g;
        if (alphaRegex.test($(this).val())) {
            $(this).val($(this).val().replace(alphaRegex, ''));
            error_div.html('Please enter only numbers');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
    $('.mobileNumber').blur(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('This field is required.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
        } else if ($(this).val() == '0000000000' || $(this).val() == '0123456789' || $(this).val() == 1234567890 || $(this).val() == 9999999999 || $(this).val() == 8888888888 || $(this).val() == 7777777777 || $(this).val() == 9898989898) {
            error_div.html('Please enter valid Mobile Number.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        } else if ($(this).val().length > 0 && $(this).val().length < 10) {
            error_div.html('Please enter valid Mobile Number.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
    $('.mobileNumber').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });


    $('.pincode').keyup(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        var alphaRegex = /[^0-9]/g;
        if (alphaRegex.test($(this).val())) {
            $(this).val($(this).val().replace(alphaRegex, ''));
            error_div.html('Please enter only numbers');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        } else if ($(this).val().length > 0 && $(this).val().length < 6) {
            error_div.html('Please enter valid pincode.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            $('.js-checkPincode').show();
            $('.cp-form .success-msg').removeClass('show');
            $('.cp-form .icon-tick').addClass('hide');

        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
    $('.pincode').blur(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('This field is required.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
        } else if ($(this).val().length > 0 && $(this).val().length < 6) {
            error_div.html('Please enter valid pincode.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
    $('.pincode').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });

    $('.password').blur(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('This field is required');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            field_container.removeClass('valid');
            errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            field_container.addClass('valid');
            errors = false;
        }
    });
    $('.password').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });

    $('.new-password').blur(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        var PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;

        if ($(this).val().length == '') {
            error_div.html('This field is required');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        } else if ($(this).val().length < 8) {
            error_div.html('Password must be minimum of 8 character');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
            errors = true;
        }
        // else if (!PasswordRegex.test($(this).val())) {
        //     error_div.html('Password must be contain special character, number and One Capital Letter');
        //     error_div.css('display', 'inline-block');
        //     field_container.addClass('error');
        //     $(this).parents('.input-wrap').removeClass('valid');
        //     errors = true;} 
        else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
    $('.new-password').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
    $('.conf-password').blur(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        pwd1 = $(this).val();
        pwd2 = $('#new-password').val();
        if (!$.empty_field_validation($(this).val()) && pwd1 != pwd) {
            error_div.html('This field is required.');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            errors = true;
            $('.js-btnEnabled').find('.btn-default').addClass('disabled');
        } else if (pwd1 === pwd2) {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        } else {
            error_div.html('Password does not matched');
            error_div.css('display', 'inline-block');
            field_container.addClass('error');
            $(this).parents('.input-wrap').removeClass('valid');
        }
    });
    $('.conf-password').focus(function(event) {
        var error_div = $(this).parents(".input-wrap").find('.error-text');
        var field_container = $(this).parents(".input-wrap");
        if ($(this).val().length == '') {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
            $(this).parents('.input-wrap').addClass('valid');
            errors = false;
        }
    });
}

$.empty_field_validation = function(field_value) {
    if (field_value.trim() == '') return false;
    return true;
};

$.email_validation = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function tabs() {
    $(document).on('click', '.specfn-item .specfn-link', function() {
        $(this).parents('.specfn-list').find('.specfn-item').removeClass('active');
        $(this).parents('.specfn-item').addClass('active');
        var tabIndex = $(this).parents('.swiper-slide').index();
        $(this).parents('.specfn-wrap').find('.specfn-pane').removeClass('active');
        $(this).parents('.specfn-wrap').find('.specfn-pane').eq(tabIndex).addClass('active');
        if ($('.spec-img').length) {
            $('.spec-img ul').removeClass('show');
            $(this).parents('.specfn-wrap').find('.spec-img').children('ul').eq(tabIndex).addClass('show');
        }
    });



    if ($('.spec-img').length) {
        $(document).on('click', '.spec-cont .spec-link', function() {
            $(this).parents('.spec-list').siblings().removeClass('active');
            $(this).parents('.spec-list').addClass('active');
            $('.spec-img ul.show li').removeClass('active');
            var tabIndex2 = $(this).parents('li').index();
            // console.log(tabIndex2);
            if ($('.spec-img ul').hasClass('show')) {
                $('.spec-img ul.show li').eq(tabIndex2).addClass('active');
            }
        });
    }
}

function showPassword() {
    $(document).on('click', '.js-showPassword', function() {
        $(this).parents('.input-wrap').find('.password, .conf-password, .new-password').attr('type', 'input');
        $(this).addClass('active');
    });
    $(document).on('click', '.js-showPassword.active', function() {
        $(this).parents('.input-wrap').find('.password, .conf-password, .new-password').attr('type', 'password');
        $(this).removeClass('active');
    });
}



function enablePasswordViewBtn() {
    $(document).on('keyup', '.password, .conf-password, .new-password', function() {
        var pwdValue = $(this).val().length;
        if (pwdValue != 0) {
            $(this).siblings('.icon-eye').addClass('show');
        } else {
            $(this).siblings('.icon-eye').removeClass('show');
        }
    });
}

function enableAccountBtn() {
    var fieldCount = $('.js-btnEnabled .input-wrap').length;
    var validCount;
    $(document).on('click', '.chk_tnc', function(e) {

        if ($(this).is(':checked') == true) {
            $(this).parents('.input-wrap').addClass('valid');
            $('.js-btnEnabled .inputDefault').each(function() {
                // validCount = $(this).parents('.js-btnEnabled').find('.input-wrap.valid').length;
                // if (validCount === fieldCount) {
                //     $('.js-btnEnabled').find('.btn-default').removeClass('disabled');
                // } else {
                //     $('.js-btnEnabled').find('.btn-default').addClass('disabled');
                // }

                if ($(this).val().length != '') {
                    $('.js-btnEnabled').find('.btn-default').removeClass('disabled');
                } else {
                    $('.js-btnEnabled').find('.btn-default').addClass('disabled');
                }
            });

        } else {
            $(this).parents('.input-wrap').removeClass('valid');
            $('.js-btnEnabled').find('.btn-default').addClass('disabled');
        }
    });

    $('.js-btnEnabled input').focus(function() {
        $(this).parents('.js-btnEnabled').find('.btn-default').addClass('disabled');
        $(this).parents('.js-btnEnabled').find('.chk_tnc').prop('checked', false);
    });
}


function enableLoginBtn() {
    // var fieldCount = $('.js-btnEnabled .input-wrap').length;
    // var validCount = 0;
    $('.js-btnEnabled2 .input-wrap .inputDefault').keyup(function(e) {
        if ($('.js-btnEnabled2 .email').val().length != '' && $('.js-btnEnabled2 .password').val().length != '') {
            $(this).parents('.js-btnEnabled2').find('.btn-default').removeClass('disabled');
        } else {
            $(this).parents('.js-btnEnabled2').find('.btn-default').addClass('disabled');
        }
    });
    // $('.js-btnEnabled .input-wrap .inputDefault').each(function(e) {
    // $(this).keydown(function(e) {
    //     if($(this).val().length != ''){
    //         $('.js-btnEnabled').find('.btn-default').removeClass('disabled');
    //     }
    //     else{
    //         $('.js-btnEnabled').find('.btn-default').addClass('disabled');
    //     }
    // });
    // $(this).keydown(function(event) {
    //     validCount = $('.js-btnEnabled').find('.input-wrap.valid').length;
    //     if (validCount === fieldCount) {
    //         $('.js-btnEnabled').find('.btn-default').removeClass('disabled');
    //     } else {
    //         $('.js-btnEnabled').find('.btn-default').addClass('disabled');
    //     }

    // });
    // $(this).keydown(function(e) {
    //     // e.preventDefault();
    //     if($(this).val().length != ''){
    //         $('.js-btnEnabled').find('.btn-default').removeClass('disabled');
    //     }
    //     else{
    //         $('.js-btnEnabled').find('.btn-default').addClass('disabled');
    //     }
    // });
    // });
}

function enableForgotPwdBtn() {
    $('.js-btnEnabled3 .input-wrap .inputDefault').keyup(function(e) {
        if ($(this).val().length != '') {
            $(this).parents('.js-btnEnabled3').find('.btn-default').removeClass('disabled');
        } else {
            $(this).parents('.js-btnEnabled3').find('.btn-default').addClass('disabled');
        }
    });
}

function incrDecr() {
    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
}

function accordion() {
    $('.acc-head').click(function(e) {
        var $this = $(this);
        var parentElm = $this.closest(".acc-item");
        if ($this.hasClass("active")) {
            parentElm.find(".acc-cont").removeClass("active");
            $this.removeClass("active");
            parentElm.find(".acc-cont").slideUp();
        } else {
            $(".cp-accordion").find(".acc-cont").removeClass("active");
            $(".cp-accordion").find(".acc-head").removeClass("active");
            $(".cp-accordion").find(".acc-cont").slideUp();
            parentElm.find(".acc-cont, .acc-head").addClass("active");
            parentElm.find(".acc-cont").slideDown();
        }
    });
}

function validPincode() {
    $(document).on('click', '.js-checkPincode', function() {
        if ($(this).parents('.input-wrap').hasClass('valid')) {
            $(this).hide();
            $(this).parents('.input-wrap').find('.icon-tick').removeClass('hide');
            $(this).parents('.input-wrap').find('.success-msg').addClass('show');
        }
    });
}

function cartProdDelete() {
    $(document).on('click', '.prodcut-list .js-delate', function() {
        $(this).parents('.item').remove();
        // setTimeout(function(){
        //     var abc = $(this).parents('.item').length;
        //     console.log(abc);
        // },500);
        // if($(this).parents('.item').length == 0){
        //     $(this).parents('.prodcut-list').find('.prod-amt-total').remove();
        // }
    });
}