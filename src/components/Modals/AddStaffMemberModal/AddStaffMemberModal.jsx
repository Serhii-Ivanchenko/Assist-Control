import DatePicker from "react-datepicker";
import css from "./AddStaffMemberModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { BsTrash } from "react-icons/bs";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsKeyFill } from "react-icons/bs";
import { useState } from "react";
import avatar from "../../../assets/images/avatar_default.png";
// import Modal from "../Modal/Modal";
import ThreeDotsModal from "./ThreeDotsModal/ThreeDotsModal";
import doc from "../../../assets/images/passport_image.png";
import "../../sharedComponents/NotificationModal/NotificationModal.css";
import { useRef } from "react";
import { useEffect } from "react";
import { TfiClose } from "react-icons/tfi";

import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import ScheduleTable from "../../sharedComponents/ScheduleTable/ScheduleTable.jsx";
import AnimatedContent from "./AnimatedContent.jsx";
import UploadComponent from "../../sharedComponents/UploadComponent/UploadComponent.jsx";
import RightOfAccessSelect from "./RightOfAccessSelect/RightOfAccessSelect.jsx";
import { useDispatch } from "react-redux";
import {
  createEmployee,
  getAllEmployees,
  updateEmployeeData,
} from "../../../redux/settings/operations.js";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Select from "./Select/Select.jsx";
import { ImFilePdf } from "react-icons/im";

registerLocale("uk", uk);

// const convertFileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!(file instanceof Blob)) {
//       reject(new Error("Invalid file type. Expected Blob or File."));
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(file);
//   });
// };

const positionOptions = [
  { value: "Механік", label: "Механік" },
  { value: "Кухар", label: "Кухар" },
  { value: "Працівник", label: "Працівник" },
  { value: "Власник", label: "Власник" },
  // { value: "Менеджер", label: "Мнеджер" },
];

const roleOptions = [
  { value: "Адміністратор", label: "Адміністратор" },
  { value: "Менеджер", label: "Менеджер" },
  { value: "Працівник", label: "Працівник" },
  // { value: "Керівник відділу", label: "Керівник відділу" },
];

