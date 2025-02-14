import css from "./CommercialOfferModal.module.css";
import { BsXLg } from "react-icons/bs";
import { TiSpanner } from "react-icons/ti";
import { BsPersonLinesFill } from "react-icons/bs";
import carImg from "../../../../assets/images/car.png";
import SortButtonsArrow from "../../../sharedComponents/SortButtonsArrow/SortButtonsArrow";
import PartsList from "./PartsList/PartsList";
import CarInfo from "../../../sharedComponents/CarInfo/CarInfo";
import { useMemo, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import BtnsCloseAndSubmit from "../../../sharedComponents/BtnsCloseAndSubmit/BtnsCloseAndSubmit";
import { BsCaretRightFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import clsx from "clsx";
import ComOfferPopup from "./ComOfferPopup/ComOfferPopup";

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

export default function CommercialOfferModal({ onClose }) {
  const data = useMemo(() => dataArr, []);
  const [totalOrder, setTotalOrder] = useState({});
  const [sentForApproval, setSentForApproval] = useState(false);
  const [approved, setApproved] = useState(false);
  const [pay, setPay] = useState(false);
  const [makeOrder, setMakeOrder] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  console.log(totalOrder);

  const correctedTotalOrder = (nodeId) => {
    const updatedItems = Object.fromEntries(
      Object.entries(totalOrder).map(([key, value]) => [
        key,
        value.node_id === nodeId ? { ...value, selected: false } : { ...value },
      ])
    );
    setTotalOrder(updatedItems);
  };

  // const [sortOrder, setSortOrder] = useState("asc");
  // const [data, setData] = useState(dataArr);
  const date = new Date(data.created_at);

  // Получаем день, месяц и год
  const day = String(date.getDate()).padStart(2, "0"); // "06"
  const month = String(date.getMonth() + 1).padStart(2, "0"); // "02" (месяцы начинаются с 0)
  const year = date.getFullYear(); // 2025

  // Собираем итоговую строку в формате "dd.mm.yyyy"
  const formattedDate = `${day}.${month}.${year}`;

  // const sort = (array, key, order) => {
  //   return array.sort((a, b) => {
  //     if (Number(a[key]) < Number(b[key])) {
  //       return order === "asc" ? -1 : 1;
  //     }
  //     if (Number(a[key]) > Number(b[key])) {
  //       return order === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  // };

  // const sortDates = (array, key, order) => {
  //   return array.sort((a, b) => {
  //     const dateA = a[key].split(".").reverse().join(".");
  //     const dateB = b[key].split(".").reverse().join(".");

  //     if (dateA < dateB) {
  //       return order === "asc" ? -1 : 1;
  //     }
  //     if (dateA > dateB) {
  //       return order === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  // };

  // const handleSort = (key, func) => {
  //   if (sortOrder === "asc") {
  //     setSortOrder("desc");
  //   } else {
  //     setSortOrder("asc");
  //   }
  //   const sortedData = func([...data], key, sortOrder);
  //   setData(sortedData);
  // };

  // const sortCarParts = (key) => {
  //   if (sortOrder === "asc") {
  //     setSortOrder("desc");
  //   } else {
  //     setSortOrder("asc");
  //   }

  //   setData((prevValues) =>
  //     prevValues.nodes.map((value) => ({
  //       ...value,
  //       parts: [...value.parts].sort((a, b) => {
  //         if (a[key] < b[key]) {
  //           return sortOrder === "asc" ? -1 : 1;
  //         }
  //         if (a[key] > b[key]) {
  //           return sortOrder === "asc" ? 1 : -1;
  //         }
  //         return 0;
  //       }),
  //     }))
  //   );
  // };

  return (
    <div className={css.modal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <div className={css.topWrapper}>
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
        <div className={css.centerWrapper}>
          <button type="button" className={css.original}>
            Орігінал
          </button>
          <button type="button" className={css.analogue}>
            Аналог
          </button>
        </div>
        <div className={css.rightSectionWrapper}>
          <p className={css.date}>{formattedDate}</p>
          <p className={css.link}>Діагностика № </p>
          <div className={css.mechanicWrapper}>
            <TiSpanner className={css.spannerIcon} />
            <p className={css.mechanicText}>Механік:</p>
            <p className={css.mechanicName}>{data.mechanic.mechanic_name}</p>
          </div>
          <div className={css.managerWrapper}>
            <BsPersonLinesFill className={css.personIcon} />
            <p className={css.mechanicText}>Менеджер:</p>
            <p className={css.mechanicName}>{data.manager.manager_name}</p>
          </div>
        </div>
      </div>
      <div className={css.tableHeaderWrapper}>
        <div className={css.headerWithArrows}>
          <p className={css.tableHeaderText}>Дата</p>
          <SortButtonsArrow />
        </div>
        <div className={css.headerWithArrows}>
          <p>Наявність</p>
          <SortButtonsArrow />
        </div>
        <p className={css.tableHeaderText}>Кількість</p>
        <p className={css.tableHeaderText}>Артикул</p>
        <p className={css.tableHeaderText}>Бренд</p>
        <p className={css.tableHeaderText}>Номенклатура</p>
        <div className={css.headerWithArrows}>
          <p className={css.tableHeaderText}>Ціна роботи</p>
          <SortButtonsArrow />
        </div>
        <div className={css.headerWithArrows}>
          <p className={css.tableHeaderText}>Ціна продажу</p>
          <SortButtonsArrow />
        </div>
        <p className={css.tableHeaderText}>Склад</p>
        <p>Сума закупки</p>
        <div className={css.headerWithArrows}>
          <p>Прибуток</p>
          <SortButtonsArrow />
        </div>
        <div className={css.headerWithArrows}>
          <p>%</p>
          <SortButtonsArrow />
        </div>
      </div>
      <div className={css.table}>
        {data.nodes.map((item) => {
          return (
            <PartsList
              key={item.node_id}
              arr={item}
              date={data.repair_date}
              setTotalOrder={setTotalOrder}
              correctedTotalOrder={correctedTotalOrder}
            />
          );
        })}
      </div>
      <FiPlusCircle className={css.addIcon} />
      <div className={css.bottomTextWrapper}>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <p className={css.prdBtn}>PDF Btn</p>
      <div className={css.bottomWrapper}>
        <div className={css.btnWrapper}>
          <button
            type="button"
            className={clsx(
              css.btnWithPopup,
              sentForApproval ? css.submitted : css.notSubmitted
            )}
            onClick={() => setIsPopupOpen(true)}
          >
            <FaCheck />
            Відправити на узгодження
            <BsCaretRightFill />
          </button>
          {/* {isPopupOpen && (
            <ComOfferPopup onClose={() => setIsPopupOpen(false)} />
          )} */}
          <FaArrowRightLong />
          <button
            type="button"
            className={clsx(
              css.btn,
              approved ? css.submitted : css.notSubmitted
            )}
          >
            <FaCheck />
            Узгоджено
          </button>
          <FaArrowRightLong />
          <button
            type="button"
            className={clsx(css.btn, pay ? css.submitted : css.notSubmitted)}
          >
            <FaCheck />
            Оплата
          </button>
          <FaArrowRightLong />
          <button
            type="button"
            className={clsx(
              css.btn,
              makeOrder ? css.submitted : css.notSubmitted
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
    </div>
  );
}
