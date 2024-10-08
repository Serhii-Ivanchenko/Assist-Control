import css from "./UserSettingsAccount.module.css";
import { Formik, Field, Form } from "formik";
import { useId } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { useState } from "react";
import CustomSelect from "./CustomSelect/CustomSelect";
import { BsFillKeyFill } from "react-icons/bs";
import { BsSdCardFill } from "react-icons/bs";


const initialValues = {
  company: '',
  languages:'ukr',
}

const Validation = Yup.object().shape({
  company: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),
  languages: Yup.string().oneOf(["ukr", "eng"]).required("Оберіть мову:)")
});
 


export default function UserSettingsAccount() {
const [isVisible, setIsVisible] = useState(false)


const handleSubmit = (values) => {
		console.log(values);
		// actions.resetForm();
	};

  const companyFieldId = useId();
  const languagesFieldId = useId();



  const handleToggleClick = () => {
    setIsVisible((prev) => !prev);
  }
  
  


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Validation}>
      <Form className={css.accountBox}>


        <div className={css.emailBox}>
        <label className={css.titles}>Пошта</label>

            <Field className={css.email}  value="autoassist@gmail.com" onClick={handleToggleClick} readOnly/>

        {isVisible && (<span className={css.warningMessage}>для зміни пошти зверніться у технічу підтримку</span>)}
        </div>

        <div className={css.passwordBox}>
      <label className={css.titles}>Пароль</label>
          <button className={css.passwortChBtn} type="button"> <BsFillKeyFill /> Змінити пароль</button>
        </div>

          <div className={css.companyBox}>
      <label htmlFor={companyFieldId} className={css.titles}>Назва компанії</label>
        <Field type="text" name="company" className={css.input} id={companyFieldId} placeholder="Введіть назву компанії..."/>
        <ErrorMessage name="company" component="span" className={css.errorMessage} />
        </div>

        <div className={css.languageBox}>
        <label htmlFor={languagesFieldId} className={css.titles}>Мова</label>
          <Field name="languages" id={languagesFieldId} component={CustomSelect} />
        </div>
          {/* <ErrorMessage name="languages" component="span" className={css.errorMessage} /> */}


      <div className={css.btnBox}>
        <button type="button" className={css.cancelBtn}>Відміна</button>
        <button type="submit" className={css.saveBtn}> <BsSdCardFill /> Зберегти зміни</button>
      </div>
      </Form>
    </Formik>
  );
}
