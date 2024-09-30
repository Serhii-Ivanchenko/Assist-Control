import css from "./Logo.module.css";
import logo from "../../assets/logo.svg";
import icons from "../../assets/icons.svg";

export default function Logo() {
  return (
    <div className={css.logoBox}>
      <img src={logo} alt="" />
      <svg className={css.logoName} width={121} height={19}>
        <use
          href={`${icons}#icon-Assist-Control`}
        ></use>
      </svg>
    </div>
  );
}
