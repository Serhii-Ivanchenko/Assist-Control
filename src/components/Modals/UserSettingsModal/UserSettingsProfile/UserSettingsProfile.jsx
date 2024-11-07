import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./UserSettingsProfile.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { BsSdCardFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useRef, useState} from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import PhoneSelect from "./PhoneSelect/PhoneSelect";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import toast from "react-hot-toast";
import defaultAvatar from "../../../../assets/images/avatar_default.png";

import {
  updateUserAvatar,
  updateUserData,
} from "../../../../redux/auth/operations";
import { getUserData } from "../../../../redux/auth/operations";
import TimeZoneSelect from "./TimeZoneSelect/TimeZoneSelect";

const Validation = Yup.object().shape({
  username: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Поле повинно бути заповнене"),
  phone: Yup.string().min(3, "Занадто коротке").max(50, "Занадто довге").required("Поле повинно бути заповнене"),
  adress: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Поле повинно бути заповнене"),
  city: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге").required("Поле повинно бути заповнене"),
  index: Yup.number().positive("Використовуйте додатні числа").integer("Використовуйте цілі числа").required("Поле повинно бути заповнене"),
});

export default function UserSettingsProfile({ onClose }) {
  const fileInputRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const selectRef = useRef(null);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const userName = user.name || "";
  const userPhone = user.phone_number || "";
  const userDefaultPage = user.first_page || "";
  const userTimeZone = user.time_zone || "";
  const userPhoto = user?.avatar_url || defaultAvatar;
  const userCountry = user.country || "";
  const userCity = user.city || "";
  const userIndex = user.post_code || "";
  const userAddress = user.address || "";

  const [avatar, setAvatar] = useState(userPhoto);
  console.log("Current avatar URL:", avatar);

  const nameFieldId = useId();
  const phoneFieldId = useId();
  const countryFieldId = useId();
  const adressFieldId = useId();
  const sectionFieldId = useId();
  const timeZoneFieldId = useId();
  const cityFieldId = useId();
  const indexFieldId = useId();

  const initialValues = {
    username: userName,
    phone: userPhone,
    country: userCountry,
    adress: userAddress,
    section: userDefaultPage,
    timeZone: userTimeZone,
    city: userCity,
    index: userIndex,
  };

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);
      try {
        // const response =
        await dispatch(updateUserAvatar(file)).unwrap();
        // console.log(response);
        // setAvatar(response.avatar_url)
        // dispatch(getUserData());
        //       if (response.avatar_url) {
        //     setAvatar(response.avatar_url); // Update with the URL from the server response
        // }
        // console.log("Server response:", response);
        //  const newAvatarUrl = response.avatar_url;
        //  setAvatar(newAvatarUrl);

        // Отримання оновлених даних користувача

        toast.success("Аватар успішно оновлено :)", {
          position: "top-right",
          duration: 5000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      } catch (error) {
        setAvatar(userPhoto);
        console.error("Помилка при оновленні аватара", error);
        toast.error("Не вдалося оновити аватар :(", {
          position: "top-right",
          duration: 5000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      }
    }
  };

  // useEffect(() => {
  //   // Clean up the previous avatar URL when it changes or the component unmounts
  //   return () => {
  //     if (avatar) {
  //       URL.revokeObjectURL(avatar);
  //     }
  //   };
  // }, [avatar]);

  // const toggleDropdown = (index) => {
  //   setActiveDropdown(activeDropdown === index ? null : index);
  // };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  const handleSubmit = async (values, actions) => {
    console.log(values);

    const dataToUpdate = {};

    if (values.username !== user.name) {
      dataToUpdate.first_name = values.username ;
    }

      if (values.country !== user.country) {
        dataToUpdate.country = values.country ;
            }

    if ( values.phone !== user.phone_number) {
      dataToUpdate.phone_number = values.phone ;
    }

        if ( values.adress !== user.address) {
    dataToUpdate.address = values.adress ;
        }

    if (values.section !== user.first_page) {
      dataToUpdate.first_page = values.section ;
    }

    if ( values.timeZone !== user.time_zone) {
      dataToUpdate.time_zone = values.timeZone ;
    }

        if (values.city !== user.city) {
    dataToUpdate.city = values.city ;
        }

        if ( values.index !== user.post_code) {
          dataToUpdate.post_code = values.index;
    }

  //     // Заміна `null` або `undefined` на порожні рядки в `dataToUpdate`
  // Object.keys(dataToUpdate).forEach(
  //   (key) => (dataToUpdate[key] = dataToUpdate[key] ?? "")
  // );


    // Якщо немає змін, не відправляємо запит на сервер
    if (Object.keys(dataToUpdate).length === 0) {
      console.log("No changes to update");
      actions.setSubmitting(false);
      return;
    }

    console.log("Data to update:", dataToUpdate);

    try {
      console.log("Data to update before dispatch:", dataToUpdate);
      await dispatch(updateUserData(dataToUpdate)).unwrap();
      actions.resetForm({ values });
      dispatch(getUserData());
      toast.success("Дані успішно збережено :)", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
    } catch (error) {
      console.error("Error updating user data:", error);
       toast.error("Не вдалося оновити дані :(", {
          position: "top-right",
          duration: 5000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
    } finally {
      actions.setSubmitting(false); // Завжди виконується
    }
  };

  return (
    <div className={css.contentBox} ref={selectRef} onBlur={handleBlur}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Validation}
      >
        {/* {({ setFieldValue }) => ( */}
        <Form className={css.formBox}>
          <div className={css.addPhotoBox}>
            <div className={css.photoBox}>
              <img
                src={avatar}
                alt="User's avatar"
                className={css.photo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
              />
            </div>
            <input
              type="file"
              name="photo"
              className={css.photoField}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className={css.changePhotoBtn}
              onClick={handleChangePhoto}
            >
              {" "}
              <HiPlus className={css.btnPlus} />
              Змінити аватар
            </button>
          </div>

          <div className={css.inputBox}>
            <label htmlFor={nameFieldId} className={css.inputLable}>
              ПІБ
            </label>
            <Field
              type="text"
              name="username"
              id={nameFieldId}
              className={`${css.input} ${css.inputName}`}
              placeholder="Олегов"
            />
            <ErrorMessage
              name="username"
              component="span"
              className={`${css.errorMessage} ${css.errorMessageName}`}
            />
          </div>

          <div className={css.inputs}>
            <div className={css.firstColumn}>
              <div className={css.inputBox}>
                <label htmlFor={phoneFieldId} className={css.inputLable}>
                  Телефон
                </label>
                <Field
                  type="tel"
                  name="phone"
                  id={phoneFieldId}
                  className={css.input}
                  component={PhoneSelect}
                  placeholder="Введіть свій номер телефону..."
                />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.inputBox}>
                <label htmlFor={countryFieldId} className={css.inputLable}>
                  Країна
                </label>
                <Field
                  as="select"
                  name="country"
                  id={countryFieldId}
                  className={`${css.input} ${css.inputSelect}`}
                  // onClick={() => toggleDropdown(0)}
                >
                  <option value="Ukraine">Україна</option>
                  <option value="UK">The UK</option>
                </Field>
                <BsFillCaretDownFill
                  className={`${css.btnArrowSelect} ${
                    activeDropdown === 0 ? css.rotated : ""
                  }`}
                />
              </div>

              <div className={css.inputBox}>
                <label htmlFor={adressFieldId} className={css.inputLable}>
                  Адреса
                </label>
                <Field
                  type="text"
                  name="adress"
                  id={adressFieldId}
                  className={css.input}
                  placeholder="Вул. Програмістів, буд. 3"
                />
                <ErrorMessage
                  name="adress"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.inputBox}>
                <label htmlFor={sectionFieldId} className={css.inputLable}>
                  Розділ для завантаження під час входу
                </label>
                <Field
                  as="select"
                  name="section"
                  id={sectionFieldId}
                  className={`${css.input} ${css.inputSelect}`}
                  // onClick={() => toggleDropdown(1)}
                >
                  <option value="default">За замовченням</option>
                  <option value="v-c">Відеоконтроль</option>
                  <option value="crm">CRM</option>
                  <option value="carReport">Звіт по авто</option>
                  <option value="Settings">Налаштування</option>
                </Field>
                <BsFillCaretDownFill
                  className={`${css.btnArrowSelect} ${
                    activeDropdown === 1 ? css.rotated : ""
                  }`}
                />
              </div>
            </div>

            <div className={css.secondColumn}>
              <div className={css.inputBox}>
                <label htmlFor={timeZoneFieldId} className={css.inputLable}>
                  Часовий пояс
                </label>
                <Field
                  as="select"
                  name="timeZone"
                  id={timeZoneFieldId}
                  className={`${css.input} ${css.inputSelect}`}
                  // onClick={() => toggleDropdown(2)}
                  component={TimeZoneSelect}
                />
                {/* <option value="default">За замовченням</option> *
                  {/* <option value="Europe/Kyiv">(UTC +03:00) Київ</option>
                  <option value="Europe/London">(GTM +01:00) London</option> 
                   </Field> */}

                <BsFillCaretDownFill
                  className={`${css.btnArrowSelect} ${
                    activeDropdown === 2 ? css.rotated : ""
                  }`}
                />
              </div>

              <div className={css.inputBox}>
                <label htmlFor={cityFieldId} className={css.inputLable}>
                  Місто
                </label>
                <Field
                  type="text"
                  name="city"
                  id={cityFieldId}
                  className={css.input}
                  placeholder="Харків"
                />
                <ErrorMessage
                  name="city"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.inputBox}>
                <label htmlFor={indexFieldId} className={css.inputLable}>
                  Індекс
                </label>
                <Field
                  type="text"
                  name="index"
                  id={indexFieldId}
                  className={css.input}
                  placeholder="61000"
                />
                <ErrorMessage
                  name="index"
                  component="span"
                  className={css.errorMessage}
                />
              </div>
            </div>
          </div>

          <div className={css.btnBox}>
            <button type="button" className={css.cancelBtn} onClick={onClose}>
              Відміна
            </button>
            <button type="submit" className={css.saveBtn}>
              {" "}
              <BsSdCardFill className={css.iconSave} /> Зберегти зміни
            </button>
          </div>
        </Form>
        {/* )} */}
      </Formik>
    </div>
  );
}
