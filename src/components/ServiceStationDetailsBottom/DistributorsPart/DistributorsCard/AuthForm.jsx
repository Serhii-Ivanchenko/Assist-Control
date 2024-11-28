import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./DistributorsCard.module.css";

const initialValues = {
  login: "",
  password: "",
  tokenAPI: "",
};

const validationSchema = Yup.object({
  login: Yup.string().required(""),
  password: Yup.string().required(""),
  tokenAPI: Yup.string(),
});

const AuthForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.authForm}>
          <div className={styles.inputBox}>
            <label htmlFor="login">Login</label>
            <Field name="login" type="text" />
            <ErrorMessage
              name="login"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="tokenAPI">Token API</label>
            <Field name="tokenAPI" type="text" />
            <ErrorMessage
              name="tokenAPI"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.btnBox}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}
            >
              Зберегти
            </button>
            <button type="button" className={styles.btn}>
              Тест
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
