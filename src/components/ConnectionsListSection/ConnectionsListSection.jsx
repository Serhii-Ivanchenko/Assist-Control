import { messages, summary } from "../../utils/dataToRender";
import { format } from "date-fns";
import IconRender from "../sharedComponents/iconsCommunicateStatus/iconsCommunicateStatus";
import css from "./ConnectionsListSection.module.css";
import defaultAvatar from "../../assets/images/avatar_default.png";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
import PlayerAndTranscription from "../sharedComponents/PlayerAndTranscription/PlayerAndTranscription";
import renderStatusCars from "../../utils/renderStatusCars";
import { IoCarSportSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { BsLayerBackward } from "react-icons/bs";
import { useState } from "react";
import ArchiveModal from "../Modals/ArchiveModal/ArchiveModal";
import Modal from "../Modals/Modal/Modal";
import AddNewClientModal from "../Modals/AddNewClientModal/AddNewClientModal";


export default function ConnectionsListSection({ connections }) {

  const isRecommendation = true;
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false);

  const openArchiveModal = () => setArchiveModalOpen(true);
  const closeArchiveModal = () => setArchiveModalOpen(false);

  const openCreateClientModal = () => setIsCreateClientModalOpen(true);
  const closeCreateClientModal = () => setIsCreateClientModalOpen(false);

  const sortedConnections = [...connections].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  let lastDate = null;

  function renderStatus(itemStatus, css) {
    const isCommunicationStatus = [
      "ALL",
      "NEW",
      "APPOINTMENT",
      "CLIENT",
      "LOST",
    ].includes(itemStatus);

    if (isCommunicationStatus) {
      return renderStatusCommunication(itemStatus, css, false);
    }

    return renderStatusCars(itemStatus, false, css, false);
  }

  return (
    <div className={css.wrapper}>
      {sortedConnections.map((item, index) => {
        const itemDate = format(new Date(item.created_at), "dd/MM/yyyy");
        const isNewDate = lastDate !== itemDate;
        lastDate = itemDate;

        return (
          <div key={index}>
            {isNewDate && <div className={css.dateDivider}>{itemDate}</div>}
            <div className={css.item}>
              <div className={css.leftContainer}>
                <div className={css.timeCall}>
                  <div className={css.timeCall}>
                    {format(new Date(item.created_at), "HH:mm")}
                  </div>
                </div>
                <div className={css.typeMessage}>
                  <IconRender status={item.source} direction={item.direction}/>
                </div>
              </div>
              <div className={css.rightContainer}>
                <div className={css.userContainer}>
                  <div className={css.avatar}>
                    <img
                      src={item.logo || defaultAvatar}
                      alt="logo"
                      className={css.avatarImage}
                    />
                  </div>
                  <div className={css.name}>{item.customer_name}</div>

                  {item.reference_id === null && (
                    <button className={css.plus}>
                      <FiPlus
                        className={css.iconPlus}
                        size={14}
                        onClick={openCreateClientModal}
                      />
                    </button>
                  )}
                </div>
                <div className={css.auto}>
                  <IoCarSportSharp
                    className={css.iconAuto}
                    size={13}
                    color="#A97878"
                  />
                  <p>{item.car_name || "Марка не вказана"}</p>
                </div>
                <div className={css.status}>{renderStatus(item.status, css)}</div>
                <div className={css.archiveBtnContainer}>
                  {item.status === "LOST" && (
                    <button className={css.btnSave} onClick={openArchiveModal}>
                      <BsLayerBackward size={20} />
                    </button>
                  )}
                </div>
                <div className={css.audioContainer}>
                  <PlayerAndTranscription
                    sizePlayer="small"
                    sizeBtn="small"
                    summary={summary}
                    messages={messages}
                    showPhoto={false}
                    accounting={true}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {isArchiveModalOpen && (
        <Modal isOpen={isArchiveModalOpen} onClose={closeArchiveModal}>
          <ArchiveModal
            onClose={closeArchiveModal}
            isRecommendation={isRecommendation}
          />
        </Modal>
      )}
      {isCreateClientModalOpen && (
        <Modal isOpen={isCreateClientModalOpen} onClose={closeCreateClientModal}>
          <AddNewClientModal onClose={closeCreateClientModal} />
        </Modal>
      )}
    </div>
  );
}
