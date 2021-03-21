const saveData = (key, value) => {
  if (localStorage) {
    localStorage.setItem(key, value);
  } else {
    localStorage.getItem(key);
  }
};

const getData = (key) => {
  if (localStorage) {
    localStorage.getItem(key);
  }
};

export { saveData, getData };
