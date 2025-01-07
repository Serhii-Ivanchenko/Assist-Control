import css from "./ChannelItem.module.css";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function ChannelItem({
  index,
  channel,
  gmail,
  facebook,
  // moveChannel,
  handleDragStart,
  // handleDragOver,
  handleDragEnd,
  // handleDrop,
}) {
  return (
    <li
      key={channel.id}
      className={css.channelsListItem}
      // ref={ref}
      draggable
      onDragStart={() => handleDragStart(index)}
      // onDragOver={(event) => handleDragOver(event, index)}
      onDragEnd={handleDragEnd}
      // onDrop={() => handleDrop(index)}
    >
      <div className={css.iconAndText}>
        <span className={css.iconBox}>
          <img
            src={channel.icon}
            alt=""
            className={`${css.channelImg} ${
              channel.icon === gmail && css.channelImgGmail
            } ${channel.icon === facebook && css.channelImgFB}`}
          />
        </span>
        <p className={css.channelName}>{channel.text}</p>
      </div>

      <div className={css.dragContainer}>
        <p className={css.numberBox}>{channel.value}</p>
        <span>
          <RxDragHandleDots2 className={css.dragIcon} />
        </span>
      </div>
    </li>
  );
}
