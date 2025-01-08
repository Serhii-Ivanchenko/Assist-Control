import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../AddAutoServiceModal/AddAutoServiceModal.module.css";
import { AddServiceSchema } from "../../../validationSchemas/addServiceSchema";
import { BsXLg } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
import UploadComponent from "../../sharedComponents/UploadComponent/UploadComponent";
import PopupMenu from "../../sharedComponents/PopupMenu/PopupMenu";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import clsx from "clsx";

export default function AddAutoServiceModal({
  onClose,
  isOrganization,
  infoToEdit,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [serviceName, setServiceName] = useState(
    isOrganization ? "ТОВ" : "СТО назва"
  );
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const initialValues = {
    autoServiceName: "",
    address: "",
    name: "",
    userCode: "",
    account: "",
    bank: "",
    bankDetails: "",
    legalAddress: "",
    managerPhone: "",
    managerName: "",
    officePhoneNumber: "",
    headPhoneNumber: "",
  };

  const handleThreeDotsBtnClick = (e) => {
    e.stopPropagation();
    setIsPopupOpen((prevState) => !prevState);
    // setIsPopupOpen(true);
  };

  const onEdit = () => {
    setIsInputVisible(true);
    setTimeout(() => {
      inputRef.current?.focus(); // Фокусуємо інпут після оновлення стану
    }, 0);
  };

  const handleBlur = (e) => {
    setServiceName(e.target.value);
    setIsInputVisible(false);
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(logo);

    actions.resetForm();
    onClose();
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
            <div className={css.serviceNameWrapper}>
              {isInputVisible ? (
                <Field
                  innerRef={inputRef}
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  type="text"
                  name="autoServiceName"
                  className={css.changedInput}
                  onBlur={handleBlur}
                ></Field>
              ) : (
                <p className={css.autoServiceName}>{serviceName}</p>
              )}
              {infoToEdit && (
                <button
                  type="button"
                  className={css.btn}
                  onClick={handleThreeDotsBtnClick}
                  ref={buttonRef}
                >
                  <BsThreeDotsVertical className={css.dotsIcon} />
                  <div className={css.popupContainer}>
                    {isOrganization ? (
                      <PopupMenu
                        isOpen={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                        buttonRef={buttonRef}
                        onDelete={null}
                        containerRef
                        innerAccRef
                        onEdit={onEdit}
                      />
                    ) : (
                      <PopupMenu
                        isOpen={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                        buttonRef={buttonRef}
                        onDelete={() => {}}
                        containerRef
                        innerAccRef
                        onEdit={onEdit}
                      />
                    )}
                  </div>
                </button>
              )}
            </div>
          </div>
          {!isOrganization && (
            <div className={css.logo}>
              {logo ? (
                <img src={logo} alt="logo" className={css.logoImg} />
              ) : (
                <p className={css.uploadLogoText}>Завантажте логотип</p>
              )}
              <UploadComponent name={"logo"} setLogo={setLogo} />
            </div>
          )}
          <div className={clsx(css.form, isOrganization && css.isOrganization)}>
            <div className={css.addressWrapper}>
              <label htmlFor="address" className={css.labelName}>
                Фактична адреса
              </label>
              {infoToEdit ? (
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
              ) : (
                <p className={css.text}>Харків, Байрона 189 оф 27</p>
              )}
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="name" className={css.label}>
                  ПІБ ФОП
                </label>
                {infoToEdit ? (
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
                ) : (
                  <p className={css.text}>Іваненко Іван Іванович</p>
                )}
              </div>
              <div className={css.wrapper}>
                <label htmlFor="userCode" className={css.label}>
                  ІПН
                </label>
                {infoToEdit ? (
                  <div className={css.fieldWithErrorWrapper}>
                    <Field
                      className={css.input}
                      type="text"
                      name="userCode"
                      placeholder="1385446843"
                    />
                    <ErrorMessage
                      name="userCode"
                      component="div"
                      className={css.errorMsg}
                    />
                  </div>
                ) : (
                  <p className={css.text}>1385446843</p>
                )}
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="account" className={css.label}>
                Рахунок IBAN
              </label>
              {infoToEdit ? (
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
              ) : (
                <p className={css.text}>UA123456789012345678901234567</p>
              )}
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="bank" className={css.label}>
                  Банк
                </label>
                {infoToEdit ? (
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
                ) : (
                  <p className={css.text}>ПриватБанк</p>
                )}
              </div>
              <div className={css.wrapper}>
                <label htmlFor="bankDetails" className={css.label}>
                  МФО банку
                </label>
                {infoToEdit ? (
                  <div className={css.fieldWithErrorWrapper}>
                    <Field
                      className={css.input}
                      type="text"
                      name="bankDetails"
                      placeholder="305299"
                    />
                    <ErrorMessage
                      name="bankDetails"
                      component="div"
                      className={css.errorMsg}
                    />
                  </div>
                ) : (
                  <p className={css.text}>305299</p>
                )}
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="legalAddress" className={css.label}>
                Юридична адреса
              </label>
              {infoToEdit ? (
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
              ) : (
                <p className={css.text}>м. Київ, вул. Шевченка, буд. 10</p>
              )}
            </div>
            <div className={css.wrapper}>
              <label htmlFor="managerPhone" className={css.label}>
                Телефон менеджера
              </label>

              <div className={css.inputsWrapper}>
                {infoToEdit ? (
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
                ) : (
                  <p className={css.text}>+380671234567</p>
                )}
                {infoToEdit ? (
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
                ) : (
                  <p className={css.text}>Діана</p>
                )}
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="officePhoneNumber" className={css.label}>
                  Телефон офіс
                </label>
                {infoToEdit ? (
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
                ) : (
                  <p className={css.text}>+380671234567</p>
                )}
              </div>
              <div className={css.wrapper}>
                <label htmlFor="headPhoneNumber" className={css.label}>
                  Керівник
                </label>
                {infoToEdit ? (
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
                ) : (
                  <p className={css.text}>+380671234567</p>
                )}
              </div>
            </div>
            {infoToEdit && (
              <div className={css.btnWrapper}>
                <BtnsCloseAndSubmit
                  onClose={onClose}
                  handleSubmit={handleSubmit}
                  btnSave={"Зберегти"}
                />
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
