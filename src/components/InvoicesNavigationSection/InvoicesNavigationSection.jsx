import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./InvoicesNavigationSection.module.css";
import InfoSettingsVisibility from "../sharedComponents/InfoSettingsVisibility/InfoSettingsVisibility";
import { labelNamesInvoices } from "../../utils/dataToRender";
import { toggleVisibilityInvoices } from "../../redux/visibility/slice";
import { selectVisibilityInvoices } from "../../redux/visibility/selectors";

export default function InvoicesNavigationSection() {
  
  const navLinkClass = ({ isActive }) => {
    return clsx(styles.navText, isActive && styles.active);
  };

  return (
    <div className={styles.navContainer}>
       <nav className={styles.wrapper}>
      <NavLink to="goods" className={navLinkClass}>
        Товар
      </NavLink>

      <NavLink to="services" className={navLinkClass}>
        Послуги
      </NavLink>

      <NavLink to="funds" className={navLinkClass}>
        Каса
      </NavLink>

      <NavLink
          to="equipment"
          className={clsx(styles.navText, styles.disabled)}
          onClick={(e) => e.preventDefault()}
        >
          Обладнання
        </NavLink>
    </nav>
    <InfoSettingsVisibility
            selectVisibility={selectVisibilityInvoices}
            toggleVisibilityAction={toggleVisibilityInvoices}
            labelNames={labelNamesInvoices}
            className={styles.settingsContainer}
          />
    </div>
       
  );
}
