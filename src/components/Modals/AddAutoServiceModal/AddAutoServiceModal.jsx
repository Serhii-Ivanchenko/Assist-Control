import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../AddAutoServiceModal/AddAutoServiceModal.module.css";
import { AddServiceSchema } from "../../../validationSchemas/addServiceSchema";
import { FaCheck } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsCloudUploadFill } from "react-icons/bs";
import { useState } from "react";
import PopupMenu from "../../ServiceStationDetailsBottom/DistributorsPart/DistributorsCard/PopupMenu";

export default function AddAutoServiceModal({ onClose }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [isUploadBtnVisible, setIsUploadBtnVisible] = useState(true);

  const initialValues = {
    address: "",
    name: "",
    userCode: null,
    account: "",
    bank: "",
    bankDetails: null,
    legalAddress: "",
    managerPhone: "",
    managerName: "",
    officePhoneNumber: "",
    headPhoneNumber: "",
  };

  const handleChange = (e) => {
    const newLogo = e.target.files[0];
    setLogo(URL.createObjectURL(newLogo));
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(logo);

    actions.resetForm();
  };

  return (
    <div className={css.modal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={AddServiceSchema}
        // enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur
      >
        <Form>
          <div className={css.headerWrapper}>
            <BsXLg className={css.closeIcon} onClick={onClose} />
            <h3 className={css.autoServiceName}>СТО Название</h3>
            <BsThreeDotsVertical
              className={css.dotsIcon}
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            />
            <PopupMenu
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
            />
          </div>
          <div className={css.logo}>
            <img src={logo} alt="logo" className={css.logoImg} />
            <input
              type="file"
              name="logo"
              id="logo"
              className={css.logoInput}
              onChange={handleChange}
            />
            {isUploadBtnVisible && (
              <label htmlFor="logo" className={css.uploadLogoBtn}>
                <BsCloudUploadFill className={css.uploadLogoIcon} />
              </label>
            )}
          </div>

          <div className={css.form}>
            <div className={css.addressWrapper}>
              <label htmlFor="address" className={css.labelName}>
                Фактична адреса
              </label>
              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="address"
                  placeholder="Харків, Байрона 189 оф 27"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="name" className={css.label}>
                  ПІБ ФОП
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="name"
                    placeholder="Іваненко Іван Іванович"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <label htmlFor="userCode" className={css.label}>
                  ІПН
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="number"
                    name="userCode"
                    placeholder="1385446843"
                  />
                  <ErrorMessage
                    name="userCode"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="account" className={css.label}>
                Рахунок IBAN
              </label>
              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="account"
                  placeholder="UA123456789012345678901234567"
                />
                <ErrorMessage
                  name="account"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="bank" className={css.label}>
                  Банк
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="bank"
                    placeholder="ПриватБанк"
                  />
                  <ErrorMessage
                    name="bank"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <label htmlFor="bankDetails" className={css.label}>
                  МФО банку
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="number"
                    name="bankDetails"
                    placeholder="305299"
                  />
                  <ErrorMessage
                    name="bankDetails"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="legalAddress" className={css.label}>
                Юридична адреса
              </label>
              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="legalAddress"
                  placeholder="м. Київ, вул. Шевченка, буд. 10"
                />
                <ErrorMessage
                  name="legalAddress"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="managerPhone" className={css.label}>
                Телефон менеджера
              </label>
              <div className={css.inputsWrapper}>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="managerPhone"
                    placeholder="+380671234567"
                  />
                  <ErrorMessage
                    name="managerPhone"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="managerName"
                    placeholder="Діана"
                  />
                  <ErrorMessage
                    name="managerName"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="officePhoneNumber" className={css.label}>
                  Телефон офіс
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="officePhoneNumber"
                    placeholder="+380671234567"
                  />
                  <ErrorMessage
                    name="officePhoneNumber"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <label htmlFor="headPhoneNumber" className={css.label}>
                  Керівник
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="headPhoneNumber"
                    placeholder="+380671234567"
                  />
                  <ErrorMessage
                    name="headPhoneNumber"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.btnWrapper}>
              <button type="button" className={css.closeBtn} onClick={onClose}>
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
