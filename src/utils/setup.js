export const removeAccented = text => {
  text = text.toLowerCase();
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return text;
};

export const removeDuplicate = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};