import css from "./DeleteModal.module.css";

export default function DeleteModal({ text, onClose, onDelete }) {
  return (
    <div className={css.container}>
      <p className={css.question}>Ви дійсно бажаєте видалити {text}?</p>
      <div className={css.btnBox}>
        <button
          type="button"
          onClick={onClose}
          className={`${css.btn} ${css.btnClose}`}
        >
          Відміна
        </button>
        <button
          type="button"
          onClick={onDelete}
          className={`${css.btn} ${css.btnDelete}`}
        >
          Видалити
        </button>
      </div>
    </div>
  );
}
