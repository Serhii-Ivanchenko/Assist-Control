import { Formik, Form, Field } from "formik";
import css from "./AddModal.module.css";
import { BsCheckLg } from "react-icons/bs";

export default function AddModal({ onClose }) {
  const handleSubmit = (values, actions) => {
    console.log("values", values);
    actions.resetForm();
    onClose();
  };

  return (
    <div className={css.modalBox} onClick={(e) => e.stopPropagation()}>
      <p className={css.modalTitle}>Введіть кількість</p>
      <Formik initialValues={{ number: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field name="number" className={css.field} />
          <div className={css.btnBox}>
            <button type="button" className={css.btnClose} onClick={onClose}>
              Закрити
            </button>
            <button type="submit" className={css.btnSave}>
              <BsCheckLg size={18} />
              Зберегти
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
