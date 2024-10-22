import AddressSelector from "../AddressSelector/AddressSelector.jsx";
import ControlBar from "../ControlBar/ControlBar.jsx";
import Logo from "../Logo/Logo.jsx";
import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={css.header}>
      <div className={css.leftSideWrapper}>
        <Logo />
        <AddressSelector />
      </div>
      <ControlBar />
    </div>
  );
}
