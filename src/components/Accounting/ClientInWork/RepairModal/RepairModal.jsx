import styles from "./RepairModal.module.css";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import { BsCheckLg, BsPersonLinesFill, BsWrench } from "react-icons/bs";
import { repairData } from "./repairData";
import TableRepair from "./TableRepair/TableRepair";
import DownloadPdfButtonRepair from "../../../sharedComponents/Pdf/DownloadPdfButtonRepair/DownloadPdfButtonRepair";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Modal from "../../../Modals/Modal/Modal";
import DiagnosticsModals from "../../DiagnosticsModals/DiagnosticsModals";
import CommercialOfferModal from "../CommercialOfferModal/CommercialOfferModal";

const RepairModal = ({ car, onClose }) => {
  const [data, setData] = useState(repairData);
  const [price, setPrice] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState(false);
  const [isCommercialOfferModalOpen, setIsCommercialOfferModalOpen] =
    useState(false); // Додаємо стан для КП модалки

  useEffect(() => {
    const newPrice = data.reduce(
      (total, item) => total + (item.soldAmount || 0),
      0
    );
    setPrice(newPrice);
  }, [data]);

  useEffect(() => {
    setRemainingAmount(price - (car.pre_paid || 0));
  }, [price, car.pre_paid]);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const openDiagnosticsModal = () => {
    console.log("Open Diagnostics Modal triggered");
    setIsDiagnosticsModalOpen(true);
  };

  const closeDiagnosticsModal = () => {
    console.log("Close Diagnostics Modal triggered");
    setIsDiagnosticsModalOpen(false);
  };

  const openCommercialOfferModal = () => {
    console.log("Open Commercial Offer Modal triggered");
    setIsCommercialOfferModalOpen(true);
  };

  const closeCommercialOfferModal = () => {
    console.log("Close Commercial Offer Modal triggered");
    setIsCommercialOfferModalOpen(false);
  };

  const carInfo = {
    clientName: car.client_name,
    clientPhone: car.client_phone,
    carImg: car.car_img,
    carNumber: car.plate,
    carMake: car.make,
    carModel: car.model,
    carYear: car.year,
    vin: car.vin,
    mileage: car.mileage,
  };

  return (
    <div className={styles.modalRepair}>
      <p className={styles.title}>Ремонт № 345</p>

      <div className={styles.infoContainer}>
        <div>
          <CarInfo {...carInfo} />
        </div>
        <div></div>
        <div className={styles.workInfo}>
          <div className={styles.date}>03.02.2025</div>
          <div className={styles.links}>
            <button
              className={styles.link}
              onClick={() => console.log("Звернення № 345")}
            >
              Звернення № 345
            </button>
            <button
              className={styles.link}
              onClick={() => {
                console.log("Diagnostics button clicked");
                openDiagnosticsModal();
              }}
            >
              Діагностика № 345
            </button>
            <button className={styles.link} onClick={openCommercialOfferModal}>
              КП № 345
            </button>
          </div>

          <div className={styles.mechanic}>
            <BsWrench size={16} />
            <p className={styles.position}>Механік:</p>
            <p className={styles.name}>Шевченко А.В.</p>
          </div>
          <div className={styles.mechanic}>
            <BsPersonLinesFill size={18} />
            <p className={styles.position}>Менеджер:</p>
            <p className={styles.name}>Олег А.В.</p>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <TableRepair data={data} onDelete={handleDelete} />
      </div>
      <div className={styles.bottomInfoContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.repairPrice}>
            <span className={styles.titleBtn}>Ремонт</span>
            <input className={styles.priceBox} value={price} readOnly />{" "}
          </div>
          <div className={styles.differencePay}>
            <span className={styles.titleBtn}>Залишок</span>
            <input
              className={styles.priceBox}
              value={remainingAmount}
              readOnly
            />
          </div>
          <button className={styles.btnPayment}>
            <BsCheckLg size={16} color="white" />
            Оплата
          </button>
        </div>
        <div className={styles.rightContainer}>
          <DownloadPdfButtonRepair carsData={repairData} />
          <button className={styles.btnCancel} onClick={onClose}>
            Скасувати
          </button>
          <button className={styles.btnDone} onClick={onClose}>
            Готово
          </button>
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose color="var(--input-stroke)" size={22} />
      </button>
      {isDiagnosticsModalOpen && (
        <Modal onClose={closeDiagnosticsModal}>
          <DiagnosticsModals />
        </Modal>
      )}
      {isCommercialOfferModalOpen && (
        <Modal onClose={closeCommercialOfferModal}>
          <CommercialOfferModal />
        </Modal>
      )}
    </div>
  );
};

export default RepairModal;
