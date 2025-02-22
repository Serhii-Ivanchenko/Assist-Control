import css from "./CommercialOfferModal.module.css";
import { BsWrench, BsXLg } from "react-icons/bs";
import { TiSpanner } from "react-icons/ti";
import { BsPersonLinesFill } from "react-icons/bs";
import carImg from "../../../../assets/images/car.png";
import SortButtonsArrow from "../../../sharedComponents/SortButtonsArrow/SortButtonsArrow";
import PartsList from "./PartsList/PartsList";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import BtnsCloseAndSubmit from "../../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { BsCaretRightFill, BsCaretUpFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import clsx from "clsx";
import DownloadPdfButtonKP from "../../../sharedComponents/Pdf/DownloadPdfButtonKP/DownloadPdfButtonKP";
import ComOfferPopup from "./ComOfferPopup/ComOfferPopup";
import { useSelector } from "react-redux";
import {
  selectCOLoading,
  selectCommercialOffer,
  selectCommercialOfferData,
} from "../../../../redux/accounting/selectors.js";
import Loader from "../../../Loader/Loader.jsx";
import { selectUser } from "../../../../redux/auth/selectors.js";
import PartsListExistedComOffer from "./PartsList/PartsListExistedComOffer.jsx";
// import Modal from "../../../Modals/Modal/Modal";
// import WarehouseAvailabilityModal from "./WarehouseAvailabilityModal/WarehouseAvailabilityModal";

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
  nodes: [
    {
      node_id: 102,
      node_name: "гальмівна система",
      needed_quantity: "7",
      code: "P363101",
      brand: "FRENKIT",
      work_price: "3000",
      sale_price: "4300",
      parts: [
        {
          id: 440,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/ A6 S6 quattro 12- (36x30) (Brembo)",
          brand: "FRENKIT",
          price: 211.08,
          supplier: "Харків",
          code: "P363101",
          status: 0,
          date: "05.02",
          availability: "7",
          profit: "1300",
          percent: "30",
        },
        {
          id: 441,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/A610-18 (32x31.5) (Brembo)",
          brand: "FRENKIT",
          price: 149.1,
          supplier: "GRS PARTS",
          code: "P323101",
          status: 1,
          date: "05.02",
          availability: "2",
          profit: "1400",
          percent: "30",
        },
        {
          id: 442,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/ A6 S6 quattro 12- (36x30) (Brembo)",
          brand: "FRENKIT",
          price: 220.18,
          supplier: "GRS PARTS",
          code: "P363101",
          status: 0,
          date: "05.02",
          availability: "7",
          profit: "1300",
          percent: "30",
        },
        {
          id: 443,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/A610-18 (32x31.5) (Brembo)",
          brand: "FRENKIT",
          price: 150.1,
          supplier: "ELIT",
          code: "P323101",
          status: 1,
          date: "05.02",
          availability: "2",
          profit: "1400",
          percent: "30",
        },
      ],
    },
    {
      node_id: 103,
      node_name: "Фильтр масляный АКПП",
      needed_quantity: "2",
      code: "FZ0121500",
      brand: "MAZDA",
      work_price: "3000",
      sale_price: "4300",
      parts: [
        {
          id: 444,
          part_name: "Фильтр масляный АКПП",
          brand: "MAZDA",
          price: 250.08,
          supplier: "ELIT",
          code: "FZ0121500",
          status: 0,
          date: "05.02",
          availability: "7",
          profit: "1300",
          percent: "30",
        },
        {
          id: 445,
          part_name: "Фильтр масляный АКПП",
          brand: "MAZDA",
          price: 170.1,
          supplier: "ELIT",
          code: "FZ0121500",
          status: 1,
          date: "05.02",
          availability: "2",
          profit: "1400",
          percent: "30",
        },
      ],
    },
    {
      node_id: 104,
      node_name: "гальмівна система",
      needed_quantity: "6",
      code: "P363101",
      brand: "FRENKIT",
      work_price: "3000",
      sale_price: "4300",
      parts: [
        {
          id: 446,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/ A6 S6 quattro 12- (36x30) (Brembo)",
          brand: "FRENKIT",
          price: 211.08,
          supplier: "AZ-AUTO",
          code: "P363101",
          status: 0,
          date: "05.02",
          availability: "7",
          profit: "1300",
          percent: "30",
        },
        {
          id: 447,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/A610-18 (32x31.5) (Brembo)",
          brand: "FRENKIT",
          price: 149.1,
          supplier: "AZ-AUTO",
          code: "P323101",
          status: 1,
          date: "05.02",
          availability: "2",
          profit: "1400",
          percent: "30",
        },
        {
          id: 448,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/ A6 S6 quattro 12- (36x30) (Brembo)",
          brand: "FRENKIT",
          price: 220.18,
          supplier: "AZ-AUTO",
          code: "P363101",
          status: 0,
          date: "05.02",
          availability: "7",
          profit: "1300",
          percent: "30",
        },
        {
          id: 449,
          part_name:
            "Поршень супорта (переднього) Audi A4 RS4 quattro 05-08/A610-18 (32x31.5) (Brembo)",
          brand: "FRENKIT",
          price: 150.1,
          supplier: "Харків",
          code: "P323101",
          status: 1,
          date: "05.02",
          availability: "2",
          profit: "1400",
          percent: "30",
        },
      ],
    },
  ],
};

