import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./AddCarModal.module.css";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { BsXLg } from "react-icons/bs";
import { BsFillCameraFill } from "react-icons/bs";
import car from "../../../assets/images/carsItem.png";
import passport from "../../../assets/images/passport_image.png";
import { useState } from "react";
import { AddCarSchema } from "../../../validationSchemas/addCarSchema";

export default function AddCarModal({ onClose }) {
  const [passportPhoto, setPassportPhoto] = useState(passport);
  const [carPhoto, setCarPhoto] = useState(car);

  const initialValues = {
    number: "",
    model: "",
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

  return (
    <div className={css.modal}>
      <h3 className={css.header}>Додати Авто </h3>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <Formik
        initialValues={initialValues}
        validationSchema={AddCarSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur
      >
        <Form>
          <div className={css.inputWrapper}>
            <div className={css.inputWithErrorWrapper}>
              <Field
                type="text"
                name="number"
                className={css.input}
                placeholder="AX2945OP"
              />
              <ErrorMessage
                name="number"
                component="div"
                className={css.errorMsg}
              />
            </div>

            <div className={css.inputWithErrorWrapper}>
              <Field
                type="text"
                name="model"
                className={css.input}
                placeholder="Марка і модель автомобіля"
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
                type="text"
                name="year"
                className={css.input}
                placeholder="2024"
              />
              <ErrorMessage
                name="year"
                component="div"
                className={css.errorMsg}
              />
            </div>
          </div>
          <div className={css.bottomInputWrapper}>
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
            <div className={css.labelsWrapper}>
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
          </div>
          <BtnsCloseAndSubmit
            onClose={onClose}
            handleSubmit={handleSubmit}
            btnSave={"Зберегти"}
          />
        </Form>
      </Formik>
    </div>
  );
}
