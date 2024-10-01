import { BiSupport } from "react-icons/bi";
import css from './Support.module.css'

export default function Support({openModal}) {
  return (
    <button className={css.btn} onClick={openModal}>
      <BiSupport className={css.icon} />
    </button>
  );
}
