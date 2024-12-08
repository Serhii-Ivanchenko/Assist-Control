import css from "./TranscriptionComponent.module.css";
import clsx from "clsx";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";

export default function TranscriptionComponent({ size }) {
  const [transcription, setTranscription] = useState(false);
  const toogleTranscription = () => setTranscription(!transcription);

  return (
    <button
      className={`${css.transcriptionToggleBtn} 
      ${size === "big" && css.transcriptionToggleBtnBig}
      ${size === "small" && css.transcriptionToggleBtnSmall}
      ${size === "tiny" && css.transcriptionToggleBtnTiny}
      `}
      onClick={() => toogleTranscription()}
    >
      <p>Aa</p>
      <BsChevronDown
        className={clsx(
          css.transcriptionIcon,
          transcription ? css.activeTranscriptionIcon : null
        )}
        strokeWidth={3}
        size={14}
      />
    </button>
  );
}
