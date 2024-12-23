import css from "./InvoicesColumnPopup.module.css";

export default function InvoicesColumnPopup({
  list,
  showParticularCards,
  category,
}) {
  //   const showParticularCards = (status) => {
  //     list.filter((item) => item.status === status);
  //   };

  const handleFilter = (status) => {
    showParticularCards(status); // Виклик фільтрації з переданим статусом
  };

  return (
    <div className={css.popupContainer}>
      <label htmlFor="" className={css.label} onChange={() => handleFilter("")}>
        <input type="checkbox" name="all" id="" />
        <p className={css.text}> Всі</p>
      </label>
      <label
        htmlFor=""
        className={css.label}
        onChange={() => handleFilter("completed")}
      >
        <input type="checkbox" name="completed" id="" />
        <p className={css.text}>Завершені</p>
      </label>
      <label className={css.label} onChange={() => handleFilter("pending")}>
        <input type="checkbox" name="panding" id="" />
        <p className={css.text}>В роботі</p>
      </label>
      <label className={css.label} onChange={() => handleFilter("rejected")}>
        <input type="checkbox" name="rejected" id="" />
        <p className={css.text}> Відмовлені</p>
      </label>
    </div>
  );
}
