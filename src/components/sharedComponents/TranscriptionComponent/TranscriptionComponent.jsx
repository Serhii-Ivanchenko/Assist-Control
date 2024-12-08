import css from "./TranscriptionComponent.module.css";
import clsx from "clsx";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TranscribedDialog from "./TranscribedDialog/TranscribedDialog";

export default function TranscriptionComponent({ size, summary, messages }) {
  const [transcription, setTranscription] = useState(false);
  const toogleTranscription = () => setTranscription(!transcription);

  return (
    <>
      <AccordionSummary
        sx={{
          padding: "0",
        }}
      >
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
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "0",
        }}
      >
        <TranscribedDialog summary={summary} messages={messages} />
      </AccordionDetails>
    </>
  );
}
