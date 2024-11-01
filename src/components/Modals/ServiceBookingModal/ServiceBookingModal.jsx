import css from "../ServiceBookingModal/ServiceBookingModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import clsx from "clsx";
import { ServiceBookingSchema } from "../../../validationSchemas/ServiceBookingSchema.js";
import { services } from "../../Modals/ServiceBookingModal/constants.js";
import { posts } from "../../Modals/ServiceBookingModal/constants.js";
import { mechanics } from "../../Modals/ServiceBookingModal/constants.js";
import { timeToChoose } from "../../Modals/ServiceBookingModal/constants.js";
import { BsFillCameraFill } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import SelectDate from "./SelectDate/SelectDate";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createRecord } from "../../../redux/cars/operations.js";
import toast from "react-hot-toast";

export default function ServiceBookingModal({ onClose }) {
  const dispatch = useDispatch();

  const [chosenTime, setChosenTime] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownPostOpen, setIsDropdownPostOpen] = useState(false);
  const [isDropdownMechanicOpen, setIsDropdownMechanicOpen] = useState(false);
  const selectRef = useRef(null);

  const onTimeBtnClick = (item) => {
    if (!item.isFree) return;

    console.log(item.time);
    setChosenTime((prevChosenButtons) =>
      prevChosenButtons.includes(item.time)
        ? prevChosenButtons.filter((i) => i !== item.time)
        : [...prevChosenButtons, item.time]
    );
  };

  const toggleDropdown = (status, changeStatus) => {
    changeStatus(!status);
  };

  const handlePostBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownPostOpen(false);
    }
  };
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };
  const handleMechanicBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownMechanicOpen(false);
    }
  };

  const currentDate = new Date(Date.now());
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const [pickedDate, setPickedDate] = useState(formattedDate);

  const setNewDate = (date) => {
    setPickedDate(date);
  };

  const dateToPass = new Date(pickedDate.split(".").reverse().join("-"))
    .toISOString()
    .split("T")[0];

  const startHour = chosenTime[0];
  const finishHour = chosenTime[chosenTime.length - 1];

  const handleSubmit = (values, actions) => {
    const recordData = {
      ...values,
      service_id: values.service_id ? Number(values.service_id) : null,
      prepayment: values.prepayment ? Number(values.prepayment) : null,
      position: values.position ? Number(values.position) : null,
      appointment_date: dateToPass,
      hours_from: startHour,
      hours_to: finishHour,
      mechanic_id: 0,
    };

    dispatch(createRecord(recordData))
      .unwrap()
      .then(() => {
        toast.success("Запис успішно створено");
      })
      .catch(() => {
        toast.error("Щось пішло не так. Спробуйте ще раз!");
      });
    setChosenTime([]);
    actions.resetForm();
    onClose();
  };

  return (
    <div className={css.serviceBookingModal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <h3 className={css.header}>Створення запису на {pickedDate}</h3>
      <Formik
        initialValues={{
          car_number: "",
          vin: "",
          service: "",
          prepayment: "",
          phone_number: "",
          position: "",
          mechanic: "",
          make_model: "",
          note: "",
          name: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={ServiceBookingSchema}
        validateOnChange={true}
        validateOnBlur
      >
        {({ values }) => (
          <Form className={css.form}>
            <div className={css.rightSectionWrapper}>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="car_number"
                  placeholder="AX 2945 OP"
                />
                <ErrorMessage
                  name="car_number"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="vin"
                  placeholder="VIN"
                />
                <ErrorMessage
                  name="vin"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.wrapper}>
                <div
                  className={css.inputWrapper}
                  ref={selectRef}
                  onBlur={handleBlur}
                >
                  <Field
                    as="select"
                    className={
                      values.service === ""
                        ? `${css.placeholder}`
                        : `${css.inputSelect}`
                    }
                    type="text"
                    name="service"
                    onClick={() =>
                      toggleDropdown(isDropdownOpen, setIsDropdownOpen)
                    }
                  >
                    <option value="" disabled hidden>
                      Послуга
                    </option>
                    {services.map((service, index) => {
                      return (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      );
                    })}
                  </Field>
                  <BsFillCaretDownFill
                    className={`${css.btnArrowSelect} ${
                      isDropdownOpen ? css.rotated : ""
                    }`}
                  />
                  <ErrorMessage
                    name="service"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
                <div className={css.inputWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="prepayment"
                    placeholder="Передплата"
                  />
                  <ErrorMessage
                    name="prepayment"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="phone_number"
                  placeholder="Телефон"
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.bottomRightSectionWrapper}>
                <div
                  className={css.inputWrapper}
                  ref={selectRef}
                  onBlur={handlePostBlur}
                >
                  <Field
                    as="select"
                    className={
                      values.position === ""
                        ? `${css.placeholder}`
                        : `${css.inputSelect}`
                    }
                    type="text"
                    name="position"
                    onClick={() =>
                      toggleDropdown(isDropdownPostOpen, setIsDropdownPostOpen)
                    }
                  >
                    <option value="" disabled hidden>
                      ПОСТ
                    </option>
                    {posts.map((position, index) => {
                      return (
                        <option key={index} value={position}>
                          {position}
                        </option>
                      );
                    })}
                  </Field>
                  <BsFillCaretDownFill
                    className={`${css.btnArrowSelect} ${
                      isDropdownPostOpen ? css.rotated : ""
                    }`}
                  />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
                <div
                  className={css.inputWrapper}
                  ref={selectRef}
                  onBlur={handleMechanicBlur}
                >
                  <Field
                    as="select"
                    className={
                      values.mechanic === ""
                        ? `${css.placeholder}`
                        : `${css.inputSelect}`
                    }
                    type="text"
                    name="mechanic"
                    onClick={() =>
                      toggleDropdown(
                        isDropdownMechanicOpen,
                        setIsDropdownMechanicOpen
                      )
                    }
                  >
                    <option value="" disabled hidden>
                      Оберіть механіка
                    </option>
                    {mechanics.map((mechanic, index) => {
                      return (
                        <option key={index} value={mechanic}>
                          {mechanic}
                        </option>
                      );
                    })}
                  </Field>
                  <BsFillCaretDownFill
                    className={`${css.btnArrowSelect} ${
                      isDropdownMechanicOpen ? css.rotated : ""
                    }`}
                  />
                  <ErrorMessage
                    name="mechanic"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.leftSectionWrapper}>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="make_model"
                  placeholder="Марка і модель автомобіля"
                />
                <ErrorMessage
                  name="make_model"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.addFileWrapper}>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className={css.inputFile}
                />
                <BsFillCameraFill className={css.iconCamera} />
                <label htmlFor="file" className={css.label}>
                  + Додати фото техпаспорта
                </label>
              </div>
              <Field
                as="textarea"
                name="note"
                className={css.textArea}
                placeholder="Примітка"
              />
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  placeholder="ПІБ"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.calendar}>
                <SelectDate newDate={setNewDate} />
                <div className={css.timeWrapper}>
                  {timeToChoose.map((item, index) => {
                    return (
                      <button
                        type="button"
                        className={clsx(
                          css.timeBtn,
                          item.isFree ? css.timeBtnFree : css.timeBtnDisabled,
                          chosenTime.includes(item.time) && css.timeBtnChosen
                        )}
                        key={index}
                        onClick={() => {
                          onTimeBtnClick(item);
                        }}
                        disabled={!item.isFree}
                      >
                        {item.time}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={css.btnWrapper}>
                <button
                  type="button"
                  className={css.closeBtn}
                  onClick={onClose}
                >
                  Закрити
                </button>
                <button type="submit" className={css.submitBtn}>
                  <FaCheck className={css.submitBtnIcon} />
                  Зберегти
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
