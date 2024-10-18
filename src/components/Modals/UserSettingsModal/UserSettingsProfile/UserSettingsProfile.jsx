import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./UserSettingsProfile.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { BsSdCardFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import PhoneSelect from "./PhoneSelect/PhoneSelect";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import toast from "react-hot-toast";
import { updateUserAvatar, updateUserData } from "../../../../redux/auth/operations";
import { getUserData } from "../../../../redux/auth/operations";




const Validation = Yup.object().shape({
    username: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),
    phone: Yup.string().min(3, "Занадто коротке").max(50, "Занадто довге"),
    adress: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),
    city: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),
    index: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),

});

export default function UserSettingsProfile({ onClose }) {
    const fileInputRef = useRef(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector(selectUser)
    const userName = user.name || "";
    const userPhone = user.phone_number || "";
    const userDefaultPage = user.first_page || "";
    const userTimeZone = user.timeZone || "";
    const userPhoto = user.avatar_url || "";


        const [avatar, setAvatar] = useState(null)



    const nameFieldId = useId();
    const phoneFieldId = useId();
    const countryFieldId = useId();
    const adressFieldId = useId();
    const sectionFieldId = useId();
    const timeZoneFieldId = useId();
    const cityFieldId = useId();
    const indexFieldId = useId();



    const initialValues = {
        photo: userPhoto,
        username: userName,
        phone: userPhone,
        country: "Ukraine",
        adress: "",
        section: userDefaultPage,
        timeZome: userTimeZone,
        city: "",
        index: "", 
    }

    const handleChangePhoto = () => {      

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

     const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue("photo", URL.createObjectURL(file));
            setAvatar( URL.createObjectURL(file));
            dispatch(updateUserAvatar(file)).unwrap()
         }
         
    };

    const toggleDropdown = (index) => {
      setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleSubmit = async (values, actions) => {
    const dataToUpdate = {};

  if (values.name !== user.name) {
    dataToUpdate.name = values.name;
  }

  if (values.country !== 'Ukraine') {
    dataToUpdate.country = values.country;
  }

  // Якщо немає змін, не відправляємо запит на сервер
  if (Object.keys(dataToUpdate).length === 0) {
    console.log("No changes to update");
    actions.setSubmitting(false);
    return;
    }
    
    console.log("Data to update:", dataToUpdate);

    try {
      await dispatch(updateUserData(dataToUpdate)).unwrap();
      actions.resetForm({ values });
      dispatch(getUserData());
      toast.success(
      "Дані успішно збережено :)",
{
            position: "top-right",
            duration: 5000,
            style: {
              background: "#242525",
              color: "#FFFFFF",
            },
          }
      )
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      actions.setSubmitting(false); // Завжди виконується
    }  
    }


    return (
        <div className={css.contentBox}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Validation}>
                {({ setFieldValue }) => (
                    <Form className={css.formBox}>

                        <div className={css.addPhotoBox} >
                            <div className={css.photoBox}>
                                <img src={avatar} alt="User's avatar" className={css.photo} />
                            </div>
                            <input type='file' name='photo' className={css.photoField}
                                ref={fileInputRef}
                            onChange={(event) => handleFileChange(event, setFieldValue)}
                            />
                            <button type="button" className={css.changePhotoBtn} onClick={handleChangePhoto}> <HiPlus className={css.btnPlus} />Змінити аватар</button>
                        </div>
                
                    

                        <div className={css.inputBox}>
                            <label htmlFor={nameFieldId} className={css.inputLable}>ПІБ</label>
                            <Field type='text' name='username' id={nameFieldId} className={`${css.input} ${css.inputName}`} placeholder="Олегов" />
                            <ErrorMessage name="username" component="span" className={css.errorMessage} />
                        </div>
                    
                        <div className={css.inputs}>
                            <div className={css.firstColumn}>
                                <div className={css.inputBox}>
                                    <label htmlFor={phoneFieldId} className={css.inputLable}>Телефон</label>
                                    <Field type='tel' name='phone' id={phoneFieldId} className={css.input} component={PhoneSelect} placeholder="Введіть свій номер телефону..." />
                                    <ErrorMessage name="phone" component="span" className={css.errorMessage} />
                                </div>

                                <div className={css.inputBox}>
                                    <label htmlFor={countryFieldId} className={css.inputLable}>Країна</label>
                                    <Field as="select" name='country' id={countryFieldId} className={`${css.input} ${css.inputSelect}`} onClick={() => toggleDropdown(0)}>
                                        <option value="Ukraine">Україна</option>
                                        <option value="UK">The UK</option>
                                    </Field>
                                    <BsChevronDown className={`${css.btnArrowSelect} ${activeDropdown === 0 ? css.rotated : ''}`} />
                                </div>
                    
                                <div className={css.inputBox}>
                                    <label htmlFor={adressFieldId} className={css.inputLable}>Адреса</label>
                                    <Field type='text' name='adress' id={adressFieldId} className={css.input} placeholder="Вул. Програмістів, буд. 3" />
                                    <ErrorMessage name="adress" component="span" className={css.errorMessage} />
                                </div>
                            
                                <div className={css.inputBox}>
                                    <label htmlFor={sectionFieldId} className={css.inputLable}>Розділ для завантаження під час входу</label>
                                    <Field as="select" name='section' id={sectionFieldId} className={`${css.input} ${css.inputSelect}`} onClick={() => toggleDropdown(1)}>
                                        <option value="default">За замовченням</option>
                                        <option value="v-c">Відеоконтроль</option>
                                        <option value="crm">CRM</option>
                                        <option value="carReport">Звіт по авто</option>
                                        <option value="Settings">Налаштування</option>
                                    </Field>
                                    <BsChevronDown className={`${css.btnArrowSelect} ${activeDropdown === 1 ? css.rotated : ''}`} />
                                </div>
                            
                            </div>

                            <div className={css.secondColumn}>
                            
                                <div className={css.inputBox}>
                                    <label htmlFor={timeZoneFieldId} className={css.inputLable}>Часовий пояс</label>
                                    <Field as="select" name='timeZone' id={timeZoneFieldId} className={`${css.input} ${css.inputSelect}`} onClick={() => toggleDropdown(2)}>
                                        {/* <option value="default">За замовченням</option> */}
                                        <option value="kyiv">(UTC +03:00) Київ</option>
                                        <option value="london">(GTM +01:00) London</option>
                                    </Field>
                                    <BsChevronDown className={`${css.btnArrowSelect} ${activeDropdown === 2 ? css.rotated : ''}`} />
                                </div>

                                <div className={css.inputBox}>
                                    <label htmlFor={cityFieldId} className={css.inputLable}>Місто</label>
                                    <Field type='text' name='city' id={cityFieldId} className={css.input} placeholder="Харків" />
                                    <ErrorMessage name="city" component="span" className={css.errorMessage} />
                                </div>
                        
                                <div className={css.inputBox}>
                                    <label htmlFor={indexFieldId} className={css.inputLable}>Індекс</label>
                                    <Field type='text' name='index' id={indexFieldId} className={css.input} placeholder="61000" />
                                    <ErrorMessage name="index" component="span" className={css.errorMessage} />
                                </div>
                            
                            </div>
                        
                        </div>

                        <div className={css.btnBox}>
                            <button type="button" className={css.cancelBtn} onClick={onClose}>Відміна</button>
                            <button type="submit" className={css.saveBtn} > <BsSdCardFill className={css.iconSave} /> Зберегти зміни</button>
                        </div>
                    
                    
                    </Form>
                )}
            </Formik>

        </div>
    )
}