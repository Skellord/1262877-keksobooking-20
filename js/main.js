'use strict';

var PIN_WIDTH = 65;
var PIN_HEIGHT = 83;

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
var inputAddress = form.querySelector('#address');
var inputType = form.querySelector('#type');
var inputPrice = form.querySelector('#price');
var inputRooms = form.querySelector('#room_number');
var inputGuests = form.querySelector('#capacity');
var inputTimeIn = form.querySelector('#timein');
var inputTimeOut = form.querySelector('#timeout');
var inputTitle = form.querySelector('#title');
var inputDescription = form.querySelector('#description');
var inputFeatures = form.querySelector('.features');
var inputAvatar = form.querySelector('#avatar');
var inputImages = form.querySelector('#images');


inputAddress.value = mapPinMain.offsetLeft + Math.ceil(PIN_WIDTH / 2) + ',\xa0' + (mapPinMain.offsetTop + PIN_HEIGHT);

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

var appendMocks = function () {
  for (var k = 0; k < mocks.length; k++) {
    fragment.appendChild(createPins(mocks[k]));
  }
  mapPins.appendChild(fragment).cloneNode(true);
};
var activatePage = function () {
  appendMocks();
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  removeDisabledFieldsets();
};
var removeCreatedPins = function () {
  var mapPinsAll = mapPins.querySelectorAll('.map__pin');
  for (var i = 1; i < mapPinsAll.length; i++) {
    mapPinsAll[i].remove();
  }
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

inputTimeIn.addEventListener('change', function () {
  inputTimeOut.value = inputTimeIn.value;
});
inputTimeOut.addEventListener('change', function () {
  inputTimeIn.value = inputTimeOut.value;
});
inputType.addEventListener('change', function () {
  if (inputType.value === 'bungalo') {
    inputPrice.min = inputPrice.placeholder = 0;
  } else if (inputType.value === 'flat') {
    inputPrice.min = inputPrice.placeholder = 1000;
  } else if (inputType.value === 'house') {
    inputPrice.min = inputPrice.placeholder = 5000;
  } else if (inputType.value === 'palace') {
    inputPrice.min = inputPrice.placeholder = 10000;
  }
});

var removeDisabledOption = function () {
  for (var i = 0; i < inputGuests.options.length; i++) {
    inputGuests.options[i].disabled = false;
  }
};

inputRooms.addEventListener('change', function () {
  if (inputRooms.value === '1') {
    removeDisabledOption();
    inputGuests.value = '1';
    inputGuests.options[3].disabled = true;
    inputGuests.options[0].disabled = true;
    inputGuests.options[1].disabled = true;
  } else if (inputRooms.value === '2') {
    removeDisabledOption();
    inputGuests.value = '2';
    inputGuests.options[3].disabled = true;
    inputGuests.options[0].disabled = true;
  } else if (inputRooms.value === '3') {
    removeDisabledOption();
    inputGuests.value = '2';
    inputGuests.options[3].disabled = true;
  } else if (inputRooms.value === '100') {
    removeDisabledOption();
    inputGuests.value = '0';
    inputGuests.options[0].disabled = true;
    inputGuests.options[1].disabled = true;
    inputGuests.options[2].disabled = true;
  }
});

inputPrice.addEventListener('invalid', function () {
  if (inputPrice.validity.valueMissing) {
    inputPrice.setCustomValidity('Введите число от ' + inputPrice.min + ' до 1000000');
  } else {
    inputPrice.setCustomValidity('');
  }
});

var resettingPage = function () {
  form.classList.add('ad-form--disabled');
  inputAddress.value = mapPinMain.offsetLeft + Math.ceil(PIN_WIDTH / 2) + ',\xa0' + (mapPinMain.offsetTop + PIN_HEIGHT);
  addDisabledFieldsets();
  map.classList.add('map--faded');
  inputTitle.value = '';
  inputType.value = 'flat';
  inputRooms.value = '1';
  inputDescription.value = '';
  inputPrice.value = '';
  inputGuests.value = '1';
  inputGuests.options[3].disabled = true;
  inputGuests.options[0].disabled = true;
  inputGuests.options[1].disabled = true;
  inputTimeIn.value = '12:00';
  inputTimeOut.value = '12:00';
  inputAvatar.value = '';
  inputImages.value = '';
  removeCreatedPins();
  var features = inputFeatures.querySelectorAll('input');
  for (var i = 0; i < features.length; i++) {
    features[i].checked = false;
  }
};

form.addEventListener('reset', function (evt) {
  evt.preventDefault();
  resettingPage();
});
