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
} from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import userAvater from "../../../assets/images/ava.png";
import TranscriptionMessage from "../TranscriptionMessage/TranscriptionMessage";
import css from "./ItemOfRecord.module.css";
import { useState } from "react";
import clsx from "clsx";

export default function ItemOfRecord({ item, messages }) {
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [transcription, setTranscription] = useState(false);
  const toogleTranscription = () => setTranscription(!transcription);
  const toogleDialogModal = () => setShowDialogModal(!showDialogModal);
  return (
    <li key={item.totalkilometrs} className={css.itemOfAccardion}>
      <div className={css.itemOfMarking}>
        <BsRecordCircle
          className={css.circle}
          size={24}
          fill="var(--blue-btn-normal)"
        />
        <div className={css.line}></div>
      </div>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
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
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
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
                  <button className={css.downloadBtn}>
                    <BsSearch />
                  </button>
                </div>
                <div className={css.secondAcordionWrapper}>
                  <AccordionItem>
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
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <button
                            className={css.transcriptionToggleBtn}
                            onClick={() => toogleTranscription()}
                          >
                            <p>Aa</p>
                            <BsChevronDown
                              className={clsx(
                                css.transcriptionIcon,
                                transcription
                                  ? css.activeTranscriptionIcon
                                  : null
                              )}
                              strokeWidth={3}
                              size={14}
                            />
                          </button>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                    </div>
                    <AccordionItemPanel>
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
                    </AccordionItemPanel>
                  </AccordionItem>
                </div>
              </div>
            </div>
          }
        </AccordionItemPanel>
      </AccordionItem>
    </li>
  );
}
