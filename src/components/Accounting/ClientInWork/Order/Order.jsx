import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import css from "./Order.module.css";
import {
  BsXLg,
  BsPersonLinesFill,
  BsWrench,
  BsCaretDownFill,
  BsCaretUpFill,
} from "react-icons/bs";

import carImg from "../../../../assets/images/car.png";
import BtnsCloseAndSubmit from "../../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import OrderPartsList from "./OrderPartsList/OrderPartsList";
import { useRef, useState } from "react";
import OrderPopup from "./OrderPopup/OrderPopup";
import clsx from "clsx";

const data = [
  {
    supplier: "GRS PARTS",
    id: 1,
    invoice_sum: "4610",
    date: "03.02",
    ordered_quantity: "7",
    address: "",
    logo: "../../../../assets/images/distr_logo_invoice.png",
    parts: [
      {
        availability: "Харків 1",
        id: 10,
        date: "03.02",
        quantity: "5",
        code: "214197",
        brand: "MAZDA",
        name: "Олива MAZDA ORIGINAL",
        price: "600",
        sum: "3000",
      },
      {
        availability: "Харків 1",
        id: 11,
        date: "03.02",
        quantity: "1",
        code: "FZ0121500",
        brand: "MAZDA",
        name: "Фильтр масляный АКПП",
        price: "1200",
        sum: "1200",
      },
      {
        availability: "Харків 1",
        id: 12,
        date: "03.02",
        quantity: "1",
        code: "KC 83D",
        brand: "Knecht/Mah",
        name: "ФИЛЬТР ТОПЛИВА",
        price: "590",
        sum: "590",
      },
    ],
  },
  {
    supplier: "Elit.ua",
    id: 2,
    logo: "../../../../assets/images/distrImg.png",
    invoice_sum: "5200",
    date: "01.02",
    ordered_quantity: "2",
    address: "",
    parts: [
      {
        availability: "Харків 2",
        id: 20,
        date: "01.02",
        quantity: "1",
        code: "P363101",
        brand: "FRENKIT",
        name: "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/ A6 S6 quattro 12- (36x30) (Brembo)",
        price: "211.08",
        sum: "211.08",
      },
      {
        availability: "Харків 2",
        id: 21,
        date: "01.02",
        quantity: "1",
        code: "P363101",
        brand: "FRENKIT",
        name: "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/ A6 S6 quattro 12- (36x30) (Brembo)",
        price: "211.08",
        sum: "211.08",
      },
    ],
  },
  {
    supplier: "GRS PARTS",
    id: 3,
    invoice_sum: "4610",
    date: "03.02",
    ordered_quantity: "7",
    address: "",
    logo: "../../../../assets/images/distr_logo_invoice.png",
    parts: [
      {
        availability: "Харків 1",
        id: 30,
        date: "03.02",
        quantity: "5",
        code: "214197",
        brand: "MAZDA",
        name: "Олива MAZDA ORIGINAL",
        price: "600",
        sum: "3000",
      },
      {
        availability: "Харків 1",
        id: 31,
        date: "03.02",
        quantity: "1",
        code: "FZ0121500",
        brand: "MAZDA",
        name: "Фильтр масляный АКПП",
        price: "1200",
        sum: "1200",
      },
      {
        availability: "Харків 1",
        id: 32,
        date: "03.02",
        quantity: "1",
        code: "KC 83D",
        brand: "Knecht/Mah",
        name: "ФИЛЬТР ТОПЛИВА",
        price: "590",
        sum: "590",
      },
    ],
  },
];

const enterprises = ["ФОП Блудов", "ТОВ Ремонт", "ПП Автосервіс"];
const storages = ["Склад 1", "Склад 2", "Склад 3"];

