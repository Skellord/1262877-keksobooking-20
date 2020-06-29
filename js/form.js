'use strict';

(function () {
  window.form = {
    setListeners: function () {
      window.variables.inputAddress.value = window.variables.mapPinMain.offsetLeft + Math.ceil(window.variables.PIN_WIDTH / 2) + ',\xa0' + (window.variables.mapPinMain.offsetTop + window.variables.PIN_HEIGHT);
      window.variables.inputTimeIn.addEventListener('change', function () {
        window.variables.inputTimeOut.value = window.variables.inputTimeIn.value;
      });
      window.variables.inputTimeOut.addEventListener('change', function () {
        window.variables.inputTimeIn.value = window.variables.inputTimeOut.value;
      });
      window.variables.inputType.addEventListener('change', function () {
        if (window.variables.inputType.value === 'bungalo') {
          window.variables.inputPrice.min = window.variables.inputPrice.placeholder = 0;
        } else if (window.variables.inputType.value === 'flat') {
          window.variables.inputPrice.min = window.variables.inputPrice.placeholder = 1000;
        } else if (window.variables.inputType.value === 'house') {
          window.variables.inputPrice.min = window.variables.inputPrice.placeholder = 5000;
        } else if (window.variables.inputType.value === 'palace') {
          window.variables.inputPrice.min = window.variables.inputPrice.placeholder = 10000;
        }
      });

      var removeDisabledOption = function () {
        for (var i = 0; i < window.variables.inputGuests.options.length; i++) {
          window.variables.inputGuests.options[i].disabled = false;
        }
      };

      window.variables.inputRooms.addEventListener('change', function () {
        if (window.variables.inputRooms.value === '1') {
          removeDisabledOption();
          window.variables.inputGuests.value = '1';
          window.variables.inputGuests.options[3].disabled = true;
          window.variables.inputGuests.options[0].disabled = true;
          window.variables.inputGuests.options[1].disabled = true;
        } else if (window.variables.inputRooms.value === '2') {
          removeDisabledOption();
          window.variables.inputGuests.value = '2';
          window.variables.inputGuests.options[3].disabled = true;
          window.variables.inputGuests.options[0].disabled = true;
        } else if (window.variables.inputRooms.value === '3') {
          removeDisabledOption();
          window.variables.inputGuests.value = '2';
          window.variables.inputGuests.options[3].disabled = true;
        } else if (window.variables.inputRooms.value === '100') {
          removeDisabledOption();
          window.variables.inputGuests.value = '0';
          window.variables.inputGuests.options[0].disabled = true;
          window.variables.inputGuests.options[1].disabled = true;
          window.variables.inputGuests.options[2].disabled = true;
        }
      });

      window.variables.inputPrice.addEventListener('invalid', function () {
        if (window.variables.inputPrice.validity.valueMissing) {
          window.variables.inputPrice.setCustomValidity('Введите число от ' + window.variables.inputPrice.min + ' до 1000000');
        } else {
          window.variables.inputPrice.setCustomValidity('');
        }
      });
    }
  };
})();
