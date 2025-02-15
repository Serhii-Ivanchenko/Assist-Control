import styles from "./RepairModal.module.css";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import { BsCheckLg, BsPersonLinesFill, BsWrench } from "react-icons/bs";
import { repairData } from "./repairData";
import TableRepair from "./TableRepair/TableRepair";
import DownloadPdfButtonRepair from "../../../sharedComponents/Pdf/DownloadPdfButtonRepair/DownloadPdfButtonRepair";
import { MdClose } from "react-icons/md";
import { useState } from "react";


const RepairModal = ({ car, onClose }) => {
  const [data, setData] = useState(repairData);

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

  const price = repairData.reduce((total, item) => total + (item.soldAmount || 0), 0);

  return (
    <div className={styles.modalRepair}>
      <div className={styles.infoContainer}>
        <div>
          <CarInfo {...carInfo} />
        </div>
        <div>
          <p className={styles.title}>Ремонт № 345</p>
        </div>
        <div className={styles.workInfo}>
          <div className={styles.date}>03.02.2025</div>
          <nav className={styles.links}>
            <a href="#" className={styles.link}>
              Звернення № 345
            </a>
            <a href="#" className={styles.link}>
              Діагностика № 345{" "}
            </a>
            <a href="#" className={styles.link}>
              КП № 345{" "}
            </a>
          </nav>
          <div className={styles.mechanic}>
            <BsWrench size={16}/>
            <p className={styles.position}>Механік:</p>
            <p className={styles.name}>Шевченко А.В.</p>
          </div>
          <div className={styles.mechanic}>
            <BsPersonLinesFill size={18}/>
            <p className={styles.position}>Менеджер:</p>
            <p className={styles.name}>Олег А.В.</p>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
      <TableRepair data={data} onDelete={handleDelete}/>
      </div>
      <div className={styles.bottomInfoContainer}>
        <div className={styles.leftContainer}>
        <div className={styles.repairPrice}>
        <span className={styles.titleBtn}>Ремонт</span>
        <div className={styles.priceBox}>{price}</div>
        </div>
        <div className={styles.differencePay}>
        <span className={styles.titleBtn}>Залишок</span>
        <div className={styles.priceBox}>-18000</div>
        </div>
        <button className={styles.btnPayment}> <BsCheckLg size={16} color="white"/>
        Оплата</button>
        </div>
        <div className={styles.rightContainer}>
        <DownloadPdfButtonRepair carsData={repairData} />
        <button className={styles.btnCancel}>Скасувати</button>
          <button className={styles.btnDone}>Готово</button>
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
              <MdClose color="var(--input-stroke)" size={22} />
            </button>
    </div>
  );
};

export default RepairModal;
