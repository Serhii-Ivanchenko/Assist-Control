import { useState } from "react";
import css from "./DistributorsInvoice.module.css";
import { BsReceipt } from "react-icons/bs";
import clsx from "clsx";
import carImg from "../../../assets/images/car.png";
import distrLogo from "../../../assets/images/distrImg.png";

export default function DistributorsInvoice({ arr }) {
  const [showAllInvoice, setShowAllInvoice] = useState(false);

  const displayedCarParts = showAllInvoice
    ? arr.carParts
    : arr.carParts.slice(0, 3);

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
              {arr.invoiceSum}
            </button>
          </div>
          <div className={css.centerWrapper}>
            <div className={css.headerCenterWrapper}>
              <p className={css.storage}>{arr.delivered ? "Склад" : "-"}</p>
              <p className={css.headerCenterText}>{arr.deliveryDate}</p>
              <p className={css.headerCenterText}>{arr.carPartsQuantity} шт</p>
            </div>
            <div className={css.subHeaderRight}>
              <p className={css.headerCenterText}>{arr.profit} грн</p>
              <p className={css.headerCenterText}>{arr.percent} %</p>
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
            {arr.salesAmount}
          </button>
        </div>
        <div>
          {displayedCarParts.map((part, index) => {
            return (
              <div key={index} className={css.table}>
                <div className={css.stringWrapper}>
                  <p className={css.tableText}>{arr.deliveryDate}</p>
                  <p className={css.tableText}>{part.quantity} шт</p>
                  <p className={css.tableText}>{part.article}</p>
                  <p className={css.tableText}>{part.brandName}</p>
                  <p className={css.tableText}>{part.carPartsName}</p>
                  <p className={css.tableText}>{part.price} грн</p>
                  <p className={css.tableText}>{part.purchaseAmount} грн</p>
                  <p className={css.tableText}>
                    {part.salesAmount ? `${part.salesAmount} грн` : "Склад"}
                  </p>
                  <p
                    className={clsx(
                      css.tableText,
                      !part.salesAmount && css.less
                    )}
                  >
                    {part.salesAmount
                      ? `${part.salesAmount - part.quantity * part.price} грн`
                      : "!"}
                  </p>
                  <p
                    className={clsx(
                      css.tableText,
                      Number(part.salesPercent) > 29 ? css.more : css.less
                    )}
                  >
                    {part.salesPercent ? `${part.salesPercent} %` : "-100 %"}
                  </p>
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
