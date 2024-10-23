import { SlSpeedometer } from "react-icons/sl";
import {
  BsCalendar2Week,
  BsCaretDownFill,
  BsDownload,
  BsPlayFill,
  BsChevronDown,
  BsFilter,
  // BsRecordCircle,
} from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import css from "./ServiceHistory.module.css";
import { useState } from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import userAvater from "../../assets/images/ava.png";
import TranscriptionMessage from "./TranscriptionMessage/TranscriptionMessage";

export default function ServiceHistory() {
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [transcription, setTranscription] = useState(false);
  const toogleDialogModal = () => setShowDialogModal(!showDialogModal);
  const messanges = [
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
  ];
  return (
    <div>
      <h3>Історія обслуговування</h3>

      <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className={css.listItem} onClick={() => toogleDialogModal()}>
                <div className={css.kilometersWrapper}>
                  <div className={css.numberOfKilometers}>
                    <SlSpeedometer /> <p>246742</p>
                  </div>
                  <div className={css.kilometersDriven}>
                    <SlSpeedometer /> <p>9272</p>
                  </div>
                </div>
                <div className={css.dateWrapper}>
                  <div className={css.date}>
                    <BsCalendar2Week /> <p>14.06.2024</p> <p>16:08</p>
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
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className={css.bodyAccardionWrapper}>
              <div className={css.btnDownloadsWrapper}>
                <div className={css.btnDownloadsItem}>
                  <p>Ремонт</p>
                  <button className={css.downloadBtn}>
                    <BsDownload />
                    <p>.pdf</p>
                  </button>
                </div>
                <div className={css.btnDownloadsItem}>
                  <p>Діагностика</p>
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
              <ul className={css.secondAcordionList}>
                <li className={css.secondAcordionWrapper}>
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
                            onClick={() => setTranscription((prev) => !prev)}
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
                      <div className={css.secondAcordionBody}>
                        <button className={css.transcriptionImportantBtn}>
                          <BsFilter />
                          <p>Головне</p>
                        </button>
                        <ul className={css.messages}>
                          {messanges.map(({ orClientMsg, time, message }) => (
                            <TranscriptionMessage
                              key={Math.random()}
                              orClientMsg={orClientMsg}
                              time={time}
                              message={message}
                            />
                          ))}
                        </ul>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </li>
              </ul>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
        
      </Accordion>
    </div>
  );
}
