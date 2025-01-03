import { useEffect, useRef, useState } from "react";
import css from "./DistributorsInvoice.module.css";
import { BsReceipt } from "react-icons/bs";
import clsx from "clsx";
import carImg from "../../../assets/images/car.png";
import distrLogo from "../../../assets/images/distrImg.png";
import { selectVisibilitySuppliers } from "../../../redux/visibility/selectors";
import { useSelector } from "react-redux";

export default function DistributorsInvoice({ arr }) {
  const [showAllInvoice, setShowAllInvoice] = useState(false);
  const [tableHeight, setTableHeight] = useState("auto");
  const tableRef = useRef(null);
  const visibility = useSelector(selectVisibilitySuppliers);

  const displayedCarParts = showAllInvoice
    ? arr.carParts
    : arr.carParts.slice(0, 3);

  useEffect(() => {
    // Вычисляем высоту содержимого при изменении состояния
    if (tableRef.current) {
      setTableHeight(`${tableRef.current.scrollHeight}px`);
    }
  }, [showAllInvoice, displayedCarParts]);

  const lineHeight = arr.carParts.length > 2 ? "87px" : "auto";

  return (
    <div>
      <div className={css.topWrapper}>
        <p>{arr.orderDate}</p>
        <div className={css.subHeader}>
          <div className={css.subHeaderLeft}>
            <div className={css.imgWrapper}>
              <img src={distrLogo} alt="car" className={css.logo} />
              <p className={css.distributorName}>{arr.distributorName}</p>
            </div>
            <button type="button" className={`${css.sum} ${css.invoiceSumBtn}`}>
              <BsReceipt className={css.btnIcon} />
              {arr.invoiceSum} грн
            </button>
          </div>
          <div className={css.centerWrapper}>
            <div className={css.headerCenterWrapper}>
              <p className={css.storage}>{arr.delivered ? "Склад" : "-"}</p>
              {visibility?.date && (
                <p className={css.headerCenterText}>{arr.deliveryDate}</p>
              )}
              {visibility?.quantity && (
                <p className={css.headerCenterText}>
                  {arr.carPartsQuantity} шт
                </p>
              )}
            </div>
            <div className={css.subHeaderRight}>
              {visibility?.profit && (
                <p className={css.headerCenterText}>{arr.profit} грн</p>
              )}
              {visibility?.percent && (
                <p className={css.headerCenterText}>{arr.percent} %</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={css.wrapper}>
        <div className={css.carDetailsWrapper}>
          <img src={carImg} alt="" className={css.carImg} />
          <div className={css.carNumberWrapper}>
            <div className={css.carNumberLeft}>
              <div className={css.flag}>
                <div className={css.flagTop}></div>
                <div className={css.flagBottom}></div>
              </div>
              <p className={css.numberCountry}>UA</p>
            </div>
            <div className={css.carNumberRight}>
              <p className={css.carNumber}>{arr.carNumber}</p>
            </div>
          </div>

          <button type="button" className={`${css.sum} ${css.salesAmountBtn}`}>
            <BsReceipt className={css.salesAmountBtnIcon} />
            {arr.salesAmount} грн
          </button>
        </div>
        <div
          className={css.table}
          // style={{ height: showAllInvoice ? tableHeight : "87px" }}
          style={{ height: showAllInvoice ? tableHeight : lineHeight }}
          ref={tableRef}
        >
          {displayedCarParts.map((part, index) => {
            return (
              <div key={index}>
                <div className={css.stringWrapper}>
                  {visibility?.date && (<p className={css.tableText}>{arr.deliveryDate}</p>)}
                  {visibility?.quantity && (<p className={css.tableText}>{part.quantity} шт</p>)}
                  {visibility?.article && (<p className={css.tableText}>{part.article}</p>)}
                  {visibility?.brand && (<p className={css.tableText}>{part.brandName}</p>)}
                  {visibility?.nomenclature && (<p className={css.tableText}>{part.carPartsName}</p>)}
                  {visibility?.purchasePrice && (<p className={css.tableText}>{part.price} грн</p>)}
                  {visibility?.purchaseAmount && (<p className={css.tableText}>{part.purchaseAmount} грн</p>)}
                  {visibility?.saleAmount && (<p className={css.tableText}>
                    {part.salesAmount ? `${part.salesAmount} грн` : "Склад"}
                  </p>)}
                  {visibility?.profit && (<p
                    className={clsx(
                      css.tableText,
                      !part.salesAmount && css.less
                    )}
                  >
                    {part.salesAmount
                      ? `${part.salesAmount - part.quantity * part.price} грн`
                      : "!"}
                  </p>)}
                  {visibility?.percent && (<p
                    className={clsx(
                      css.tableText,
                      Number(part.salesPercent) > 29 ? css.more : css.less
                    )}
                  >
                    {part.salesPercent ? `${part.salesPercent} %` : "-100 %"}
                  </p>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {arr.carParts.length > 3 && (
        <button
          onClick={() => setShowAllInvoice(!showAllInvoice)}
          className={css.showMoreBtn}
        >
          {showAllInvoice ? "Згорнути" : "Показати більше"}
        </button>
      )}
    </div>
  );
}
