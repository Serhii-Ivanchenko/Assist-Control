import { IoIosArrowDown } from "react-icons/io";
import css from "./ChannelsPart.module.css";
import telegram from "../../../../../assets/images/ChannelsImages/Telegram_1.png";
import gmail from "../../../../../assets/images/ChannelsImages/Gmail_icon_1.png";
import facebook from "../../../../../assets/images/ChannelsImages/Facebook_Messenger_1.png";
import whatsApp from "../../../../../assets/images/ChannelsImages/WhatsApp_1.png";
import assist from "../../../../../assets/images/ChannelsImages/logo-rect 1.png";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function ChannelsPart() {
  const channels = [
    { icon: gmail, text: "Gmail", value: "4" },
    { icon: telegram, text: "Telegram", value: "2" },
    { icon: whatsApp, text: "WhatsApp", value: "2" },
    { icon: facebook, text: "Messenger", value: "1" },
    { icon: assist, text: "MobileApp", value: "1" },
  ];

  return (
    <div className={css.channelsPart}>
      <div className={css.channelsSelect}>
        <div className={css.textAndArrow}>
          <IoIosArrowDown size={18} className={css.arrowIcon} />
          <p className={css.text}>Канали</p>
        </div>
        <span className={css.numberBox}>
          <p className={css.number}>10</p>
        </span>
      </div>

      <ul className={css.channelsList}>
        {channels.map((channel, index) => (
          <li key={index} className={css.channelsListItem}>
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
              <span className={css.numberBox}>
                <p className={css.number}>{channel.value}</p>
              </span>
              <RxDragHandleDots2 className={css.dragIcon} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
