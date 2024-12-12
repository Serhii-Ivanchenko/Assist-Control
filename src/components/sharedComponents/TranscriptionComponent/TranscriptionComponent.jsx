import css from "./TranscriptionComponent.module.css";
import clsx from "clsx";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import TranscribedDialog from "./TranscribedDialog/TranscribedDialog";
// import { Accordion } from "@mui/material";

export default function TranscriptionComponent({ size }) {
  const [transcription, setTranscription] = useState(false);
  const toogleTranscription = () => setTranscription(!transcription);

  return (
    // <Accordion className={css.accordion}>
    //   <AccordionSummary
    //     sx={{
    //       padding: "0",
    //     }}
    //     className={css.accordionSummary}
    //   >
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
    //     </AccordionSummary>
    //     <AccordionDetails
    //       sx={{
    //         padding: "0",
    //       }}
    //       className={css.accordionDetails}
    //     >
    //       <TranscribedDialog summary={summary} messages={messages} />
    //     </AccordionDetails>
    //   </Accordion>
  );
}
