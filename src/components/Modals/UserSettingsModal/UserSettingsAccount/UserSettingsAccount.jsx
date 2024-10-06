import css from "./UserSettingsAccount.module.css";
import { Formik, Field, Form } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import { useId } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
// import { useField } from "formik";
// import Select from "react-select"
import { useState } from "react";

const languages = [
  { value: "ukr", label: "Українська", flag: "fi-ua" },
  { value: "eng", label: "English", flag: "fi-gb" },
];

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     boxShadow: 'none',
//     borderColor: '#302F2F',
//     backgroundColor: '#282828',
//     '&:hover': {
//       borderColor: '#302F2F',
//       backgroundColor: '#282828'
//     },
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected ? '#f0f0f0' : '#fff',
//     color: state.isSelected ? '#000' : '#333',
//     padding: '10px',
//     display: 'flex',
//     alignItems: 'center', // Щоб прапорці вирівнювались з текстом
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     display: 'flex',
//     alignItems: 'center', // Вирівнювання для вибраної опції
//     color: '#333',
//   }),
// };

// const FormikSelect = ({ label, options, name }) => {
//   const [field, , helpers] = useField(name);
//   const { value } = field;
//   const { setValue } = helpers;

//   const handleChange = (selectedOption) => {
//     setValue(selectedOption.value);
//   };

//   return (
//     <div>
//       <label className={css.titles}>{label}</label>
//       <Select 
//         styles={css.inputSelect}
//         options={options}
//         value={options.find(option => option.value === value)}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

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

      <label className={css.titles}>Пароль</label>
      <button className={css.passwortChBtn}>Змінити пароль</button>

      <label htmlFor={companyFieldId} className={css.titles}>Назва компанії</label>
        <Field type="text" name="company" className={css.inputs} id={companyFieldId} />
        <ErrorMessage name="company" component="span" className={css.errorMessage} />


        {/* <FormikSelect
          
            name="languages"
            label="Мова"
            options={languages}
          /> */}

        <label htmlFor={languagesFieldId} className={css.titles}>Мова</label>

        <div className={css.selectWrapper}>

      <Field as="select" name="languages" className={css.inputSelect} id={languagesFieldId}>
           {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                <span className={`fi ${lang.flag}`}></span> {lang.label}
              </option>
            ))}
          </Field>
          
          <IoIosArrowDown className={css.selectIcon} />
          <ErrorMessage name="languages" component="span" className={css.errorMessage} />
        </div>

      <div className={css.btnBox}>
        <button type="button" className={css.cancelBtn}>Відміна</button>
        <button type="submit" className={css.saveBtn}>Зберегти зміни</button>
      </div>
      </Form>
    </Formik>
  );
}
