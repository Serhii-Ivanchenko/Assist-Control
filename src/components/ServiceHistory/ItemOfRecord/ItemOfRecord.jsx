import { SlSpeedometer } from "react-icons/sl";
import {
  BsCalendar2Week,
  BsCaretDownFill,
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
import css from "./ItemOfRecord.module.css";
import { useState } from "react";
import clsx from "clsx";
import RecordBtnInfo from "../RecordBtnInfo/RecordBtnInfo";
import audio from "../../../assets/audio/God Rest Ye Merry Gentlmen - DJ Williams.mp3";
import PlayerAndTranscription from "../../sharedComponents/PlayerAndTranscription/PlayerAndTranscription";

const summary =
  "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене[марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей.Також цікавить діагностика стану автомобіля після ремонту.Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!";

export default function ItemOfRecord({ key, item, messages, isExpanded }) {
  const startDate = item.start_date;
  const date = new Date(startDate).toLocaleDateString("uk-UA");
  const time = new Date(startDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [showDialogModal, setShowDialogModal] = useState(isExpanded);

  // const [transcription, setTranscription] = useState(false);

  const [recordInfo, setRecordInfo] = useState("appeal");

  const [isRecordInfoOpen, setIsRecordInfoOpen] = useState(
    Boolean(item.appeals)
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
    <li key={key} className={css.itemOfAccardion}>
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
              {/* Кілометраж */}
              <div className={css.kilometersWrapper}>
                <div className={css.numberOfKilometers}>
                  <SlSpeedometer /> <div>{item.mileage || "дані невідомі"}</div>
                </div>
                <div className={css.kilometersDriven}>
                  <SlSpeedometer />{" "}
                  <div>{item.newkilometrs || "дані невідомі"}</div>
                </div>
              </div>

              {/* Дата і час */}
              <div className={css.dateWrapper}>
                <div className={css.date}>
                  <BsCalendar2Week /> <div>{date}</div>
                  <div>{time}</div>
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
                  item.appeals && recordInfo === "appeal"
                    ? { cursor: "pointer", outline: "1px solid #fff" }
                    : !item.appeals
                    ? null
                    : { cursor: "pointer" }
                }
                disabled={!item.appeals}
              >
                <p>Звернення</p>
                <div
                  className={clsx(css.downloadBtn, item.appeals && css.btnBg)}
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
                  item.repairs && recordInfo === "repair"
                    ? { cursor: "pointer", outline: "1px solid #fff" }
                    : !item.repairs
                    ? null
                    : { cursor: "pointer" }
                }
                disabled={!item.repairs}
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
                <PlayerAndTranscription
                  sizePlayer="big"
                  sizeBtn="big"
                  summary={summary}
                  messages={messages}
                  audio={audio}
                  userAvatar={userAvatar}
                  showPhoto={true}
                  accounting={false}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
