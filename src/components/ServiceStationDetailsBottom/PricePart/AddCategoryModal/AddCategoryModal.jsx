import { Formik, Form, Field } from "formik";
import { BsCheckLg } from "react-icons/bs";
import styles from "./AddCategoryModal.module.css";

const AddCategoryModal = ({ title, name, onClose, addNewCategory }) => {
  const handleSubmit = (values, actions) => {
    addNewCategory(values[name]);
    actions.resetForm();
    onClose();
  };

  return (
    <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
      <p className={styles.modalTitle}>{title}</p>
      <Formik initialValues={{ [name]: "" }} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <Field name={name} className={styles.field} />
          <div className={styles.btnBox}>
            <button type="button" className={styles.btnClose} onClick={onClose}>
              Закрити
            </button>
            <button type="submit" className={styles.btnSave}>
              <BsCheckLg size={18} />
              Зберегти
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddCategoryModal;
