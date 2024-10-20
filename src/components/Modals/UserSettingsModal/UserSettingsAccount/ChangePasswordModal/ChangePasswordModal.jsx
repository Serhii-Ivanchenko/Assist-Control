import { Form, Formik, Field, ErrorMessage } from "formik";
import css from "./ChangePasswordModal.module.css";
import { useId, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../../redux/auth/operations";
import toast from "react-hot-toast";
import * as Yup from "yup";

const Validation = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "Пароль повиннен бути не коротше за 8 символів")
    .required("Поле 'Старий пароль' повинно бути заповнене"),
  newPassword: Yup.string()
    .min(8, "Пароль повиннен бути не коротше за 8 символів")
    .required("Поле 'Новий пароль' повинно бути заповнене"),
});

export default function ChangePasswordModal({ onClose }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const dispatch = useDispatch();

  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const handleSubmit = async (values, actions) => {
    const { oldPassword, newPassword } = values;
    try {
      await dispatch(
        changePassword({ new_password: newPassword, old_password: oldPassword })
      ).unwrap();
      toast.success("Пароль успішно змінено :)", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Упс, щось пішло не так :( Спробуйте ще", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
      actions.resetForm();
    }
  };

  const oldPasswordId = useId();
  const newPasswordId = useId();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Validation}
      >
        <Form className={css.changePasswordForm}>
          <div className={css.inputWrapper}>
            <label htmlFor={oldPasswordId} className={css.registrationlabel}>
              Старий пароль
            </label>
            <div className={css.inputWithIconWrapper}>
              <IoKeyOutline className={css.inputIcon} />
              <Field
                name="oldPassword"
                type={isPasswordShown ? "text" : "password"}
                className={css.input}
                id={oldPasswordId}
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
              name="oldPassword"
              component="div"
              className={css.errorMsg}
            />
          </div>

          <div className={css.inputWrapper}>
            <label htmlFor={newPasswordId} className={css.registrationlabel}>
              Новий пароль
            </label>
            <div className={css.inputWithIconWrapper}>
              <IoKeyOutline className={css.inputIcon} />
              <Field
                name="newPassword"
                type={isPasswordShown ? "text" : "password"}
                id={newPasswordId}
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
              name="newPassword"
              component="div"
              className={css.errorMsg}
            />
          </div>

          <div className={css.btnBox}>
            <button type="submit" className={css.btnSave}>
              Змінити
            </button>
            <button type="button" onClick={onClose} className={css.btnClose}>
              Відміна
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
