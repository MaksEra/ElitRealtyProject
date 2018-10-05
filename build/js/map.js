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
}
