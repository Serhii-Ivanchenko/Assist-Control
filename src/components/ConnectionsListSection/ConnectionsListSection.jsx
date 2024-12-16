import { connections, messages, summary } from "../../utils/dataToRender";
import IconRender from "../sharedComponents/iconsCommunicateStatus/iconsCommunicateStatus";
import css from "./ConnectionsListSection.module.css";
import defaultAvatar from "../../assets/images/avatar_default.png";
import renderStatusCommunication from "../../utils/renderStatusCommunication ";
// import AudioPlayer from "../sharedComponents/AudioPlayer/AudioPlayer";
import PlayerAndTranscription from "../sharedComponents/PlayerAndTranscription/PlayerAndTranscription";



export default function ConnectionsListSection() {



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
            <div className={css.status}>{renderStatusCommunication(item.status, false, css, false)}
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
