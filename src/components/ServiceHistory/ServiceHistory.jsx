import { SlSpeedometer } from "react-icons/sl";
import {
  BsCalendar2Week,
  BsCaretDownFill,
  BsDownload,
  // BsRecordCircle,
} from "react-icons/bs";
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

export default function ServiceHistory() {
  const [showDialogModal, setShowDialogModal] = useState(false);
  const toogleDialogModal = () => setShowDialogModal(!showDialogModal);
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
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
