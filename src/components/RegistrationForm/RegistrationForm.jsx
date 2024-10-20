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
import toast from "react-hot-toast";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSubmitRegistration = (values, actions) => {
    const { name, email, phone, password } = values;

    const userData = {
      name,
      email,
      phone_number: phone,
      password,
    };

    dispatch(register(userData))
      .unwrap()
      .then(() => {
        toast.success(
          "Для завершення реєстрації потрібно підтвердити email адресу. Будь ласка, перевірте електронну пошту",
          {
            position: "top-center",
            duration: 30000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          }
        );
      })
      .catch((err) => {
        if (err.status === 400) {
          toast.error("Користувач вже існує", {
            position: "top-center",
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        } else {
          toast.error("Щось сталося, спробуйте ще раз", {
            position: "top-center",
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        }
      });

    actions.resetForm();
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
          onSubmit={handleSubmitRegistration}
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
                    placeholder="Артем Середенко"
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
                    placeholder="+380123456789"
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
                  Підтвердження паролю*
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
      <div className={css.bottomSectionWrapper}>
        <div className={css.bottomTextWrapper}>
          <p className={css.bottomText}>Вже маєте Аккаунт?</p>
          <Link to="/login" className={css.bottomLink}>
            Увійти
          </Link>
        </div>
        <p className={css.bottomTextOr}>або</p>
        <p className={css.bottomSectionText}>Або увійдіть за допомогою</p>
        <div className={css.googleWrapper}>
          <GoogleBtn />
        </div>
      </div>
    </div>
  );
}
