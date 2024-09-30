import { BiSupport } from "react-icons/bi";
import css from './Support.module.css'

export default function Support() {
  return (
    <button className={css.btn} disabled>
      <BiSupport className={css.icon} />
    </button>
  );
}
