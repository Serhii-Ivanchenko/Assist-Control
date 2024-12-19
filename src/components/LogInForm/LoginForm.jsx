import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../LogInForm/LoginForm.module.css";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useState } from "react";
import { LoginSchema } from "../../validationSchemas/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { TbMailFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logIn } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";
import SendResetEmailForm from "../SendResetEmailForm/SendResetEmailForm.jsx";
import Modal from "../Modals/Modal/Modal.jsx";
import { selectUser } from "../../redux/auth/selectors.js";
import firstPage from "../../utils/firstPage.js";

export default function LoginForm() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector(selectUser);

  const renderPage = firstPage(userData);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSubmitLogin = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Welcome to Assist CONTROL", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
        dispatch(getUserData());
        // navigate({ renderPage });
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error("Невірний логін або пароль", {
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
            </div>
            <button
              type="button"
              className={css.forgotPasswordLink}
              onClick={openModal}
            >
              Забули пароль?
            </button>
            <button type="submit" className={css.submitButton}>
              Увійти
            </button>
          </Form>
        </Formik>
      </div>
      <p className={css.bottomText}>Або увійдіть за допомогою</p>
      <div className={css.googleWrapper}>
        <GoogleBtn />
      </div>
      <div className={css.bottomTextWrapper}>
        <p className={css.linkToRegisterText}>Ще не маєте акаунт?</p>
        <Link to="/register" className={css.bottomLink}>
          Зареєструватись
        </Link>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <SendResetEmailForm onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}
