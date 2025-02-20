import { useEffect, useState } from "react";
import css from "./OrderPartsList.module.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { FaCheck, FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
// import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { BsReceipt, BsGlobe } from "react-icons/bs";
import clsx from "clsx";

export default function OrderPartsList({ arr }) {
  const [displayedData, setDisplayedData] = useState(arr.parts);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(arr.ordered_quantity);
  const [totalSum, setTotalSum] = useState(arr.invoice_sum);

  const handleMouseEnter = (e) => {
    setIsTooltipVisible(true);
    updateTooltipPosition(e);
  };

  const handleMouseMove = (e) => {
    updateTooltipPosition(e);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const updateTooltipPosition = (e) => {
    setTooltipPosition({
      x: e.clientX - 500, // Зміщення тултіпу від курсора по X
      y: e.clientY - 70, // Зміщення тултіпу від курсора по Y
    });
  };

  const onMinusBtnClick = (id) => {
    setDisplayedData((parts) => {
      return parts.filter((part) => part.id !== id);
    });
  };

  const calculateTotalQuantity = () => {
    const newTotal = displayedData.reduce((sum, item) => {
      return sum + Number(item.quantity);
    }, 0);
    setTotalQuantity(newTotal);
  };

  const calculateTotalSum = () => {
    const newTotal = displayedData.reduce((sum, item) => {
      return sum + Number(item.sum);
    }, 0);
    setTotalSum(newTotal);
  };

  useEffect(() => {
    calculateTotalQuantity();
    calculateTotalSum();
  }, [displayedData]);

  return (
    <>
      <div className={css.subHeader}>
        <div className={css.infoWrapper}>
          <div className={css.logoWrapper}>
            <img src={arr.logo} alt="logo" className={css.logo} />
            <p>{arr.supplier}</p>
          </div>
          <button type="button" className={`${css.mechanicName} ${css.sumBtn}`}>
            <BsReceipt className={css.sumIcon} />
            {totalSum} грн
          </button>
        </div>
        <p className={`${css.subHeaderDate} ${css.subHeaderText}`}>
          {arr.date}
        </p>
        <p className={css.subHeaderText}>{totalQuantity} шт</p>
        {isChecked ? (
          <FaRegCheckSquare
            className={clsx(
              css.checkIcon,
              totalQuantity === 0 && css.iconDisabled
            )}
            onClick={() => setIsChecked(!isChecked)}
          />
        ) : (
          <FaRegSquare
            className={clsx(
              css.checkIcon,
              totalQuantity === 0 && css.iconDisabled
            )}
            onClick={() => setIsChecked(!isChecked)}
          />
        )}
        {totalQuantity > 0 && (
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className={css.supplierLink}
          >
            <BsGlobe />
            Сайт
          </a>
        )}
      </div>
      <div>
        {displayedData.map((part, index) => {
          return (
            <div key={index} className={css.stringWrapper}>
              <p className={css.tableHeader}>{part.availability}</p>
              <p className={css.tableHeader}>{part.date}</p>
              <p className={css.tableHeader}>{part.quantity} шт</p>
              <p className={css.tableHeader}>{part.code}</p>
              <p className={css.tableHeader}>{part.brand}</p>
              <div
                className={css.option}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <p className={`${css.tableHeader} ${css.partName}`}>
                  {part.name}
                </p>
                {isTooltipVisible && (
                  <div
                    className={css.tooltip}
                    style={{
                      top: `${tooltipPosition.y}px`,
                      left: `${tooltipPosition.x}px`,
                    }}
                  >
                    {part.name}
                  </div>
                )}
              </div>
              <p className={css.tableHeader}>{part.price} грн</p>
              <p className={css.tableHeader}>{part.sum} грн</p>
              <FiMinusCircle
                className={css.minusIcon}
                onClick={() => onMinusBtnClick(part.id)}
              />
            </div>
          );
        })}
        <FiPlusCircle className={css.addIcon} />
        {totalQuantity > 0 && (
          <button type="button" className={css.payBtn}>
            <FaCheck />
            Сплатити постачальнику
          </button>
        )}
      </div>
    </>
  );
}
