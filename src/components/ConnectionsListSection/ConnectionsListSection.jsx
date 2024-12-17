import { connections, messages, summary } from "../../utils/dataToRender";
import IconRender from "../sharedComponents/iconsCommunicateStatus/iconsCommunicateStatus";
import css from "./ConnectionsListSection.module.css";
import defaultAvatar from "../../assets/images/avatar_default.png";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
// import AudioPlayer from "../sharedComponents/AudioPlayer/AudioPlayer";
import PlayerAndTranscription from "../sharedComponents/PlayerAndTranscription/PlayerAndTranscription";
import renderStatusCars from "../../utils/renderStatusCars";

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
            <div className={css.userContainer}>
              <div className={css.avatar}>
                <img
                  src={item.photoUrl || defaultAvatar}
                  alt={item.name}
                  className={css.avatarImage}
                />
              </div>
              <div className={css.name}>{item.name}</div>
            </div>
            <div className={css.auto}>{item.auto}</div>
            <div className={css.status}>{renderStatus(item.status, css)}</div>
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
