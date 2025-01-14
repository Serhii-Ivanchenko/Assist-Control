import { useEffect, useRef, useState } from "react";
import css from "./AddressSelector.module.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedServiceId, selectUser } from "../../redux/auth/selectors.js";
import { setSelectedServiceId } from "../../redux/auth/slice.js";

export default function AddressSelector() {
  const dispatch = useDispatch();

  const userData = useSelector(selectUser);
  const services = userData?.services || [];
  // const selectSelectedServiceId = useSelector(selectSelectedServiceId);
  // const services = [
  //   {
  //     id: 1,
  //     service_name: "AvtoAtmosfera Cherkasy",
  //   },
  //   {
  //     id: 2,
  //     service_name: "GCAR Kyiv",
  //   },
  // ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectRef = useRef(null);

  // useEffect(() => {
  //   if (services.length > 0 && !userData.selectedServiceId) {
  //     dispatch(setSelectedServiceId(services[0].id));
  //   }
  // }, [services, userData.selectedServiceId, dispatch]);

  // console.log("selectSelectedServiceId");
  

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

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
        value={userData.selectedServiceId || ""}
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
