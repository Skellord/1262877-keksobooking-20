'use strict';

window.actions = {
  set: function (mocks) {
    var addDisabledFieldsets = function () {
      for (var i = 0; i < window.variables.formFieldsets.length; i++) {
        window.variables.formFieldsets[i].setAttribute('disabled', 'disabled');
      }
    };
    addDisabledFieldsets();
    var createPins = function (element) {
      var pinElement = window.variables.pinTemplate.cloneNode(true);
      var pinButton = pinElement.querySelector('button');
      var pinImage = pinButton.querySelector('img');
      if (element.location.x < window.variables.mapPins.offsetWidth * 0.5) {
        pinButton.style.left = element.location.x + window.variables.mapPin.offsetWidth + 'px';
      } else {
        pinButton.style.left = element.location.x - window.variables.mapPin.offsetWidth + 'px';
      }
      pinButton.style.top = element.location.y - window.variables.mapPin.offsetHeight * 0.5 + 'px';
      pinImage.src = element.author.avatar;
      return pinElement;
    };
    var appendMocks = function () {
      for (var k = 0; k < window.mocks.length; k++) {
        window.variables.fragment.appendChild(createPins(window.mocks[k]));
      }
      window.variables.mapPins.appendChild(window.variables.fragment).cloneNode(true);
    };


    window.variables.mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.which === 1) {
        activatePage();
      }
    });
    var removeDisabledFieldsets = function () {
      for (var i = 0; i < window.variables.formFieldsets.length; i++) {
        window.variables.formFieldsets[i].removeAttribute('disabled');
      }
    };
    var removeCreatedPins = function () {
      var mapPinsAll = window.variables.mapPins.querySelectorAll('.map__pin');
      for (var i = 1; i < mapPinsAll.length; i++) {
        mapPinsAll[i].remove();
      }
    };
    var resettingPage = function () {
      window.variables.form.classList.add('ad-form--disabled');
      window.variables.inputAddress.value = window.variables.mapPinMain.offsetLeft + Math.ceil(window.variables.PIN_WIDTH / 2) + ',\xa0' + (window.variables.mapPinMain.offsetTop + window.variables.PIN_HEIGHT);
      addDisabledFieldsets();
      window.variables.map.classList.add('map--faded');
      window.variables.inputTitle.value = '';
      window.variables.inputType.value = 'flat';
      window.variables.inputRooms.value = '1';
      window.variables.inputDescription.value = '';
      window.variables.inputPrice.value = '';
      window.variables.inputGuests.value = '1';
      window.variables.inputGuests.options[3].disabled = true;
      window.variables.inputGuests.options[0].disabled = true;
      window.variables.inputGuests.options[1].disabled = true;
      window.variables.inputTimeIn.value = '12:00';
      window.variables.inputTimeOut.value = '12:00';
      window.variables.inputAvatar.value = '';
      window.variables.inputImages.value = '';
      removeCreatedPins();
      var features = window.variables.inputFeatures.querySelectorAll('input');
      for (var i = 0; i < features.length; i++) {
        features[i].checked = false;
      }
    };
    window.variables.mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.which === 13) {
        activatePage();
      }
    });
    window.variables.form.addEventListener('reset', function (evt) {
      evt.preventDefault();
      resettingPage();
    });
    var activatePage = function () {
      appendMocks();
      window.variables.map.classList.remove('map--faded');
      window.variables.form.classList.remove('ad-form--disabled');
      removeDisabledFieldsets();
    };
  }
};
