import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../LogInForm/LoginForm.module.css";
import { IoKeyOutline, IoPerson } from "react-icons/io5";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useState } from "react";
import { LoginSchema } from "../../validationSchemas/loginSchema";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <div className={css.loginForm}>
      <div className={css.topSectionWrapper}>
        <h2 className={css.loginHeader}>Вхід</h2>
        <p className={css.loginText}>Welcome to Assist CONTROL</p>
        <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          <Form>
            <div className={css.wrapper}>
              <div className={css.inputWrapper}>
                <label htmlFor="name" className={css.loginLabel}>
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
                <label htmlFor="password" className={css.loginLabel}>
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
            </div>
            <button type="submit" className={css.submitButton}>
              Логін
            </button>
          </Form>
        </Formik>
        <p className={css.loginBottomText}>Немає Акаунту?</p>
        <Link to="/register" className={css.linkToRegister}>
          Зареєструватись
        </Link>
      </div>
      <div className={css.bottomTextWrapper}>
        <p className={css.loginLabel}>Немає Акаунту?</p>
        <Link to="/register" className={css.bottomLink}>
          Зареєструватись
        </Link>
      </div>
    </div>
  );
}
