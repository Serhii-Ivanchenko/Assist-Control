import css from "./ClientPersonInfo.module.css";
import { BsXLg } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { LiaTelegram } from "react-icons/lia";

export default function ClientPersonInfo({ onClose }) {
  return (
    <div className={css.modal}>
      <div className={css.headerWrapper}>
        <h3 className={css.header}>ПІБ Клієнта</h3>
        <BsXLg className={css.closeIcon} onClick={onClose} />
      </div>
      <img src="" alt="logo" className={css.avatarImage} />
      <div className={css.formWrapper}>
        <div className={css.inputWrapper}>
          <p className={css.label}>ПІБ</p>
          <p className={css.input}>Петренко Іван Іванович</p>
        </div>
        <div className={css.phonesWrapper}>
          <div className={css.inputWrapper}>
            <p className={css.label}>Телефон 1</p>
            <p className={css.input}>380671234567</p>
          </div>
          <div className={css.inputWrapper}>
            <p className={css.label}>Телефон 2</p>
            <p className={css.input}>380671234567</p>
          </div>
        </div>
        <div className={css.phonesWrapper}>
          <div className={css.inputWrapper}>
            <div className={css.labelWithIcon}>
              <BsEnvelope className={css.envelope} />
              <p className={css.label}>E-mail</p>
            </div>
            <p className={css.input}>ivan.petrenko@gmail.com</p>
          </div>
          <div className={css.inputWrapper}>
            <div className={css.labelWithIcon}>
              <LiaTelegram className={css.envelope} />
              <p className={css.label}>Telegram</p>
            </div>

            <p className={css.input}>ivan.petrenko</p>
          </div>
        </div>
        <div className={css.calendarWrapper}>
          <p className={css.label}>Дата народження</p>
          <p className={css.input}>27.01.2025</p>
        </div>
      </div>
    </div>
  );
}
