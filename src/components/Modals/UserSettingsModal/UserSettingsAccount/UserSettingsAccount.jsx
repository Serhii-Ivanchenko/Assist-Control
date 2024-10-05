import css from "./UserSettingsAccount.module.css";
import { Formik, Field, Form } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import { useId } from "react";

import * as Yup from "yup";
import { ErrorMessage } from "formik";

const initialValues = {
  company: '',
  languages:'ukr',
}

const Validation = Yup.object().shape({
  company: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),
  languages: Yup.string().oneOf(["ukr", "eng"]).required("Оберіть мову:)")
});
 


export default function UserSettingsAccount() {

const handleSubmit = (values) => {
		console.log(values);
		// actions.resetForm();
	};

  const companyFieldId = useId();
  const languagesFieldId = useId();




  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Validation}>
    <Form className={css.accountBox}>
      <label className={css.titles}>Пошта</label>
        <Field className={css.email} disabled value="autoassist@gmail.com" />
        <span className={css.warningMessage}>для зміни пошти зверніться у технічу підтримку</span>

      <label className={css.titles}>Пароль</label>
      <button className={css.passwortChBtn}>Змінити пароль</button>

      <label htmlFor={companyFieldId} className={css.titles}>Назва компанії</label>
        <Field type="text" name="company" className={css.inputs} id={companyFieldId} />
        <ErrorMessage name="company" component="span" className={css.errorMessage} />

        <label htmlFor={languagesFieldId} className={css.titles}>Мова</label>
        <div className={css.selectWrapper}>
      <Field as="select" name="languages" className={css.inputSelect} id={languagesFieldId}>
        <option value="ukr">
          Українська
        </option>
          <option value="eng">English</option>
      </Field>
          <IoIosArrowDown className={css.selectIcon} />
          <ErrorMessage name="languages" component="span" className={css.errorMessage} />
        </div>

      <div className={css.btnBox}>
        <button className={css.cancelBtn}>Відміна</button>
        <button className={css.saveBtn}>Зберегти зміни</button>
      </div>
      </Form>
    </Formik>
  );
}
