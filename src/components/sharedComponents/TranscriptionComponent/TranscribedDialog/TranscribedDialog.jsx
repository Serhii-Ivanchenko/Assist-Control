import css from "./TranscribedDialog.module.css";
import MainInfoFromVoiceMessage from "../../MainInfoFromVoiceMessage/MainInfoFromVoiceMessage";
import TranscriptionMessage from "../../../ServiceHistory/TranscriptionMessage/TranscriptionMessage";

export default function TranscribedDialog({ summary, messages, accounting }) {
  return (
    <div className={css.scrollBarWrapper}>
      <div className={css.secondAcordionBody}>
        {accounting ? "" : <MainInfoFromVoiceMessage summary={summary} />}

        <ul className={css.messages}>
          {messages.map(({ orClientMsg, time, message }) => (
            <TranscriptionMessage
              key={Math.random()}
              orClientMsg={orClientMsg}
              time={time}
              message={message}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
