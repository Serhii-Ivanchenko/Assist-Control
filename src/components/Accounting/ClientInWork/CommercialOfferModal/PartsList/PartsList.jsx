import { useEffect, useRef, useState } from "react";
import css from "./PartsList.module.css";
import { BsPencil } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";

export default function PartsList({
  arr,
  date,
  setTotalOrder,
  correctedTotalOrder,
}) {
  const [showAllParts, setShowAllParts] = useState(false);
  const [closeAllParts, setCloseAllParts] = useState(false);
  const [tableHeight, setTableHeight] = useState("auto");
  const [order, setOrder] = useState({});
  const tableRef = useRef(null);

  const displayedCarParts = showAllParts ? arr.parts : arr.parts.slice(0, 3);

  useEffect(() => {
    // Вычисляем высоту содержимого при изменении состояния
    if (tableRef.current) {
      setTableHeight(`${tableRef.current.scrollHeight}px`);
    }
  }, [showAllParts, displayedCarParts]);

  const lineHeight = arr.parts.length > 2 ? "284px" : "auto";

  const handleCheckboxChange = (availId, checked, price, profit, node_id) => {
    setOrder((prev) => ({
      ...prev,
      [availId]: {
        quantity: prev[availId]?.quantity || (checked ? 1 : 0),
        selected: checked,
        price,
        profit,
        node_id,
      },
    }));
    setTotalOrder((prev) => ({
      ...prev,
      [availId]: {
        quantity: prev[availId]?.quantity || (checked ? 1 : 0),
        selected: checked,
        price,
        profit,
        node_id,
      },
    }));
  };

  const handleQuantityChange = (availId, value) => {
    const newQuantity = parseInt(value, 10) || 0;
    setOrder((prev) => ({
      ...prev,
      [availId]: {
        ...prev[availId],
        quantity: newQuantity,
      },
    }));
    setTotalOrder((prev) => ({
      ...prev,
      [availId]: {
        ...prev[availId],
        quantity: newQuantity,
      },
    }));
  };

  const handleIncrement = (availId) => {
    const current = order[availId]?.quantity || 0;
    setOrder((prev) => ({
      ...prev,
      [availId]: {
        ...prev[availId],
        quantity: current + 1,
      },
    }));
    setTotalOrder((prev) => ({
      ...prev,
      [availId]: {
        ...prev[availId],
        quantity: current + 1,
      },
    }));
  };

  const handleDecrement = (availId) => {
    const current = order[availId]?.quantity || 0;
    if (current > 0) {
      setOrder((prev) => ({
        ...prev,
        [availId]: {
          ...prev[availId],
          quantity: current - 1,
        },
      }));
      setTotalOrder((prev) => ({
        ...prev,
        [availId]: {
          ...prev[availId],
          quantity: current - 1,
        },
      }));
    }
  };

  const totalProfit = Object.values(order).reduce((sum, item) => {
    return item.selected
      ? sum + Number(item.profit) * Number(item.quantity)
      : sum;
  }, 0);

  const totalPurchaseAmount = Object.values(order).reduce((sum, item) => {
    return item.selected ? sum + Number(item.quantity * item.price) : sum;
  }, 0);

  const onMinusBtnClick = (nodeId) => {
    const updatedItems = Object.entries(order).reduce((acc, [key, value]) => {
      acc[key] = { ...value, selected: false };
      return acc;
    }, {});
    setOrder(updatedItems);
    correctedTotalOrder(nodeId);
  };

  const handleHeightChange = () => {
    setCloseAllParts(!closeAllParts);
  };

  return (
    <div>
      <div className={css.subHeader}>
        <p className={css.subHeaderDate}>{date}</p>
        <p className={css.subHeaderDate}>{arr.needed_quantity} шт</p>
        <p></p>
        <p className={css.tableHeaderText}>{arr.code}</p>
        <p className={css.tableHeaderText}>{arr.brand}</p>
        <p className={css.tableHeaderText}>{arr.node_name}</p>
        <div className={css.pencilWrapper}>
          <p className={css.tableHeaderText}>{arr.work_price} грн</p>
          {/* <BsPencil className={css.pencilIcon} /> */}
        </div>
        <div className={css.pencilWrapper}>
          <p className={css.tableHeaderText}>{arr.sale_price} грн</p>
          {/* <BsPencil className={css.pencilIcon} /> */}
        </div>
        <p></p>
        <p>{totalPurchaseAmount ? totalPurchaseAmount.toFixed(2) : 0}</p>
        <p>{totalProfit ? totalProfit : 0}</p>
        <p></p>
        <BsPencil className={css.pencilIcon} />
        <FiMinusCircle
          className={css.minusIcon}
          onClick={() => onMinusBtnClick(arr.node_id)}
        />
        {closeAllParts ? (
          <BsCaretRightFill onClick={handleHeightChange} />
        ) : (
          <BsCaretDownFill onClick={handleHeightChange} />
        )}
      </div>
      {!closeAllParts && (
        <>
          <div
            ref={tableRef}
            className={css.table}
            style={{ height: showAllParts ? tableHeight : lineHeight }}
          >
            {displayedCarParts.map((part) => {
              return (
                <div key={part.id} className={css.stringWrapper}>
                  <p className={css.tableText}>{part.date}</p>
                  <p className={css.tableText}>{part.availability} шт</p>
                  <div className={css.quantityWrapper}>
                    <button type="button" className={css.quantityBtn}>
                      <FiMinusCircle
                        className={css.quantityIcon}
                        onClick={() => handleDecrement(part.id)}
                      />
                    </button>
                    <input
                      type="text"
                      className={css.quantity}
                      value={order[part.id]?.quantity || 0}
                      onChange={(e) =>
                        handleQuantityChange(part.id, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      disabled={order[part.id]?.quantity >= part.availability}
                      className={css.quantityBtn}
                    >
                      <FiPlusCircle
                        className={css.quantityIcon}
                        onClick={() => handleIncrement(part.id)}
                      />
                    </button>
                  </div>
                  <p className={css.tableText}>{part.code}</p>
                  <p className={css.tableText}>{part.brand}</p>
                  <p className={css.tableText}>{part.part_name}</p>
                  <p></p>
                  <p></p>
                  <div className={css.wrapper}>
                    <p>
                      {part.supplier.toLowerCase() === "харків"
                        ? "Наявність"
                        : part.supplier}
                    </p>
                    {part.supplier.toLowerCase() === "харків" && (
                      <p className={css.glassIconWrapper}>
                        <FaMagnifyingGlass className={css.glassIcon} />
                      </p>
                    )}
                  </div>
                  <div className={css.checkboxWrapper}>
                    <label className={css.checkboxIcon}>
                      <input
                        type="checkbox"
                        name="checkbox"
                        className={css.checkboxInput}
                        checked={order[part.id]?.selected || false}
                        onChange={(e) =>
                          handleCheckboxChange(
                            part.id,
                            e.target.checked,
                            part.price,
                            part.profit,
                            arr.node_id
                          )
                        }
                      />
                      {order[part.id]?.selected ? (
                        <FaRegCheckSquare className={css.checkboxIcon} />
                      ) : (
                        <FaRegSquare className={css.checkboxIcon} />
                      )}
                    </label>
                    <p>{part.price}</p>
                  </div>
                  <p>{part.profit}</p>
                  <p>{part.percent}</p>
                </div>
              );
            })}
          </div>
          {arr.parts.length > 3 && (
            <button
              onClick={() => setShowAllParts(!showAllParts)}
              className={css.showMoreBtn}
            >
              {showAllParts ? "Згорнути" : "Показати більше"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
