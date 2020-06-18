'use strict';

(function () {
  var addDisabledFieldsets = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };
  addDisabledFieldsets();
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
  var appendMocks = function () {
    for (var k = 0; k < window.mocks.length; k++) {
      fragment.appendChild(createPins(window.mocks[k]));
    }
    mapPins.appendChild(fragment).cloneNode(true);
  };


  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activatePage();
    }
  });
  var removeDisabledFieldsets = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
  };
  var removeCreatedPins = function () {
    var mapPinsAll = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPinsAll.length; i++) {
      mapPinsAll[i].remove();
    }
  };
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
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.which === 13) {
      activatePage();
    }
  });
  form.addEventListener('reset', function (evt) {
    evt.preventDefault();
    resettingPage();
  });
  var activatePage = function () {
    appendMocks();
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    removeDisabledFieldsets();
  };
})();
