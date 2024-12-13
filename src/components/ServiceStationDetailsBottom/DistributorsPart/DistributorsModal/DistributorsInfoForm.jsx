import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomRadioBtn from "../../../CustomRadioBtn/CustomRadioBtn";
import styles from "./DistributorsModal.module.css";

const DistributorsInfoForm = ({ distributor, setDistributor, formikRef }) => {
  const initialValues = {
    address: distributor.address || "",
    paymentCondition: distributor.paymentCondition || "",
    days: distributor.days || "",
    owner: distributor.owner || "",
    code: distributor.code || "",
    bill: distributor.bill || "",
    bank: distributor.bank || "",
    bankCode: distributor.bankCode || "",
    companyAddress: distributor.companyAddress || "",
    managerPhone: distributor.managerPhone || "",
    manager: distributor.manager || "",
    officePhone: distributor.officePhone || "",
    ownerPhone: distributor.ownerPhone || "",
  };

  const validationSchema = Yup.object({
    address: Yup.string(),
    paymentCondition: Yup.string(),
    days: Yup.string(),
    owner: Yup.string(),
    code: Yup.string(),
    bill: Yup.string(),
    bank: Yup.string(),
    bankCode: Yup.string(),
    companyAddress: Yup.string(),
    managerPhone: Yup.string(),
    manager: Yup.string(),
    officePhone: Yup.string(),
    ownerPhone: Yup.string(),
  });

  const handleSubmit = (values) => {
    setDistributor(values);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={styles.formContainer}>
          <div className={styles.addressBox}>
            <label className={styles.label}>Фактична адреса</label>
            <Field
              type="text"
              name="address"
              placeholder="Харків, Байрона 189 оф 27"
              className={styles.input}
            />
          </div>

          <div className={styles.radioBox}>
            <label className={styles.label}>Умови відвантаження</label>
            <div className={styles.radioGroup}>
              <label
                className={styles.radioBtn}
                onClick={() => setFieldValue("paymentCondition", "prepaid")}
              >
                <Field name="paymentCondition">
                  {({ field }) => (
                    <CustomRadioBtn isChecked={field.value === "prepaid"} />
                  )}
                </Field>
                <span>Передоплата</span>
              </label>

              <label
                className={styles.radioBtn}
                onClick={() => setFieldValue("paymentCondition", "actual")}
              >
                <Field name="paymentCondition">
                  {({ field }) => (
                    <CustomRadioBtn isChecked={field.value === "actual"} />
                  )}
                </Field>
                <span>Фактична</span>
              </label>

              <label
                className={styles.radioBtn}
                onClick={() => setFieldValue("paymentCondition", "postpaid")}
              >
                <Field name="paymentCondition">
                  {({ field }) => (
                    <CustomRadioBtn isChecked={field.value === "postpaid"} />
                  )}
                </Field>
                <span>Післяплата</span>
              </label>

              <div className={styles.inputBox}>
                <Field
                  className={styles.input}
                  type="text"
                  name="days"
                  placeholder="5 днів"
                  style={{ width: "87px" }}
                />
              </div>
            </div>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                ПІБ ФОП
                <Field
                  className={styles.input}
                  type="text"
                  name="owner"
                  placeholder="Іваненко Іван Іванович"
                  style={{ width: "214px" }}
                />
              </label>
            </div>

            <div className={styles.inputBox}>
              <label className={styles.label}>
                ІПН
                <Field
                  className={styles.input}
                  type="text"
                  name="code"
                  placeholder="1385446843"
                  style={{ width: "130px" }}
                />
              </label>
            </div>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label}>
              Рахунок IBAN
              <Field
                className={styles.input}
                type="text"
                name="bill"
                placeholder="UA123456789012345678901234567"
                style={{ width: "304px" }}
              />
            </label>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Банк
                <Field
                  className={styles.input}
                  type="text"
                  name="bank"
                  placeholder="ПриватБанк"
                  style={{ width: "132px" }}
                />
              </label>
            </div>

            <div className={styles.inputBox}>
              <label className={styles.label}>
                МФО банку
                <Field
                  className={styles.input}
                  type="text"
                  name="bankCode"
                  placeholder="305299"
                  style={{ width: "94px" }}
                />
              </label>
            </div>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label}>
              Юридична адреса
              <Field
                className={styles.input}
                type="text"
                name="companyAddress"
                placeholder="м. Київ, вул. Шевченка, буд. 10"
                style={{ width: "269px" }}
              />
            </label>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Телефон менеджера
                <Field
                  className={styles.input}
                  type="tel"
                  name="managerPhone"
                  placeholder="+380671234567"
                  style={{ width: "158px" }}
                />
              </label>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Ім&apos;я менеджера
                <Field
                  className={styles.input}
                  type="text"
                  name="manager"
                  placeholder="Діана"
                  style={{ width: "83px" }}
                />
              </label>
            </div>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Телефон офіс
                <Field
                  className={styles.input}
                  type="tel"
                  name="officePhone"
                  placeholder="+380671234567"
                  style={{ width: "158px" }}
                />
              </label>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Керівник
                <Field
                  className={styles.input}
                  type="tel"
                  name="ownerPhone"
                  placeholder="+380671234567"
                  style={{ width: "158px" }}
                />
              </label>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DistributorsInfoForm;
