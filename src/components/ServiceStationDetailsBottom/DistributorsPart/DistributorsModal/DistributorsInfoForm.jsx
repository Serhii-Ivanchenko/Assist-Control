import { useState } from "react";
import CustomRadioBtn from "../../../CustomRadioBtn/CustomRadioBtn";
import styles from "./DistributorsModal.module.css";

const DistributorsInfoForm = () => {
  const [selectedPayment, setSelectedPayment] = useState("prepaid");

  const handleRadioChange = (value) => {
    setSelectedPayment(value);
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.addressBox}>
        <label className={styles.label}>Фактична адреса</label>
        <input type="text" defaultValue="Харків, Байрона 189 оф 27" />
      </div>

      <div className={styles.radioBox}>
        <label className={styles.label}>Умови відвантаження</label>
        <div className={styles.radioGroup}>
          <label
            className={styles.radioBtn}
            onClick={() => handleRadioChange("prepaid")}
          >
            <CustomRadioBtn isChecked={selectedPayment === "prepaid"} />
            Передоплата
          </label>
          <label
            className={styles.radioBtn}
            onClick={() => handleRadioChange("actual")}
          >
            <CustomRadioBtn isChecked={selectedPayment === "actual"} />
            Фактична
          </label>
          <label
            className={styles.radioBtn}
            onClick={() => handleRadioChange("postpaid")}
          >
            <CustomRadioBtn isChecked={selectedPayment === "postpaid"} />
            Післяплата
          </label>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="text"
              defaultValue="5 днів"
              style={{ width: "87px" }}
            />
          </div>
        </div>
      </div>

      <div className={styles.rowContainer}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            ПІБ ФОП
            <input
              className={styles.input}
              type="text"
              defaultValue="Іваненко Іван Іванович"
              style={{ width: "214px" }}
            />
          </label>
        </div>

        <div className={styles.inputBox}>
          <label className={styles.label}>
            ІПН
            <input
              className={styles.input}
              type="text"
              defaultValue="1385446843"
              style={{ width: "130px" }}
            />
          </label>
        </div>
      </div>

      <div className={styles.inputBox}>
        <label className={styles.label}>
          Рахунок IBAN
          <input
            className={styles.input}
            type="text"
            defaultValue="UA123456789012345678901234567"
            style={{ width: "304px" }}
          />
        </label>
      </div>

      <div className={styles.rowContainer}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Банк
            <input
              className={styles.input}
              type="text"
              defaultValue="ПриватБанк"
              style={{ width: "132px" }}
            />
          </label>
        </div>

        <div className={styles.inputBox}>
          <label className={styles.label}>
            МФО банку
            <input
              className={styles.input}
              type="text"
              defaultValue="305299"
              style={{ width: "94px" }}
            />
          </label>
        </div>
      </div>

      <div className={styles.inputBox}>
        <label className={styles.label}>
          Юридична адреса
          <input
            className={styles.input}
            type="text"
            defaultValue="м. Київ, вул. Шевченка, буд. 10"
            style={{ width: "269px" }}
          />
        </label>
      </div>

      <div className={styles.rowContainer}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Телефон менеджера
            <input
              className={styles.input}
              type="tel"
              defaultValue="+380671234567"
              style={{ width: "158px" }}
            />
          </label>
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Ім&apos;я менеджера
            <input
              className={styles.input}
              type="text"
              defaultValue="Діана"
              style={{ width: "83px" }}
            />
          </label>
        </div>
      </div>

      <div className={styles.rowContainer}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Телефон офіс
            <input
              className={styles.input}
              type="tel"
              defaultValue="+380671234567"
              style={{ width: "158px" }}
            />
          </label>
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Керівник
            <input
              className={styles.input}
              type="tel"
              defaultValue="+380671234567"
              style={{ width: "158px" }}
            />
          </label>
        </div>
      </div>
    </form>
  );
};

export default DistributorsInfoForm;
