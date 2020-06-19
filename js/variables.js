'use strict';

(function () {
  window.variables = {
    PIN_WIDTH: 65,
    PIN_HEIGHT: 83,
    mapPins: document.querySelector('.map__pins'),
    mapPin: document.querySelector('.map__pin'),
    mapPinMain: document.querySelector('.map__pin--main'),
    map: document.querySelector('.map'),
    pinTemplate: document.querySelector('#pin').content,
    fragment: document.createDocumentFragment(),
    form: document.querySelector('.ad-form'),
    formFieldsets: window.variables.form.querySelectorAll('fieldset'),
    inputAddress: window.variables.form.querySelector('#address'),
    inputType: window.variables.form.querySelector('#type'),
    inputPrice: window.variables.form.querySelector('#price'),
    inputRooms: window.variables.form.querySelector('#room_number'),
    inputGuests: window.variables.form.querySelector('#capacity'),
    inputTimeIn: window.variables.form.querySelector('#timein'),
    inputTimeOut: window.variables.form.querySelector('#timeout'),
    inputTitle: window.variables.form.querySelector('#title'),
    inputDescription: window.variables.form.querySelector('#description'),
    inputFeatures: window.variables.form.querySelector('.features'),
    inputAvatar: window.variables.form.querySelector('#avatar'),
    inputImages: window.variables.form.querySelector('#images')
  };
})();
