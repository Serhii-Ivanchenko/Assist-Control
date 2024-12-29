import { IoIosArrowDown } from "react-icons/io";
import css from "./ChannelsPart.module.css";

export default function ChannelsPart() {
  const channels = [
    { icon: "", text: "Gmail", value: "4" },
    { icon: "", text: "Telegram", value: "2" },
    { icon: "", text: "WhatsApp", value: "2" },
    { icon: "", text: "Messenger", value: "1" },
    { icon: "", text: "MobileApp", value: "1" },
  ];

  return (
    <div className={css.channelsPart}>
      <div className={css.channelsSelect}>
        <div className={css.textAndArrow}>
          <IoIosArrowDown className={css.arrowIcon} />
          <p className={css.text}>Канали</p>
        </div>
        <span className={css.numberBox}>
          <p>10</p>
        </span>
      </div>

      <ul className={css.channelsList}>
        {channels.map((channel, index) => (
          <li key={index} className={css.channelsListItem}>
            <div className={css.iconAndText}>
              <span className={css.iconBox}>{channel.icon}</span>
              <p>{channel.text}</p>
            </div>

            <span className={css.numberBox}>
              <p>{channel.value}</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
