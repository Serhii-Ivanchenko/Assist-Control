import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../LogInForm/LoginForm.module.css";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useState } from "react";
import { LoginSchema } from "../../validationSchemas/loginSchema";
import { Link } from "react-router-dom";
import { TbMailFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import toast from "react-hot-toast";

export default function LoginForm() {
  const dispatch = useDispatch();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSubmitLogin = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .catch(() => {
        toast.error("Щось сталося, спробуйте ще раз");
      });

    actions.resetForm();
  };

  return (
    <div className={css.loginForm}>
      <div className={css.topSectionWrapper}>
        <h2 className={css.loginHeader}>Вхід</h2>
        <p className={css.loginText}>Welcome to Assist CONTROL</p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmitLogin}
        >
          <Form>
            <div className={css.wrapper}>
              <div className={css.inputWrapper}>
                <label htmlFor="email" className={css.loginLabel}>
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
              <button type="button" className={css.forgotPasswordLink}>
                Забули пароль?
              </button>
            </div>
            <button type="submit" className={css.submitButton}>
              Увійти
            </button>
          </Form>
        </Formik>
        <p className={css.googleRegistrationText}>Або увійдіть за допомогою</p>
        <div className={css.googleWrapper}>{/* <GoogleBtn /> */}</div>
      </div>
      <div className={css.bottomTextWrapper}>
        <p className={css.loginLabel}>Ще не маєте акаунт?</p>
        <Link to="/register" className={css.bottomLink}>
          Зареєструватись
        </Link>
      </div>
    </div>
  );
}
