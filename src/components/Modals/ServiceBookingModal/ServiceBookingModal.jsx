import css from "../ServiceBookingModal/ServiceBookingModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceBookingSchema } from "../../../validationSchemas/ServiceBookingSchema.js";
import { services } from "../../Modals/ServiceBookingModal/constants.js";
import { posts } from "../../Modals/ServiceBookingModal/constants.js";
import { mechanics } from "../../Modals/ServiceBookingModal/constants.js";
import { timeToChoose } from "../../Modals/ServiceBookingModal/constants.js";
import { BsFillCameraFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import SelectDate from "./SelectDate/SelectDate";
import { useState } from "react";

export default function ServiceBookingModal() {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
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
              <div className={css.inputWrapper}>
                <Field
                  as="select"
                  className={css.input}
                  type="text"
                  name="service"
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
              <div className={css.inputWrapper}>
                <Field
                  as="select"
                  className={css.input}
                  type="text"
                  name="post"
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
                <ErrorMessage
                  name="post"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  as="select"
                  className={css.input}
                  type="text"
                  name="mechanic"
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
              <button type="button" className={css.closeBtn}>
                Закрити
              </button>
              <button type="submit" className={css.submitBtn}>
                <FaCheck className={css.submitBtnIcon} />
                Зберегти
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
