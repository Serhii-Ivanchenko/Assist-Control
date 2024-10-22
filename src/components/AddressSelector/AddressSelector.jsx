import { useRef, useState } from "react";
import css from "./AddressSelector.module.css";
import { BsFillCaretDownFill } from "react-icons/bs";

export default function AddressSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className={css.selectBox} ref={selectRef} onBlur={handleBlur}>
      <select
        id="address"
        name="address"
        className={css.select}
        onClick={toggleDropdown}
      >
        <option value="address1">Івано-франківськ вул. Івана Франка</option>
        <option value="address2">Адреса №2</option>
        <option value="address2">Адреса №3</option>
      </select>
      <BsFillCaretDownFill
        className={`${css.btnArrowSelect} ${isDropdownOpen ? css.rotated : ""}`}
      />
    </div>
  );
}
