import { Formik, Form, Field } from "formik";
import css from "./NewItemModal.module.css";
import { BsCheckLg } from "react-icons/bs";

export default function NewItemModal({ title, name, onClose, addNewTree }) {
  const handleSubmit = (values, actions) => {
    addNewTree(values[name]);
    console.log(values);
    actions.resetForm();
    onClose();
  };

  // const setNewTree = (field,values) {

  // }

  return (
    <div className={css.modalBox}>
      <p className={css.modalTitle}>{title}</p>
      <Formik initialValues={{ [name]: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field name={name} className={css.field} />
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
