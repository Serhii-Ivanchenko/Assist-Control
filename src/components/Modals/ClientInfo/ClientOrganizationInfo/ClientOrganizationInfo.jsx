import css from "./ClientOrganizationInfo.module.css";
import { BsXLg } from "react-icons/bs";

export default function ClientOrganizationInfo({ onClose }) {
  return (
    <div className={css.modal}>
      <div className={css.headerWrapper}>
        <h3 className={css.header}>ТОВ</h3>
        <BsXLg className={css.closeIcon} onClick={onClose} />
      </div>

      <img src="" alt="" />
      <div className={css.infoWrapper}>
        <div className={css.addressWrapper}>
          <p className={css.label}>Фактична адреса</p>
          <p className={css.input}>Харків, Байрона 189 оф 27</p>
        </div>
        <div className={css.addressWrapper}>
          <p className={css.label}>Email</p>
          <p className={css.input}>service@mail.com</p>
        </div>
        <div className={css.inputsWrapper}>
          <div className={css.wrapper}>
            <p className={css.label}>ПІБ ФОП</p>
            <p className={css.input}>Іваненко Іван Іванович</p>
          </div>
          <div className={css.wrapper}>
            <p className={css.label}>ІПН</p>
            <p className={css.input}>1385446843</p>
          </div>
        </div>
        <div className={css.wrapper}>
          <p className={css.label}>Рахунок IBAN</p>
          <p className={css.input}>UA123456789012345678901234567</p>
        </div>
        <div className={css.inputsWrapper}>
          <div className={css.wrapper}>
            <p className={css.label}>Банк</p>
            <p className={css.input}>ПриватБанк</p>
          </div>
          <div className={css.wrapper}>
            <p className={css.label}>МФО банку</p>
            <p className={css.input}>305299</p>
          </div>
        </div>
        <div className={css.wrapper}>
          <p className={css.label}>Юридична адреса</p>
          <p className={css.input}>м. Київ, вул. Шевченка, буд. 10</p>
        </div>
        <div className={css.wrapper}>
          <p className={css.label}>Телефон менеджера</p>
          <div className={css.inputsWrapper}>
            <p className={css.input}>+380671234567</p>
            <p className={css.input}>Діана</p>
          </div>
        </div>
        <div className={css.inputsWrapper}>
          <div className={css.wrapper}>
            <p className={css.label}>Телефон офіс</p>
            <p className={css.input}>+380671234567</p>
          </div>
          <div className={css.wrapper}>
            <p className={css.label}>Керівник</p>
            <p className={css.input}>+380671234567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
