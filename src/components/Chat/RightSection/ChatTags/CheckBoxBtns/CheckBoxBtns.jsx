import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import css from "./CheckBoxBtns.module.css";

export default function CheckBoxBtns({ isChecked }) {
  return isChecked ? (
    <FaRegCheckSquare className={css.icon} />
  ) : (
    <FaRegSquare className={css.icon} />
  );
}
