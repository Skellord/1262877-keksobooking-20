'use strict';

var type = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinTemplate = document.querySelector('#pin').content;
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var PIN_WIDTH = 65;
var PIN_HEIGHT = 83;
var inptAddress = form.querySelector('#address');
var inptType = form.querySelector('#type');
var inptPrice = form.querySelector('#price');
var inptRooms = form.querySelector('#room_number');
var inptGuests = form.querySelector('#capacity');
var inptTimeIn = form.querySelector('#timein');
var inptTimeOut = form.querySelector('#timeout');
var inptTitle = form.querySelector('#title');
var inptDescription = form.querySelector('#description');
var inptFeatures = form.querySelector('.features');
var inptAvatar = form.querySelector('#avatar');
var inptImages = form.querySelector('#images');


inptAddress.value = mapPinMain.offsetLeft + Math.ceil(PIN_WIDTH / 2) + ',\xa0' + (mapPinMain.offsetTop + PIN_HEIGHT);

var addDisabledFieldsets = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }
};
addDisabledFieldsets();

var removeDisabledFieldsets = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

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
var mocks = renderArray();

var createPins = function (element) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinButton = pinElement.querySelector('button');
  var pinImage = pinButton.querySelector('img');
  if (element.location.x < mapPins.offsetWidth * 0.5) {
    pinButton.style.left = element.location.x + mapPin.offsetWidth + 'px';
  } else {
    pinButton.style.left = element.location.x - mapPin.offsetWidth + 'px';
  }
  pinButton.style.top = element.location.y - mapPin.offsetHeight * 0.5 + 'px';
  pinImage.src = element.author.avatar;
  return pinElement;
};
var fragment = document.createDocumentFragment();
for (var k = 0; k < mocks.length; k++) {
  fragment.appendChild(createPins(mocks[k]));
}

var activatePage = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragment);
  form.classList.remove('ad-form--disabled');
  removeDisabledFieldsets();
};
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
  }
});
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.which === 13) {
    activatePage();
  }
});
inptTimeIn.addEventListener('change', function () {
  inptTimeOut.value = inptTimeIn.value;
});
inptTimeOut.addEventListener('change', function () {
  inptTimeIn.value = inptTimeOut.value;
});
inptType.addEventListener('change', function () {
  if (inptType.value === 'bungalo') {
    inptPrice.min = inptPrice.placeholder = 0;
  } else if (inptType.value === 'flat') {
    inptPrice.min = inptPrice.placeholder = 1000;
  } else if (inptType.value === 'house') {
    inptPrice.min = inptPrice.placeholder = 5000;
  } else if (inptType.value === 'palace') {
    inptPrice.min = inptPrice.placeholder = 10000;
  }
});
var removeDisabledOption = function () {
  for (var i = 0; i < inptGuests.options.length; i++) {
    inptGuests.options[i].disabled = false;
  }
};
inptRooms.addEventListener('change', function () {
  if (inptRooms.value === '1') {
    removeDisabledOption();
    inptGuests.value = '1';
    inptGuests.options[3].disabled = true;
    inptGuests.options[0].disabled = true;
    inptGuests.options[1].disabled = true;
  } else if (inptRooms.value === '2') {
    removeDisabledOption();
    inptGuests.value = '2';
    inptGuests.options[3].disabled = true;
    inptGuests.options[0].disabled = true;
  } else if (inptRooms.value === '3') {
    removeDisabledOption();
    inptGuests.value = '2';
    inptGuests.options[3].disabled = true;
  } else if (inptRooms.value === '100') {
    removeDisabledOption();
    inptGuests.value = '0';
    inptGuests.options[0].disabled = true;
    inptGuests.options[1].disabled = true;
    inptGuests.options[2].disabled = true;
  }
});
inptPrice.addEventListener('invalid', function () {
  if (inptPrice.validity.valueMissing) {
    inptPrice.setCustomValidity('Введите число от ' + inptPrice.min + ' до 1000000');
  } else {
    inptPrice.setCustomValidity('');
  }
});
form.addEventListener('reset', function (evt) {
  evt.preventDefault();
  inptAddress.value = mapPinMain.offsetLeft + Math.ceil(PIN_WIDTH / 2) + ',\xa0' + (mapPinMain.offsetTop + PIN_HEIGHT);
  addDisabledFieldsets();
  map.classList.add('map--faded');
  inptTitle.value = '';
  inptType.value = 'flat';
  inptRooms.value = '1';
  inptDescription.value = '';
  inptPrice.value = '';
  inptGuests.value = '1';
  inptGuests.options[3].disabled = true;
  inptGuests.options[0].disabled = true;
  inptGuests.options[1].disabled = true;
  inptTimeIn.value = '12:00';
  inptTimeOut.value = '12:00';
  inptAvatar.value = '';
  inptImages.value = '';
  var features = inptFeatures.querySelectorAll('input');
  for (var i = 0; i < features.length; i++) {
    features[i].checked = false;
  }
});
