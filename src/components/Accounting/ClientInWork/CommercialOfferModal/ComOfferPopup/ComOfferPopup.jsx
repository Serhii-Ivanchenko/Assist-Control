import css from "./ComOfferPopup.module.css";

export default function ComOfferPopup({ onClose, setApproval }) {
  return (
    <div className={css.popup}>
      <p
        className={css.text}
        onClick={() => {
          setApproval("Особисте підтвердження");
          onClose();
        }}
      >
        Особисте підтвердження
      </p>
      <p
        className={css.text}
        onClick={() => {
          setApproval("Додаток");
          onClose();
        }}
      >
        Додаток
      </p>
      <p
        className={css.text}
        onClick={() => {
          setApproval("Месенджер");
          onClose();
        }}
      >
        Месенджер(чат)
      </p>
    </div>
  );
}
