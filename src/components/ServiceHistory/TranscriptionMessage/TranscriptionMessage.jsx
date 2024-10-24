import clsx from "clsx";
import css from "./TranscriptionMessage.module.css";
export default function TranscriptionMessage({ orClientMsg, time, message }) {
  return (
    <li
      className={clsx(
        css.messageItem,
        orClientMsg ? css.clientMessageItem : css.managerMessageItem
      )}
    >
      <div className={css.messageInformation}>
        <p className={clsx(css.author, orClientMsg ? css.client : css.manager)}>
          {orClientMsg ? "Клієнт" : "Менеджер"}
        </p>
        <p className={css.time}>{time}</p>
      </div>
      <p className={clsx(orClientMsg ? css.clientMessage : css.managerMessage)}>
        {message}
      </p>
    </li>
  );
}
