import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "../EnterAmountModal/EnterAmountModal.module.css";
import { EnterAmountSchema } from "../../../validationSchemas/EnterAmountSchema";
import BtnsCloseAndSubmit from "../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit.jsx";

export default function EnterAmountModal({onClose}) {
  const initialValues = {
    sum: "",
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
              name="sum"
              className={css.input}
              placeholder="2000"
            />
            <ErrorMessage name="sum" component="div" className={css.errorMsg} />
          </div>
          <div>
            <BtnsCloseAndSubmit
              handleSubmit={handleSubmit}
              btnSave={"Внести"}
              onClose={onClose}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
