import css from "../SendResetEmailForm/SendResetEmailForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TbMailFilled } from "react-icons/tb";
import { SendResetEmailSchema } from "../../validationSchemas/sendResetEmailSchema.js";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { sendRestEmail } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";

export default function SendResetEmailForm({ onClose }) {
  const dispatch = useDispatch();

  const handleSubmitSendResetEmail = (values, actions) => {
    const { email } = values;

    dispatch(sendRestEmail(email))
      .unwrap()
      .then(() => {
        toast.success(
          "Для завершення скидання паролю перевірте електронну пошту",
          {
            position: "top-center",
            duration: 30000,
            style: {
              background: "#242525",
              color: "#FFFFFF",
            },
          }
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Щось сталося, спробуйте ще раз", {
          position: "top-center",
          style: {
            background: "#242525",
            color: "#FFFFFF",
          },
        });
      });

    actions.resetForm();
  };

  return (
    <div className={css.sendResetEmailForm}>
      <div className={css.headerAndIconWrapper}>
        <h2 className={css.sendResetEmailFormHeader}>Скидання пароля</h2>
        <button type="button" className={css.closeBtn}>
          <IoCloseSharp className={css.closeIcon} onClick={onClose} />
        </button>
      </div>
      <p className={css.sendResetEmailFormText}>
        Для скидання пароля введіть email
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={SendResetEmailSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmitSendResetEmail}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <label htmlFor="email" className={css.label}>
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
          <button type="submit" className={css.button}>
            Відправити
          </button>
        </Form>
      </Formik>
      <button type="button" className={css.button} onClick={onClose}>
        Закрити
      </button>
    </div>
  );
}
