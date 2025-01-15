import { useState } from "react";
import css from "./DistributorsInvoicesList.module.css";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";
import DistributorsInvoice from "./DistributorsInvoice/DistributorsInvoice";
import SortButtonsArrow from "../sharedComponents/SortButtonsArrow/SortButtonsArrow";
import { useSelector } from "react-redux";
import { selectVisibilitySuppliers } from "../../redux/visibility/selectors";
import clsx from "clsx";

const dataArr = [
  {
    id: 1,
    orderDate: "02.02",
    distributorLogo: "",
    distributorName: "GRS PARTS",
    invoiceSum: "4610",
    delivered: true,
    deliveryDate: "03.02",
    carPartsQuantity: "7",
    profit: "1780",
    percent: "31",
    carImg: "",
    carNumber: "CA 6864 CO",
    salesAmount: "5800",
    carParts: [
      {
        quantity: 5,
        article: "214197",
        brandName: "MAZDA",
        carPartsName: "Олива MAZDA ORIGINAL",
        price: 600,
        salesAmount: 4300,
        purchaseAmount: "3000",
        salesPercent: "32",
      },
      {
        quantity: 1,
        article: "FZ0121500",
        brandName: "MAZDA",
        carPartsName: "Фильтр масляный АКПП",
        price: 1020,
        purchaseAmount: "1020",
        salesAmount: 1500,
        salesPercent: "33",
      },
      {
        quantity: 1,
        article: "KC 83D",
        brandName: "Knecht/Mah",
        carPartsName: "ФИЛЬТР ТОПЛИВА",
        price: 590,
        purchaseAmount: "590",
        salesAmount: null,
        salesPercent: null,
      },
      {
        quantity: 5,
        article: "214197",
        brandName: "MAZDA",
        carPartsName: "Олива MAZDA ORIGINAL",
        price: 600,
        purchaseAmount: "3000",
        salesAmount: 4300,
        salesPercent: "31",
      },
      {
        quantity: 1,
        article: "FZ0121500",
        brandName: "MAZDA",
        carPartsName: "Фильтр масляный АКПП",
        price: 1020,
        purchaseAmount: "1020",
        salesAmount: 1500,
        salesPercent: "10",
      },
      {
        quantity: 1,
        article: "KC 83D",
        brandName: "Knecht/Mah",
        carPartsName: "ФИЛЬТР ТОПЛИВА",
        price: 590,
        purchaseAmount: "590",
        salesAmount: null,
        salesPercent: null,
      },
    ],
  },
  {
    id: 2,
    orderDate: "02.02",
    distributorLogo: "",
    distributorName: "Elit.ua",
    invoiceSum: "5200",
    delivered: true,
    deliveryDate: "01.02",
    carPartsQuantity: "1",
    profit: "2200",
    percent: "37",
    carImg: "",
    carNumber: "CA 6864 CO",
    salesAmount: "6000",
    carParts: [
      {
        quantity: 1,
        article: "515483232",
        brandName: "MAZDA",
        carPartsName: "Важіль валу перемикання передач МКПП",
        price: "6000",
        purchaseAmount: "6000",
        salesAmount: "8300",
        salesPercent: "31",
      },
    ],
  },
  {
    id: 3,
    orderDate: "02.02",
    distributorLogo: "",
    distributorName: "GRS PARTS",
    invoiceSum: "4610",
    delivered: true,
    deliveryDate: "03.02",
    carPartsQuantity: "17",
    profit: "8000",
    percent: "31",
    carImg: "",
    carNumber: "CA 6864 CO",
    salesAmount: "5800",
    carParts: [
      {
        quantity: 5,
        article: "214197",
        brandName: "HYUNDAI",
        carPartsName: "Олива MAZDA ORIGINAL",
        price: 600,
        purchaseAmount: "3000",
        salesAmount: 4300,
        salesPercent: "31",
      },
      {
        quantity: 1,
        article: "FZ0121500",
        brandName: "HYUNDAI",
        carPartsName: "Фильтр масляный АКПП",
        price: 1020,
        purchaseAmount: "1020",
        salesAmount: 1500,
        salesPercent: "5",
      },
      {
        quantity: 1,
        article: "KC 83D",
        brandName: "HYUNDAI",
        carPartsName: "ФИЛЬТР ТОПЛИВА",
        price: 590,
        purchaseAmount: "590",
        salesAmount: null,
        salesPercent: null,
      },
      {
        quantity: 5,
        article: "214197",
        brandName: "MAZDA",
        carPartsName: "Олива MAZDA ORIGINAL",
        price: 600,
        purchaseAmount: "3000",
        salesAmount: 4300,
        salesPercent: "22",
      },
      {
        quantity: 1,
        article: "FZ0121500",
        brandName: "MAZDA",
        carPartsName: "Фильтр масляный АКПП",
        price: 1020,
        purchaseAmount: "1020",
        salesAmount: 1500,
        salesPercent: "25",
      },
      {
        quantity: 1,
        article: "KC 83D",
        brandName: "Knecht/Mah",
        carPartsName: "ФИЛЬТР ТОПЛИВА",
        price: 590,
        purchaseAmount: "590",
        salesAmount: null,
        salesPercent: null,
      },
    ],
  },
  {
    id: 4,
    orderDate: "02.02",
    distributorLogo: "",
    distributorName: "Elit.ua",
    invoiceSum: "5200",
    delivered: true,
    deliveryDate: "01.02",
    carPartsQuantity: "5",
    profit: "5000",
    percent: "37",
    carImg: "",
    carNumber: "CA 6864 CO",
    salesAmount: "6000",
    carParts: [
      {
        quantity: 1,
        article: "515483232",
        brandName: "MAZDA",
        carPartsName: "Важіль валу перемикання передач МКПП",
        price: "6000",
        purchaseAmount: "6000",
        salesAmount: "8300",
        salesPercent: "31",
      },
      {
        quantity: 1,
        article: "515483232",
        brandName: "MAZDA",
        carPartsName: "Важіль валу перемикання передач МКПП",
        price: "6000",
        purchaseAmount: "6000",
        salesAmount: "8300",
        salesPercent: "42",
      },
    ],
  },
];

