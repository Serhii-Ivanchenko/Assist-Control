import { useState } from "react";
import ClientInfo from "../ClientInfo/ClientInfo.jsx";
import Modal from "../Modals/Modal/Modal.jsx";
import ServiceHistory from "../ServiceHistory/ServiceHistory.jsx";
import css from "./DetailedClientInfo.module.css";
import { BsXLg } from "react-icons/bs";

export default function DetailedClientInfo({ isOpen, onClose }) {
  console.log(isOpen);
  console.log(onClose);
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <div className={css.detailedClientInfoWrapper}>
        <BsXLg className={css.closeIcon} onClick={() => setModalOpen(false)} />
        <ClientInfo />
        <ServiceHistory />
      </div>
    </Modal>
  );
}
