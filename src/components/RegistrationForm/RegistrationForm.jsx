import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../../components/RegistrationForm/RegistrationForm.module.css";
import { RegistrationSchema } from "../../validationSchemas/registrationSchema";
import { IoPerson } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { TbMailFilled } from "react-icons/tb";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <div className={css.registrationForm}>
      <div>
        <h2 className={css.registrationHeader}>Реєстрація</h2>
        <p className={css.welcomeText}>Welcome to Assist CONTROL</p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            repeatPassword: "",
          }}
          validationSchema={RegistrationSchema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          <Form>
            <div className={css.wrapper}>
              <div className={css.inputWrapper}>
                <label htmlFor="name" className={css.registrationlabel}>
                  Ім’я*
                </label>
                <div className={css.inputWithIconWrapper}>
                  <IoPerson className={css.inputIcon} />
                  <Field
                    name="name"
                    className={css.input}
                    placeholder="Artem Seredenko"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <label htmlFor="email" className={css.registrationlabel}>
                  E-mail*
                </label>
                <div className={css.inputWithIconWrapper}>
                  <TbMailFilled className={css.inputIcon} />
                  <Field
                    name="email"
                    type="email"
                    className={css.input}
                    placeholder="mpdart2013@gmail.com"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <label htmlFor="phone" className={css.registrationlabel}>
                  Телефон*
                </label>
                <div className={css.inputWithIconWrapper}>
                  <BsTelephone className={css.inputIcon} />
                  <Field
                    name="phone"
                    className={css.input}
                    placeholder="+38555000"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <label htmlFor="password" className={css.registrationlabel}>
                  Пароль*
                </label>
                <div className={css.inputWithIconWrapper}>
                  <IoKeyOutline className={css.inputIcon} />
                  <Field
                    name="password"
                    type={isPasswordShown ? "text" : "password"}
                    className={css.input}
                  />
                  <button
                    type="button"
                    className={css.eyeIconBtn}
                    onClick={onButtonEyeClick}
                  >
                    {isPasswordShown ? (
                      <ImEye className={css.eyeIcon} />
                    ) : (
                      <ImEyeBlocked className={css.eyeIcon} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.inputWrapper}>
                <label
                  htmlFor="repeatPassword"
                  className={css.registrationlabel}
                >
                  Повторіть пароль*
                </label>
                <div className={css.inputWithIconWrapper}>
                  <IoKeyOutline className={css.inputIcon} />
                  <Field
                    name="repeatPassword"
                    type={isPasswordShown ? "text" : "password"}
                    className={css.input}
                  />
                  <button
                    type="button"
                    className={css.eyeIconBtn}
                    onClick={onButtonEyeClick}
                  >
                    {isPasswordShown ? (
                      <ImEye className={css.eyeIcon} />
                    ) : (
                      <ImEyeBlocked className={css.eyeIcon} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
            </div>
            <button type="submit" className={css.submitButton}>
              Зареєструватись
            </button>
          </Form>
        </Formik>
      </div>
      <div className={css.bottomTextWrapper}>
        <p className={css.bottomText}>Вже маєте Аккаунт?</p>
        <Link to="/login" className={css.bottomLink}>
          Вхід
        </Link>
      </div>
    </div>
  );
}
