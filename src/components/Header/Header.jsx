import ControlBar from "../ControlBar/ControlBar.jsx";
import Logo from "../Logo/Logo.jsx";
import css from './Header.module.css'

export default function Header() {
  return <div className={css.header}>
    <Logo />
    <ControlBar/>
  </div>;
}
