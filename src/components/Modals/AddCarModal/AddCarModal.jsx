import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./AddCarModal.module.css";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { BsXLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCameraFill } from "react-icons/bs";
import car from "../../../assets/images/carsItem.png";
import passport from "../../../assets/images/passport_image.png";
import { useState } from "react";
import { AddCarSchema } from "../../../validationSchemas/addCarSchema";
import carModels from "../../../utils/output.json";
import Select, { components } from "react-select";

export default function AddCarModal({ onClose }) {
  const [passportPhoto, setPassportPhoto] = useState(passport);
  const [carPhoto, setCarPhoto] = useState(car);

  const initialValues = {
    number: "",
    model: "",
    make: "",
    mileage: "",
    year: "",
    vin: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    onClose();
  };

  const handleChangePassportPhoto = (e) => {
    const newPhoto = e.target.files[0];
    setPassportPhoto(URL.createObjectURL(newPhoto));
  };

  const handleChangeCarPhoto = (e) => {
    const newPhoto = e.target.files[0];
    setCarPhoto(URL.createObjectURL(newPhoto));
  };

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
        height: "52px",
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
    if (!make) {
      return;
    }
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

  return (
    <div className={css.modal}>
      <h3 className={css.header}>Додати Авто </h3>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <p className={css.headerReminder}>* - Поля обов'язкові для заповнення</p>
      <Formik
        initialValues={initialValues}
        validationSchema={AddCarSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur
      >
        {({ values, errors, setFieldValue }) => (
          <Form>
            <div className={css.inputWrapper}>
              <div className={css.inputWithErrorWrapper}>
                <Field
                  type="text"
                  name="number"
                  className={css.input}
                  placeholder="AX2945OP *"
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className={css.errorMsg}
                />
              </div>

              <div className={css.inputWithErrorWrapper}>
                <Field
                  // type="text"
                  // name="model"
                  // className={css.input}
                  name="make"
                  component={CustomSelect}
                  placeholderName="Марка автомобіля *"
                  options={makeOptions}
                  setFieldValue={setFieldValue}
                  // placeholder="Марка і модель автомобіля"
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.inputWrapper}>
              <div className={css.inputWithErrorWrapper}>
                <Field
                  type="text"
                  name="mileage"
                  className={css.input}
                  placeholder="Пробіг"
                />
                <ErrorMessage
                  name="mileage"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWithErrorWrapper}>
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
                {!values.make && (
                  <p className={css.reminder}>
                    Спочатку оберіть марку автомобіля
                  </p>
                )}
              </div>
            </div>
            <div className={css.inputWrapper}>
              <div className={css.inputWithErrorWrapper}>
                <Field
                  type="text"
                  name="vin"
                  className={css.input}
                  placeholder="VIN"
                />
                <ErrorMessage
                  name="vin"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWithErrorWrapper}>
                <Field
                  name="year"
                  component={CustomSelect}
                  placeholderName="Рік випуску *"
                  options={getYearOptions(values.make, values.model)}
                  setFieldValue={setFieldValue}
                  isDisabled={!values.make && !values.model}
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className={css.errorMsg}
                />
                {!values.model && (
                  <p className={css.reminder}>
                    Спочатку оберіть марку та модель автомобіля
                  </p>
                )}
              </div>
            </div>
            <div className={css.inputWrapper}>
              <div className={css.labelAndImageWrapper}>
                <label htmlFor="car" className={css.label}>
                  <BsFillCameraFill className={css.labelIcon} />
                  <p className={css.labelText}>+ Авто</p>
                </label>
                <img src={carPhoto} alt="Car photo" className={css.photo} />
              </div>
              <Field
                type="file"
                name="car"
                id="car"
                className={css.download}
                onChange={handleChangeCarPhoto}
              />
              <div className={css.labelAndImageWrapper}>
                <label htmlFor="registrationCertificate" className={css.label}>
                  <BsFillCameraFill className={css.labelIcon} />
                  <p className={css.labelText}>+ Техпаспорт</p>
                </label>
                <img
                  src={passportPhoto}
                  alt="Document photo"
                  className={css.passportPhoto}
                />
              </div>
              <Field
                type="file"
                name="registrationCertificate"
                id="registrationCertificate"
                className={css.download}
                onChange={handleChangePassportPhoto}
              />
            </div>
            <BtnsCloseAndSubmit
              onClose={onClose}
              handleSubmit={handleSubmit}
              btnSave={"Зберегти"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
