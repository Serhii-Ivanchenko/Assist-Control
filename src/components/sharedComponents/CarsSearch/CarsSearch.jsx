// import { useEffect, useState } from "react";
import css from "./CarsSearch.module.css";
import { IoIosSearch } from "react-icons/io";

// export default function CarsSearch({ carsData, onFilter, onNoResults }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [inputError, setInputError] = useState("");
  

//   const handleInputChange = (event) => {
//     const term = event.target.value;

//     if (/^[a-zA-Z0-9]*$/.test(term)) {
//       setSearchTerm(term);
//       setInputError("");
//     } else {
//       setInputError("Вводьте лише латинські літери та цифри");
//     }
//   };

//   useEffect(() => {
//     if (!carsData || carsData.length === 0) {
//       onFilter([]);
//       onNoResults(true);
//       return;
//     }
  
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
//     const filteredCars = carsData.filter((car) => {
//       const plate = car.plate?.toLowerCase() || "";
//       const auto = car.auto?.toLowerCase() || "";
//       return plate.includes(lowerCaseSearchTerm) || auto.includes(lowerCaseSearchTerm);
//     });
  
//     if (filteredCars.length > 0) {
//       onFilter(filteredCars);
//       onNoResults(false);
//     } else if (searchTerm.trim() !== "") {
//       onFilter([]);
//       onNoResults(true);
//       ;
//     }
//   }, [carsData, searchTerm, onFilter, onNoResults]);
  

//   return (
//     <div className={css.inputWrapper}>
//       <input
//         className={css.inputFilter}
//         type="text"
//         name="searchInput"
//         id="searchInput"
//         placeholder="Пошук по авто"
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <button className={css.button} type="button">
//         <IoIosSearch className={css.icon} />
//       </button>
//       {inputError && <div className={css.errorMsg}>{inputError}</div>}
//     </div>
//   );
// }

export default function CarsSearch({ value, onChange, error }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.inputWrapper}>
      <input
        className={css.inputFilter}
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Пошук по авто"
        value={value}
        onChange={handleInputChange}
      />
      <button className={css.button} type="button">
        <IoIosSearch className={css.icon} />
      </button>
      {error && <div className={css.errorMsg}>{error}</div>}
    </div>
  );
}