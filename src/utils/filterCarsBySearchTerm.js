// Функція для транслітерації кирилиці в латиницю
const transliterate = (str) => {
  const mapping = {
    а: 'a', б: 'b', в: 'b', д: 'd', е: 'e', з: 'z',
    і: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    р: 'p', с: 'c', т: 't', у: 'y', ф: 'f', х: 'x', 
    ю: 'u', я: 'ya', А: 'A', Б: 'B', В: 'B', Д: 'D',
    Е: 'E', З: 'Z', І: 'I', К: 'K',
    Л: 'L', М: 'M', Н: 'H', О: 'O', Р: 'P', С: 'C', Т: 'T', У: 'Y',
    Ф: 'F', Х: 'X', Ю: 'U', Я: 'Ya'
  };

  return str.split('').map((char) => mapping[char] || char).join('');
};

export const validateSearchTerm = (term, setInputError, setSearchTerm) => {
  const plateTerm = transliterate(term);
  const autoTerm = term;

  if (/^[a-zA-Z0-9]*$/.test(plateTerm) && /^[a-zA-Z0-9]*$/.test(autoTerm)) {
    setSearchTerm(plateTerm)
    setInputError("");
  } else {
    setInputError("Вводьте лише латинські літери та цифри");
  }
};

export const filterCarsBySearchTerm = (cars, searchTerm) => {
  if (!searchTerm) return cars;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return cars.filter((car) => {
    const plateValue = car.plate ? transliterate(car.plate).toLowerCase() : "";
    const autoValue = car.auto ? car.auto.toLowerCase() : "";
    return (
      plateValue.includes(lowerCaseSearchTerm) ||
      autoValue.includes(lowerCaseSearchTerm)
    );
  });
};
