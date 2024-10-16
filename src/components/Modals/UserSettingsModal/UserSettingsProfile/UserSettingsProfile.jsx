import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./UserSettingsProfile.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { BsSdCardFill } from "react-icons/bs";

const Validation = Yup.object().shape({
    username: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Обов'язкове поле для заповнення"),
    phone: Yup.string().min(3, "Занадто коротке").max(50, "Занадто довге").required("Обов'язкове поле для заповнення"),
    adress: Yup.string(),
    city: Yup.string(),
    index: Yup.string(),

});

export default function UserSettingsProfile({onClose}) {

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

                    <div className={css.addPhotoBox} >
                     <div className={css.photoBox}>
                        <img src='' alt="User's avatar" className={css.photo} />
                    </div>  
                    <Field type='file' name='photo' className={css.photoField} />
                    <button type="button" className={css.changePhotoBtn}>Змінити аватар</button>
                    </div>
                
                    <div className={css.inputs}>
                        
                    <div className={css.firstColumn}>

                    <div className={css.inputBox}>    
                     <label htmlFor={nameFieldId} className={css.inputLable}>ПІБ</label>
                     <Field type='text' name='username' id={nameFieldId} className={css.input}  placeholder="Олегов"/>
                     <ErrorMessage name="username" component="span" className={css.errorMessage} />
                    </div>
                            
                    <div className={css.inputBox}>
                    <label htmlFor={phoneFieldId} className={css.inputLable}>Номер телефону</label>
                     <Field type='tel' name='phone' id={phoneFieldId} className={css.input} placeholder="Введіть свій номер телефону..."/>
                    <ErrorMessage name="phone" component="span" className={css.errorMessage} />
                    </div>

                    <div className={css.inputBox}>     
                    <label htmlFor={countryFieldId} className={css.inputLable}>Країна</label>
                    <Field as="select" name='country' id={countryFieldId} className={css.input}>
                        <option value="Ukraine">Україна</option>
                        <option value="UK">The UK</option>
                    </Field>
                    </div>
                    
                    <div className={css.inputBox}>
                     <label htmlFor={adressFieldId} className={css.inputLable}>Адреса</label>
                     <Field type='text' name='adress' id={adressFieldId} className={css.input}  placeholder="Вул. Програмістів, буд. 3"/>
                     <ErrorMessage name="adress" component="span" className={css.errorMessage} />
                    </div>
                            
                    <div className={css.inputBox}>
                    <label htmlFor={sectionFieldId}className={css.inputLable}>Розділ для завантаження під час входу</label>
                    <Field as="select" name='country' id={sectionFieldId} className={css.input}>
                        <option value="default">За замовченням</option>
                        <option value="v-c">Відеоконтроль</option>
                        <option value="crm">CRM</option>
                        <option value="carReport">Звіт по авто</option>
                        <option value="Settings">Налаштування</option>
                    </Field>
                    </div>
                            
                    </div>

                    <div className={css.secondColumn}>
                            
                    <div className={css.inputBox}>
                    <label htmlFor={timeZoneFieldId} className={css.inputLable}>Часовий пояс</label>
                    <Field as="select" name='timeZone' id={timeZoneFieldId} className={css.input}>
                        {/* <option value="default">За замовченням</option> */}
                        <option value="v-c">Відеоконтроль</option>
                        <option value="crm">CRM</option>
                        <option value="carReport">Звіт по авто</option>
                        <option value="Settings">Налаштування</option>
                    </Field>
                    </div>

                    <div className={css.inputBox}>
                    <label htmlFor={cityFieldId} className={css.inputLable}>Місто</label>
                     <Field type='text' name='city' id={cityFieldId} className={css.input}  placeholder="Харків"/>
                    <ErrorMessage name="city" component="span" className={css.errorMessage} />
                    </div>
                        
                    <div className={css.inputBox}>
                    <label htmlFor={indexFieldId} className={css.inputLable}>Індекс</label>
                     <Field type='text' name='index' id={indexFieldId} className={css.input}  placeholder="61000"/>
                     <ErrorMessage name="index" component="span" className={css.errorMessage} />
                    </div>
                            
                        </div>
                        
                    </div>

                    <div className={css.btnBox}>
                        <button type="button" className={css.cancelBtn} onClick={onClose}>Відміна</button>                       
                        <button type="submit" className={css.saveBtn} > <BsSdCardFill className={css.iconSave} /> Зберегти зміни</button>                       
                    </div>
                    
                    
                </Form>
            </Formik>

        </div>
    )
}