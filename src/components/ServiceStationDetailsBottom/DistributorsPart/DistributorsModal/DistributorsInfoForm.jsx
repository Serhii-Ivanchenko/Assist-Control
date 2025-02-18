import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CiSquarePlus } from "react-icons/ci";
import CustomRadioBtn from "../../../CustomRadioBtn/CustomRadioBtn";
import styles from "./DistributorsModal.module.css";
import { useState } from "react";

const DistributorsInfoForm = ({ distributor, setDistributor, formikRef }) => {
  const [contacts, setContacts] = useState(
    distributor?.contacts || [{ name: "", phone: "", position: "" }]
  );

  const addContact = () => {
    setContacts([...contacts, { name: "", phone: "", position: "" }]);
  };

  const initialValues = {
    address: distributor?.address || "",
    paymentCondition: distributor?.paymentCondition || "",
    days: distributor?.days || "",
    owner: distributor?.owner || "",
    code: distributor?.code || "",
    bill: distributor?.bill || "",
    bank: distributor?.bank || "",
    bankCode: distributor?.bankCode || "",
    companyAddress: distributor?.companyAddress || "",
    // managerPhone: distributor?.managerPhone || "",
    // managerName: distributor?.managerName || "",
    // officePhone: distributor?.officePhone || "",
    // ownerPhone: distributor?.ownerPhone || "",
    contacts: contacts,
  };

  const validationSchema = Yup.object({
    address: Yup.string().required("* Поле обов'язкове"),
    paymentCondition: Yup.string(),
    days: Yup.string(),
    owner: Yup.string(),
    code: Yup.string(),
    bill: Yup.string(),
    bank: Yup.string(),
    bankCode: Yup.string(),
    companyAddress: Yup.string(),
    // managerPhone: Yup.string()
    //   .required("* Поле обов'язкове")
    //   .matches(/^\+?\d*$/, "Телефон може містити лише цифри та знак +"),
    // managerName: Yup.string(),
    // officePhone: Yup.string().matches(
    //   /^\+?\d*$/,
    //   "Телефон може містити лише цифри та знак +"
    // ),
    // ownerPhone: Yup.string().matches(
    //   /^\+?\d*$/,
    //   "Телефон може містити лише цифри та знак +"
    // ),
    contacts: Yup.array().of(
      Yup.object({
        phone: Yup.string().matches(
          /^\+?\d*$/,
          "Телефон може містити лише цифри та знак +"
        ),
        name: Yup.string(),
        position: Yup.string(),
      })
    ),
  });
  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    setDistributor((prev) => ({ ...prev, ...values }));
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.formContainer}>
          <div className={styles.addressBox}>
            <label className={styles.label}>Фактична адреса</label>
            <Field
              type="text"
              name="address"
              placeholder="Харків, Байрона 189 оф 27"
              className={styles.input}
            />
            <ErrorMessage
              name="address"
              component="div"
              className={styles.errorAddress}
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

          {values.contacts.map((_, index) => (
            <div key={index} className={styles.rowContainer}>
              <div className={styles.inputBox}>
                <label className={styles.label}>
                  Телефон
                  <Field
                    className={`${styles.input} ${styles.contactsInput}`}
                    type="tel"
                    name={`contacts[${index}].phone`}
                    placeholder="+380671234567"
                  />
                </label>
                <ErrorMessage
                  name={`contacts[${index}].phone`}
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.inputBox}>
                <label className={styles.label}>
                  Ім&apos;я
                  <Field
                    className={`${styles.input} ${styles.contactsInput}`}
                    type="text"
                    name={`contacts[${index}].name`}
                    placeholder="Діана"
                  />
                </label>
                <ErrorMessage
                  name={`contacts[${index}].name`}
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.inputBox}>
                <label className={styles.label}>
                  Посада
                  <Field
                    className={`${styles.input} ${styles.contactsInput}`}
                    type="tel"
                    name={`contacts[${index}].position`}
                    placeholder="Менеджер"
                  />
                </label>
                <ErrorMessage
                  name={`contacts[${index}].position`}
                  component="div"
                  className={styles.error}
                />
              </div>
              <button
                type="button"
                onClick={addContact}
                className={styles.addBtn}
              >
                <CiSquarePlus className={styles.plusIcon} />
              </button>
            </div>
          ))}

          {/* <div className={styles.rowContainer}>
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
                <ErrorMessage
                  name="managerPhone"
                  component="div"
                  className={styles.error}
                />
              </label>
            </div>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Ім&apos;я менеджера
                <Field
                  className={styles.input}
                  type="text"
                  name="managerName"
                  placeholder="Діана"
                  style={{ width: "158px" }}
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
          </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default DistributorsInfoForm;
