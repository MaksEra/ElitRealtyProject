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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('objects-on-map', {
        center: [59.943746, 30.313808],
        zoom: 11,
        controls: []
    }),
        objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set({
        iconLayout: 'default#image',
        iconImageHref: 'img/map-marker.svg',
        iconImageSize: [30, 36],
        draggable: false,
        iconColor: '#ff0000'
    }, 'preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "assets/data1.json"
    }).done(function (data) {
        objectManager.add(data);
    });
    /* // Откроем балун на третьей метке в массиве.
    var objectState = clusterer.getObjectState(geoObjects[2]);
    if (objectState.isClustered) {
        // Если метка находится в кластере, выставим ее в качестве активного объекта.
        // Тогда она будет "выбрана" в открытом балуне кластера.
        objectState.cluster.state.set('activeObject', geoObjects[2]);
        clusterer.balloon.open(objectState.cluster);
    } else if (objectState.isShown) {
        // Если метка не попала в кластер и видна на карте, откроем ее балун.
        geoObjects[2].balloon.open();
    } */
}

// window.city = {
//     spb: {
//         center:[59.968884, 30.153820],
//         zoom:17,
//         controls: []
//     },
//     msk:{
//         center:[55.769114, 37.539970],
//         zoom:20,
//         controls: []
//     }
// }


/* var coordPoints = [
                {
                    coords: [59.94554327989287,30.38935262114668],
                    text: 'Новая квартира с авторским ремонтом, 21 000 000 $'
                },
                {
                    coords: [59.91142323563909,30.50024587065841],
                    text: 'Трешка'
                },
                {
                    coords: [59.88693161784606,30.319658102103713],
                    text: 'Студия'
                }
                
            ],
                myCollection = new ymaps.GeoObjectCollection({}, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/map-marker.svg',
                    iconImageSize: [30, 36],
                    draggable: false,
                    iconColor: '#ff0000'
                });
    
            // for (var i = 0; i < coords.length; i++) {
            //     myCollection.add(new ymaps.Placemark(coords[i]));
            // }
            for (var i = 0, l = coordPoints.length; i < l; i++) {
                    var point = coordPoints[i];
                    myCollection.add(new ymaps.Placemark(
                        point.coords, {
                            balloonContentBody: point.text
                        }
                    ));
                }
        
            // Добавляем коллекцию меток на карту.
            myMap.geoObjects.add(myCollection); */

// $(document).ready(function(){
//     function initMap() {
//         var country = {lat: 59.941226, lng: 30.333636}
//         var map = new google.maps.Map(
//             document.getElementById('gmap-objects'), {zoom: 14, center: country });

//     }

// });
// function initMap() {
//     var saintP = { lat: 59.949981, lng: 30.315649 };
//     var map = new google.maps.Map(document.getElementById("gmap-objects"), {
//         zoom: 13,
//         center: saintP,
//         disableDefaultUI: true,
//         zoomControl: false,
//         //scrollwheel: boolean,
//     });
//     var marker = new google.maps.Marker({
//         position: saintP,
//         map: map
//     });
// }
// setTimeout(function() {
//     // $('.country-list').css("transform", "translateY(0px)")
//     $('.country-list').addClass('loaded')
// }, 3000);

/***/ })
/******/ ]);
//# sourceMappingURL=map.js.map