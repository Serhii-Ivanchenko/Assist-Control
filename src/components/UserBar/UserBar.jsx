import css from './UserBar.module.css';
import { FiUser } from "react-icons/fi";

export default function UserBar() {
  return (
    <button className={css.btn}>
      <FiUser className={css.icon} />
    </button>
  );
}
