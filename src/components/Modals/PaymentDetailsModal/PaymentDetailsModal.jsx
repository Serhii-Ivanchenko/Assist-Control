import { Field, Form, Formik } from "formik";
import css from "../PaymentDetailsModal/PaymentDetailsModal.module.css";
import privat24Icon from "../../../assets/images/PaymentIcons/pm-25 1.png";
import plataByMono from "../../../assets/images/PaymentIcons/plataByMono.png";
import { BsXLg } from "react-icons/bs";
import { BsCreditCard2Back } from "react-icons/bs";
import { BsRecord2 } from "react-icons/bs";
import { BsRecord } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BsCurrencyBitcoin } from "react-icons/bs";

export default function PaymentDatailsModal({ onClose, sumToPay }) {
  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(sumToPay);
    actions.resetForm();
    onClose();
  };

  return (
    <div className={css.paymentDatailsModal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <h3 className={css.modalHeader}>Обрані продукти для замовлення</h3>
      <div className={css.topSectionWrapper}>
        <div className={css.firstSectionWrapper}>
          <p className={css.productName}>Назва продукту:</p>
          <p className={css.productName}>Вартість</p>
        </div>
        <div className={css.secondSectionWrapper}>
          <p className={css.balance}>Поповнення балансу</p>
          <p className={css.sum}>{sumToPay} грн</p>
        </div>
        <div className={css.thirdSectionWrapper}>
          <p className={css.productName}>До сплати:</p>
          <p className={css.sum}>{sumToPay} грн</p>
        </div>
      </div>
      <Formik
        initialValues={{
          picked: "Банківська картка, PayPal",
        }}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={css.buttomSectionWrapper}>
            <div className={css.fieldWrapper}>
              {values.picked === "Банківська картка, PayPal" ? (
                <BsRecord2 className={css.checkedIcon} />
              ) : (
                <BsRecord className={css.checkedIcon} />
              )}
              <BsCreditCard2Back className={css.icon} />
              <Field
                type="radio"
                name="picked"
                id="payPal"
                value="Банківська картка, PayPal"
                className={css.input}
              />
              <label htmlFor="payPal" className={css.label}>
                Банківська картка, PayPal
              </label>
            </div>
            <div className={css.fieldWrapper}>
              {values.picked === "Банківська картка (грн.), Приват24" ? (
                <BsRecord2 className={css.checkedIcon} />
              ) : (
                <BsRecord className={css.checkedIcon} />
              )}
              <img
                src={privat24Icon}
                alt="Логотип Приват 24"
                className={css.icon}
              />
              <Field
                type="radio"
                name="picked"
                id="privat"
                value="Банківська картка (грн.), Приват24"
                className={css.input}
              />
              <label htmlFor="privat" className={css.label}>
                Банківська картка (грн.), Приват24
              </label>
            </div>
            <div className={css.fieldWrapper}>
              {values.picked === "Онлайн-оплата карткою (грн.)" ? (
                <BsRecord2 className={css.checkedIcon} />
              ) : (
                <BsRecord className={css.checkedIcon} />
              )}
              <img
                src={plataByMono}
                alt="Логотип Моно банка"
                className={css.monoLogo}
              />
              <Field
                type="radio"
                name="picked"
                id="mono"
                value="Онлайн-оплата карткою (грн.)"
                className={css.input}
              />
              <label htmlFor="mono" className={css.label}>
                Онлайн-оплата карткою (грн.)
              </label>
            </div>
            <div className={css.fieldWrapper}>
              {values.picked === "Рахунок на оплату для юридичних осіб" ? (
                <BsRecord2 className={css.checkedIcon} />
              ) : (
                <BsRecord className={css.checkedIcon} />
              )}
              <BsHandbag className={css.icon} />
              <Field
                type="radio"
                name="picked"
                id="bill"
                value="Рахунок на оплату для юридичних осіб"
                className={css.input}
              />
              <label htmlFor="bill" className={css.label}>
                Рахунок на оплату для юридичних осіб
              </label>
            </div>
            <div className={css.fieldWrapper}>
              {values.picked === "Квитанція банку для фізичних осіб" ? (
                <BsRecord2 className={css.checkedIcon} />
              ) : (
                <BsRecord className={css.checkedIcon} />
              )}
              <BsReceipt className={css.icon} />
              <Field
                type="radio"
                name="picked"
                id="receipt"
                value="Квитанція банку для фізичних осіб"
                className={css.input}
              />
              <label htmlFor="receipt" className={css.label}>
                Квитанція банку для фізичних осіб
              </label>
            </div>
            <div className={css.fieldWrapper}>
              {values.picked === "Криптовалюта (BTC, ETH, USDT та ін.)" ? (
                <BsRecord2 className={css.checkedIcon} />
              ) : (
                <BsRecord className={css.checkedIcon} />
              )}
              <BsCurrencyBitcoin className={css.icon} />
              <Field
                type="radio"
                name="picked"
                id="crypto"
                value="Криптовалюта (BTC, ETH, USDT та ін.)"
                className={css.input}
              />
              <label htmlFor="crypto" className={css.label}>
                Криптовалюта (BTC, ETH, USDT та ін.)
              </label>
            </div>
            <div className={css.btnWrapper}>
              <button type="submit" className={css.btn}>
                Сплатити
              </button>
              <p className={css.paymentMethod}>{values.picked}</p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}