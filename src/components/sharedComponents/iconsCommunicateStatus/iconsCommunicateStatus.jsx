import { BsTelephoneInbound, BsTelephoneX, BsTelephoneOutbound, BsGlobe } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import css from "./iconsCommunicateStatus.module.css";

const IconsCommunicateStatus = ({ status }) => {
  const renderIcon = () => {
    switch (status) {
      case "call_incoming":
        return <BsTelephoneInbound className={css.icon} color="var(--green)" />;
      case "call_missed":
        return <BsTelephoneX className={css.icon} color="var(--red)" />;
      case "call_outgoing":
        return <BsTelephoneOutbound className={css.icon} color="#728EFF" />;
      case "setting":
        return <img src="/logo-rect.png" alt="Logo" className={css.logo} />;
      case "browser":
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
    <div className={`${css.iconContainer} ${status === 'setting' ? css.logoContainer : ''}`}>
      {renderIcon()}
    </div>
  );
};

export default IconsCommunicateStatus;
