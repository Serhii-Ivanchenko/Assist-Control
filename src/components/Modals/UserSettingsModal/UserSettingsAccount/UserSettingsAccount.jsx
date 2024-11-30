import css from "./UserSettingsAccount.module.css";
import { Formik, Field, Form } from "formik";
import { useId } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { useState } from "react";
import CustomSelect from "../UserSettingsProfile/CustomSelect/CustomSelect.jsx";
import { BsFillKeyFill } from "react-icons/bs";
import { BsSdCardFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import { updateUserData } from "../../../../redux/auth/operations";
import { getUserData } from "../../../../redux/auth/operations";
import Modal from "../../Modal/Modal";
import ChangePasswordModal from "../UserSettingsProfile/ChangePasswordModal/ChangePasswordModal.jsx";
import toast from "react-hot-toast";
import CurrencySelect from "../UserSettingsProfile/CurrencySelect/CurrencySelect.jsx";
// import { useEffect } from "react";

const Validation = Yup.object().shape({
  company: Yup.string().min(2, "Занадто коротке").max(30, "Занадто довге"),
  languages: Yup.string().oneOf(["ukr", "eng"]).required("Оберіть мову:)"),
});

export default function UserSettingsAccount({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => {
    console.log("Opening modal");
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  //   const state = useSelector((state) => state); // Виводить увесь стан
  // console.log("Redux State:", state);

  const user = useSelector(selectUser);
  console.log("data", user);
  const userEmail = user.email || "";
  const userCompany = user.company_name || "";
  const userLanguage = user.language;
  const userCurrency = user.currency;

  const initialValues = {
    company: userCompany,
    languages: userLanguage || "ukr",
    currency: userCurrency || "UAH",
  };

  const handleSubmit = async (values, actions) => {
    const dataToUpdate = {};

    if (values.company !== user.company_name) {
      dataToUpdate.company_name = values.company;
    }

    if (values.languages !== user.language) {
      dataToUpdate.language = values.languages;
    }

    if (values.currency !== user.currency) {
      dataToUpdate.currency = values.currency;
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
    } finally {
      actions.setSubmitting(false); // Завжди виконується
    }

    // actions.resetForm();
    // dispatch(updateUserData(values)).unwrap();
    // actions.setSubmitting(false);
  };

  const companyFieldId = useId();
  const languagesFieldId = useId();
  const currencyFieldId = useId();

  const handleToggleClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Validation}
    >
      <Form className={css.accountBox}>
        <div className={css.emailBox}>
          <label className={css.titles}>Пошта</label>

          <Field
            className={css.email}
            name="email"
            value={userEmail}
            onClick={handleToggleClick}
            readOnly
          />

          {isVisible && (
            <span className={css.warningMessage}>
              для зміни пошти зверніться у технічну підтримку
            </span>
          )}
        </div>

        <div className={css.passwordBox}>
          <label className={css.titles}>Пароль</label>
          <button
            className={css.passwortChBtn}
            type="button"
            onClick={openModal}
          >
            {" "}
            <BsFillKeyFill className={css.iconKey} /> Змінити пароль
          </button>
          {modalIsOpen && (
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
              <ChangePasswordModal onClose={handleModalClose} />
            </Modal>
          )}
        </div>

        <div className={css.companyBox}>
          <label htmlFor={companyFieldId} className={css.titles}>
            Назва компанії
          </label>
          <Field
            type="text"
            name="company"
            className={css.input}
            id={companyFieldId}
            placeholder="Avtoatmosfera"
          />
          <ErrorMessage
            name="company"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <div className={css.languageBox}>
          <label htmlFor={languagesFieldId} className={css.titles}>
            Мова
          </label>
          <Field
            name="languages"
            id={languagesFieldId}
            component={CustomSelect}
          />
        </div>
        {/* <ErrorMessage name="languages" component="span" className={css.errorMessage} /> */}

        <div className={css.currencyBox}>
          <label htmlFor={currencyFieldId} className={css.titles}>
            Валюта
          </label>
          <Field
            name="currency"
            id={currencyFieldId}
            component={CurrencySelect}
          />
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
    </Formik>
  );
}
