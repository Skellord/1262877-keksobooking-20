"use strict";

var cards = document.querySelector("#card");
var type = ["palace", "flat", "house", "bungalo"];
var time = ["12:00", "13:00", "14:00"];
var featuresList = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photosList = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var pin = document.querySelector("#pin").content.querySelector(".map__pin");
var mapPins = document.querySelector(".map__pins");

var pad = function(num, size) {
    var s = num+"";
    while (s.length < size) {
        s = "0" + s
    };
    return s;
}
var getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var addElements = function (someArray) {
    var elements = [];
    for (var j = 1; j < someArray.length - getRandom(0, someArray.length); j++) {
        elements.push(someArray[j]);
    }
    return elements;
}
var renderArray = function () {
    var array = [];
    for (var i = 0; i < 8; i++) {
        array.push({author: {avatar: "img/avatars/user" + pad(i,2) + ".png"},
        offer: {title: "Заголовок" + i,
                adress: String(getRandom(0, 1200))+ ",\xa0" + String(getRandom(130,630)),
                price: getRandom(10000, 50000),
                type: type[getRandom(0, type.length-1)],
                rooms: getRandom(1,3),
                guests: getRandom(0,2),
                checkin: time[getRandom(0, time.length-1)],
                checkout: time[getRandom(0, time.length-1)],
                features: addElements(featuresList),
                description: "Описание" + i,
                photos: addElements(photosList)},
        location: {x: getRandom(0, 1200),
                    y: getRandom(130, 630)}})
    }
    return array;
}
var array = renderArray();
console.log(array);
document.querySelector(".map").classList.remove("map--faded")

var createPins = function (element) {
    var pinsElement = pin.cloneNode(true);
    pinsElement.setAttribute("style", "element.location.x");
    pinsElement.style.top = "element.location.y";
    pinsElement.getElementsByTagName("img").src = "element.author.avatar";
    pinsElement.getElementsByTagName("img").alt = "element.offer.title";
    return pinsElement;
}
var fragment = document.createDocumentFragment();
for (var k = 0; k < array.length; k++) {
    fragment.appendChild(createPins(array));
}
mapPins.appendChild(fragment);