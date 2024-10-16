import { Form, Formik, Field, ErrorMessage } from "formik";
import css from "./ChangePasswordModal.module.css"
import { useId, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../../redux/auth/operations";
import toast from "react-hot-toast";


export default function ChangePasswordModal({onClose}) {

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const dispatch = useDispatch();

  const onButtonEyeClick = () => {
    setIsPasswordShown(!isPasswordShown);
    };
    
    const initialValues = {
        oldPassword: "",
        newPassword: "",
    }

    const handleSubmit = async (values) => {
        const { oldPassword, newPassword } = values;
        try{
        await dispatch(changePassword({ new_password: newPassword, old_password: oldPassword}));
         toast.success(
      "Пароль успішно змінено)",
{
            position: "top-right",
            duration: 3000,
            style: {
              background: "#242525",
              color: "#FFFFFF",
            },
          }
            ),
             onClose()
        } catch (error) {
             console.error("Error changing password:", error.response.data);
        }
    }

    const oldPasswordId = useId();
    const newPasswordId = useId();

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
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
                <label
                  htmlFor={newPasswordId}
                  className={css.registrationlabel}
                >
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
                <button type="submit">Change</button>
                <button type="button" onClick={onClose}>Close</button>
                </Form>
            </Formik>
        </div>
    )
}