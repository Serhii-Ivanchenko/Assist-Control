import css from "../ServiceBookingModal/ServiceBookingModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
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

export default function ServiceBookingModal({ onClose }) {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownPostOpen, setIsDropdownPostOpen] = useState(false);
  const [isDropdownMechanicOpen, setIsDropdownMechanicOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = (status, changeStatus) => {
    changeStatus(!status);
  };

  const currentDate = new Date(Date.now());
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const [pickedDate, setPickedDate] = useState(formattedDate);

  const setNewDate = (date) => {
    setPickedDate(date);
  };

  return (
    <div className={css.serviceBookingModal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <h3 className={css.header}>Створення запису на {pickedDate}</h3>
      <Formik
        initialValues={{
          carNumber: "",
          vin: "",
          service: "",
          prepayment: "",
          phoneNumber: "",
          post: "",
          mechanic: "",
          carModel: "",
          textarea: "",
          clientName: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={ServiceBookingSchema}
      >
        {({ values }) => (
          <Form className={css.form}>
            <div className={css.rightSectionWrapper}>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="carNumber"
                  placeholder="AX 2945 OP"
                />
                <ErrorMessage
                  name="carNumber"
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
                <div className={css.inputWrapper} ref={selectRef}>
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
                  name="phoneNumber"
                  placeholder="Телефон"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.bottomRightSectionWrapper}>
                <div className={css.inputWrapper} ref={selectRef}>
                  <Field
                    as="select"
                    className={
                      values.post === ""
                        ? `${css.placeholder}`
                        : `${css.inputSelect}`
                    }
                    type="text"
                    name="post"
                    onClick={() =>
                      toggleDropdown(isDropdownPostOpen, setIsDropdownPostOpen)
                    }
                  >
                    <option value="" disabled hidden>
                      ПОСТ
                    </option>
                    {posts.map((post, index) => {
                      return (
                        <option key={index} value={post}>
                          {post}
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
                    name="post"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
                <div className={css.inputWrapper} ref={selectRef}>
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
                  name="carModel"
                  placeholder="Марка і модель автомобіля"
                />
                <ErrorMessage
                  name="carModel"
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
                name="textarea"
                className={css.textArea}
                placeholder="Примітка"
              />
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="clientName"
                  placeholder="ПІБ"
                />
                <ErrorMessage
                  name="clientName"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.calendar}>
                <SelectDate newDate={setNewDate} />
                <div className={css.timeWrapper}>
                  {timeToChoose.map((time, index) => {
                    return (
                      <button
                        type="button"
                        className={css.timeBtn}
                        key={index}
                        onClick={() => {
                          console.log(time);
                        }}
                      >
                        {time}
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
