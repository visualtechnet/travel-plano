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

export { initValidation, initDatePicker, isValidDate };
