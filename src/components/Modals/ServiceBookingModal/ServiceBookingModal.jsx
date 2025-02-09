import css from "../ServiceBookingModal/ServiceBookingModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceBookingSchema } from "../../../validationSchemas/ServiceBookingSchema.js";
import { BsFillCameraFill } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
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
  // selectPeriodRecords,
  selectServiceData,
} from "../../../redux/crm/selectors.js";
import { selectSelectedServiceId } from "../../../redux/auth/selectors.js";
import SelectTime from "./SelectTime/SelectTime.jsx";
import Loader from "../../Loader/Loader.jsx";
import { selectDate } from "../../../redux/cars/selectors.js";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit.jsx";
import passport from "../../../assets/images/passport_image.png";
import carModels from "../../../utils/output.json";
import Select, { components } from "react-select";

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
  // const [registrationCertificate, setRegistrationCertificate] =
  //   useState(passport);
  const selectRef = useRef(null);

  const selectedServiceId = useSelector(selectSelectedServiceId);
  const { mechanics, posts, services } = useSelector(selectServiceData);
  const dayRecords = useSelector(selectDayRecords);

  const CustomDropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;
    return (
      <components.DropdownIndicator {...props}>
        <BsFillCaretDownFill
          className={`${css.btnArrowSelect} ${menuIsOpen ? css.rotated : ""}`}
        />
      </components.DropdownIndicator>
    );
  };

  const CustomSelect = ({ field, options, setFieldValue, placeholderName }) => {
    const customStyles = {
      input: (base) => ({
        ...base,
        color: "var(--light-gray)",
        fontSize: "14px",
        fontStyle: " normal",
        fontWeight: 400,
        lineHeight: "normal",
      }),
      placeholder: (provided, state) => ({
        ...provided,
        color: "var(--input-text)",
        fontSize: "14px",
        fontFamily: "Roboto, sans-serif",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
      }),
      control: (provided, state) => ({
        ...provided,
        boxShadow: "none", // Убираем тень и синий контур при фокусе
        outline: state.isFocused ? "1px solid #ccc" : "none", // Убираем outline (синий контур)
        width: "288px",
        height: "46px",
        borderRadius: "6px",
        border: "1px solid var(--input-stroke)",
        backgroundColor: "var(--bg-input)",
        paddingLeft: "20px",
        "&:hover": {
          border: "1px solid var(--input-stroke)",
          outline: "none",
        },
        indicatorSeparator: () => ({
          display: "none", // Убирает разделитель перед стрелкой
        }),
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: "var(--bg-input)",
        borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        className: css.customMenuList,
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: "200px", // Ограничение высоты, чтобы появился скролл
        overflowY: "auto", // Включаем вертикальный скролл
      }),
      option: (base, state) => ({
        ...base,
        padding: "10px",
        backgroundColor: state.isFocused
          ? "var(--blue-btn-normal)"
          : "transparent",
        color: "var(--light-gray)",
        fontSize: "14px",
        fontStyle: " normal",
        fontWeight: 400,
        lineHeight: "normal",
      }),
      singleValue: (base) => ({
        ...base,
        color: "var(--light-gray)",
        fontSize: "14px",
        fontStyle: " normal",
        fontWeight: 400,
        lineHeight: "normal",
      }),
    };

    return (
      <Select
        {...field}
        options={options}
        classNamePrefix={css.customMenuList}
        onChange={(selectedOption) => {
          setFieldValue(field.name, selectedOption ? selectedOption.value : "");
        }}
        value={options?.find((option) => option.value === field.value) || null}
        isSearchable
        placeholder={placeholderName}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator, // Убирает стрелку
          IndicatorSeparator: () => null, // Убирает разделитель
          MenuList: (props) => (
            <components.MenuList {...props} className={css.customMenuList}>
              {props.children}
            </components.MenuList>
          ),
        }}
      />
    );
  };

  const makeOptions = carModels.map((car) => ({
    value: car.make,
    label: car.make,
  }));

  const getModelOptions = (make) => {
    const selectedCar = carModels.find(
      (car) => car?.make?.toLocaleLowerCase() === make.toLocaleLowerCase()
    );
    if (selectedCar) {
      return selectedCar.models.map((model) => ({
        value: model.model_name,
        label: model.model_name,
      }));
    }
    return [];
  };

  const getYearOptions = (make, model) => {
    if (!make || !model) {
      return;
    }
    const selectedCar = carModels.find(
      (car) => car.make.toLocaleLowerCase() === make.toLocaleLowerCase()
    );
    const selectedCarModel = selectedCar?.models.find(
      (car) => model.toLocaleLowerCase() === car.model_name.toLocaleLowerCase()
    );
    if (selectedCarModel) {
      const selectedCarModelConstructionInterval =
        selectedCarModel?.construction_interval;
      const [startDate, endDate] =
        selectedCarModelConstructionInterval.split("- ");
      const [startMonth, startYear] = startDate.split(".");
      const [endMonth, endYear] = endDate.split(".");
      const defaultEndYear = endYear ? endYear : new Date().getFullYear();
      const yearArr = [];
      for (let i = startYear; i <= defaultEndYear; i++) {
        yearArr.push(i);
      }
      return yearArr.map((year) => ({
        value: year,
        label: year,
      }));
    }
    return [];
  };

  // const handleRegistrationCertificateChange = (e) => {
  //   const newCertificate = e.target.files[0];
  //   setRegistrationCertificate(URL.createObjectURL(newCertificate));
  // };

  const [pickedDate, setPickedDate] = useState(
    recordId || carSelectDate
      ? new Date(selectedDate).toLocaleDateString()
      : new Date().toLocaleDateString()
  );

  const [initialValues, setInitialValues] = useState({
    phone_number: "",
    car_number: "",
    vin: "",
    service_id: "",
    prepayment: "",
    position: postId || posts[0]?.id,
    mechanic_id: "",
    name: "",
    make: "",
    model: "",
    year: "",
    note: "",
  });

  useEffect(() => {
    if (!recordId) {
      return;
    }

    const recordById = dayRecords?.find((dayRecord) => {
      return dayRecord?.car_id === recordId;
    });

    setInitialValues({
      phone_number: recordById?.phone || "",
      car_number: recordById?.plate || "",
      vin: recordById?.vin || "",
      service_id: recordById?.service_id || "",
      prepayment: recordById?.prepayment || "",
      position: recordById?.post_id || (posts.length > 0 ? posts[0].id : ""),
      mechanic_id: recordById?.mechanic_id || "",
      name: recordById?.name || "",
      make: recordById?.make || "", // Додаємо дефолтне значення
      model: recordById?.model || "",
      year: recordById?.year || "",
      note: recordById?.note || "",
    });
  }, []);

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
      <p className={css.headerReminder}>* - Поля обов'язкові для заповнення</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ServiceBookingSchema}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur
      >
        {({ values, errors, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.rightSectionWrapper}>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="phone_number"
                  placeholder="Телефон *"
                  // disabled={recordId}
                />

                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className={css.errorMsg}
                />
                {!errors.phone_number && !recordId && (
                  <p className={css.reminder}>
                    Телефон повинен відповідати формату 380123456789
                  </p>
                )}
                {recordId && (
                  <p className={css.reminder}>
                    Для редагування номеру зверніться в тех підтримку
                  </p>
                )}
              </div>
              <div className={css.inputWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="car_number"
                  placeholder="AX2945OP *"
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
                      Послуга *
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
                      Оберіть механіка *
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
                  placeholder="ПІБ *"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  name="make"
                  component={CustomSelect}
                  placeholderName="Марка автомобіля *"
                  options={makeOptions}
                  setFieldValue={setFieldValue}
                />
                <ErrorMessage
                  name="make"
                  component="div"
                  className={css.errorMsg}
                />
              </div>

              <div className={css.inputWrapper}>
                <Field
                  name="model"
                  component={CustomSelect}
                  placeholderName="Модель автомобіля *"
                  options={getModelOptions(values.make)}
                  setFieldValue={setFieldValue}
                  isDisabled={!values.make}
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className={css.errorMsg}
                />
                {!errors.model && !values.model && (
                  <p className={css.reminder}>
                    Спочатку оберіть марку автомобіля
                  </p>
                )}
              </div>
              <div className={css.wrapper}>
                <div className={css.inputWrapper}>
                  <Field
                    name="year"
                    component={CustomSelect}
                    placeholderName="Рік випуску"
                    options={getYearOptions(values.make, values.model)}
                    setFieldValue={setFieldValue}
                    isDisabled={!values.make && !values.model}
                  />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className={css.errorMsg}
                  />
                  {!errors.year && !values.year && (
                    <p className={css.reminder}>
                      Спочатку оберіть марку та модель автомобіля
                    </p>
                  )}
                </div>
                <Field
                  // as="textarea"
                  name="note"
                  className={css.input}
                  placeholder="Примітка"
                />
              </div>
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
