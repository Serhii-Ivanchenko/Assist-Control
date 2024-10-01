import { FiLogOut, FiSettings } from "react-icons/fi";
import css from './UserBarPopover.module.css'

export default function UserBarPopover() {
  return (
    <div className={css.popover}>
      <div className={css.settings}>
        <FiSettings className={css.icon} />
        <p className={css.text}>Налаштування</p>
      </div>
      <div className={css.logout}>
        <FiLogOut className={css.icon} />
        <p className={css.text}>Вийти</p>
      </div>
    </div>
  );
}
