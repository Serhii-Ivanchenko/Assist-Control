import styles from "./RepairModal.module.css";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import { BsCheckLg, BsPersonLinesFill, BsWrench } from "react-icons/bs";
import { repairData } from "./repairData";
import TableRepair from "./TableRepair/TableRepair";
import DownloadPdfButtonRepair from "../../../sharedComponents/Pdf/DownloadPdfButtonRepair/DownloadPdfButtonRepair";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import CommercialOfferModal from "../CommercialOfferModal/CommercialOfferModal.jsx";
import DiagnosticsModals from "../../DiagnosticsModals/DiagnosticsModals.jsx";
import { useDispatch } from "react-redux";
import { getCommercialOfferData } from "../../../../redux/accounting/operations.js";

const RepairModal = ({
  car,
  onClose,
  setModalContent,
}) => {
  const [data, setData] = useState(repairData);
  const [price, setPrice] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  useState(false);
  const dispatch = useDispatch();

  // Функції для перемикання модалок у RepairModal
  const openRepairModal = () => {
    setModalContent(
      <RepairModal
        onClose={onClose}
        car={car}
        setModalContent={setModalContent}
      />
    );
  };

  const openCommercialOfferModal = () => {
    dispatch(getCommercialOfferData("67b5cba169bee23d3bbcbd1d"))
    setModalContent(<CommercialOfferModal onClose={openRepairModal} />);
  };
  const openDiagnosticsModal = () => {
    setModalContent(
      <DiagnosticsModals onClose={openRepairModal} isRepairModal={true} />
    );
  };
// Прорахунок інпутів суми і боргу

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
        <CarInfo {...carInfo} />
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
              onClick={openDiagnosticsModal}
            >
              Діагностика № 345
            </button>
            <button
              className={styles.link}
              onClick={openCommercialOfferModal}
            >
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
        <div className={styles.iconContainer}>
          <HiPlus className={styles.iconPlus} />
        </div>
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
    </div>
  );
};

export default RepairModal;
