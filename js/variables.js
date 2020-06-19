'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  window.variables = {
    PIN_WIDTH: 65,
    PIN_HEIGHT: 83,
    mapPins: document.querySelector('.map__pins'),
    mapPin: document.querySelector('.map__pin'),
    mapPinMain: document.querySelector('.map__pin--main'),
    map: document.querySelector('.map'),
    pinTemplate: document.querySelector('#pin').content,
    fragment: document.createDocumentFragment(),
    form: form,
    formFieldsets: form.querySelectorAll('fieldset'),
    inputAddress: form.querySelector('#address'),
    inputType: form.querySelector('#type'),
    inputPrice: form.querySelector('#price'),
    inputRooms: form.querySelector('#room_number'),
    inputGuests: form.querySelector('#capacity'),
    inputTimeIn: form.querySelector('#timein'),
    inputTimeOut: form.querySelector('#timeout'),
    inputTitle: form.querySelector('#title'),
    inputDescription: form.querySelector('#description'),
    inputFeatures: form.querySelector('.features'),
    inputAvatar: form.querySelector('#avatar'),
    inputImages: form.querySelector('#images')
  };
})();
