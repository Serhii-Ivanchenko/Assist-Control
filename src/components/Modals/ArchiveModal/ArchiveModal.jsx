import { IoIosClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Formik, Field, Form } from "formik";
import css from "./ArchiveModal.module.css";

export default function ArchiveModal({ onClose }) {
  const handleSubmit = (value) => {
    console.log(value);
    onClose();
  };
  return (
    <div className={css.wrapper}>
      <button className={css.exitBtn}>
        <IoIosClose className={css.icon} onClick={onClose} />
      </button>

      <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
        {() => (
          <Form className={css.form}>
            <label htmlFor="comment">Привід додавання в архів</label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="Введіть ваш коментар..."
              className={css.textarea}
            />
            <div className={css.btnsGroup}>
              <button type="button" className={css.closeBtn} onClick={onClose}>
                Закрити
              </button>
              <button type="submit" className={css.submitBtn}>
                <MdDone />
                Підтвердити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
