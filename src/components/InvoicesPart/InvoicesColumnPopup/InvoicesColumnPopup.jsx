import css from "./InvoicesColumnPopup.module.css";
import { BsCheck } from "react-icons/bs";

export default function InvoicesColumnPopup({
  // list,
  // showParticularCards,
  // category,
  setSelectedStatus,
  selectedStatus,
}) {
  //   const showParticularCards = (status) => {
  //     list.filter((item) => item.status === status);
  //   };

  const handleFilter = (status) => {
    // showParticularCards(status); // Виклик фільтрації з переданим статусом
    setSelectedStatus((prevStatuses) => {
      if (status === "") {
        return prevStatuses.includes("") ? [] : [""];
      } else {
        const updatedStatuses = prevStatuses.filter((s) => s !== "");
        if (updatedStatuses.includes(status)) {
          return updatedStatuses.filter((s) => s !== status);
        } else {
          return [...updatedStatuses, status];
        }
      }
    });
  };

  return (
    <div className={css.popupContainer}>
      <label className={css.label}>
        <input
          type="checkbox"
          name="all"
          id=""
          className={css.checkbox}
          checked={selectedStatus.length === 0 || selectedStatus.includes("")}
          onChange={() => handleFilter("")}
        />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={css.text}> Всі</p>
      </label>
      <label className={css.label}>
        <input
          type="checkbox"
          name="completed"
          id=""
          className={css.checkbox}
          checked={selectedStatus.includes("completed")}
          onChange={() => handleFilter("completed")}
        />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={`${css.text} ${css.textCompleted}`}>Завершені</p>
      </label>
      <label className={css.label}>
        <input
          type="checkbox"
          name="pending"
          id=""
          className={css.checkbox}
          checked={selectedStatus.includes("pending")}
          onChange={() => handleFilter("pending")}
        />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={css.text}>В роботі</p>
      </label>
      <label className={css.label}>
        <input
          type="checkbox"
          name="rejected"
          id=""
          className={css.checkbox}
          checked={selectedStatus.includes("rejected")}
          onChange={() => handleFilter("rejected")}
        />
        <span className={css.cbMark}>
          <BsCheck size={24} className={css.cbIcon} />
        </span>
        <p className={css.text}> Відмовлені</p>
      </label>
    </div>
  );
}
