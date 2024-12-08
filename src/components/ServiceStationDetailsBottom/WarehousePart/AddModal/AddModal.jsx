import { Formik, Form, Field } from "formik";
import css from "./AddModal.module.css";
import { BsCheckLg } from "react-icons/bs";

export default function AddModal({ onClose, addNewBranch }) {
  const handleSubmit = (values, actions) => {
    addNewBranch(values.number);
    console.log("values", values);
    onClose();

    actions.resetForm();
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
