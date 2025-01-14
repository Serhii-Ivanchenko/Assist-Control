import { Field, Formik, Form, ErrorMessage } from "formik";
import css from "./NotificationModal.module.css";
import { BsAlarm } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsWatch } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import ConnectionSelect from "./ConnectionSelect/ConnectionSelect";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// import { useRef } from "react";
import "./NotificationModal.css";
import { useId } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { BsCurrencyDollar } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { useEffect, useRef } from "react";

import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";

registerLocale("uk", uk);

const connection = [
  {
    value: "call",
    label: "Передзвонити",
    icon: <BsFillTelephoneOutboundFill size={18} className={css.phoneIcon} />,
  },
  {
    value: "email",
    label: "Написати листа",
    icon: <BsEnvelope size={18} className={css.envelopeIcon} />,
  },
  {
    value: "tg",
    label: "Зв'язатись в Телеграм",
    icon: <PiTelegramLogoLight size={18} className={css.tgIcon} />,
  },
];

const services = [
  { value: "upsell", label: "Допродаж" },
  { value: "check", label: "Огляд після ремонту" },
  { value: "oilChange", label: "Заміна масла через {...}км" },
  { value: "review", label: "Сезонне ТО" },
  { value: "finishedRepair", label: "Закінчити ремонт" },
  { value: "specialOffers", label: "Акції" },
];

