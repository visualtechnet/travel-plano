const saveData = (key, value) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return localStorage.getItem(key);
  }
  return value;
};

const getData = (key) => localStorage && JSON.parse(localStorage.getItem(key));

export { saveData, getData };
