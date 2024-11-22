import DatePicker from "react-datepicker";
import css from "./AddStaffMemberModal.module.css";
import { Field, Form, Formik } from "formik";
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
import "../../ClientInfo/NotificationModal/NotificationModal.css";
import { useRef } from "react";
import { useEffect } from "react";

export default function AddStaffMemberModal({ onClose }) {
  const [isDateOpen, setDateOpen] = useState(false);
  const handleDateButtonClick = () => setDateOpen((prev) => !prev);

  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  // const popoverRef = useRef(null);
  const buttonRefs = useRef([]);

  const toggleSettings = (index) => {
    setSettingsIsOpen(settingsIsOpen === index ? null : index);
  };

  const closePopover = () => {
    setSettingsIsOpen(false);
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const generateRandomStringPassword = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const generateLogin = () => {
    setLogin(generateRandomString(8));
    setPassword(generateRandomStringPassword(12));
  };

  const deleteLoginAndPassword = () => {
    setLogin(""), setPassword("");
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

  const initialValues = {
    name: "",
    phone: "",
    address: "",
    birthday: new Date(),
    position: "",
    role: "",
    email: "",
    passport: "",
    ID: "",
    diploma: "",
    laborBook: "",
    CV: "",
    contract: "",
    employment: "",
    agreement: "",
    period: "month",
    rate: "",
    minRate: "",
    amount: "",
    sparesAmount: "",
    sparesPrice: "",
    profit: "",
    schedule: "false",
  };

  const handleSubmit = (values, actions) => {
    const dateOnly = values.birthday
      ? values.birthday.toLocaleDateString("en-CA")
      : null;
    const submittedValues = { ...values, birthday: dateOnly };
    console.log(submittedValues);
    actions.resetForm();
  };

  return (
    <div className={css.modal}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className={css.mainInfo}>
              <div className={css.column}>
                <div className={css.iputBox}>
                  <label className={css.label}>ПІБ</label>
                  <Field
                    name="name"
                    className={css.input}
                    placeholder="Блудов Олександр Анатолійович"
                  />
                </div>

                <div className={css.iputBox}>
                  <label className={css.label}>Телефон</label>
                  <div className={css.phoneLine}>
                    <Field
                      name="phone"
                      className={`${css.input} ${css.inputPhone}`}
                      placeholder="+380733291212"
                    />
                    <button type="button" className={css.phoneUpload}>
                      <BsFillCloudUploadFill size={33} />
                    </button>
                    <img src={avatar} alt="" className={css.phoneImg} />
                  </div>
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
                    <Field as="select" name="position" className={css.input}>
                      <option value="m">Механік</option>
                      <option value="c">Кухар</option>
                      <option value="w">Працівник</option>
                    </Field>
                    <BsFillCaretDownFill className={css.iconArrowRight} />
                  </div>
                </div>

                <div className={css.iputBox}>
                  <label className={css.label}>Ролі</label>
                  <div className={css.inputAndArrow}>
                    <Field
                      as="select"
                      name="role"
                      className={css.input}
                      placeholder="Адміністратор"
                    >
                      <option value="admin">Адміністратор</option>
                      <option value="manager">Менеджер</option>
                      <option value="employee">Працівник</option>
                    </Field>
                    <BsFillCaretDownFill className={css.iconArrowRight} />
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
                </div>

                <div className={css.iputBoxLP}>
                  <div className={css.lpIconBox}>
                    <Field name="login" className={css.inputLP} value={login} />
                    <BsFillPersonFill size={16} className={css.lpIcon} />
                  </div>

                  <div className={css.lpIconBox}>
                    <Field
                      name="password"
                      className={css.inputLP}
                      value={password}
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
                      onClick={generateLogin}
                    >
                      Згенерувати
                    </button>
                    <button
                      type="button"
                      className={css.delete}
                      onClick={deleteLoginAndPassword}
                    >
                      {" "}
                      <BsTrash size={18} />{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={css.documents}>
              <div className={css.docColumn}>
                <div className={css.docBox}>
                  <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
                    {" "}
                    <BsFillCloudUploadFill className={css.icon} /> Паспорт
                  </label>
                  <Field type="file" name="passport" className={css.docInput} />
                  <img src={doc} alt="doc" className={css.docImage} />
                  <img src={doc} alt="doc" className={css.docImage} />
                </div>

                <div className={`${css.docBox} ${css.docBoxID}`}>
                  <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
                    {" "}
                    <BsFillCloudUploadFill className={css.icon} /> ІПН
                  </label>
                  <Field type="file" name="ID" className={css.docInput} />

                  <img src={doc} alt="doc" className={css.docImage} />
                  <img src={doc} alt="doc" className={css.docImage} />
                </div>
              </div>

              <div className={css.docColumn}>
                <div className={css.docBox}>
                  <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
                    {" "}
                    <BsFillCloudUploadFill className={css.icon} /> Диплом
                  </label>
                  <Field type="file" name="diploma" className={css.docInput} />
                  <img src={doc} alt="doc" className={css.docImage} />
                  <img src={doc} alt="doc" className={css.docImage} />
                </div>

                <div className={css.docBox}>
                  <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
                    {" "}
                    <BsFillCloudUploadFill className={css.icon} />
                    Трудова
                  </label>
                  <Field
                    type="file"
                    name="laborBook"
                    className={css.docInput}
                  />
                  <img src={doc} alt="doc" className={css.docImage} />
                </div>

                <div className={css.docBox}>
                  <label className={`${css.docLabel} ${css.docLabelForPhoto}`}>
                    {" "}
                    <BsFillCloudUploadFill className={css.icon} />
                    Резюме
                  </label>
                  <Field type="file" name="CV" className={css.docInput} />
                  <img src={doc} alt="doc" className={css.docImage} />
                </div>
              </div>

              <div className={css.docColumn}>
                <div
                  className={css.docBox}
                  ref={(el) => (buttonRefs.current[0] = el)}
                >
                  <label className={css.docLabel}>
                    <BsReceipt className={css.icon} />
                    Договір підряда
                    <BsThreeDotsVertical
                      className={css.icon}
                      onClick={() => toggleSettings(0)}
                      ref={buttonRefs.current[0]}
                    />
                  </label>
                  {settingsIsOpen === 0 && (
                    <ThreeDotsModal
                      isVisible={true}
                      buttonRef={buttonRefs.current[0]}
                      onClose={closePopover}
                    />
                  )}

                  <Field type="file" name="contract" className={css.docInput} />
                </div>

                <div
                  className={css.docBox}
                  ref={(el) => (buttonRefs.current[1] = el)}
                >
                  <label className={css.docLabel}>
                    <BsReceipt className={css.icon} />
                    Договір про найм
                    <BsThreeDotsVertical
                      className={css.icon}
                      onClick={() => toggleSettings(1)}
                      ref={buttonRefs.current[1]}
                    />
                  </label>

                  {settingsIsOpen === 1 && (
                    <ThreeDotsModal
                      isVisible={true}
                      buttonRef={buttonRefs.current[1]}
                      onClose={closePopover}
                    />
                  )}

                  <Field
                    type="file"
                    name="employment"
                    className={css.docInput}
                  />
                </div>

                <div
                  className={css.docBox}
                  ref={(el) => (buttonRefs.current[2] = el)}
                >
                  <label className={css.docLabel}>
                    <BsReceipt className={css.icon} />
                    Договір МВ
                    <BsThreeDotsVertical
                      className={css.icon}
                      ref={buttonRefs.current[2]}
                      onClick={() => toggleSettings(2)}
                    />
                  </label>
                  {settingsIsOpen === 2 && (
                    <ThreeDotsModal
                      isVisible={true}
                      buttonRef={buttonRefs.current[2]}
                      onClose={closePopover}
                    />
                  )}
                  <Field
                    type="file"
                    name="agreement"
                    className={css.docInput}
                  />
                </div>
              </div>
            </div>

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
              <div>
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
              </div>

              <p>Графік</p>
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
