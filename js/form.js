'use strict';

(function () {
  inputAddress.value = mapPinMain.offsetLeft + Math.ceil(PIN_WIDTH / 2) + ',\xa0' + (mapPinMain.offsetTop + PIN_HEIGHT);
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
})();
