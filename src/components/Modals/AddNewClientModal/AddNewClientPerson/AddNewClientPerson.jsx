import { useState } from "react";
import css from "./AddNewClientPerson.module.css";
import { BsFillCameraFill } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { LiaTelegram } from "react-icons/lia";
import { BsCalendar2Week } from "react-icons/bs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import BtnsCloseAndSubmit from "../../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { AddClientPersonSchema } from "../../../../validationSchemas/addClientPersonSchema.js";

export default function AddNewClientPerson({ onClose }) {
  const [clientName, setClientName] = useState();
  const [avatar, setAvatar] = useState(null);
  const [isDateOpen, setDateOpen] = useState(false);

  const handleSubmit = (values, actions) => {
    const birthdayDate = values.birthday
      ? values.birthday.toLocaleDateString("en-CA")
      : null;

    const data = {
      ...values,
      birthday: birthdayDate,
    };
    console.log(data);
    actions.resetForm();
    onClose();
  };

  const downloadAvatar = (e) => {
    const newAvatar = e.target.files[0];
    setAvatar(URL.createObjectURL(newAvatar));
  };

  const handleDateButtonClick = () => setDateOpen((prev) => !prev);

  const initialValues = {
    name: clientName || "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    telegram: "",
    birthday: new Date(),
  };

  return (
    <div className={css.modal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={AddClientPersonSchema}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={css.headerWrapper}>
              <h3 className={css.header}>
                {clientName ? clientName : "ПІБ Клієнта"}
              </h3>
              <BsXLg className={css.closeIcon} onClick={onClose} />
            </div>
            <div className={css.avatarWrapper}>
              {avatar && (
                <img
                  src={avatar}
                  alt="User avatar"
                  className={css.avatarImage}
                />
              )}
              <div>
                <Field
                  type="file"
                  id="avatar"
                  name="avatar"
                  className={css.disabled}
                  onChange={downloadAvatar}
                />
                <label htmlFor="avatar" className={css.avatarLabel}>
                  <BsFillCameraFill className={css.camera} />
                  <p className={css.uploadAvatarText}>+ Додати аватар</p>
                </label>
              </div>
            </div>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <label htmlFor="name" className={css.label}>
                  ПІБ
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    type="text"
                    name="name"
                    className={css.input}
                    placeholder="Іваненко Іван Іванович"
                    onChange={(e) => setClientName(e.target.value)}
                    value={clientName}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.phonesWrapper}>
                <div className={css.inputWrapper}>
                  <label htmlFor="phoneNumber1" className={css.label}>
                    Телефон 1
                  </label>
                  <div className={css.fieldWithErrorWrapper}>
                    <Field
                      type="text"
                      name="phoneNumber1"
                      className={css.input}
                      placeholder="380671234567"
                    />
                    <ErrorMessage
                      name="phoneNumber1"
                      component="div"
                      className={css.errorMsg}
                    />
                  </div>
                </div>
                <div className={css.inputWrapper}>
                  <label htmlFor="phoneNumber2" className={css.label}>
                    Телефон 2
                  </label>
                  <div className={css.fieldWithErrorWrapper}>
                    <Field
                      type="text"
                      name="phoneNumber2"
                      className={css.input}
                      placeholder="380671234567"
                    />
                    <ErrorMessage
                      name="phoneNumber2"
                      component="div"
                      className={css.errorMsg}
                    />
                  </div>
                </div>
              </div>
              <div className={css.phonesWrapper}>
                <div className={css.inputWrapper}>
                  <label htmlFor="email" className={css.labelWithIcon}>
                    <BsEnvelope className={css.envelope} />
                    E-mail
                  </label>
                  <div className={css.fieldWithErrorWrapper}>
                    <Field
                      type="text"
                      name="email"
                      className={css.input}
                      placeholder="ivan.petrenko@gmail.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={css.errorMsg}
                    />
                  </div>
                </div>
                <div className={css.inputWrapper}>
                  <label htmlFor="telegram" className={css.labelWithIcon}>
                    <LiaTelegram className={css.envelope} />
                    Telegram
                  </label>
                  <div className={css.fieldWithErrorWrapper}>
                    <Field
                      type="text"
                      name="telegram"
                      className={css.input}
                      placeholder="ivan.petrenko"
                    />
                    <ErrorMessage
                      name="telegram"
                      component="div"
                      className={css.errorMsg}
                    />
                  </div>
                </div>
              </div>
              <div className={css.calendarWrapper}>
                <label className={css.label}>Дата народження</label>
                <div className={css.calendarBox}>
                  <DatePicker
                    id=""
                    className={`${css.input} ${css.calendar}`}
                    name="birthday"
                    dateFormat="dd.MM.yyyy"
                    selected={values.birthday}
                    onChange={(date) => setFieldValue("birthday", date)}
                    open={isDateOpen}
                    onClickOutside={() => setDateOpen(false)}
                    onSelect={() => setDateOpen(false)}
                    toggleCalendarOnIconClick
                    readOnly
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    locale="uk"
                  />

                  <BsCalendar2Week
                    size={24}
                    className={css.calendarIcon}
                    onClick={handleDateButtonClick}
                  />
                </div>
              </div>
            </div>
            <div className={css.btnWrapper}>
              <BtnsCloseAndSubmit
                onClose={onClose}
                btnSave={"Зберегти"}
                handleSubmit={handleSubmit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
