import css from "./PlayerAndTranscription.module.css";
import MainInfoFromVoiceMessage from "../MainInfoFromVoiceMessage/MainInfoFromVoiceMessage";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import userAvatar from "../../../assets/images/ava.png";
// import TranscriptionMessage from "../TranscriptionMessage/TranscriptionMessage";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
// import audio from "../../../assets/audio2/Marian Hill – Got It (Kill Them With Colour Remix).mp3";
import TranscriptionComponent from "../TranscriptionComponent/TranscriptionComponent";
import TranscribedDialog from "../TranscriptionComponent/TranscribedDialog/TranscribedDialog";
// import audio2 from "../../../assets/audio/God Rest Ye Merry Gentlmen - DJ Williams.mp3";

export default function PlayerAndTranscription({
  messages,
  summary,
  sizePlayer,
  sizeBtn,
  audio,
  userAvatar,
  showPhoto,
  accounting,
}) {
  return (
    // <div className={css.secondAcordionList}>
    //   <div className={css.secondAcordionWrapper}>
    <Accordion
      disableGutters={true}
      sx={{
        background: "none",
        color: "inherit",
        WebkitBoxShadow: "none",
      }}
    >
      <div
        className={`${css.secondAcordion} ${
          accounting && css.secondAcordionAccounting
        }`}
      >
        {/* <div className={css.callRecordWrapper}> */}

        {showPhoto && (
          <img className={css.userPhoto} src={userAvatar} alt="user avatar" />
        )}

        {accounting && <MainInfoFromVoiceMessage accounting={accounting} />}

        <AudioPlayer audio={audio} size={sizePlayer} />
        {/* </div> */}
        <AccordionSummary
          sx={{
            padding: "0",
          }}
        >
          <TranscriptionComponent size={sizeBtn} />
        </AccordionSummary>
      </div>
      <AccordionDetails
        sx={{
          padding: "0",
        }}
      >
        <TranscribedDialog
          summary={summary}
          messages={messages}
          accounting={accounting}
        />
      </AccordionDetails>
    </Accordion>
    //   </div>
    // </div>
  );
}