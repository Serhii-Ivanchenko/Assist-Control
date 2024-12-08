import { SlSpeedometer } from "react-icons/sl";
import {
  BsCalendar2Week,
  BsCaretDownFill,
  // BsPauseFill,
  // BsPlayFill,
  // BsChevronDown,
  // BsFilter,
  // BsPauseFill,
  // BsPlayFill,
  // BsChevronDown,
  // BsFilter,
  BsRecordCircle,
  BsWrench,
  BsUiChecksGrid,
  BsShieldExclamation,
  BsReceipt,
} from "react-icons/bs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import userAvatar from "../../../assets/images/ava.png";
// import TranscriptionMessage from "../TranscriptionMessage/TranscriptionMessage";
import css from "./ItemOfRecord.module.css";
import { useState } from "react";
import clsx from "clsx";
import RecordBtnInfo from "../RecordBtnInfo/RecordBtnInfo";
import audio from "../../../assets/audio/God Rest Ye Merry Gentlmen - DJ Williams.mp3";
// import MainInfoFromVoiceMessage from "../../sharedComponents/MainInfoFromVoiceMessage/MainInfoFromVoiceMessage";
import TranscriptionComponent from "../../sharedComponents/TranscriptionComponent/TranscriptionComponent";
// import TranscribedDialog from "../../sharedComponents/TranscriptionComponent/TranscribedDialog/TranscribedDialog";
import AudioPlayer from "../../sharedComponents/AudioPlayer/AudioPlayer";
// import audio from "../../../assets/audio2/Marian Hill – Got It (Kill Them With Colour Remix).mp3";
// import audio2 from "../../../assets/audio/God Rest Ye Merry Gentlmen - DJ Williams.mp3";

const summary =
  "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене[марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей.Також цікавить діагностика стану автомобіля після ремонту.Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!";

