import { Formik, Form, Field } from "formik";
import css from "./NewItemModal.module.css"
import { BsCheckLg } from "react-icons/bs";



export default function NewItemModal({title, name}) {
  
    const handleSubmit = (actions, values) => {
console.log(values);
actions.resetForm()
    }

   
   
    return (
        <div className={css.modalBox}>
            <p className={css.modalTitle}>{ title}</p>
            <Formik initialValues={{name: ""}} onSubmit={handleSubmit}>
                <Form className={css.form}>
                    <Field name={name} className={css.field} />
                    <div className={css.btnBox}>
                        <button type="button" className={css.btnClose}>Закрити</button>
                        <button type="submit" className={css.btnSave}><BsCheckLg size={18}/>Зберегти</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}