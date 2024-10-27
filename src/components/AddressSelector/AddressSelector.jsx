import { useEffect, useRef, useState } from "react";
import css from "./AddressSelector.module.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { setSelectedServiceId } from "../../redux/auth/slice.js";

export default function AddressSelector() {
  const dispatch = useDispatch();

  const userData = useSelector(selectUser);
  const services = userData?.services || []; 

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

  // useEffect(() => {
  //   if (services.length > 0) {
  //     dispatch(setSelectedServiceId(services[0].id)); 
  //   }
  // }, [services, dispatch]);

  const handleSelectService = (event) => {
    const selectedServiceId = event.target.value;
    dispatch(setSelectedServiceId(selectedServiceId));
  };

  return (
    <div className={css.selectBox} ref={selectRef} onBlur={handleBlur}>
      <select
        id="address"
        name="address"
        className={css.select}
        onClick={toggleDropdown}
        onChange={handleSelectService}
      >
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.service_name}
          </option>
        ))}
      </select>
      <BsFillCaretDownFill
        className={`${css.btnArrowSelect} ${isDropdownOpen ? css.rotated : ""}`}
      />
    </div>
  );
}
