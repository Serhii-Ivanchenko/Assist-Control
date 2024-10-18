import UserSettingsSidebar from "./UserSettingsSidebar/UserSettingsSidebar";
import css from './UserSettingsModal.module.css'
import UserSettingAccount from "./UserSettingsAccount/UserSettingsAccount";
import { TfiClose } from "react-icons/tfi";
import UserSettingsTeam from "./UserSettingsTeam/UserSettingsTeam";
import MobileMenu from "./MobileMenu/MobileMenu";
import { useState } from "react";
import UserSettingsProfile from "./UserSettingsProfile/UserSettingsProfile";
import UserSettingsTariff from "./UserSettingsTariff/UserSettingsTariff";
// import { useEffect} from "react";
// import { getUserData } from "../../../redux/auth/operations";
// import { useDispatch } from "react-redux";

export default function UserSettingsModal({onClose}) {
  const [page, setPage] = useState("profile")
  const [mobMenu, setMobmenu] = useState(false)
  // const dispatch = useDispatch()
  
  const openMobMenu = () => {
    setMobmenu(true)
  }

  const closeMobMenu = () => {
    setMobmenu(false)
  }

  
  //  useEffect(() => {
  //   dispatch(getUserData());
  // }, [dispatch]);
  


    return (
        <div className={css.settingsBox}>
             <TfiClose onClick={onClose} className={css.closeBtn} />
        <UserSettingsSidebar setPage={setPage} page={page} onOpen={openMobMenu} onClose={onClose} />
        {mobMenu && <MobileMenu setPage={setPage} page={page} onClose={closeMobMenu} />}
          {page === "profile" && <UserSettingsProfile onClose={onClose}/>}
          {page === "account" && <UserSettingAccount onClose={onClose}/>}
          {page === "tariff" && <UserSettingsTariff onClose={onClose}/>}
          {page === "team" && <UserSettingsTeam />}
                        
        </div>
    )
}





















// import { Field, Form, Formik } from "formik";
// import { useId } from "react";
// import * as Yup from "yup";
// import { ErrorMessage } from "formik";
// import css from './UserSettingsModal.module.css'
// import { useState } from "react";

// const Validation = Yup.object().shape({
//     username: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Обов'язкове поле для заповнення"),
//     email: Yup.string().email("Введіть коректну пошту").required("Обов'язкове поле для заповнення")
//         .test('has-domain', 'Email має містити домен', (value) =>
//     {
//       return value && value.includes('@') && value.split('@')[1].includes('.');
//     }),
//     phone: Yup.string().min(3, "Занадто коротке").max(50, "Занадто довге").required("Обов'язкове поле для заповнення"),
//     company: Yup.string().min(2).max(50).required("Обов'язкове поле для заповнення")
// });
    
// const initialValues = {
//     username: '',
//     email: '',
//     phone: '',
//     company:''
// }

// export default function UserSettingsModal() {

//      const [avatar, setAvatar] = useState('src/assets/modalicon/Ellipse 4- icon.png');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAvatar(URL.createObjectURL(file)); 
//     }
//   };

//     const handleSubmit = (values, actions) => {
//         console.log(values);
// 		actions.resetForm();
//     }

//     const nameFieldId = useId();
//     const emailFieldId = useId();
//     const phoneFieldId = useId();
//     const companyFieldId = useId();

//     return (
//         <div>
           
//         <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Validation}>
//                 <Form className={css.formBox}>

//                 <div className={css.photoBox}>
//                 <img src={avatar} alt="User's avatar" className={css.photo} />
//                     </div>  
//                     <Field type='file' name='photo' className={css.photoField} onChange={handleFileChange} />
                    
//                 <label htmlFor={nameFieldId}>Ім&apos;я</label>
//                     <Field type='text' name='username' id={nameFieldId} className={css.input}  placeholder="Введіть своє ім'я..."/>
//                     <ErrorMessage name="username" component="span" className={css.errorMessage} />
                    
//                 <label htmlFor={emailFieldId}>Пошта</label>
//                     <Field type='email' name='email' id={emailFieldId} className={css.input} placeholder="Введіть свою пошту..."/>
//                     <ErrorMessage name="email" component="span" className={css.errorMessage}/>
                    
//                 <label htmlFor={phoneFieldId}>Номер телефону</label>
//                     <Field type='tel' name='phone' id={phoneFieldId} className={css.input} placeholder="Введіть свій номер телефону..."/>
//                     <ErrorMessage name="phone" component="span" className={css.errorMessage}/>
                    
//                 <label htmlFor={companyFieldId}>Назва компанії</label>
//                     <Field type='text' name='company' id={companyFieldId} className={css.input} placeholder="Введіть назву компанії..."/>
//                     <ErrorMessage name="company" component="span" className={css.errorMessage} />
                    
//                     <div className={css.planBox}>
//                         <p className={css.currentPlan}>Поточний тарифний план</p>
//                         <button type="button" className={css.PremiumPlan}>Преміум</button>
//                     </div>

//                     <div className={css.btnBox}>
//                         <button type="submit" className={css.btnSave}>Зберегти</button>
//                         <button type="button" className={css.btnCancel}>Відміна</button>
//                     </div>
//             </Form>
//             </Formik>
//         </div>
//     )
// }