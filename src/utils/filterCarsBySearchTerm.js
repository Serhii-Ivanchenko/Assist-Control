export const validateSearchTerm = (term, setInputError, setSearchTerm) => {
  if (/^[a-zA-Z0-9]*$/.test(term)) {
    setSearchTerm(term);
    setInputError("");
  } else {
    setInputError("Вводьте лише латинські літери та цифри");
  }
};

export const filterCarsBySearchTerm = (cars, searchTerm) => {
  if (!searchTerm) return cars;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return cars.filter((car) => {
    const plateValue = car.plate?.toLowerCase() || "";
    const autoValue = car.auto?.toLowerCase() || "";
    return (
      plateValue.includes(lowerCaseSearchTerm) ||
      autoValue.includes(lowerCaseSearchTerm)
    );
  });
};