import { useSelector } from "react-redux";
import ClientInfo from "../ClientInfo/ClientInfo.jsx";
import ServiceHistory from "../ServiceHistory/ServiceHistory.jsx";
import css from "./DetailedClientInfo.module.css";
import { BsXLg } from "react-icons/bs";
import { selectClientInfo } from "../../redux/client/selectors.js";

export default function DetailedClientInfo({ onClose, carName }) {
  const clientInfo = useSelector(selectClientInfo);
  console.log("selectClientInfo", clientInfo);

  return (
    <div className={css.detailedClientInfoWrapper}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <ClientInfo clientInfo={clientInfo} />
      <ServiceHistory carName={carName} clientInfo={clientInfo} />
    </div>
  );
}
