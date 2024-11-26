import css from "./Logo.module.css";
import logo from "../../assets/images/logo-dark-theme.png";
// import icons from "../../assets/icons.svg";
import { selectUser } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";

export default function Logo() {
  const userData = useSelector(selectUser);

  return (
    <div className={css.logoBox}>
      <img
        className={css.companyLogo}
        src={userData.company_logo || logo}
        alt="company logo"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = logo;
        }}
      />
      {/* <svg className={css.logoName}>
        <use href={`${icons}#icon-Assist-Control`}></use>
      </svg> */}
    </div>
  );
}
