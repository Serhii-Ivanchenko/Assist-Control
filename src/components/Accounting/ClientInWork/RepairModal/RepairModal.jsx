import styles from "./RepairModal.module.css";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import { BsPersonLinesFill, BsWrench } from "react-icons/bs";
import { repairData } from "./repairData";
import TableRepair from "./TableRepair/TableRepair";


const RepairModal = ({ car }) => {
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
      <div className={styles.infoContainer}>
        <div>
          <CarInfo {...carInfo} />
        </div>
        <div>
          <p>Ремонт № 345</p>
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
      <TableRepair data={repairData} />
      </div>
    </div>
  );
};

export default RepairModal;