export default function Order({ onClose }) {
  const [isPopupWarehouseVisible, setIsPopupWarehouseVisible] = useState(false);
  const [isPopupCompanyVisible, setIsPopupCompanyVisible] = useState(false);
  const [warehouse, setWarehouse] = useState(storages[0]);
  const [company, setCompany] = useState(enterprises[0]);
  const warehouseBtnRef = useRef(null);
  const companyBtnRef = useRef(null);

  const handleSelectTitle = (type, title) => {
    if (type === "enterprise") {
      setCompany(title);
    } else if (type === "storage") {
      setWarehouse(title);
    }
    setIsPopupWarehouseVisible(false);
    setIsPopupCompanyVisible(false);
  };

  return (
    <div className={css.modal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <h2 className={css.header}>Замовлення № </h2>
      <div className={css.topWrapper}>
        <div className={css.leftWrapper}>
          <CarInfo
            clientName={"Іван Петренко"}
            clientPhone={"+38 073 329 12 17"}
            carImg={carImg}
            carNumber={"CA 6864 CO"}
            carMake={"HONDA"}
            carModel={"CIVIC"}
            carYear={"2001 "}
            vin={"VW8795218794H46J"}
            mileage={"284563"}
          />
        </div>
        <div className={css.rightWrapper}>
          <p className={css.date}>{"03.02.2025"}</p>
          <button className={css.link}>КП № </button>
          <div className={css.mechanicWrapper}>
            <BsWrench className={css.spannerIcon} />
            <p className={css.mechanicText}>Механік:</p>
            <p className={css.mechanicName}>{"Шевченко А.В."}</p>
          </div>
          <div className={css.managerWrapper}>
            <BsPersonLinesFill className={css.personIcon} />
            <p className={css.mechanicText}>Менеджер:</p>
            <p className={css.mechanicName}>{"Олег А.В."}</p>
          </div>
          <div className={css.topBtnWrapper}>
            <div
              className={css.btnWrapper}
              ref={companyBtnRef}
              onClick={() => {
                setIsPopupCompanyVisible(!isPopupCompanyVisible);
                setIsPopupWarehouseVisible(false);
              }}
            >
              <p className={css.mechanicName}>{company}</p>
              <BsCaretDownFill
                className={clsx(
                  css.arrowIcon,
                  isPopupCompanyVisible ? css.rotated : ""
                )}
              />
              {isPopupCompanyVisible && (
                <OrderPopup
                  onClose={() => setIsPopupCompanyVisible(false)}
                  isOpen={isPopupCompanyVisible}
                  buttonRef={companyBtnRef}
                  arr={enterprises}
                  onSelect={(title) => handleSelectTitle("enterprise", title)}
                />
              )}
            </div>
            <div
              className={css.btnWrapper}
              ref={warehouseBtnRef}
              onClick={() => {
                setIsPopupWarehouseVisible(!isPopupWarehouseVisible);
                setIsPopupCompanyVisible(false);
              }}
            >
              <p className={css.mechanicName}>{warehouse}</p>
              <BsCaretDownFill
                className={clsx(
                  css.arrowIcon,
                  isPopupWarehouseVisible ? css.rotated : ""
                )}
              />
              {isPopupWarehouseVisible && (
                <OrderPopup
                  onClose={() => setIsPopupWarehouseVisible(false)}
                  isOpen={isPopupWarehouseVisible}
                  buttonRef={warehouseBtnRef}
                  arr={storages}
                  onSelect={(title) => handleSelectTitle("storage", title)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={css.tableHeaderWrapper}>
        <p className={css.tableHeader}>Склад</p>
        <p>Дата</p>
        <p>Кількість</p>
        <p>Артикул</p>
        <p>Бренд</p>
        <p>Номенклатура</p>
        <p>Ціна закупки</p>
        <p>Сума закупки</p>
        <p>Відправлено</p>
        <p>Кабінет постачальника</p>
      </div>
      <div className={css.table}>
        {data.map((item, index) => {
          return <OrderPartsList key={index} arr={item} />;
        })}
      </div>
      <BtnsCloseAndSubmit
        onClose={onClose}
        btnSave={"Замовити"}
        btnClose={"Скасувати"}
      />
    </div>
  );
}
