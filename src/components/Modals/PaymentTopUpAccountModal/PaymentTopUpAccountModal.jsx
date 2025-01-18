import css from "../PaymentTopUpAccountModal/PaymentTopUpAccountModal.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { PaymentSchema } from "../../../validationSchemas/paymentSchema.js";
import Modal from "../Modal/Modal.jsx";
import PaymentDatailsModal from "../PaymentDetailsModal/PaymentDetailsModal.jsx";
import logoMasterCard from "../../../assets/images/PaymentIcons/logo-mastercard 1.png";
import logoMasterCard2x from "../../../assets/images/PaymentIcons/logo-mastercard 2x.png";
import logoVisa from "../../../assets/images/PaymentIcons/logo-visa 1.png";
import logoVisa2x from "../../../assets/images/PaymentIcons/logo-visa 2x.png";
import logoPayPal from "../../../assets/images/PaymentIcons/logo-paypal 1.png";
import logoPayPal2x from "../../../assets/images/PaymentIcons/logo-paypal 2x.png";
import logoPrivat from "../../../assets/images/PaymentIcons/logo-privat 1.png";
import logoPrivat2x from "../../../assets/images/PaymentIcons/logo-privat 2x.png";
import logoMono from "../../../assets/images/PaymentIcons/plata-by-mono-24 1.png";
import logoMono2x from "../../../assets/images/PaymentIcons/plata-by-mono-24 2x.png";
import logoCrypto from "../../../assets/images/PaymentIcons/logo-crypto1.png";
import logoCrypto2x from "../../../assets/images/PaymentIcons/logo-crypto2x.png";
import { BsXLg } from "react-icons/bs";
import { useState } from "react";

export default function PaymentTopUpAccountModal({ onClose }) {
  const [modalPaymentDetailsIsOpen, setModalPaymentDetailsIsOpen] =
    useState(false);

  const [sumToPay, setSumToPay] = useState(0);

  const openModalPaymentDetails = () => {
    setModalPaymentDetailsIsOpen(true);
  };

  const closeModalPaymentDetails = () => {
    setModalPaymentDetailsIsOpen(false);
    onClose();
  };

  const handleSubmit = (values, actions) => {
    setSumToPay(values.sum);
    openModalPaymentDetails();
    actions.resetForm();
  };

  return (
    <>
      <div className={css.paymentModal}>
        <BsXLg className={css.closeIcon} onClick={onClose} />
        <h3 className={css.paymentModalHeader}>Поповнити рахунок</h3>
        <p className={css.paymentModalText}>
          Для поповнення рахунку в сервісі AutoAssist вкажіть суму до оплати.
        </p>
        <Formik
          initialValues={{
            sum: "",
          }}
          validationSchema={PaymentSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <p className={css.sumText}>Сума поповнення:</p>
            <div className={css.wrapper}>
              <div className={css.currencyWrapper}>
                <Field name="sum" type="number" className={css.input}></Field>
                <p className={css.currency}>грн</p>
                <ErrorMessage
                  name="sum"
                  component="div"
                  className={css.errorMsg}
                />
              </div>
              <button type="submit" className={css.btn}>
                Поповнити рахунок
              </button>
            </div>
          </Form>
        </Formik>
        <div className={css.paymentCards}>
          <img
            srcSet={`${logoMasterCard} 1x, ${logoMasterCard2x} 2x`}
            src={logoMasterCard}
            alt="Логотип MasterCard"
            className={css.logoMasterCard}
          />
          <img
            srcSet={`${logoVisa} 1x, ${logoVisa2x} 2x`}
            src={logoVisa}
            alt="Логотип Visa"
            className={css.logoVisa}
          />
          <img
            srcSet={`${logoPayPal} 1x, ${logoPayPal2x} 2x`}
            src={logoPayPal}
            alt="Логотип PayPal"
            className={css.logoPayPal}
          />
          <img
            srcSet={`${logoPrivat} 1x, ${logoPrivat2x} 2x`}
            src={logoPrivat}
            alt="Логотип Приват банка"
            className={css.logoPrivat}
          />
          <img
            srcSet={`${logoMono} 1x, ${logoMono2x} 2x`}
            src={logoMono}
            alt="Логотип Моно банка"
            className={css.logoMono}
          />
          <img
            srcSet={`${logoCrypto} 1x, ${logoCrypto2x} 2x`}
            src={logoCrypto}
            alt="Логотип Crypto"
            className={css.logoCrypto}
          />
        </div>
      </div>
      {modalPaymentDetailsIsOpen && (
        <Modal
          isOpen={modalPaymentDetailsIsOpen}
          onClose={closeModalPaymentDetails}
          sumToPay={sumToPay}
        >
          <PaymentDatailsModal
            onClose={closeModalPaymentDetails}
            sumToPay={sumToPay}
          />
        </Modal>
      )}
    </>
  );
}
