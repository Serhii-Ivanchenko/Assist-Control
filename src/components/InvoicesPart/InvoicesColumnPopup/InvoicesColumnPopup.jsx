import css from "./InvoicesColumnPopup.module.css";
import { BsCheck } from "react-icons/bs";

export default function InvoicesColumnPopup({
  setSelectedStatusMap,
  selectedStatus,
  category,
}) {
  const handleFilter = (status) => {
    setSelectedStatusMap((prevMap) => {
      const currentStatuses = prevMap[category] || [];

      let updatedStatuses;
      if (status === "") {
        updatedStatuses = currentStatuses.includes("") ? [] : [""];
      } else {
        updatedStatuses = currentStatuses.includes(status)
          ? currentStatuses.filter((item) => item !== status)
          : [...currentStatuses.filter((item) => item !== ""), status];
      }

      return {
        ...prevMap,
        [category]: updatedStatuses,
      };
    });
  };

  return (
    <div className={css.popupContainer}>
      <label className={css.label}>
        <input
          type="checkbox"
          name="all"
          id="all"
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
          id="completed"
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
          id="pending"
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
          id="rejected"
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