export default function ItemOfRecord({ item, messages, isExpanded }) {
  const [showDialogModal, setShowDialogModal] = useState(isExpanded);

  // const [transcription, setTranscription] = useState(false);

  const [recordInfo, setRecordInfo] = useState("appeal");

  const [isRecordInfoOpen, setIsRecordInfoOpen] = useState(
    Boolean(item.appeal)
  );

  // const toogleTranscription = () => setTranscription(!transcription);

  const toogleDialogModal = () => setShowDialogModal(!showDialogModal);

  const handleToogleRecordInfo = (value) => {
    value ? setRecordInfo(value) : setRecordInfo("");
    if (value) {
      setIsRecordInfoOpen(true);
      setRecordInfo(value);
    } else {
      setRecordInfo("");
    }
  };
  const handleSetRecordInfo = (string) =>
    recordInfo === string
      ? handleToogleRecordInfo()
      : handleToogleRecordInfo(string);

  return (
    <li key={item.totalkilometrs} className={css.itemOfAccardion}>
      <div className={css.itemOfMarking}>
        <BsRecordCircle className={css.circle} />
        <div className={css.line}></div>
      </div>
      <Accordion
        defaultExpanded={isExpanded}
        disableGutters={true}
        sx={{
          background: "none",
          color: "inherit",
          WebkitBoxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{
            padding: "0",
          }}
        >
          <div className={css.listItemWrapper}>
            <div className={css.listItem} onClick={() => toogleDialogModal()}>
              <div className={css.kilometersWrapper}>
                <div className={css.numberOfKilometers}>
                  <SlSpeedometer /> <div>{item.totalkilometrs}</div>
                </div>
                <div className={css.kilometersDriven}>
                  <SlSpeedometer /> <div>{item.newkilometrs}</div>
                </div>
              </div>
              <div className={css.dateWrapper}>
                <div className={css.date}>
                  <BsCalendar2Week /> <div>{item.date}</div>
                  <div>{item.time}</div>
                </div>
                <button
                  className={clsx(
                    css.unActiveDialogBtn,
                    showDialogModal ? css.activeDialogBtn : null
                  )}
                  onClick={() => toogleDialogModal()}
                >
                  <BsCaretDownFill className={css.dialogBtnIcon} />
                </button>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0",
          }}
        >
          <div className={css.bodyAccardionWrapper}>
            <div className={css.btnDownloadsWrapper}>
              <button
                className={css.btnDownloadsItem}
                onClick={() => handleSetRecordInfo("appeal")}
                style={
                  item.appeal && recordInfo === "appeal"
                    ? { cursor: "pointer", outline: "1px solid #fff" }
                    : !item.appeal
                    ? null
                    : { cursor: "pointer" }
                }
                disabled={!item.appeal}
              >
                <p>Звернення</p>
                <div
                  className={clsx(css.downloadBtn, item.appeal && css.btnBg)}
                >
                  <BsReceipt size={13} />
                </div>
              </button>
              <button
                className={css.btnDownloadsItem}
                onClick={() => handleSetRecordInfo("diagnostic")}
                style={
                  item.diagnostic && recordInfo === "diagnostic"
                    ? { cursor: "pointer", outline: "1px solid #fff" }
                    : !item.diagnostic
                    ? null
                    : { cursor: "pointer" }
                }
                disabled={!item.diagnostic}
              >
                <p>Діагностика</p>
                <div
                  className={clsx(
                    css.downloadBtn,
                    item.diagnostic && css.btnBg
                  )}
                >
                  <BsUiChecksGrid size={13} />
                </div>
              </button>
              <button
                className={css.btnDownloadsItem}
                onClick={() => handleSetRecordInfo("repair")}
                style={
                  item.repair && recordInfo === "repair"
                    ? { cursor: "pointer", outline: "1px solid #fff" }
                    : !item.repair
                    ? null
                    : { cursor: "pointer" }
                }
                disabled={!item.repair}
              >
                <p>Ремонт</p>
                <div
                  className={clsx(css.downloadBtn, item.repair && css.btnBg)}
                >
                  <BsWrench size={13} />
                </div>
              </button>
              <button
                className={css.btnDownloadsItem}
                onClick={() => handleSetRecordInfo("recommendation")}
                style={
                  item.recommendation && recordInfo === "recommendation"
                    ? { cursor: "pointer", outline: "1px solid #fff" }
                    : !item.recommendation
                    ? null
                    : { cursor: "pointer" }
                }
                disabled={!item.recommendation}
              >
                <p>Рекомендації</p>
                <div className={css.downloadBtn}>
                  <BsShieldExclamation size={13} />
                </div>
              </button>
            </div>
            {isRecordInfoOpen ? (
              <div>
                <div
                  className={clsx(
                    css.RecordBtnInfoWrapper,
                    recordInfo
                      ? css.openRecordBtnInfoWrapper
                      : css.closeRecordBtnInfoWrapper
                  )}
                >
                  <RecordBtnInfo recordInfo={recordInfo} item={item} />
                </div>
              </div>
            ) : null}
            <div className={css.secondAcordionList}>
              <div className={css.secondAcordionWrapper}>
                {/* <Accordion
                  disableGutters={true}
                  sx={{
                    background: "none",
                    color: "inherit",
                    WebkitBoxShadow: "none",
                    // position: "relative",
                  }}
                > */}
                <div className={css.secondAcordion}>
                  <div className={css.callRecordWrapper}>
                    <img src={userAvatar} alt="user avatar" />

                    <AudioPlayer audio={audio} size="big" />
                  </div>
                  <TranscriptionComponent
                    size="big"
                    summary={summary}
                    messages={messages}
                  />
                </div>
              </div>
              {/* <AccordionSummary
                      sx={{
                        padding: "0",
                      }}
                    > */}
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

              {/* </AccordionSummary> */}

              {/* <AccordionDetails
                    sx={{
                      padding: "0",
                    }}
                  >
                    // <div className={css.scrollBarWrapper}>
                    //   <div className={css.secondAcordionBody}>
                    //     //  <button className={css.transcriptionImportantBtn}>
                    //     //   <BsFilter />
                    //     //   <p>Головне</p>
                    //     // </button> 
                    //     <MainInfoFromVoiceMessage summary={summary} />
                    //     <ul className={css.messages}>
                    //       {messages.map(({ orClientMsg, time, message }) => (
                    //         <TranscriptionMessage
                    //           key={Math.random()}
                    //           orClientMsg={orClientMsg}
                    //           time={time}
                    //           message={message}
                    //         />
                    //       ))}
                    //     </ul>
                    //   </div>
                    // </div>
                    <TranscribedDialog summary={summary} messages={messages} />
                  </AccordionDetails> */}
              {/* </Accordion> */}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
