import myIcon from "../../assets/icons.svg"
import css from "./SupportModal.module.css"
import { TfiClose } from "react-icons/tfi";

export default function SupportModal({onClose}) {
    return (
        <div className={css.supportBox}>
            <svg width={338} height={579} className={css.svg}>
                <use href={`${myIcon}#icon-support`} className={css.icon}></use>
            </svg>

            <div className={css.contentBox}>
                <TfiClose className={css.closeBtn} onClick={onClose} />
                <p className={css.title}>Технічна підтримка</p>
                <textarea className={css.textarea} placeholder="Ваше повідомлення..."></textarea>
                <button type="button" className={css.supportBtn}>Надіслати</button>
            </div>

        </div>
    )
};
