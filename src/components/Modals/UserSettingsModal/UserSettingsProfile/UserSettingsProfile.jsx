import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./UserSettingsProfile.module.css";
import { useId } from "react";
import * as Yup from "yup";

const Validation = Yup.object().shape({
    username: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Обов'язкове поле для заповнення"),
    phone: Yup.string().min(3, "Занадто коротке").max(50, "Занадто довге").required("Обов'язкове поле для заповнення"),
    adress: Yup.string(),
    city: Yup.string(),
    index: Yup.string(),

});

export default function UserSettingsProfile() {

    const nameFieldId = useId();
    const phoneFieldId = useId();
    const countryFieldId = useId();
    const adressFieldId = useId();
    const sectionFieldId = useId();
    const timeZoneFieldId = useId();
    const cityFieldId = useId();
    const indexFieldId = useId();

    const initialValues = {
        username: "",
        phone: "",
        country: "Ukraine",
        adress: "",
        section: "",
        timeZome: "",
        city: "",
        index: "", 
    }



    return (
        <div className={css.contentBox}>
            <Formik initialValues={initialValues} onSubmit={()=>{}} validationSchema={Validation}>
                <Form className={css.formBox}>

                     <div className={css.photoBox}>
                        <img src='' alt="User's avatar" className={css.photo} />
                    </div>  
                    <Field type='file' name='photo' className={css.photoField} />

                    <div className={css.inputs}>
                        
                    <div className={css.firstColumn}>
                     <label htmlFor={nameFieldId} className={css.inputLable}>ПІБ</label>
                     <Field type='text' name='username' id={nameFieldId} className={css.input}  placeholder="Олегов"/>
                    <ErrorMessage name="username" component="span" className={css.errorMessage} />
                    
                    <label htmlFor={phoneFieldId} className={css.inputLable}>Номер телефону</label>
                     <Field type='tel' name='phone' id={phoneFieldId} className={css.input} placeholder="Введіть свій номер телефону..."/>
                    <ErrorMessage name="phone" component="span" className={css.errorMessage} />
                    
                    <label htmlFor={countryFieldId} className={css.inputLable}>Країна</label>
                    <Field as="select" name='country' id={countryFieldId} className={css.input}>
                        <option value="Ukraine">Україна</option>
                        <option value="UK">The UK</option>
                    </Field>
                    
                     <label htmlFor={adressFieldId} className={css.inputLable}>Адреса</label>
                     <Field type='text' name='adress' id={adressFieldId} className={css.input}  placeholder="Введіть своє ім'я..."/>
                    <ErrorMessage name="adress" component="span" className={css.errorMessage} />

                    <label htmlFor={sectionFieldId}className={css.inputLable}>Розділ для завантаження під час входу</label>
                    <Field as="select" name='country' id={sectionFieldId} className={css.input}>
                        {/* <option value="v-c">За замовченням</option> */}
                        <option value="v-c">Відеоконтроль</option>
                        <option value="crm">CRM</option>
                        <option value="carReport">Звіт по авто</option>
                        <option value="Settings">Налаштування</option>
                        </Field>
                    </div>

                    <div className={css.secondColumn}>
                    <label htmlFor={timeZoneFieldId} className={css.inputLable}>Часовий пояс</label>
                    <Field as="select" name='timeZone' id={timeZoneFieldId} className={css.input}>
                        {/* <option value="default">За замовченням</option> */}
                        <option value="v-c">Відеоконтроль</option>
                        <option value="crm">CRM</option>
                        <option value="carReport">Звіт по авто</option>
                        <option value="Settings">Налаштування</option>
                    </Field>

                    <label htmlFor={cityFieldId} className={css.inputLable}>Місто</label>
                     <Field type='text' name='city' id={cityFieldId} className={css.input}  placeholder="Введіть своє ім'я..."/>
                    <ErrorMessage name="city" component="span" className={css.errorMessage} />

                    <label htmlFor={indexFieldId} className={css.inputLable}>Індекс</label>
                     <Field type='text' name='index' id={indexFieldId} className={css.input}  placeholder="Введіть своє ім'я..."/>
                    <ErrorMessage name="index" component="span" className={css.errorMessage} />
                        </div>
                        
                    </div>
                    
                </Form>
            </Formik>

        </div>
    )
}