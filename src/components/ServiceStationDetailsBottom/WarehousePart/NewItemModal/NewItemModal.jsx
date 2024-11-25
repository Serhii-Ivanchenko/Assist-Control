import { Formik, Form, Field } from "formik";
import css from "./NewItemModal.module.css"
import { BsCheckLg } from "react-icons/bs";



export default function NewItemModal() {
  
    const handleSubmit = (actions, values) => {
console.log(values);
actions.resetForm()
    }

   
   
    return (
        <div className={css.modalBox}>
            <p className={css.modalTitle}>Введіть назву шаблона</p>
            <Formik initialValues={{newWarehouse: ""}} onSubmit={handleSubmit}>
                <Form className={css.form}>
                    <Field name="newWarehouse" className={css.field} />
                    <div className={css.btnBox}>
                        <button type="button" className={css.btnClose}>Закрити</button>
                        <button type="submit" className={css.btnSave}><BsCheckLg size={18}/>Зберегти</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}