export default function NotificationModal({
  onClose,
  accountingModal,
  date,
  time,
  connectionType,
  comment,
  service,
  setNotificationSent,
  nextService,
}) {
  const [isDateOpen, setDateOpen] = useState(false);
  const [isTimeOpen, setTimeOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const focusRef = useRef(null);

  const handleDateButtonClick = () => setDateOpen((prev) => !prev);
  const handleTimeButtonClick = () => setTimeOpen((prev) => !prev);

  const Validation = Yup.object().shape({
    [connectionType]: Yup.string().required("Заповніть це поле"),
    [date]: Yup.string().required("Заповніть це поле"),
    [time]: Yup.string().required("Заповніть це поле"),
    [comment]: Yup.string().required("Заповніть це поле"),
  });

  //     const datepickerRef = useRef(null);
  //     const timepickerRef = useRef(null);

  //      const handleDateButtonClick = () => {
  //     if (datepickerRef.current && datepickerRef.current.setOpen) {
  //       datepickerRef.current.setOpen(true);
  //     }
  //     };

  //      const handleTimeButtonClick = () => {
  //     if (timepickerRef.current && timepickerRef.current.setOpen) {
  //       timepickerRef.current.setOpen(true);
  //     }
  //   };

  const initialValues = {
    [date]: new Date(),
    [connectionType]: "call",
    [time]: (() => {
      const date = new Date();
      date.setHours(9, 0, 0, 0);
      return date;
    })(),
    [comment]: "",
    ...(accountingModal && { [service]: "upsell" }),
    ...(accountingModal && { [nextService]: "" }),
  };

  const handleSubmit = (values, actions) => {
    const timeOnly = values[time]
      ? values[time].toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;
    const dateOnly = values[date]
      ? values[date].toLocaleDateString("en-CA")
      : null;
    const submittedValues = { ...values, [time]: timeOnly, [date]: dateOnly };

    if (setNotificationSent) {
      setNotificationSent(true);
    }

    console.log(submittedValues);
    actions.resetForm();
    onClose();
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditing && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isEditing]);

  const dateId = useId();
  const timeId = useId();
  const commentId = useId();

  return (
    <div className={css.notificationBox}>
      <BsXLg onClick={onClose} className={css.crossBtn} />
      <p className={css.title}>Обрати дату</p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Validation}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className={css.notifForm}>
            <div className={css.selectBox}>
              <Field
                as="select"
                name={connectionType}
                className={css.connectionSelect}
                component={ConnectionSelect}
                options={connection}
              />
              <ErrorMessage
                component="span"
                name={connection}
                className={css.errorMessage}
              />
            </div>

            {accountingModal && (
              <>
                <div>
                  <Field
                    as="select"
                    name={service}
                    component={ConnectionSelect}
                    options={services}
                    showDefaultIcon={true}
                    icon={
                      <BsCurrencyDollar size={18} className={css.phoneIcon} />
                    }
                  />
                </div>
                <div className={css.mileageBox}>
                  <div className={css.speedBox}>
                    <SlSpeedometer className={css.speedIcon} />
                    <p className={css.speedValue}>246014</p>
                  </div>

                  <div className={css.nextServiceContainer}>
                    <p>Наступне ТО :</p>
                    <div
                      className={css.nextServiceBox}
                      onClick={() => setIsEditing(true)}
                      ref={inputRef}
                    >
                      {/* <SlSpeedometer className={css.nextServiceIcon} /> */}
                      {isEditing ? (
                        <Field
                          innerRef={focusRef}
                          name={nextService}
                          value={values[nextService]}
                          className={css.nextServiceInput}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className={css.nextServiceValue}>
                          {values[nextService] || "0 km"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={css.dateAndTimeBox}>
              <div className={css.inputBox}>
                <label htmlFor={dateId} className={css.label}>
                  Дата
                </label>
                <div className={css.input}>
                  <DatePicker
                    id={dateId}
                    selected={values[date]}
                    onChange={(dateValue) => setFieldValue(date, dateValue)}
                    name={date}
                    className={`${css.date} ${css.dateDate}`}
                    dateFormat="dd/MM/yy"
                    minDate={new Date()}
                    // ref={datepickerRef}
                    // onKeyDown={(e) => e.preventDefault()}
                    open={isDateOpen}
                    onClickOutside={() => setDateOpen(false)}
                    onSelect={() => setDateOpen(false)}
                    toggleCalendarOnIconClick
                    readOnly
                    locale="uk"
                  />
                  <button
                    type="button"
                    className={css.dateBtn}
                    onClick={handleDateButtonClick}
                  >
                    <BsCalendar2Week className={css.iconBtn} size={18} />
                  </button>
                </div>
                <ErrorMessage
                  component="span"
                  name={date}
                  className={css.errorMessage}
                />
              </div>

              <div className={css.inputBox}>
                <label htmlFor={timeId} className={css.label}>
                  Час
                </label>

                <div className={css.input}>
                  <DatePicker
                    id={timeId}
                    name={time}
                    className={`${css.date} ${css.dateTime}`}
                    selected={values[time]}
                    onChange={(timeValue) => setFieldValue(time, timeValue)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeFormat="H:mm"
                    dateFormat="H:mm"
                    showTimeCaption={false}
                    // ref={timepickerRef}
                    // onKeyDown={(e) => e.preventDefault()}
                    open={isTimeOpen}
                    onClickOutside={() => setTimeOpen(false)}
                    onSelect={() => setTimeOpen(false)}
                    readOnly
                  />
                  <button
                    type="button"
                    className={css.dateBtn}
                    onClick={handleTimeButtonClick}
                  >
                    <BsWatch className={css.iconBtn} size={18} />
                  </button>
                </div>
                <ErrorMessage
                  component="span"
                  name={time}
                  className={css.errorMessage}
                />
              </div>
            </div>

            <div className={css.inputBox}>
              <label htmlFor={commentId} className={css.label}>
                Коментар
              </label>
              <Field
                as="textarea"
                name={comment}
                className={css.textarea}
                id={commentId}
              />
              <ErrorMessage
                component="span"
                name={comment}
                className={css.errorMessage}
              />
            </div>

            <div className={css.btnBox}>
              <button type="button" className={css.closeBtn} onClick={onClose}>
                Закрити
              </button>
              <button type="submit" className={css.createBtn}>
                <BsAlarm size={18} />
                Створити нагадування
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
