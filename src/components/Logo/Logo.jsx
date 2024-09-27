import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import logo from '../../assets/logo.svg'

export default function Logo() {
  return (
    <div className={css.logo}>
      <img src={logo} alt="" />
      <span>Assist Control</span>
    </div>
  );
}