export default function DistributorsInvoicesList() {
  const [data, setData] = useState(dataArr);
  const visibility = useSelector(selectVisibilitySuppliers);
  const [sortOrder, setSortOrder] = useState("asc");

  const sort = (array, key, order) => {
    return array.sort((a, b) => {
      if (Number(a[key]) < Number(b[key])) {
        return order === "asc" ? -1 : 1;
      }
      if (Number(a[key]) > Number(b[key])) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortDates = (array, key, order) => {
    return array.sort((a, b) => {
      const dateA = a[key].split(".").reverse().join(".");
      const dateB = b[key].split(".").reverse().join(".");

      if (dateA < dateB) {
        return order === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key, func) => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    const sortedData = func([...data], key, sortOrder);
    setData(sortedData);
  };

  const sortCarParts = (key) => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }

    setData((prevValues) =>
      prevValues.map((value) => ({
        ...value,
        carParts: [...value.carParts].sort((a, b) => {
          if (Number(a[key]) < Number(b[key])) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (Number(a[key]) > Number(b[key])) {
            return sortOrder === "asc" ? 1 : -1;
          }
          return 0;
        }),
      }))
    );
  };

  return (
    <div>
      <div className={css.headerWrapper}>
        <div className={css.legtHeaderWrapper}></div>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.date,
          })}
          onClick={() => handleSort("deliveryDate", sortDates)}
        >
          <p className={css.header}>Дата</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                handleSort("deliveryDate", "asc", sortDates);
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                handleSort("deliveryDate", "desc", sortDates);
              }}
            />
          </div> */}
        </div>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.quantity,
          })}
          onClick={() => handleSort("carPartsQuantity", sort)}
        >
          <p className={css.header}>Кількість</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                handleSort("carPartsQuantity", "asc", sort);
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                handleSort("carPartsQuantity", "desc", sort);
              }}
            />
          </div> */}
        </div>
        <p className={clsx(css.header, { [css.hidden]: !visibility?.article })}>
          Артикул
        </p>
        <p className={clsx(css.header, { [css.hidden]: !visibility?.brand })}>
          Бренд
        </p>
        <p
          className={clsx(css.header, {
            [css.hidden]: !visibility?.nomenclature,
          })}
        >
          Номенклатура
        </p>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.purchasePrice,
          })}
          onClick={() => sortCarParts("price")}
        >
          <p className={css.header}>Ціна закупки</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                sortCarParts("price", "asc");
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                sortCarParts("price", "desc");
              }}
            />
          </div> */}
        </div>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.purchaseAmount,
          })}
          onClick={() => sortCarParts("purchaseAmount")}
        >
          <p className={css.header}>Сума закупки</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                sortCarParts("purchaseAmount", "asc");
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                sortCarParts("purchaseAmount", "desc");
              }}
            />
          </div> */}
        </div>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.saleAmount,
          })}
          onClick={() => sortCarParts("salesAmount")}
        >
          <p className={css.header}>Сума продажу</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                sortCarParts("salesAmount", "asc");
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                sortCarParts("salesAmount", "desc");
              }}
            />
          </div> */}
        </div>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.profit,
          })}
          onClick={() => handleSort("profit", sort)}
        >
          <p className={css.header}>Прибуток</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                handleSort("profit", "asc", sort);
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                handleSort("profit", "desc", sort);
              }}
            />
          </div> */}
        </div>
        <div
          className={clsx(css.headerWithArrows, {
            [css.hidden]: !visibility?.percent,
          })}
          onClick={() => handleSort("percent", sort)}
        >
          <p className={css.header}>%</p>
          <SortButtonsArrow />
          {/* <div className={css.arrowWrapper}>
            <TiArrowSortedUp
              className={css.arrowIcon}
              onClick={() => {
                handleSort("percent", "asc", sort);
              }}
            />
            <TiArrowSortedDown
              className={css.arrowIcon}
              onClick={() => {
                handleSort("percent", "desc", sort);
              }}
            />
          </div> */}
        </div>
      </div>
      <div className={css.table}>
        {data.map((item) => {
          return <DistributorsInvoice key={item.id} arr={item} />;
        })}
      </div>
    </div>
  );
}
