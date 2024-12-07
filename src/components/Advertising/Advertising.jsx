import css from "../Advertising/Advertising.module.css";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function Advertising() {
  return (
    <div className={css.wrapper}>
      <div className={css.imgWrapper}></div>
      <div className={css.textWrapper}>
        <p className={css.header}>Повне керівництво по сервісу CRMmech</p>
        <p className={css.text}>
          Якщо ви тільки почали знайомство, рекомендуємо пройти безкоштовний
          відеотренінг.
        </p>
        <a href="https://www.crmmech.com/" target="blank" className={css.link}>
          <p className={css.linkText}>Пройти курс</p>
          <BsBoxArrowUpRight className={css.linkIcon} />
        </a>
      </div>
    </div>
  );
}
