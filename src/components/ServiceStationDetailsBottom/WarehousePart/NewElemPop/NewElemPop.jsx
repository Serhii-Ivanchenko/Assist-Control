import { BsPencil, BsTrash } from "react-icons/bs";
import css from "./NewElemPop.module.css";

export default function NewElemPop({ icon, addText }) {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.btn}>
        {icon}
        {addText}
      </button>
      <button type="button" className={css.btn}>
        <BsPencil />
        Редагувати
      </button>
      <button type="button" className={css.btn}>
        <BsTrash />
        Видалити
      </button>
    </div>
  );
}
