import { useLocation } from "react-router-dom";
import AddressSelector from "../AddressSelector/AddressSelector.jsx";
import ControlBar from "../ControlBar/ControlBar.jsx";
import Logo from "../Logo/Logo.jsx";
import DateSelector from "./DateSelector/DateSelector.jsx";
import css from "./Header.module.css";
import { useDispatch } from "react-redux";
import { updateDates } from "../../redux/crm/slice.js";

export default function Header() {
  const location = useLocation();
  const isCrmPage = location.pathname === "/crm";
  const headerOnLogin = location.pathname === "/login";
  const headerOnRegister = location.pathname === "/register";
  const headerOnMain = location.pathname === "/";
  const dispatch = useDispatch();


  if (headerOnLogin || headerOnRegister || headerOnMain) {
    return null; // не відображати Header
  }

  const handleDatesChange = (dates) => {
    dispatch(updateDates(dates));
  };
  
  return (
    <div className={css.header}>
      <div className={css.leftSideWrapper}>
        <Logo />
        <AddressSelector />
      </div>
      {isCrmPage && <DateSelector onDatesChange={handleDatesChange}/>}
      <ControlBar />
    </div>
  );
}
