import { Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from './UserSettingsModal.module.css'

const Validation = Yup.object().shape({
    username: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Обов'язкове поле для заповнення"),
    email: Yup.string().email().required("Обов'язкове поле для заповнення"),
    phone: Yup.string().min(3, "Занадто коротке").max(50, "Занадто довге").required("Обов'язкове поле для заповнення"),
    company: Yup.string().min(2).max(50).required("Обов'язкове поле для заповнення")
});
    
const initialValues = {
    username: '',
    email: '',
    phone: '',
    company:''
}

export default function UserSettingsModal() {

   

    const nameFieldId = useId();
    const emailFieldId = useId();
    const phoneFieldId = useId();
    const companyFieldId = useId();

    return (
        <Formik initialValues={initialValues} onSubmit={() => {}} validationSchema={Validation}>
            <Form className={css.formBox}>
                <Field type='file' name='photo' />
                <label htmlFor={nameFieldId}>Ім&apos;я</label>
                <Field type='text' name='username' id={nameFieldId} />
                <label htmlFor={emailFieldId}>Пошта</label>
                <Field type='email' name='email' id={emailFieldId} />
                <label htmlFor={phoneFieldId}>Номер телефону</label>
                <Field type='' name='phone' id={phoneFieldId} />
                <label htmlFor={companyFieldId}>Назва компанії</label>
                <Field type='text' name='company' id={companyFieldId} />
                <button type="submit">Зберегти</button>
                <button type="button">Відміна</button>
            </Form>
        </Formik>
    )
}