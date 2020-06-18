'use strict';

var PIN_WIDTH = 65;
var PIN_HEIGHT = 83;

var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var pinTemplate = document.querySelector('#pin').content;
var fragment = document.createDocumentFragment();
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
