import { SlSpeedometer } from "react-icons/sl";
import {
  BsCalendar2Week,
  BsCaretDownFill,
  BsPlayFill,
  BsChevronDown,
  BsFilter,
  BsRecordCircle,
  BsWrench,
  BsUiChecksGrid,
  BsShieldExclamation,
  BsReceipt,
  // BsDownload,
  // BsSearch,
  // BsXLg,
} from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import userAvater from "../../../assets/images/ava.png";
import TranscriptionMessage from "../TranscriptionMessage/TranscriptionMessage";
import css from "./ItemOfRecord.module.css";
import { useState } from "react";
import clsx from "clsx";
import RecordBtnInfo from "../RecordBtnInfo/RecordBtnInfo";

export default function ItemOfRecord({ item, messages, isExpanded }) {
  const [showDialogModal, setShowDialogModal] = useState(false);

  const [transcription, setTranscription] = useState(false);

  const [recordInfo, setRecordInfo] = useState("appeal");

  const [isRecordInfoOpen, setIsRecordInfoOpen] = useState(
    Boolean(item.appeal)
  );

  const toogleTranscription = () => setTranscription(!transcription);

  const toogleDialogModal = () => setShowDialogModal(!showDialogModal);

  const handleToogleRecordInfo = (value) => {
    value ? setRecordInfo(value) : setRecordInfo("");
    if (value) {
      setIsRecordInfoOpen(true);
      setRecordInfo(value);
    } else {
      setRecordInfo("");
      // const timeout = setTimeout(() => {
      //   setIsRecordInfoOpen(false);
      // }, 300);
      // clearTimeout(timeout);
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
                    : item.appeal
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
              >
                <p>Ремонт</p>
                <div className={css.downloadBtn}>
                  <BsWrench size={13} />
                </div>
              </button>
              <button
                className={css.btnDownloadsItem}
                onClick={() => handleSetRecordInfo("recommendation")}
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
                      <img src={userAvater} alt="" />
                      <div className={css.callRecord}>
                        <div>
                          <BsPlayFill
                            size={24}
                            fill="var(--play-btn-triangle)"
                          />
                        </div>
                        <GiSoundWaves size={80} />
                        <p>1:26</p>
                      </div>
                    </div>
                    <AccordionSummary
                      sx={{
                        padding: "0",
                      }}
                    >
                      <button
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
                      </button>
                    </AccordionSummary>
                  </div>
                  <AccordionDetails
                    sx={{
                      padding: "0",
                    }}
                  >
                    <div className={css.scrollBarWrapper}>
                      <div className={css.secondAcordionBody}>
                        <button className={css.transcriptionImportantBtn}>
                          <BsFilter />
                          <p>Головне</p>
                        </button>
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
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