export default function AddStaffMemberModal({ onClose, employeeInfo }) {
  const [employee, setEmployee] = useState(employeeInfo || {});
  const [isDateOpen, setDateOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [photo, setPhoto] = useState(employee.logo || avatar);
  const [passportImg, setPassportImg] = useState(null);
  const [itnImg, setItnImg] = useState(null);
  const [diplomaImg, setDiplomaImg] = useState(null);
  const [cvImg, setCVImg] = useState(null);
  const [contractFile, setContractFile] = useState(null);
  const [agreementFile, setAgreementFile] = useState(null);
  const [employmentFile, setEmploymentFile] = useState(null);
  const [laborDoc, setLaborDoc] = useState(null);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [phone, setPhone] = useState("");
  // const [logo, setLogo] = useState(null); // стан для прев'ю лого
  // const [logoBase64, setLogoBase64] = useState(null); // стан, куди записується лого в base64

  const buttonRefs = useRef([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const Validation = Yup.object().shape({
    name: Yup.string()
      .min(2, "Занадто коротке")
      .max(30, "Занадто довге")
      .required("Поле повинно бути заповнене"),
    phone: Yup.string()
      .matches(
        /^\+380\d{9}$/,
        "Телефон повинен відповідати формату +380123456789"
      )
      .required("Поле повинно бути заповнене"),
    address: Yup.string(),
    birthday: Yup.string(),
    position: Yup.string(),
    role: Yup.string(),
    email: Yup.string()
      .email("Неправильний формат електронної пошти")
      .test(
        "is-valid-domain",
        "Поле повинно містити коректний домен (наприклад, .com, .org)",
        (value) => {
          if (!value) return true;
          const domainPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return domainPattern.test(value);
        }
      ),
    login: Yup.string(),
    password: Yup.string(),
    period: Yup.string(),
    rate: Yup.number(),
    minRate: Yup.number(),
    amount: Yup.number(),
    sparesAmount: Yup.number(),
    sparesPrice: Yup.number(),
    profit: Yup.number(),
    // schedule: Yup.string(),
  });

  const handleDateButtonClick = () => setDateOpen((prev) => !prev);

  const toggleSettings = (index) => {
    setSettingsIsOpen(settingsIsOpen === index ? null : index);
  };

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const newLogoUrl = URL.createObjectURL(file);
      setPhoto(newLogoUrl);

      setFieldValue("files.logo", file);
    }
  };

  const formatPhone = (value) => {
    let digits = value.replace(/[^\d]/g, "");

    if (!digits.startsWith("38")) {
      digits = "38" + digits;
    }

    return "+" + digits.slice(0, 12);
  };

  const handlePhoneInput = (value) => {
    let digits = value.replace(/[^\d]/g, "");

    if (digits.length >= 10) {
      if (digits.startsWith("38")) {
        digits = "+" + digits;
      } else {
        digits = "+38" + digits;
      }
    }
    return digits;
  };

  const generateRandomStringPassword = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const generateLogin = (values, setFieldValue) => {
    if (values.phone) {
      setFieldValue("login", values.phone);
      setFieldValue("password", generateRandomStringPassword(12));
    } else {
      return;
    }
  };

  const handleShowLoginWarning = (values) => {
    if (!values.phone) {
      setShowLoginWarning(true);
    } else {
      setShowLoginWarning(false);
    }
  };

  const deleteLoginAndPassword = (setFieldValue) => {
    setFieldValue("login", "");
    setFieldValue("password", "");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRefs.current &&
        !buttonRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setSettingsIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   const baseUrl = "https://aps.assist.cam"; // Замість цього вкажіть свій базовий URL

  //   // Використовуємо fetch для отримання зображення
  //   fetch(`${baseUrl}/${employee.logo}`)
  //     .then((response) => response.blob()) // Отримуємо файл як Blob
  //     .then((blob) => {
  //       const objectURL = URL.createObjectURL(blob); // Створюємо тимчасовий URL
  //       setPhoto(objectURL); // Зберігаємо URL в стан
  //     })
  //     .catch((error) =>
  //       console.error("Помилка при завантаженні файлу:", error)
  //     );
  // }, [employee.logo]);

  const initialValues = {
    name: employee.name || "",
    phone: employee.phone || phone,
    address: employee.address || "",
    birthday: employee.birthday || new Date(),
    position: employee.position || "Механік",
    role: employee.role || "Працівник",
    email: employee.email || "",
    login: employee.login || "",
    password: employee.password || "",
    period: "",
    rate: employee.rate || 0.0,
    minRate: employee.minRate || 0.0,
    amount: employee.amount || 0.0,
    sparesAmount: employee.sparesAmount || 0.0,
    sparesPrice: employee.sparesPrice || 0.0,
    // profit: 0.0,
    status: employee.status || 1,
    // schedule: {},
    selectedPages: [],
    files: {
      passport: employee.passport || passportImg,
      itn: employee.itn || itnImg,
      diploma: employee.diploma || diplomaImg,
      laborBook: employee.laborBook || laborDoc,
      CV: employee.CV || cvImg,
      contract: employee.contract || contractFile,
      employment: employee.employment || employmentFile,
      agreement: employee.agreement || agreementFile,
      logo: photo,
    },
    // openSchedule: true,
  };

  const handleSubmit = async (values, actions) => {
    const dateOnly = values.birthday
      ? new Date(values.birthday).toLocaleDateString("en-CA")
      : null;

    try {
      // const base64Files = {};

      // for (const [key, file] of Object.entries(values.files)) {
      //   if (typeof file === "string" && file === employee[key]) {
      //     // Якщо файл не змінювався, пропускаємо
      //     continue;
      //   } else if (file instanceof Blob) {
      //     // Якщо це новий файл, конвертуємо його у Base64
      //     base64Files[key] = await new Promise((resolve, reject) => {
      //       const reader = new FileReader();
      //       reader.onload = () => resolve(reader.result);
      //       reader.onerror = (error) => reject(error);
      //       reader.readAsDataURL(file);
      //     });
      //   } else {
      //     base64Files[key] = null;
      //   }
      // }
      const base64Files = {};

      for (const [key, file] of Object.entries(values.files)) {
        if (typeof file === "string" && file === employee[key]) {
          continue; // Якщо файл не змінювався, пропускаємо
        } else if (file instanceof Blob) {
          base64Files[key] = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const base64Data = reader.result.split(",")[1];
                resolve(base64Data);
              } catch (error) {
                reject(new Error(`Failed to parse Base64: ${error.message}`));
              }
            };
            reader.onerror = (error) =>
              reject(new Error(`FileReader error: ${error.message}`));
            reader.readAsDataURL(file);
          });
        } else {
          base64Files[key] = null;
        }
      }

      console.log("Base64 files:", base64Files);

      const employeeData = {
        ...values,
        ...base64Files,
        birthday: dateOnly,
        files: undefined,
      };

      if (employee.id) {
        // const { files, ...restValues } = values;

        const employeeDataToUpdate = {
          employee_id: employee.id,
          ...employeeData,
        };

        console.log("дані при редагуванні", employeeDataToUpdate);
        // Якщо ID існує, оновлюємо працівника
        const response = await dispatch(
          updateEmployeeData(employeeDataToUpdate)
        );
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Успішно оновлено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          onClose();
          dispatch(getAllEmployees());
        }
        // onClose();
        console.log("Після оновлення:", employeeData);
      } else if (employee.id === undefined) {
        const employeeDataToCreate = { ...employeeData };
        console.log(
          "Перед створенням нового працівника:",
          employeeDataToCreate
        );

        // Якщо ID відсутнє, створюємо нового працівника
        const response = await dispatch(createEmployee(employeeDataToCreate));
        console.log("Після створення нового працівника:", employeeDataToCreate);
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Успішно створено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllEmployees());
          onClose();
        }
      }
      // console.log("Після відправкою:", employeeData, values.files);
      // console.log(employeeData);
      actions.resetForm();
      onClose();
    } catch (error) {
      console.error("Помилка створення/oновлення працівника:", error);
      toast.error("Помилка при створенні/оновленні!", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
    }
  };

  return (
    <div className={css.modal}>
      <TfiClose onClick={onClose} className={css.closeBtn} />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Validation}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={css.mainInfo}>
              <div className={css.column}>
                <div className={css.iputBox}>
                  <label className={css.label}>ПІБ *</label>
                  <Field
                    name="name"
                    className={css.input}
                    placeholder="Блудов Олександр Анатолійович"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={css.erroMessage}
                  />
                </div>

                <div className={css.iputBox}>
                  <label className={css.label}>Телефон *</label>
                  <div className={css.phoneLine}>
                    <Field
                      name="phone"
                      className={`${css.input} ${css.inputPhone}`}
                      placeholder="380733291212"
                      // value={phone}
                      onChange={(e) => {
                        const formattedInput = handlePhoneInput(e.target.value);
                        setPhone(formattedInput);
                        setFieldValue("phone", formatPhone(e.target.value));
                      }}
                    />
                    <button
                      type="button"
                      className={css.phoneUpload}
                      onClick={handleChangePhoto}
                    >
                      <BsFillCloudUploadFill size={33} />
                    </button>
                    <input
                      type="file"
                      name="logo"
                      className={css.docInput}
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      // multiple
                      // accept="image/*"
                    />
                    {/* <div className={css.phoneImgBox}> */}
                    <img
                      src={photo || avatar}
                      alt=""
                      className={css.phoneImg}
                    />
                    {/* </div> */}
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className={css.erroMessage}
                  />
                </div>

                <div className={css.iputBox}>
                  <label className={css.label}>Місце проживання</label>
                  <Field
                    name="address"
                    className={css.input}
                    placeholder="Харків, вул. Таджицька, буд. 38"
                  />
                </div>
              </div>

              <div className={`${css.column} ${css.columnTwo}`}>
                <div className={css.iputBox}>
                  <label className={css.label}>Дата народження</label>
                  <div className={css.calendarBox}>
                    <DatePicker
                      id=""
                      className={`${css.input} ${css.calendar}`}
                      name="birthday"
                      dateFormat="dd.MM.yyyy"
                      selected={values.birthday}
                      onChange={(date) => setFieldValue("birthday", date)}
                      open={isDateOpen}
                      onClickOutside={() => setDateOpen(false)}
                      onSelect={() => setDateOpen(false)}
                      toggleCalendarOnIconClick
                      readOnly
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      locale="uk"
                    />

                    <BsCalendar2Week
                      size={24}
                      className={css.calendarIcon}
                      onClick={handleDateButtonClick}
                    />
                  </div>
                </div>

                <div className={css.iputBox}>
                  <label className={css.label}>Посада</label>
                  <div className={css.inputAndArrow}>
                    <Field
                      name="position"
                      component={Select}
                      array={positionOptions}
                    />
                  </div>
                </div>

                <div className={css.iputBox}>
                  <label className={css.label}>Ролі</label>
                  <div className={css.inputAndArrow}>
                    <Field name="role" component={Select} array={roleOptions} />
                  </div>
                </div>
              </div>

              <div className={`${css.column} ${css.columnThree}`}>
                <div className={css.iputBox}>
                  <label className={css.label}>E-mail</label>
                  <Field
                    name="email"
                    className={css.input}
                    placeholder="birthday@gmail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={css.erroMessage}
                  />
                </div>

                <div className={css.iputBoxLP}>
                  <div className={css.lpIconBox}>
                    <Field
                      name="login"
                      className={css.inputLP}
                      value={values.login}
                      readOnly
                    />
                    <BsFillPersonFill size={16} className={css.lpIcon} />
                  </div>

                  <div className={css.lpIconBox}>
                    <Field
                      name="password"
                      className={css.inputLP}
                      value={values.password}
                      readOnly
                    />
                    <BsKeyFill size={16} className={css.lpIcon} />
                  </div>
                </div>

                <div className={css.btnAndLabel}>
                  <p className={css.label}>Логін та пароль</p>

                  <div className={css.buttons}>
                    <button
                      type="button"
                      className={css.create}
                      onClick={() => {
                        generateLogin(values, setFieldValue);
                        handleShowLoginWarning(values);
                      }}
                    >
                      Згенерувати
                    </button>
                    <button
                      type="button"
                      className={css.delete}
                      onClick={() => deleteLoginAndPassword(setFieldValue)}
                    >
                      {" "}
                      <BsTrash size={18} />{" "}
                    </button>

                    {showLoginWarning && (
                      <p className={css.loginWarning}>
                        Заповніть спочатку поле &quot;Телефон&quot;
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className={css.documentsWrapper}>
              <div className={css.documents}>
                <div className={css.docColumn}>
                  <div className={css.docBox}>
                    <UploadComponent
                      title="Паспорт"
                      name="passport"
                      fieldname="files.passport"
                      setFieldValue={setFieldValue}
                      setLogo={setPassportImg}
                      // staffModal={true}
                    />
                    {/* {passportImg.map((img, index) => (
                      <img
                        key={index}
                        src={(employee.passport || img) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ))} */}

                    {passportImg || employee.passport ? (
                      <img
                        src={(employee.passport || passportImg) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={`${css.docBox} ${css.docBoxID}`}>
                    <UploadComponent
                      title="ІПН"
                      name="itn"
                      fieldname="files.itn"
                      setFieldValue={setFieldValue}
                      setLogo={setItnImg}
                      // staffModal={true}
                    />
                    {/* {itnImg.map((img, index) => (
                      <img
                        key={index}
                        src={(employee.itn || img) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ))} */}
                    {itnImg || employee.itn ? (
                      <img
                        src={(employee.itn || itnImg) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={css.docColumn}>
                  <div className={css.docBox}>
                    <UploadComponent
                      title="Диплом"
                      name="diploma"
                      fieldname="files.diploma"
                      setFieldValue={setFieldValue}
                      setLogo={setDiplomaImg}
                      // staffModal={true}
                    />
                    {/* {diplomaImg.map((img, index) => (
                      <img
                        key={index}
                        src={(employee.diploma || img) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ))} */}

                    {diplomaImg || employee.diploma ? (
                      <img
                        src={(employee.diploma || diplomaImg) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={css.docBox}>
                    <UploadComponent
                      title="Трудова"
                      name="laborBook"
                      fieldname="files.laborBook"
                      setFieldValue={setFieldValue}
                      setLogo={setLaborDoc}
                    />
                    {laborDoc || employee.laborBook ? (
                      <img
                        src={(employee.laborBook || laborDoc) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={css.docBox}>
                    <UploadComponent
                      title="Резюме"
                      name="CV"
                      fieldname="files.CV"
                      setFieldValue={setFieldValue}
                      setLogo={setCVImg}
                    />
                    {cvImg || employee.CV ? (
                      <img
                        src={(employee.CV || cvImg) && doc}
                        alt="doc"
                        className={css.docImage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={css.docColumn}>
                  <div
                    className={`${css.docBox} ${css.docBoxContracts}`}
                    ref={(el) => (buttonRefs.current[0] = el)}
                  >
                    <label className={css.docLabel}>
                      <BsReceipt className={css.iconAgr} />
                      Договір підряда
                      <BsThreeDotsVertical
                        className={css.icon}
                        onClick={() => toggleSettings(0)}
                        ref={buttonRefs.current[0]}
                      />
                      {contractFile || employee.contract ? (
                        <ImFilePdf className={css.iconAgr} />
                      ) : (
                        <span style={{ width: "18px", height: "18px" }} />
                      )}
                    </label>
                    {settingsIsOpen === 0 && (
                      <ThreeDotsModal
                        isVisible={true}
                        name="contract"
                        setFile={setContractFile}
                        fieldname="files.contract"
                        setFieldValue={setFieldValue}
                        onClose={() => toggleSettings(0)}
                        // buttonRef={buttonRefs.current[0]}
                        // onClose={closePopover}
                      />
                    )}
                    {/* <Field
                      type="file"
                      name="contract"
                      className={css.docInput}
                    /> */}
                  </div>
                  <div
                    className={`${css.docBox} ${css.docBoxContracts}`}
                    ref={(el) => (buttonRefs.current[1] = el)}
                  >
                    <label className={css.docLabel}>
                      <BsReceipt className={css.iconAgr} />
                      Договір про найм
                      <BsThreeDotsVertical
                        className={css.icon}
                        onClick={() => toggleSettings(1)}
                        ref={buttonRefs.current[1]}
                      />
                      {employmentFile || employee.employment ? (
                        <ImFilePdf className={css.iconAgr} />
                      ) : (
                        <span style={{ width: "18px", height: "18px" }} />
                      )}
                    </label>
                    {settingsIsOpen === 1 && (
                      <ThreeDotsModal
                        isVisible={true}
                        name="employment"
                        setFile={setEmploymentFile}
                        fieldname="files.employment"
                        setFieldValue={setFieldValue}
                        onClose={() => toggleSettings(1)}
                        // buttonRef={buttonRefs.current[1]}
                        // onClose={closePopover}
                      />
                    )}
                    {/* <Field
                      type="file"
                      name="employment"
                      className={css.docInput}
                    /> */}
                  </div>
                  <div
                    className={`${css.docBox} ${css.docBoxContracts}`}
                    ref={(el) => (buttonRefs.current[2] = el)}
                  >
                    <label className={css.docLabel}>
                      <BsReceipt className={css.iconAgr} />
                      Договір МВ
                      <BsThreeDotsVertical
                        className={css.icon}
                        ref={buttonRefs.current[2]}
                        onClick={() => toggleSettings(2)}
                      />
                      {agreementFile || employee.agreement ? (
                        <ImFilePdf className={css.iconAgr} />
                      ) : (
                        <span style={{ width: "18px", height: "18px" }} />
                      )}
                    </label>
                    {settingsIsOpen === 2 && (
                      <ThreeDotsModal
                        isVisible={true}
                        name="agreement"
                        setFile={setAgreementFile}
                        fieldname="files.agreement"
                        setFieldValue={setFieldValue}
                        onClose={() => toggleSettings(2)}
                        // buttonRef={buttonRefs.current[2]}
                        // onClose={closePopover}
                      />
                    )}
                    {/* <Field
                      type="file"
                      name="agreement"
                      className={css.docInput}
                    /> */}
                  </div>
                </div>
              </div>
              {/* <RightOfAccessSelect /> */}
              <Field
                name="selectedPages"
                component={RightOfAccessSelect}
                setFieldValue={setFieldValue}
              />
            </div>

            {/* Rate Part */}
            <div className={css.salary}>
              <div className={css.calculation}>
                <div className={css.leftPart}>
                  <div className={css.rateDiv}>
                    <p className={css.rate}>Ставка</p>
                    <div className={css.inputAndArrow}>
                      <Field
                        as="select"
                        name="period"
                        className={css.periodInput}
                      >
                        <option value="day">День</option>
                        <option value="week">Тиждень</option>
                        <option value="month">Місяць</option>
                        <option value="year">Рік</option>
                      </Field>
                      <BsFillCaretDownFill
                        className={css.arrowIcon}
                        size={10}
                      />
                    </div>
                  </div>
                  <Field
                    name="rate"
                    className={css.rateInput}
                    placeholder="15000"
                  />
                  <div className={css.minRateDiv}>
                    <Field
                      name="minRate"
                      className={css.minRateInput}
                      placeholder="8000"
                    />
                    <p className={css.text}>Мінімальна</p>
                  </div>
                </div>

                <p className={css.plus}>+</p>

                <div className={css.rightPart}>
                  <p className={css.percent}>%</p>

                  <ul className={css.inputsList}>
                    <li className={css.listItem}>
                      <Field
                        name="amount"
                        className={css.salaryInput}
                        placeholder="40"
                      />
                      <div className={css.salaryLabel}>
                        <p className={css.salaryTitle}>СР</p>
                        <p
                          className={`${css.salaryText} ${css.salaryTextAmount}`}
                        >
                          Сума робіт
                        </p>
                      </div>
                    </li>

                    <li className={css.listItem}>
                      <Field
                        name="sparesAmount"
                        className={css.salaryInput}
                        placeholder="40"
                      />
                      <div className={css.salaryLabel}>
                        <p className={css.salaryTitle}>СЗ</p>
                        <p className={css.salaryText}>Сума запчастин</p>
                      </div>
                    </li>

                    <li className={css.listItem}>
                      <Field
                        name="sparesPrice"
                        className={css.salaryInput}
                        placeholder="40"
                      />
                      <div className={css.salaryLabel}>
                        <p className={css.salaryTitle}>НЗ</p>
                        <p className={css.salaryText}>Націнка запчастини</p>
                      </div>
                    </li>

                    <li className={css.listItem}>
                      <Field
                        name="profit"
                        className={css.salaryInput}
                        placeholder="40"
                      />
                      <div className={css.salaryLabel}>
                        <p className={css.salaryTitle}>ЧП</p>
                        <p className={css.salaryText}>Чистого прибутку</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <p className={css.salaryRules}>Правила начислення зарплатні</p>
            </div>

            <div className={css.schedule}>
              <div className={css.cblabelBox}>
                <label className={css.scheduleLabel}>
                  <Field
                    type="checkbox"
                    name="schedule"
                    className={css.checkbox}
                  />
                  <span className={css.checkboxSpan}>
                    <BsCheckLg className={css.cbIcon} />
                  </span>
                  Графік роботи
                </label>
                <AnimatedContent>
                  <ScheduleTable isEditing={true} />
                </AnimatedContent>
              </div>
            </div>

            <div className={css.btnBox}>
              <button type="button" className={css.close} onClick={onClose}>
                Закрити
              </button>
              <button type="submit" className={css.save}>
                <BsCheckLg size={18} /> Зберегти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
