const filterCarsBySearchTerm = (cars, searchTerm) => {
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
  
  export default filterCarsBySearchTerm;