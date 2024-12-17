import { connections, messages, summary } from "../../utils/dataToRender";
import IconRender from "../sharedComponents/iconsCommunicateStatus/iconsCommunicateStatus";
import css from "./ConnectionsListSection.module.css";
import defaultAvatar from "../../assets/images/avatar_default.png";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
import PlayerAndTranscription from "../sharedComponents/PlayerAndTranscription/PlayerAndTranscription";
import renderStatusCars from "../../utils/renderStatusCars";
import { IoCarSportSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { BsLayerBackward } from "react-icons/bs";

export default function ConnectionsListSection() {
  function renderStatus(itemStatus, css) {
    const isCommunicationStatus = [
      "all_appeal",
      "new_appeal",
      "client",
      "missing",
      "appointment",
    ].includes(itemStatus);

    if (isCommunicationStatus) {
      return renderStatusCommunication(itemStatus, false, css, false);
    }

    return renderStatusCars(itemStatus, false, css, false);
  }

  return (
    <div className={css.wrapper}>
      {connections.map((item, index) => (
        <div className={css.item} key={index}>
          
          <div className={css.leftContainer}>
            <div className={css.timeCall}>{item.timeCall}</div>
            <div className={css.typeMessage}>
              <IconRender status={item.typeMessage} />
            </div>
          </div>
          <div className={css.rightContainer}>
            <div className={css.rightleftContainer}>
              <div className={css.userContainer}>
                <div className={css.avatar}>
                  <img
                    src={item.photoUrl || defaultAvatar}
                    alt={item.name}
                    className={css.avatarImage}
                  />
                </div>
                <div className={css.name}>{item.name}</div>

                {/* Умовний рендер кнопки, якщо clientId === null */}
                {item.clientId === null && (
                  <button className={css.plus}>
                    <FiPlus className={css.iconPlus} size={14}/>
                  </button>
                )}
              </div>
              <div className={css.auto}>
                <IoCarSportSharp
                  className={css.iconAuto}
                  size={13}
                  color="#A97878"
                />
                <span>{item.auto}</span>
              </div>
              <div className={css.status}>{renderStatus(item.status, css)}</div>
              <div>
                {item.status === "missing" && (
                  <button className={css.btnSave}>
                    <BsLayerBackward size={20} />
                  </button>
                )}
              </div>
            </div>
            <div className={css.audioContainer}>
              <PlayerAndTranscription
                sizePlayer="small"
                sizeBtn="small"
                summary={summary}
                messages={messages}
                // audio={audio}
                showPhoto={false}
                accounting={true}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}