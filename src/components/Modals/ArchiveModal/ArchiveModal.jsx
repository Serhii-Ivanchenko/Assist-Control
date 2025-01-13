import { IoIosClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Formik, Field, Form } from "formik";
import css from "./ArchiveModal.module.css";

const archiveReasons = [
  {
    id: "співробітник",
    statusClass: css.lightBlue,
    statusText: "СПІВРОБІТНИК",
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--glow-archive-light-blue)",
  },
  {
    id: "випадковий",
    statusClass: css.lightBlue,
    statusText: "ВИПАДКОВИЙ",
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--glow-archive-light-blue)",
  },
  {
    id: "дубль",
    statusClass: css.lightBlue,
    statusText: "ДУБЛЬ",
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--glow-archive-light-blue)",
  },
  {
    id: "відмова",
    statusClass: css.violet,
    statusText: "ВІДМОВА",
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--glow-archive-violet)",
  },
  {
    id: "не_приїхав",
    statusClass: css.violet,
    statusText: "НЕ ПРИЇХАВ",
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--glow-archive-violet)",
  },
  {
    id: "рейтинг",
    statusClass: css.violet,
    statusText: "РЕЙТИНГ",
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--glow-archive-violet)",
  },
  {
    id: "не_допомогли",
    statusClass: css.red,
    statusText: "НЕ ДОПОМОГЛИ",
    background: "var(--status-gradient-view-repair)",
    borderColor: "var(--glow-view-repair)",
  },
];

export default function ArchiveModal({ onClose }) {
  const handleSubmit = (values) => {
    console.log(values);
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <button className={css.exitBtn}>
        <IoIosClose className={css.icon} onClick={onClose} />
      </button>

      <Formik
        initialValues={{
          comment: "",
          reasons: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const selectedReason = archiveReasons.find(
            (reason) => reason.id === values.reasons
          );

          return (
            <Form className={css.form}>
              <label htmlFor="comment">Привід додавання в архів</label>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Введіть ваш коментар..."
                className={css.textarea}
              />
              <label htmlFor="reasons">Оберіть причину:</label>
              <Field
                as="select"
                id="reasons"
                name="reasons"
                className={`${css.select} ${
                  selectedReason ? selectedReason.statusClass : ""
                }`}
                style={{
                  background: selectedReason
                    ? selectedReason.background
                    : undefined,
                  borderColor: selectedReason
                    ? selectedReason.borderColor
                    : undefined,
                }}
              >
                <option value="" disabled className={css.defReason}>
                  Оберіть причину
                </option>
                {archiveReasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.statusText}
                  </option>
                ))}
              </Field>

              <div className={css.btnsGroup}>
                <button
                  type="button"
                  className={css.closeBtn}
                  onClick={onClose}
                >
                  Закрити
                </button>
                <button type="submit" className={css.submitBtn}>
                  <MdDone />
                  Підтвердити
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
