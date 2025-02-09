import {
  BsTelephoneInbound,
  BsTelephoneX,
  BsTelephoneOutbound,
  BsGlobe,
} from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import css from "./iconsCommunicateStatus.module.css";

const IconsCommunicateStatus = ({ status, direction }) => {
  const renderIcon = () => {
    if (status === "phone") {
      if (direction === "in") {
        return <BsTelephoneInbound className={css.icon} color="var(--green)" />;
      }
      if (direction === "out") {
        return <BsTelephoneOutbound className={css.icon} color="#728EFF" />;
      }
    }

    switch (status) {
      case "phone_lost":
        return <BsTelephoneX className={css.icon} color="var(--red)" />;
      case "setting":
        return <img src="/logo-rect.png" alt="Logo" className={css.logo} />;
      case "web":
        return (
          <div className={css.iconWrapper}>
            <BsGlobe className={css.icon} />
            <span className={css.notificationBubble}></span>
          </div>
        );
      case "telegram":
        return (
          <div className={css.iconWrapper}>
            <PiTelegramLogoLight className={css.icon} />
            <span className={css.notificationBubble}></span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${css.iconContainer} ${
        status === "setting" ? css.logoContainer : ""
      }`}
    >
      {renderIcon()}
    </div>
  );
};

export default IconsCommunicateStatus;
