import css from "../ServiceBookingModal/ServiceBookingModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceBookingSchema } from "../../../validationSchemas/ServiceBookingSchema.js";
import { BsFillCameraFill } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import SelectDate from "./SelectDate/SelectDate";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecord,
  getPlannedVisits,
  getRecordsForDay,
  getRecordsForPeriod,
  getServiceDataForBooking,
  updateRecordData,
} from "../../../redux/crm/operations.js";
import toast from "react-hot-toast";
import {
  selectDates,
  selectDayRecords,
  selectServiceData,
} from "../../../redux/crm/selectors.js";
import { selectSelectedServiceId } from "../../../redux/auth/selectors.js";
import SelectTime from "./SelectTime/SelectTime.jsx";
import Loader from "../../Loader/Loader.jsx";
import { selectDate } from "../../../redux/cars/selectors.js";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit.jsx";
import passport from "../../../assets/images/passport_image.png";

export default function ServiceBookingModal({
  onClose,
  postId,
  recordId,
  carSelectDate,
}) {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const dates = useSelector(selectDates);

  const [datesArray, setDatesArray] = useState([]);
  const [booking, setBooking] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownPostOpen, setIsDropdownPostOpen] = useState(false);
  const [isDropdownMechanicOpen, setIsDropdownMechanicOpen] = useState(false);
  const [registrationCertificate, setRegistrationCertificate] =
    useState(passport);
  const selectRef = useRef(null);

  const selectedServiceId = useSelector(selectSelectedServiceId);
  const { mechanics, posts, services } = useSelector(selectServiceData);
  const dayRecords = useSelector(selectDayRecords);

  const handleRegistrationCertificateChange = (e) => {
    const newCertificate = e.target.files[0];
    setRegistrationCertificate(URL.createObjectURL(newCertificate));
  };

  const [pickedDate, setPickedDate] = useState(
    recordId || carSelectDate
      ? new Date(selectedDate).toLocaleDateString()
      : new Date().toLocaleDateString()
  );

  const recordById = dayRecords?.find((dayRecord) => {
    return dayRecord.car_id === recordId;
  });

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
      dispatch(getRecordsForDay(dateToPass));
    };
    fetchServiceData();
  }, [dispatch, selectedServiceId, dateToPass]);

  const handleSubmit = (values, actions) => {
    const recordData = {
      ...values,
      shedule_date: datesArray[0]?.appointment_date,
      service_id: values.service_id ? Number(values.service_id) : null,
      prepayment: values.prepayment ? Number(values.prepayment) : null,
      position: values.position ? Number(values.position) : null,
      mechanic_id: values.mechanic_id ? Number(values.mechanic_id) : null,
      dates: datesArray,
      hours_from: datesArray[0].start_time,
      recordId,
      booking,
    };

    recordId
      ? dispatch(updateRecordData(recordData))
          .unwrap()
          .then(() => {
            toast.success("Запис успішно відредаговано");
            dispatch(getRecordsForDay(selectedDate));
            dispatch(getPlannedVisits(selectedDate));
            dispatch(getRecordsForPeriod(dates));
          })
          .catch(() => {
            toast.error("Щось пішло не так. Спробуйте ще раз!");
          })
      : dispatch(createRecord(recordData))
          .unwrap()
          .then(() => {
            toast.success("Запис успішно створено");
            dispatch(getRecordsForDay(selectedDate));
            dispatch(getPlannedVisits(selectedDate));
            dispatch(getRecordsForPeriod(dates));
          })
          .catch(() => {
            toast.error("Щось пішло не так. Спробуйте ще раз!");
          });
    setDatesArray([]);
    setBooking([]);
    actions.resetForm();
    onClose();
  };

  const initialValues = {
    name: recordById?.name || "",
    phone_number: recordId ? `${"+" + recordById?.phone}` : "",
    car_number: recordById?.plate || "",
    service_id: recordById?.service_id || "",
    make_model: recordById?.auto || "",
    vin: recordById?.vin || "",
    note: recordById?.note || "",
    prepayment: recordById?.prepayment || "",
    position: postId || recordById?.post_id || posts[0]?.id,
    mechanic_id: recordById?.mechanic_id || "",
  };

  return !posts ? (
    <Loader />
  ) : (
    <div className={css.serviceBookingModal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      {recordId ? (
        <h3 className={css.header}>Редагування запису на {pickedDate}</h3>
      ) : (
        <h3 className={css.header}>Створення запису на {pickedDate}</h3>
      )}
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
                  disabled={recordId}
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
                          key={post.id}
                          value={post.id}
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
                  name="registrationCertificate"
                  id="file"
                  className={css.inputFile}
                  onChange={handleRegistrationCertificateChange}
                />
                <label htmlFor="file" className={css.label}>
                  <BsFillCameraFill className={css.iconCamera} />+ Додати фото
                  техпаспорта
                </label>
                <img
                  className={css.registrationCertificate}
                  src={registrationCertificate}
                  alt="Registration certificate"
                />
              </div>
              <Field
                as="textarea"
                name="note"
                className={css.textArea}
                placeholder="Примітка"
              />
              <div className={css.calendar}>
                <SelectDate
                  newDate={setNewDate}
                  recordId={recordId}
                  carSelectDate={carSelectDate}
                />
                <div className={css.timeWrapper}>
                  <SelectTime
                    postId={values.position || posts[0]?.id}
                    setDatesArray={setDatesArray}
                    pickedDate={pickedDate}
                    recordId={recordId}
                    setBooking={setBooking}
                  />
                </div>
              </div>
              <div className={css.btnWrapper}>
                <BtnsCloseAndSubmit
                  onClose={onClose}
                  handleSubmit={handleSubmit}
                  btnSave={"Зберегти"}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
