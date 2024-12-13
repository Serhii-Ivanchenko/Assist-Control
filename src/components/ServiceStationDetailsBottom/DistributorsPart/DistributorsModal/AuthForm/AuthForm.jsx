import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AuthForm.module.css";

const initialValues = {
  website: "",
  distrEmail: "",
  login: "",
  password: "",
  tokenAPI: "",
  priceEmail: "",
};

const validationSchema = Yup.object({
  website: Yup.string(),
  distrEmail: Yup.string().email("Невірний формат e-mail"),
  login: Yup.string().required("Поле обов'язкове"),
  password: Yup.string().required("Поле обов'язкове"),
  tokenAPI: Yup.string(),
  priceEmail: Yup.string().email("Невірний формат e-mail"),
});

const AuthForm = ({ formikRef }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    setSubmitting(false);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.authForm}>
          <div className={styles.inputBox}>
            <label htmlFor="website">Сайт</label>
            <div className={styles.columnBox}>
              <Field
                name="website"
                type="text"
                placeholder="https://example.com"
              />
              <ErrorMessage
                name="website"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="distrEmail">E-mail постачальника</label>
            <div className={styles.columnBox}>
              <Field
                name="distrEmail"
                type="email"
                placeholder="Busmarket@gmail.com"
              />
              <ErrorMessage
                name="distrEmail"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="login">Login</label>
            <div className={styles.columnBox}>
              <Field name="login" type="text" placeholder="Введіть ваш логін" />
              <ErrorMessage
                name="login"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">Password</label>
            <div className={styles.columnBox}>
              <Field
                name="password"
                type="password"
                placeholder="Введіть ваш пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="tokenAPI">Token API</label>
            <div className={styles.columnBox}>
              <Field
                name="tokenAPI"
                type="text"
                placeholder="Введіть Token API (необов'язково)"
              />
              <ErrorMessage
                name="tokenAPI"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="priceEmail">E-mail для прайсів</label>
            <div className={styles.columnBox}>
              <Field
                name="priceEmail"
                type="email"
                placeholder="Busmarket@gmail.com"
              />
              <ErrorMessage
                name="priceEmail"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div className={styles.btnBox}>
            <button type="submit" className={styles.btn}>
              Тест
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
