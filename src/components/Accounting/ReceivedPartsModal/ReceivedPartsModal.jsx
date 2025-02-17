import { useMemo } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsReceipt, BsDownload } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import carImg from "../../../assets/images/car.png";
import CarInfo from "../../sharedComponents/CarInfo/CarInfo";
import styles from "./ReceivedPartsModal.module.css";
import EnterpriseInfo from "./EnterpriseInfo/EnterpriseInfo";
import BillingTable from "./BillingTable/BillingTable";
import distrLogo from "../../../assets/images/distr_logo_invoice.png";

const dataArr = {
  diagnostic_id: 88,
  created_at: "2025-02-06T12:57:00",
  repair_date: "05.02",
  car: {
    car_id: 66967,
    make: "AUDI",
    model: "A6 QUATTRO",
    vin: "WAUZZZ4AZSN114501",
    year: "2001",
    car_number: "CA 6864 CO",
    mileage: "284563",
  },
  client: {
    client_name: "Іван Петренко",
    phone: "+38 073 329 12 17",
    prepayment: "2482",
  },
  mechanic: {
    mechanic_id: 1,
    mechanic_name: "Тютюнник М.О",
  },
  manager: {
    mechanic_id: 10,
    manager_name: "Олег А.В.",
  },
  supplier: {
    id: 1,
    name: "АвтоПартс",
    parts: [
      {
        id: 1,
        date: " 05.02",
        availability: 2,
        code: "P363101",
        brand: "FRENKIT",
        part_name: "Гальмівний циліндр",
        price: 1200,
      },
      {
        id: 2,
        date: "06.02",
        availability: 1,
        code: "B200023",
        brand: "BOSCH",
        part_name: "Гальмівні колодки",
        price: 1800,
      },
      {
        id: 3,
        date: "07.02",
        availability: 4,
        code: "A110500",
        brand: "ATE",
        part_name: "Гальмівний диск",
        price: 2500,
      },
      {
        id: 4,
        date: "08.02",
        availability: 5,
        code: "L300045",
        brand: "LUK",
        part_name: "Комплект щеплення",
        price: 8700,
      },
      {
        id: 5,
        date: "09.02",
        availability: 3,
        code: "M998877",
        brand: "MANN",
        part_name: "Масляний фільтр",
        price: 600,
      },
      {
        id: 1,
        date: " 05.02",
        availability: 2,
        code: "P363101",
        brand: "FRENKIT",
        part_name: "Гальмівний циліндр",
        price: 1200,
      },
      {
        id: 2,
        date: "06.02",
        availability: 1,
        code: "B200023",
        brand: "BOSCH",
        part_name: "Гальмівні колодки",
        price: 1800,
      },
      {
        id: 3,
        date: "07.02",
        availability: 4,
        code: "A110500",
        brand: "ATE",
        part_name: "Гальмівний диск",
        price: 2500,
      },
      {
        id: 4,
        date: "08.02",
        availability: 5,
        code: "L300045",
        brand: "LUK",
        part_name: "Комплект щеплення",
        price: 8700,
      },
      {
        id: 5,
        date: "09.02",
        availability: 3,
        code: "M998877",
        brand: "MANN",
        part_name: "Масляний фільтр",
        price: 600,
      },
      
    ],
  },
};

function ReceivedPartsModal({ onClose }) {
  const data = useMemo(() => dataArr, []);

  return (
    <>
      <div className={styles.wrapper}>
        <RxCross1 className={styles.cross} onClick={onClose} />
        <p className={styles.title}>Надходження товару №0000</p>
        <div className={styles.invoiceHeader}>
          <div>
            <CarInfo
              clientName={data.client.client_name}
              clientPhone={data.client.phone}
              carImg={carImg}
              carNumber={data.car.car_number}
              carMake={data.car.make}
              carModel={data.car.model}
              carYear={data.car.year}
              vin={data.car.vin}
              mileage={data.car.mileage}
            />
          </div>

          <EnterpriseInfo />
        </div>
        <div className={styles.invoiceList}>
          <div className={styles.distrInfo}>
            <img src={distrLogo} />
            <p className={styles.distributorName}>GRS PARTS</p>
          </div>

          {/* <div className={styles.billingTable}> */}
          <BillingTable supplier={dataArr.supplier} />

          <div className={styles.sumContainer}>
            <div className={styles.totalSum}>
              <p className={styles.sumTitle}>Сума</p>
              <p className={styles.sum}>
                {" "}
                <BsReceipt /> 4 610 грн
              </p>
            </div>

            <div className={styles.prePaid}>
              <p>Аванс</p>
              <input value="2000" readOnly />
            </div>

            <div className={styles.postPaid}>
              <p>Борг</p>
              <input value="2610" readOnly />
            </div>
          </div>
          <div className={styles.btnsContainer}>
            <button className={styles.payBtn}>
              <FaCheck />
              Сплатити постачальнику
            </button>
            <button className={styles.pdfBtn}>
              <BsDownload />
              .pdf
            </button>
            <button className={styles.resetBtn}>Скасувати</button>
            <button className={styles.btn}>
              <FaCheck />
              Отримано
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ReceivedPartsModal;
