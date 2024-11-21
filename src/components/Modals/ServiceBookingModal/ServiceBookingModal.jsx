import css from "../ServiceBookingModal/ServiceBookingModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceBookingSchema } from "../../../validationSchemas/ServiceBookingSchema.js";
import { BsFillCameraFill } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import SelectDate from "./SelectDate/SelectDate";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecord,
  getServiceDataForBooking,
} from "../../../redux/crm/operations.js";
import toast from "react-hot-toast";
import { selectServiceData } from "../../../redux/crm/selectors.js";
import { selectSelectedServiceId } from "../../../redux/auth/selectors.js";
import SelectTime from "./SelectTime/SelectTime.jsx";
import Loader from "../../Loader/Loader.jsx";

export default function ServiceBookingModal({ onClose }) {
  const dispatch = useDispatch();

  const [chosenTime, setChosenTime] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownPostOpen, setIsDropdownPostOpen] = useState(false);
  const [isDropdownMechanicOpen, setIsDropdownMechanicOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedServiceId = useSelector(selectSelectedServiceId);
  const { mechanics, posts, services } = useSelector(selectServiceData);

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
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const [pickedDate, setPickedDate] = useState(formattedDate);

  const setNewDate = (date) => {
    setPickedDate(date);
  };

  const dateToPass = pickedDate.split(".").reverse().join("-");

  useEffect(() => {
    const fetchServiceData = () => {
      if (!selectedServiceId) {
        return;
      }
      dispatch(getServiceDataForBooking(dateToPass));
      // setChosenTime([]);
    };
    fetchServiceData();
  }, [dispatch, selectedServiceId, dateToPass]);

  const transformedData = Object.values(
    chosenTime.reduce((acc, { date, time }) => {
      if (!acc[date]) {
        acc[date] = { date, times: [] };
      }
      acc[date].times.push(time);
      acc[date].times.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a}:00`);
        const timeB = new Date(`1970-01-01T${b}:00`);
        return timeA - timeB;
      });
      return acc;
    }, {})
  );

  const datesArray = transformedData.map(({ date, times }) => ({
    appointment_date: date.split(".").reverse().join("-"),
    start_time: times[0],
    end_time: times[times.length - 1],
  }));

  const handleSubmit = (values, actions) => {
    const recordData = {
      ...values,
      shedule_date: dateToPass,
      service_id: values.service_id ? Number(values.service_id) : null,
      prepayment: values.prepayment ? Number(values.prepayment) : null,
      position: values.position ? Number(values.position) : null,
      mechanic_id: values.mechanic_id ? Number(values.mechanic_id) : null,
      dates: datesArray,
    };

    console.log(recordData);

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

  const initialValues = {
    name: "",
    phone_number: "",
    car_number: "",
    service_id: "",
    make_model: "",
    vin: "",
    note: "",
    prepayment: "",
    position: posts.length > 0 ? posts[0]?.id_post : "",
    mechanic_id: "",
  };

  return !posts ? (
    <Loader />
  ) : (
    <div className={css.serviceBookingModal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <h3 className={css.header}>Створення запису на {pickedDate}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ServiceBookingSchema}
        enableReinitialize={true}
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
                  name="phone_number"
                  placeholder="Телефон"
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
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
                      values.service_id === ""
                        ? `${css.placeholder}`
                        : `${css.inputSelect}`
                    }
                    type="text"
                    name="service_id"
                    onClick={() =>
                      toggleDropdown(isDropdownOpen, setIsDropdownOpen)
                    }
                  >
                    <option value="" disabled hidden>
                      Послуга
                    </option>
                    {services.map((service) => {
                      return (
                        <option key={service.id} value={service.id}>
                          {service.name_services}
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
                    name="service_id"
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
                    {posts.map((post) => {
                      return (
                        <option
                          key={post.id_post}
                          value={post.id_post}
                          // disabled={post.status !==0}
                        >
                          {post.name_post}
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
                      values.mechanic_id === ""
                        ? `${css.placeholder}`
                        : `${css.inputSelect}`
                    }
                    type="text"
                    name="mechanic_id"
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
                    {mechanics.map((mechanic) => {
                      return (
                        <option
                          key={mechanic.id}
                          value={mechanic.id}
                          // disabled={mechanic.status !== 0}
                        >
                          {mechanic.full_name}
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
                    name="mechanic_id"
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
                  name="name"
                  placeholder="ПІБ"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
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
              <div className={css.calendar}>
                <SelectDate newDate={setNewDate} />
                <div className={css.timeWrapper}>
                  <SelectTime
                    postId={values.position || posts[0]?.id_post}
                    chosenTime={transformedData}
                    setChosenTime={setChosenTime}
                    pickedDate={pickedDate}
                  />
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
