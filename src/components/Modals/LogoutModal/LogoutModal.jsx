import { BsXLg } from "react-icons/bs";
import css from "./LogoutModal.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogoutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
      await dispatch(logOut())
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          toast.error("Щось сталося, спробуйте ще раз", {
            position: "top-center",
            style: {
              background: "#242525",
              color: "#FFFFFF",
            },
          });
        });
      onClose();
    }

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
