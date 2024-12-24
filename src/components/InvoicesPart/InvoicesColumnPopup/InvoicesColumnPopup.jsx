import css from "./InvoicesColumnPopup.module.css";
import { BsCheck } from "react-icons/bs";

export default function InvoicesColumnPopup() {
//   {
//   list,
//   showParticularCards,
//   category,
// }
  //   const showParticularCards = (status) => {
  //     list.filter((item) => item.status === status);
  //   };

  // const handleFilter = (status) => {
  //   showParticularCards(status); // Виклик фільтрації з переданим статусом
  // };

  return (
    <div className={css.popupContainer}>
      <label
        className={css.label}
        // onChange={() => handleFilter("")}
      >
        <input type="checkbox" name="all" id="" className={css.checkbox} />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={css.text}> Всі</p>
      </label>
      <label
        className={css.label}
        // onChange={() => handleFilter("completed")}
      >
        <input
          type="checkbox"
          name="completed"
          id=""
          className={css.checkbox}
        />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={`${css.text} ${css.textCompleted}`}>Завершені</p>
      </label>
      <label
        className={css.label}
        // onChange={() => handleFilter("pending")}
      >
        <input type="checkbox" name="panding" id="" className={css.checkbox} />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={css.text}>В роботі</p>
      </label>
      <label
        className={css.label}
        // onChange={() => handleFilter("rejected")}
      >
        <input type="checkbox" name="rejected" id="" className={css.checkbox} />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={css.text}> Відмовлені</p>
      </label>
    </div>
  );
}
