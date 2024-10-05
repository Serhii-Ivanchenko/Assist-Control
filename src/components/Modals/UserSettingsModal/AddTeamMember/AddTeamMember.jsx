import { Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./AddTeamMember.module.css"

const initialValues = {
    name: '',
    surname: '',
    email: '',
    role:'admin'
}

export default function AddTeamMember() {

    const nameFieldId = useId();
    const surnameFieldId = useId();
    const emailFieldId = useId();
    const roleAdminFieldId = useId();
    const roleViewerFieldId = useId();


    const handleSubmit = (values, actions) => {
		console.log(values);
		actions.resetForm();
	};

    return (
        <div className={css.addBox}>
            <p className={css.addTitle}>Додати користувача</p>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className={css.addForm}>
<div className={css.contentBox}>
                   <div className={css.nameBox}>
                    <div className={css.name}>
                    <label htmlFor={nameFieldId} className={css.fieldName}>Ім&apos;я</label>
                    <Field type="text" name="name" id={nameFieldId} className={css.field} />
                    </div>

                     <div className={css.name}>
                    <label htmlFor={surnameFieldId} className={css.fieldName}>Прізвище</label>
                    <Field type="text" name="surname" id={surnameFieldId} className={css.field}/>
                    </div>
                    </div>
                    
                    <label htmlFor={emailFieldId} className={css.fieldName}>Пошта</label>
                    <Field type="email" name="email" id={emailFieldId} className={css.fieldEmail}/>
                    
                    <p className={css.fieldName}>Роль</p>

                    
                    <label htmlFor={roleViewerFieldId} className={css.radioName}> 
                        <Field type="radio" name="role" value="viewer" id={roleViewerFieldId} className={css.radioInput}/>
                        <span className={css.castomRadio}></span>
                        <div className={css.roleDescription}>
                         <p className={css.title}> Перегляд</p>
                            <p className={css.text}>Перегляд:
                                користувач може лише переглядати інформацію без можливості її змінювати,
                                додавати або видаляти. Доступ обмежений тільки для ознайомлення з даними.</p>  
                                </div>
                    </label>

                    <label htmlFor={roleAdminFieldId} className={css.radioName}>
                        <Field type="radio" name="role" value="admin" id={roleAdminFieldId} className={css.radioInput}/>
                        <span className={css.castomRadio}></span>
                        <div className={css.roleDescription}>
                            <p className={css.title}>Адміністратор</p>
                            <p className={css.text}>Адміністратор:
                                користувач має повний доступ до всіх функцій системи,
                                включаючи керування налаштуваннями, редагування,
                                створення та видалення даних,а також управління правами інших користувачів.</p>
                                </div>
                        </label>
                        </div>
                    <div className={css.btnBox}>
                    <button type="button" className={css.cancelBtn}>Відміна</button>
                    <button type="submit" className={css.addBtn}>Додати</button>
                    </div>

                </Form>
            </Formik>
        </div>
    )
}