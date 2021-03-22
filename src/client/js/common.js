const initValidation = (form) => {
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  }, false);
};

const initDatePicker = (name, callback) => {
  const picker = $(`input[name="${name}"]`);
  picker.daterangepicker({
    opens: 'center',
  }, callback);
};

const isValidDate = (entryDate) => {
  // TODO Add validation
  console.log(entryDate);
};

const extractDestination = (destination) => {
  try {
    if (destination.indexOf(',') !== -1) {
      const addr = destination.split(',');
      const city = addr[0];
      const state = addr[1].trim().split(' ')[0];
      const postalcode = addr[1].match(/\d+/)[0];
      return {
        city,
        state,
        postalcode,
      };
    }

    const postalcode = destination.match(/\d+/)[0];

    return postalcode && { postalcode };
  } catch (error) {
    throw new Error('Format must be City, State PostalCode or just PostalCode');
  }
};

export {
  initValidation, initDatePicker, isValidDate, extractDestination,
};
