import css from "../ChangePasswordWithEmailForm/ChangePasswordWithEmailForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { ChangePasswordSchema } from "../../validationSchemas/changePasswordSchema.js";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordWithEmail } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";

export default function ChangePasswordWithEmailForm() {
  const { api_key } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSubmitChangePasswordWithEmail = (values, actions) => {
    const { password } = values;

    dispatch(resetPasswordWithEmail({ api_key, password }))
      .unwrap()
      .then(() => {
        toast.success("Пароль успішно змінено", {
          position: "top-center",
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        }),
          navigate("/login");
      })
      .catch((error) => {
        console.log(error);

        toast.error("Щось сталося, спробуйте ще раз", {
          position: "top-center",
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
    actions.resetForm();
  };

  return (
    <div className={css.changePasswordForm}>
      <h2 className={css.changePasswordFormHeader}>Зміна пароля</h2>
      <p className={css.changePasswordFormText}>
        Для зміни пароля введіть новий пароль
      </p>
      <Formik
        initialValues={{
          password: "",
          repeatPassword: "",
        }}
        validationSchema={ChangePasswordSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmitChangePasswordWithEmail}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <label htmlFor="password" className={css.label}>
              Новий пароль*
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
            <label htmlFor="repeatPassword" className={css.label}>
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
          <button
            type="submit"
            className={css.button}
            onSubmit={handleSubmitChangePasswordWithEmail}
          >
            Відправити
          </button>
        </Form>
      </Formik>
    </div>
  );
}
