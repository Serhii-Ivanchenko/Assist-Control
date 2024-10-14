import { Form, Formik, Field, ErrorMessage } from "formik";
import css from "./ChangePasswordModal.module.css"
import { useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";

export default function ChangePasswordModal({onClose}) {

     const [isPasswordShown, setIsPasswordShown] = useState(false);
  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
  };

    return (
        <div>
            <Formik>
                <Form>
                    <div className={css.inputWrapper}>
                <label htmlFor="password" className={css.registrationlabel}>
                  Старий пароль
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
                  Новий пароль
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
                <button type="button">Change</button>
                <button type="button" onClick={onClose}>Close</button>
                </Form>
            </Formik>
        </div>
    )
}