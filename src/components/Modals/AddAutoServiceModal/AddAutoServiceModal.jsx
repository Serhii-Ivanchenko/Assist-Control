import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../AddAutoServiceModal/AddAutoServiceModal.module.css";
import { AddServiceSchema } from "../../../validationSchemas/addServiceSchema";
import { BsXLg } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillCameraFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  createService,
  getAllServices,
  updateService,
} from "../../../redux/service/operations.js";
import Popup from "./Popup/Popup.jsx";
import Modal from "../Modal/Modal.jsx";
import DeleteServiceModal from "../DeleteServiceModal/DeleteServiceModal.jsx";

export default function AddAutoServiceModal({
  onClose,
  createClient,
  createAutoService,
  updateAutoService,
  station,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(station?.logo || null);
  // const [isInputVisible, setIsInputVisible] = useState(false);
  const [serviceName, setServiceName] = useState(
    updateAutoService ? station.name : null
  );
  // const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const dispatch = useDispatch();

  const initialValues = {
    avatar: "",
    companyName: station?.name || serviceName || "",
    address: station?.address || "",
    email: station?.email || "",
    fop_name: station?.fop_name || "",
    ipn: station?.ipn || "",
    iban: station?.iban || "",
    bank_name: station?.bank_name || "",
    mfo_bank: station?.mfo_bank || "",
    legal_address: station?.legal_address || "",
    manager_phone: station?.manager_phone || "",
    manager_name: station?.manager_name || "",
    office_phone: station?.office_phone || "",
    director_phone: station?.director_phone || "",
  };

  const handleThreeDotsBtnClick = (e) => {
    e.stopPropagation();
    setIsPopupOpen((prevState) => !prevState);
  };

  const [isDeleteServiceModalOpen, setIsDeleteServiceModalOpen] =
    useState(false);

  const openDeleteServiceModal = (e) => {
    e.stopPropagation();
    setIsDeleteServiceModalOpen(true);
    // onClose();
  };
  const closeDeleteServiceModal = () => setIsDeleteServiceModalOpen(false);

  // const onEdit = () => {
  //   setIsInputVisible(true);
  //   setTimeout(() => {
  //     inputRef.current?.focus(); // Фокусуємо інпут після оновлення стану
  //   }, 0);
  // };

  // const handleBlur = (e) => {
  //   setServiceName(e.target.value);
  //   setIsInputVisible(false);
  // };

  async function convertFileToBase64(file) {
    if (!(file instanceof Blob)) {
      return null; // Если файл не Blob (File), возвращаем null
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64Data = reader.result.split(",")[1]; // Извлекаем только Base64 часть
          resolve(base64Data);
        } catch (error) {
          reject(new Error(`Failed to parse Base64: ${error.message}`));
        }
      };
      reader.onerror = (error) =>
        reject(new Error(`FileReader error: ${error.message}`));
      reader.readAsDataURL(file);
    });
  }

  const downloadAvatar = async (e) => {
    const newAvatar = e.target.files[0];
    setLogoPreview(URL.createObjectURL(newAvatar));
    if (newAvatar) {
      const base64 = await convertFileToBase64(newAvatar);
      setLogo(base64);
    }
    // const makeBase64Logo = async () => {
    //   const base64Logo = await new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onload = () => resolve(reader.result); // Повертає Base64
    //     reader.onerror = (error) => reject(error);
    //     reader.readAsDataURL(newAvatar); // Читає файл як Base64
    //   });

    //   setLogo(base64Logo); // записуємо в стан лого в base64, яке передаєм на бек
    // };
    // makeBase64Logo();
  };

  const handleSubmit = (values, actions) => {
    const data = {
      ...values,
      logo,
      name: serviceName,
    };

    if (createAutoService) {
      dispatch(createService(data))
        .unwrap()
        .then(() => {
          toast.success("Сервіс успішно створено", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllServices());
        })
        .catch((err) => {
          console.log(err);

          toast.error("Щось сталося, спробуйте ще раз", {
            position: "top-center",
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        });
    } else if (updateAutoService) {
      dispatch(updateService({ payload: data, companyId: station.id }))
        .unwrap()
        .then(() => {
          toast.success("Сервіс оновлено", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        })
        .catch((err) => {
          console.log(err);

          toast.error("Щось сталося, спробуйте ще раз", {
            position: "top-center",
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        });
    } else {
      console.log({ ...data, clientOrganization: true });
    }
    actions.resetForm();
    onClose();
  };

  return (
    <div className={css.modal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={AddServiceSchema}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur
      >
        <Form>
          <div className={css.headerWrapper}>
            <BsXLg className={css.closeIcon} onClick={onClose} />
            {createClient && (
              <p className={css.autoServiceName}>
                {serviceName ? serviceName : "ТОВ"}
              </p>
            )}
            {(createAutoService || updateAutoService) && (
              <p className={css.autoServiceName}>
                {serviceName ? serviceName : "Назва СТО"}
              </p>
            )}
            {updateAutoService && (
              <div className={css.serviceNameWrapper}>
                {/* {isInputVisible ? (
                  <Field
                    innerRef={inputRef}
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    type="text"
                    name="name"
                    className={css.changedInput}
                    onBlur={handleBlur}
                  ></Field>
                ) : (
                  <p className={css.autoServiceName}>{serviceName}</p>
                )} */}
                <button
                  type="button"
                  className={css.btn}
                  onClick={handleThreeDotsBtnClick}
                  ref={buttonRef}
                >
                  <BsThreeDotsVertical className={css.dotsIcon} />
                  {/* <div className={css.popupContainer}> */}
                  <Popup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    buttonRef={buttonRef}
                    onDelete={openDeleteServiceModal}
                  />
                  {/* </div> */}
                </button>
              </div>
            )}
          </div>
          <div className={css.logo}>
            {logoPreview && (
              <img
                src={logoPreview || station?.logo}
                alt="logo"
                className={css.logoImg}
              />
            )}
            <div>
              <Field
                type="file"
                className={css.inputDisabled}
                id="avatar"
                name="avatar"
                onChange={downloadAvatar}
              />
              <label htmlFor="avatar" className={css.avatarLabel}>
                {createClient ? (
                  <>
                    <BsFillCameraFill className={css.camera} />
                    <p className={css.uploadAvatarText}>+ Додати аватар</p>
                  </>
                ) : (
                  <>
                    <BsFillCloudUploadFill className={css.cloud} />
                    <p className={css.uploadLogoText}>Завантажте логотип</p>
                  </>
                )}
              </label>
            </div>
          </div>
          <div className={css.form}>
            {/* {createClient ||
              (createAutoService && ( */}
            <div className={css.addressWrapper}>
              <label htmlFor="companyName" className={css.labelName}>
                {createClient ? `Назва компанії` : `Назва СТО`}
              </label>

              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="companyName"
                  placeholder="Назва"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            {/* // ))} */}
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
            <div className={css.addressWrapper}>
              <label htmlFor="email" className={css.labelName}>
                Email
              </label>
              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="email"
                  placeholder="service@mail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="fop_name" className={css.label}>
                  ПІБ ФОП
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="fop_name"
                    placeholder="Іваненко Іван Іванович"
                  />
                  <ErrorMessage
                    name="fop_name"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <label htmlFor="ipn" className={css.label}>
                  ІПН
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="ipn"
                    placeholder="1385446843"
                  />
                  <ErrorMessage
                    name="ipn"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="iban" className={css.label}>
                Рахунок IBAN
              </label>
              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="iban"
                  placeholder="UA123456789012345678901234567"
                />
                <ErrorMessage
                  name="iban"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="bank_name" className={css.label}>
                  Банк
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="bank_name"
                    placeholder="ПриватБанк"
                  />
                  <ErrorMessage
                    name="bank_name"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <label htmlFor="mfo_bank" className={css.label}>
                  МФО банку
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="mfo_bank"
                    placeholder="305299"
                  />
                  <ErrorMessage
                    name="mfo_bank"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="legal_address" className={css.label}>
                Юридична адреса
              </label>
              <div className={css.fieldWithErrorWrapper}>
                <Field
                  className={css.input}
                  type="text"
                  name="legal_address"
                  placeholder="м. Київ, вул. Шевченка, буд. 10"
                />
                <ErrorMessage
                  name="legal_address"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <div className={css.wrapper}>
              <label htmlFor="manager_phone" className={css.label}>
                Телефон менеджера
              </label>

              <div className={css.inputsWrapper}>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="manager_phone"
                    placeholder="380671234567"
                  />
                  <ErrorMessage
                    name="manager_phone"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="manager_name"
                    placeholder="Діана"
                  />
                  <ErrorMessage
                    name="manager_name"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
            </div>
            <div className={css.inputsWrapper}>
              <div className={css.wrapper}>
                <label htmlFor="office_phone" className={css.label}>
                  Телефон офіс
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="office_phone"
                    placeholder="380671234567"
                  />
                  <ErrorMessage
                    name="office_phone"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
              </div>
              <div className={css.wrapper}>
                <label htmlFor="director_phone" className={css.label}>
                  Керівник
                </label>
                <div className={css.fieldWithErrorWrapper}>
                  <Field
                    className={css.input}
                    type="text"
                    name="director_phone"
                    placeholder="380671234567"
                  />
                  <ErrorMessage
                    name="director_phone"
                    component="div"
                    className={css.errorMsg}
                  />
                </div>
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
      </Formik>
      {isDeleteServiceModalOpen && (
        <Modal
          isOpen={isDeleteServiceModalOpen}
          onClose={closeDeleteServiceModal}
        >
          <DeleteServiceModal onClose={closeDeleteServiceModal} />
        </Modal>
      )}
    </div>
  );
}
