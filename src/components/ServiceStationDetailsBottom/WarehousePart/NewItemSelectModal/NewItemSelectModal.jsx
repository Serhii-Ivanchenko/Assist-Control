import { Formik, Form, Field } from "formik";
import css from "./NewItemSelectModal.module.css";
import { BsCheckLg } from "react-icons/bs";

export default function NewItemSelectModal({ onClose }) {
  const handleSubmit = (actions, values) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css.modalBox}>
      <p className={css.modalTitle}>Введіть назву шаблона</p>
      <Formik initialValues={{ newWarehouse: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field as="select" name="chooseWarehouse" className={css.field}>
            <option value="new">Новий</option>
          </Field>
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
