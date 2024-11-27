import { Formik, Form, Field } from "formik";
import css from "./AddModal.module.css";
import { BsCheckLg } from "react-icons/bs";

export default function AddModal() {
  const handleSubmit = (actions, values) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css.modalBox}>
      <p className={css.modalTitle}>Введіть кількість</p>
      <Formik initialValues={{ number: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field name="number" className={css.field} />
          <div className={css.btnBox}>
            <button type="button" className={css.btnClose}>
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
