import { useSelector } from "react-redux";
import ClientInfo from "../ClientInfo/ClientInfo.jsx";
import ServiceHistory from "../ServiceHistory/ServiceHistory.jsx";
import css from "./DetailedClientInfo.module.css";
import { BsXLg } from "react-icons/bs";
import { selectClientInfo } from "../../redux/client/selectors.js";

export default function DetailedClientInfo({ onClose, carName, car }) {
  const clientInfo = useSelector(selectClientInfo);
  console.log("selectClientInfo", clientInfo);

  return (
    <div className={css.detailedClientInfoWrapper}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <ClientInfo clientInfo={clientInfo} car={car} />
      <ServiceHistory carName={carName} clientInfo={clientInfo} />
    </div>
  );
}
