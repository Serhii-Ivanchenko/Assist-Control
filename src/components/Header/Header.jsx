import { useLocation } from "react-router-dom";
import AddressSelector from "../AddressSelector/AddressSelector.jsx";
import ControlBar from "../ControlBar/ControlBar.jsx";
import Logo from "../Logo/Logo.jsx";
import DateSelector from "./DateSelector/DateSelector.jsx";
import css from "./Header.module.css";

export default function Header() {
   const location = useLocation();
   const isCrmPage = location.pathname === "/crm";

  return (
    <div className={css.header}>
      <div className={css.leftSideWrapper}>
        <Logo />
        <AddressSelector />
      </div>
      {isCrmPage && <DateSelector />}
      <ControlBar />
    </div>
  );
}
