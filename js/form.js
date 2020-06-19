'use strict';
window.form = {
  setListeners: function () {
    window.inputAddress.value = window.mapPinMain.offsetLeft + Math.ceil(window.PIN_WIDTH / 2) + ',\xa0' + (window.mapPinMain.offsetTop + window.PIN_HEIGHT);
    window.inputTimeIn.addEventListener('change', function () {
      window.inputTimeOut.value = window.inputTimeIn.value;
    });
    window.inputTimeOut.addEventListener('change', function () {
      window.inputTimeIn.value = window.inputTimeOut.value;
    });
    window.inputType.addEventListener('change', function () {
      if (window.inputType.value === 'bungalo') {
        window.inputPrice.min = window.inputPrice.placeholder = 0;
      } else if (window.inputType.value === 'flat') {
        window.inputPrice.min = window.inputPrice.placeholder = 1000;
      } else if (window.inputType.value === 'house') {
        window.inputPrice.min = window.inputPrice.placeholder = 5000;
      } else if (window.inputType.value === 'palace') {
        window.inputPrice.min = window.inputPrice.placeholder = 10000;
      }
    });

    var removeDisabledOption = function () {
      for (var i = 0; i < window.inputGuests.options.length; i++) {
        window.inputGuests.options[i].disabled = false;
      }
    };

    window.inputRooms.addEventListener('change', function () {
      if (window.inputRooms.value === '1') {
        removeDisabledOption();
        window.inputGuests.value = '1';
        window.inputGuests.options[3].disabled = true;
        window.inputGuests.options[0].disabled = true;
        window.inputGuests.options[1].disabled = true;
      } else if (window.inputRooms.value === '2') {
        removeDisabledOption();
        window.inputGuests.value = '2';
        window.inputGuests.options[3].disabled = true;
        window.inputGuests.options[0].disabled = true;
      } else if (window.inputRooms.value === '3') {
        removeDisabledOption();
        window.inputGuests.value = '2';
        window.inputGuests.options[3].disabled = true;
      } else if (window.inputRooms.value === '100') {
        removeDisabledOption();
        window.inputGuests.value = '0';
        window.inputGuests.options[0].disabled = true;
        window.inputGuests.options[1].disabled = true;
        window.nputGuests.options[2].disabled = true;
      }
    });

    window.inputPrice.addEventListener('invalid', function () {
      if (window.inputPrice.validity.valueMissing) {
        window.inputPrice.setCustomValidity('Введите число от ' + window.inputPrice.min + ' до 1000000');
      } else {
        window.inputPrice.setCustomValidity('');
      }
    });
  }
};
