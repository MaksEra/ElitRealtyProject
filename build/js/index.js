/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).ready(function () {
    //debounce
    function debounce(wait, func, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    //disableScrollbar
    var body = $('body');
    function scrollbarWidth() {
        var documentWidth = parseInt(document.documentElement.clientWidth);
        var windowsWidth = parseInt(window.innerWidth);
        var scrollbarWidth = windowsWidth - documentWidth;
        return scrollbarWidth;
    }
    function removeScroll() {
        body.css({ 'overflow': 'hidden', 'padding-right': scrollbarWidth() + "px", 'position': 'fixed' });
    }
    function addScroll() {
        body.css({ 'overflow': 'visible', 'padding-right': scrollbarWidth() * 0 + "px", 'position': 'relative' });
    }
    //viewport
    function setViewport() {
        var w = $(window);
        var ww = w.width();
        var vps, viewport;
        viewport = document.querySelector("meta[name=viewport]");
        if (ww <= 415) {
            vps = 'width=375, user-scalable=no';
        } else {
            vps = 'width=device-width, user-scalable=no';
        }
        //console.log(vps);
        viewport.setAttribute('content', vps);
    }
    //viewport change
    $(window).resize(function () {
        setViewport();
    });
    //load viewport
    setViewport();

    //document.addEventListener("touchstart", function(){}, true);

    if ($('.recall-form').length) {
        $("#CODE_PHONE").inputmask({
            mask: "+7 (999) 999-99-99"
            /* definitions: {
                i: {
                    validator: "[8,9]"
                }
            } */
        });
    }

    $("[data-fancybox]").fancybox({
        touch: false,
        animationEffect: "zoom-in-out"

    });

    //------------sortirovka
    $(function () {
        var drop = $('.dropdown');
        var dropElem = $('.dropdown .dropdown-menu li');
        drop.click(function () {
            var self = $(this);
            self.attr('tabindex', 1).focus();
            self.toggleClass('active');
            self.find('.dropdown-menu').slideToggle(200);
        });
        drop.focusout(function () {
            var self = $(this);
            self.removeClass('active');
            self.find('.dropdown-menu').slideUp(200);
        });
        dropElem.click(function () {
            var self = $(this);
            self.parents('.dropdown').find('span').text(self.text());
            self.parents('.dropdown').find('input').attr('value', self.attr('id'));
        });
    });

    //-----------------ОТКРЫТИЕ ФИЛЬТРА В ПЛАНШЕТНОЙ ВЕРСИИ
    body.on('click', '.mobile-button', function () {
        var self = $(this);
        self.addClass('active');
        self.parent().find('.form').addClass('open');
    });
    //------------------END

    //------------------ЗАКРЫТИЕ ФИЛЬТРА В ПЛАНШЕТНОЙ ВЕРСИИ
    body.on('click', '.close-button', function () {
        var self = $(this);
        var openFilter = $('.sidebar').find('.mobile-button');
        openFilter.removeClass('active');
        self.parent().removeClass('open');
    });
    body.mouseup(function (e) {
        // событие клика по веб-документу
        //var div = $('.sidebar').find('.form'); // тут указываем элемент
        var openFilter = $('.sidebar').find('.mobile-button');
        var form = $('.sidebar').find('.form');
        if (!form.is(e.target) // если клик был не по нашему блоку
        && form.has(e.target).length === 0) {
            // и не по его дочерним элементам
            form.removeClass('open'); // скрываем его
            openFilter.removeClass('active');
        }
    });
    //------------------END

    //------------------HIDDEN-MENU
    body.on('click', '.burger', function () {
        $('.hidden-menu').toggleClass('open');
    });
    //------------------END

    //------------------ОТКРЫТИЕ МОДАЛКИ В ОБЪЕКТАХ СПИСКОМ
    body.on('click', '.objects__content-list li', function () {
        $('.wrapper').find('.modal-object').addClass('open');
    });
    body.on('click', '.modal-close', function () {
        $('.wrapper').find('.modal-object').removeClass('open');
    });
    //------------------ОТКРЫТИЕ МОДАЛКИ В ОБЪЕКТАХ КАРТОЙ
    body.on('click', '.ymaps-2-1-68-balloon__content a', function () {
        $('.wrapper').find('.modal-object').addClass('open');
    });

    var lastScrollTop = 0;
    $('.objects__content').scroll(function () {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $('.wrapper').addClass('scroll');
        } else {
            $('.wrapper').removeClass('scroll');
        }
        lastScrollTop = st;
        if (lastScrollTop <= 0) {
            $('.wrapper').removeClass('scroll');
        }
    });

    body.on('click', '.select-btn', function () {
        var self = $(this);
        var selectBtn = $('.select-btn');
        if (!selectBtn.hasClass('focus')) {
            //selectBtn.removeClass('focus')
            self.addClass('focus');
        } else {
            selectBtn.removeClass('focus');
            self.addClass('focus');
        }
    });
    body.mouseup(function (e) {
        var openFilter = $('.select-btn');
        var form = $('.select-wrapper');
        if (!form.is(e.target) && form.has(e.target).length === 0) {
            openFilter.removeClass('focus');
            $('.select-list').css("display", "none");
        } /* else {
            $('.select-list').css("display", "block")
          } */
    });

    //-------------СЛАЙДЕР 
    if ($('.modal-content').length) {
        var objectSwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            spaceBetween: 8,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                renderBullet: function renderBullet(index, className) {
                    // window.urlImgTovar = $(this.find('.swiper-wrapper').items[index].el).data('thumb');
                    return '<span class="' + className + '">' + '</span>';
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            a11y: {
                paginationBulletMessage: 'Go to slide {{index}}'
            },
            breakpoints: {
                1259: {
                    loop: true,
                    centeredSlides: false,
                    spaceBetween: 8
                },
                767: {
                    loop: true,
                    centeredSlides: true,
                    spaceBetween: 8
                }
            }
        });
    }

    //---------яндекс карты на странице контактов
    if ($('.modal-object').length) {
        var init = function init() {
            var contactsMap = new ymaps.Map("ymap-object", {
                center: [59.927768, 30.332101],
                zoom: 17,
                controls: []
            });
            var coords = [[59.927768, 30.332101]],
                myCollection = new ymaps.GeoObjectCollection({}, {
                draggable: false
            });
            myCollection.add(new ymaps.Placemark([59.927768, 30.332101], {
                //iconCaption: 'Невская классика'
            }, {
                //preset: 'islands#governmentCircleIcon',
                iconLayout: 'default#image',
                iconImageHref: 'img/map-marker.svg',
                iconImageSize: [30, 36],
                draggable: false,
                iconColor: '#ff0000'
            }));
            contactsMap.geoObjects.add(myCollection);
        };

        ymaps.ready(init);
    }
});

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map