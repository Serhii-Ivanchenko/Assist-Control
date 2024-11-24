import ClientInfo from "../ClientInfo/ClientInfo.jsx";
import ServiceHistory from "../ServiceHistory/ServiceHistory.jsx";
import css from "./DetailedClientInfo.module.css";
import { BsXLg } from "react-icons/bs";

export default function DetailedClientInfo({ onClose, carName }) {
  return (
    <div className={css.detailedClientInfoWrapper}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <ClientInfo />
      <ServiceHistory carName={carName} />
    </div>
  );
}
