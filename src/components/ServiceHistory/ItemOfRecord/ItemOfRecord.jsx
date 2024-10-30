import { SlSpeedometer } from "react-icons/sl";
import {
  BsCalendar2Week,
  BsCaretDownFill,
  BsDownload,
  BsPlayFill,
  BsChevronDown,
  BsFilter,
  BsRecordCircle,
  BsSearch,
  BsXLg,
} from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import userAvater from "../../../assets/images/ava.png";
import TranscriptionMessage from "../TranscriptionMessage/TranscriptionMessage";
import css from "./ItemOfRecord.module.css";
import { useState } from "react";
import Modal from "../../Modals/Modal/Modal.jsx";
import clsx from "clsx";

export default function ItemOfRecord({ item, messages }) {
  const [apealModal, setApealModal] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [transcription, setTranscription] = useState(false);
  const toogleApealModal = () => setApealModal(!apealModal);
  const toogleTranscription = () => setTranscription(!transcription);
  const toogleDialogModal = () => setShowDialogModal(!showDialogModal);
  return (
    <li key={item.totalkilometrs} className={css.itemOfAccardion}>
      <div className={css.itemOfMarking}>
        <BsRecordCircle className={css.circle} />
        <div className={css.line}></div>
      </div>
      <Accordion
        disableGutters={true}
        classes={{}}
        sx={{
          background: "none",
          color: "inherit",
          WebkitBoxShadow: "none",
        }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          sx={{
            background: "none",
            color: "inherit",
            padding: "0",
            WebkitBoxShadow: "none",
          }}
        >
          <div className={css.listItemWrapper}>
            <div className={css.listItem} onClick={() => toogleDialogModal()}>
              <div className={css.kilometersWrapper}>
                <div className={css.numberOfKilometers}>
                  <SlSpeedometer /> <p>{item.totalkilometrs}</p>
                </div>
                <div className={css.kilometersDriven}>
                  <SlSpeedometer /> <p>{item.newkilometrs}</p>
                </div>
              </div>
              <div className={css.dateWrapper}>
                <div className={css.date}>
                  <BsCalendar2Week /> <p>{item.date}</p>
                  <p>{item.time}</p>
                </div>
                <button
                  className={clsx(
                    css.unActiveDialogBtn,
                    showDialogModal ? css.activeDialogBtn : null
                  )}
                  onClick={() => toogleDialogModal()}
                >
                  <BsCaretDownFill color="var(--icon-gray)" />
                </button>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "none",
            color: "inherit",
            padding: "0",
            WebkitBoxShadow: "none",
          }}
        >
          {
            <div className={css.bodyAccardionWrapper}>
              <div className={css.btnDownloadsWrapper}>
                <div className={css.btnDownloadsItem}>
                  <p>Діагностика</p>
                  <button className={css.downloadBtn}>
                    <BsDownload />
                    <p>.pdf</p>
                  </button>
                </div>
                <div className={css.btnDownloadsItem}>
                  <p>Ремонт</p>
                  <button className={css.downloadBtn}>
                    <BsDownload />
                    <p>.pdf</p>
                  </button>
                </div>
                <div className={css.btnDownloadsItem}>
                  <p>Рекомендації</p>
                  <button className={css.downloadBtn}>
                    <BsDownload />
                    <p>.pdf</p>
                  </button>
                </div>
              </div>
              <div className={css.secondAcordionList}>
                <div className={css.btnDownloadsItem}>
                  <p>Звернення</p>
                  <button
                    className={css.downloadBtn}
                    onClick={() => toogleApealModal()}
                  >
                    <BsSearch />
                  </button>
                  <Modal isOpen={apealModal} onClose={toogleApealModal}>
                    <div className={css.apealModalWrapper}>
                      <BsXLg
                        className={css.closeIcon}
                        onClick={() => toogleApealModal()}
                      />
                      <p>
                        Привіт! Мене звати [Ім`я], і я хочу записатися на ремонт
                        свого автомобіля. У мене [марка і модель авто], і після
                        нещодавньої аварії потрібен огляд і ремонт кузова,
                        зокрема вирівнювання геометрії та заміна пошкоджених
                        деталей. Також цікавить діагностика стану автомобіля
                        після ремонту. Чи є у вас вільні дати на цьому тижні,
                        щоб я міг під`їхати на оцінку? Дякую!
                      </p>
                    </div>
                  </Modal>
                </div>
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
          }
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