export default function CommercialOfferModal({ onClose, offerId }) {
  const data = useMemo(() => dataArr, []);
  const [totalOrder, setTotalOrder] = useState({});
  // const [sentForApproval, setSentForApproval] = useState(false);
  // const [approved, setApproved] = useState(false);
  // const [pay, setPay] = useState(false);
  // const [makeOrder, setMakeOrder] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [approval, setApproval] = useState("");
  const buttonRef = useRef(null);
  const info = useSelector(selectCommercialOfferData);
  const loading = useSelector(selectCOLoading);
  const managerInfo = useSelector(selectUser);
  const createdCommercialOffer = useSelector(selectCommercialOffer);
  // const [offerId, setOfferId] = useState(false);
  console.log("createdCommercialOffer", createdCommercialOffer);
  console.log("info", info);

  //

  console.log("totalOrder", totalOrder);

  const correctedTotalOrder = (nodeId) => {
    const updatedItems = Object.fromEntries(
      Object.entries(totalOrder).filter(
        ([_, value]) => value.node_id !== nodeId
      )
    );
    setTotalOrder(updatedItems);
    // setNodesArr((prev) => {
    //   return prev.filter((item) => item.node_id !== nodeId);
    // });
  };

  const date = new Date(data.created_at);

  // Получаем день, месяц и год
  const day = String(date.getDate()).padStart(2, "0"); // "06"
  const month = String(date.getMonth() + 1).padStart(2, "0"); // "02" (месяцы начинаются с 0)
  const year = date.getFullYear(); // 2025

  // Собираем итоговую строку в формате "dd.mm.yyyy"
  const formattedDate = `${day}.${month}.${year}`;

  // const totalWorkPrice = nodesPrices.reduce((acc, item) => {
  //   return acc + Number(item.work_price);
  // }, 0);

  // const totalSalePrice = nodesPrices.reduce((acc, item) => {
  //   return acc + Number(item.sale_price);
  // }, 0);

  const totalWorkPrice = 0;
  const totalSalePrice = 0;

  const totalSum = Object.values(totalOrder).reduce((sum, item) => {
    if (item.selected && item.quantity > 0) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const totalProfit = Object.values(totalOrder).reduce((sum, item) => {
    if (item.selected && item.quantity > 0) {
      return sum + item.profit * item.quantity;
    }
    return sum;
  }, 0);

  // const changedWorkPrices = (price, nodeId) => {
  //   console.log("workprice", price);
  //   console.log("nodeId", nodeId);
  // };

  // const changedSalePrices = (price, nodeId) => {
  //   console.log("saleprice", price);
  //   console.log("nodeId", nodeId);
  // };

  return (
    <div
      className={clsx(
        css.modal,
        offerId ? css.modalExistedCp : css.modalCreateCP
      )}
    >
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <p className={css.offerNumber}>КП № </p>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={css.topWrapper}>
            <CarInfo
              clientName={
                offerId ? createdCommercialOffer.client.name : info.client.name
              }
              clientPhone={
                offerId
                  ? createdCommercialOffer.client.phone
                  : info.client.phone
              }
              // carImg={carImg}
              carNumber={
                offerId ? createdCommercialOffer.car.plate : info.plate
              }
              carMake={offerId ? createdCommercialOffer.car.make : info.make}
              carModel={offerId ? createdCommercialOffer.car.model : info.model}
              carYear={offerId ? createdCommercialOffer.car.year : info.year}
              vin={offerId ? createdCommercialOffer.car.vin : info.vin}
              mileage={"---------"}
            />
            <div className={css.rightSectionWrapper}>
              <p className={css.date}>{offerId ? "ДАТА КП" : formattedDate}</p>
              <button className={css.link}>
                Діагностика №{" "}
                {offerId
                  ? createdCommercialOffer.diagnostic_id
                  : info.diagnostic_id}
              </button>
              <div className={css.mechanicWrapper}>
                <BsWrench className={css.spannerIcon} />
                <p className={css.mechanicText}>Механік:</p>
                <p className={css.mechanicName}>
                  {offerId
                    ? createdCommercialOffer.mechanic.name
                    : info.mechanic.name}
                </p>
              </div>
              <div className={css.managerWrapper}>
                <BsPersonLinesFill className={css.personIcon} />
                <p className={css.mechanicText}>Менеджер:</p>
                <p className={css.mechanicName}>{managerInfo.name}</p>
              </div>
            </div>
          </div>

          <div className={css.centerWrapper}>
            <button type="button" className={css.original}>
              Орігінал
            </button>
            <button type="button" className={css.analogue}>
              Аналог
            </button>
          </div>

          <div
            className={clsx(
              css.tableHeaderWrapper,
              offerId ? css.existedCp : css.createCp
            )}
          >
            {offerId ? (
              <p className={css.tableHeaderText}>Дата</p>
            ) : (
              <div className={css.headerWithArrows}>
                <p className={css.tableHeaderText}>Дата</p>
                <SortButtonsArrow />
              </div>
            )}
            {!offerId && (
              <div className={css.headerWithArrows}>
                <p className={css.tableHeaderText}>Наявність</p>
                <SortButtonsArrow />
              </div>
            )}
            <p className={css.tableHeaderText}>Кількість</p>
            <p className={css.tableHeaderText}>Артикул</p>
            <p className={css.tableHeaderText}>Бренд</p>
            <p className={css.tableHeaderText}>Номенклатура</p>
            {offerId ? (
              <p className={css.tableHeaderText}>Ціна роботи</p>
            ) : (
              <div className={css.headerWithArrows}>
                <p className={css.tableHeaderText}>Ціна роботи</p>
                <SortButtonsArrow />
              </div>
            )}
            {offerId ? (
              <p className={css.tableHeaderText}>Ціна продажу</p>
            ) : (
              <div className={css.headerWithArrows}>
                <p className={css.tableHeaderText}>Ціна продажу</p>
                <SortButtonsArrow />
              </div>
            )}
            <p className={css.tableHeaderText}>Склад</p>
            <p className={css.tableHeaderText}>Сума закупки</p>
            {offerId ? (
              <p className={css.tableHeaderText}>Прибуток</p>
            ) : (
              <div className={css.headerWithArrows}>
                <p className={css.tableHeaderText}>Прибуток</p>
                <SortButtonsArrow />
              </div>
            )}
            {offerId ? (
              <p className={css.tableHeaderText}>%</p>
            ) : (
              <div className={css.headerWithArrows}>
                <p className={css.tableHeaderText}>%</p>
                <SortButtonsArrow />
              </div>
            )}
          </div>

          {offerId ? (
            <div className={css.table}>
              {createdCommercialOffer.parts.map((item, index) => {
                return <PartsListExistedComOffer key={index} data={item} />;
              })}
            </div>
          ) : (
            <div className={css.table}>
              {info.positions[0].position.map((item, index) => {
                return (
                  <PartsList
                    key={index}
                    arr={item}
                    date={"------"}
                    setTotalOrder={setTotalOrder}
                    correctedTotalOrder={correctedTotalOrder}
                  />
                );
              })}
            </div>
          )}
          <FiPlusCircle
            className={clsx(
              css.addIcon,
              offerId ? css.addIconExistedCp : css.addIconCreateCp
            )}
          />

          <div
            className={clsx(
              css.bottomTextWrapper,
              offerId
                ? css.bottomTextWrapperExistedCp
                : css.bottomTextWrapperCreateCp
            )}
          >
            <p></p>
            <p>{totalWorkPrice ? totalWorkPrice : 0} грн</p>
            <p>{totalSalePrice ? totalSalePrice : 0} грн</p>
            <p></p>
            <p>{totalSum ? totalSum.toFixed(2) : 0} грн</p>
            <p>{totalProfit ? totalProfit.toFixed(2) : 0} грн</p>
            <p></p>
          </div>

          <DownloadPdfButtonKP carsData={dataArr} />

          <div className={css.bottomWrapper}>
            <div className={css.btnWrapper}>
              <div className={css.btnWithPopup}>
                <button
                  type="button"
                  className={clsx(
                    css.btn,
                    css.approvalBtn,
                    css.notSubmitted
                    // sentForApproval ? css.submitted : css.notSubmitted
                  )}
                  onClick={() => setIsPopupOpen(!isPopupOpen)}
                  ref={buttonRef}
                >
                  <FaCheck />
                  {approval ? approval : "Відправити на узгодження"}
                  <BsCaretRightFill
                    className={`${css.arrowIcon} ${
                      isPopupOpen ? css.rotated : ""
                    }`}
                  />
                </button>
                {isPopupOpen && (
                  <ComOfferPopup
                    onClose={() => setIsPopupOpen(false)}
                    setApproval={setApproval}
                    buttonRef={buttonRef}
                    isOpen={isPopupOpen}
                  />
                )}
              </div>
              <FaArrowRightLong />
              <button
                type="button"
                className={clsx(
                  css.btn,
                  css.notSubmitted
                  // approved ? css.submitted : css.notSubmitted
                )}
              >
                <FaCheck />
                Узгоджено
              </button>
              <FaArrowRightLong />
              <button
                type="button"
                className={clsx(
                  css.btn,
                  css.notSubmitted
                  // pay ? css.submitted : css.notSubmitted
                )}
              >
                <FaCheck />
                Оплата
              </button>
              <FaArrowRightLong />
              <button
                type="button"
                className={clsx(
                  css.btn,
                  css.notSubmitted
                  // makeOrder ? css.submitted : css.notSubmitted
                )}
              >
                <FaCheck />
                Замовити у постачальника
              </button>
            </div>
            <BtnsCloseAndSubmit
              btnSave={"Зберегти"}
              btnClose={"Скасувати"}
              onClose={onClose}
            />
          </div>
        </>
      )}
    </div>
  );
}
