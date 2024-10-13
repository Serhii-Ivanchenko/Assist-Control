import { BsXLg } from "react-icons/bs";
import css from "./LogoutModal.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations.js";

export default function LogoutModal({ onClose }) {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(logOut()).unwrap();
      onClose();
    } catch (error) {
      console.error("Log out failed:", error);
    }
  };

  return (
    <div className={css.logoutBox}>
      <BsXLg className={css.closeBtn} onClick={onClose} />
      <h3>Вихід</h3>
      <p>Ви дійсно бажаєте вийти?</p>
      <div className={css.btnBox}>
        <button type="button" className={css.btn} onClick={handleLogOut}>
          Вихід
        </button>
        <button type="button" className={css.btn} onClick={onClose}>
          Відміна
        </button>
      </div>
    </div>
  );
}
