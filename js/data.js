'use strict';

(function () {
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var time = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var pad = function (num, size) {
    var s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  };
  var getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var createRandomArray = function (parentArray) {
    var elements = [];
    for (var j = 1; j < parentArray.length - getRandom(0, parentArray.length); j++) {
      elements.push(parentArray[j]);
    }
    return elements;
  };
  var renderArray = function () {
    var array = [];
    for (var i = 0; i < 8; i++) {
      array.push({author: {avatar: 'img/avatars/user' + pad(i + 1, 2) + '.png'},
        location: {x: getRandom(0, mapPins.offsetWidth),
          y: getRandom(130, 630)},
        offer: {title: 'Заголовок' + i,
          address: String(location.x) + ',\xa0' + String(location.y),
          price: getRandom(10000, 50000),
          type: type[getRandom(0, type.length - 1)],
          rooms: getRandom(1, 3),
          guests: getRandom(0, 2),
          checkin: time[getRandom(0, time.length - 1)],
          checkout: time[getRandom(0, time.length - 1)],
          features: createRandomArray(featuresList),
          description: 'Описание' + i,
          photos: createRandomArray(photosList)}
      });
    }
    return array;
  };
  window.mocks = renderArray();
})();
