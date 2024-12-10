import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../EnterAmountModal/EnterAmountModal.module.css";
import { EnterAmountSchema } from "../../../validationSchemas/EnterAmountSchema";

export default function EnterAmountModal() {
  const initialValues = {
    field: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css.wrapper}>
      <p className={css.header}>Введіть суму</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={EnterAmountSchema}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur
      >
        <Form>
          <div className={css.inputWrapper}>
            <Field
              type="text"
              name="field"
              className={css.input}
              placeholder="2000"
            />
            <ErrorMessage
              name="field"
              component="div"
              className={css.errorMsg}
            />
          </div>
          <div>{/* <BtnsCloseAndSubmit onClose={onClose} /> */}</div>
        </Form>
      </Formik>
    </div>
  );
}
