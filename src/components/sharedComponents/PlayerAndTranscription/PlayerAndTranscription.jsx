import css from "./PlayerAndTranscription.module.css";
// import MainInfoFromVoiceMessage from "../MainInfoFromVoiceMessage/MainInfoFromVoiceMessage";
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
}) {
  return (
    <div className={css.secondAcordionList}>
      <div className={css.secondAcordionWrapper}>
        <Accordion
          disableGutters={true}
          sx={{
            background: "none",
            color: "inherit",
            WebkitBoxShadow: "none",
          }}
        >
          <div className={css.secondAcordion}>
            <div className={css.callRecordWrapper}>
              <img src={userAvatar} alt="user avatar" />
              <AudioPlayer audio={audio} size={sizePlayer} />
            </div>
            <AccordionSummary
              sx={{
                padding: "0",
              }}
            >
              {/* <button
                className={css.transcriptionToggleBtn}
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
              </button> */}
              <TranscriptionComponent size={sizeBtn} />
            </AccordionSummary>
          </div>
          <AccordionDetails
            sx={{
              padding: "0",
            }}
          >
            {/* <div className={css.scrollBarWrapper}>
              <div className={css.secondAcordionBody}>
                <MainInfoFromVoiceMessage summary={summary} />
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
            </div> */}
            <TranscribedDialog summary={summary} messages={messages} />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
