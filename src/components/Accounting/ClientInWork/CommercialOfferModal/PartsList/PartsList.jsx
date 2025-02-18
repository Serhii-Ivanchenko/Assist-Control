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
import WarehouseAvailabilityModal from "../WarehouseAvailabilityModal/WarehouseAvailabilityModal";
import Modal from "../../../../Modals/Modal/Modal";
import clsx from "clsx";

export default function PartsList({
  arr,
  date,
  setTotalOrder,
  correctedTotalOrder,
  correctedWorkPriceInTotalOrder,
  correctedSalePriceInTotalOrder,
}) {
  const [showAllParts, setShowAllParts] = useState(false);
  const [closeAllParts, setCloseAllParts] = useState(false);
  const [tableHeight, setTableHeight] = useState("auto");
  const [order, setOrder] = useState({});
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [workPrice, setWorkPrice] = useState(arr.work_price);
  const [salePrice, setSalePrice] = useState(arr.sale_price);
  const [isEditing, setIsEditing] = useState(false);
  const tableRef = useRef(null);

  const displayedCarParts = showAllParts ? arr.parts : arr.parts.slice(0, 3);

  useEffect(() => {
    // Вычисляем высоту содержимого при изменении состояния
    if (tableRef.current) {
      setTableHeight(`${tableRef.current.scrollHeight}px`);
    }
  }, [showAllParts, displayedCarParts]);

  const lineHeight = arr.parts.length > 2 ? "160px" : "auto";

  const handleCheckboxChange = (partId, checked, price, profit, node_id) => {
    setOrder((prev) => ({
      ...prev,
      [partId]: {
        quantity: prev[partId]?.quantity || (checked ? 1 : 0),
        selected: checked,
        price,
        profit,
        node_id,
      },
    }));
    setTotalOrder((prev) => ({
      ...prev,
      [partId]: {
        quantity: prev[partId]?.quantity || (checked ? 1 : 0),
        selected: checked,
        price,
        profit,
        node_id,
        work_price: workPrice,
        sale_price: salePrice,
      },
    }));
  };

  const handleQuantityChange = (partId, value) => {
    const newQuantity = parseInt(value, 10) || 0;
    setOrder((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        quantity: newQuantity,
      },
    }));
    setTotalOrder((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        quantity: newQuantity,
      },
    }));
  };

  const handleIncrement = (partId) => {
    const current = order[partId]?.quantity || 0;
    setOrder((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        quantity: current + 1,
      },
    }));
    setTotalOrder((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        quantity: current + 1,
      },
    }));
  };

  const handleDecrement = (partId) => {
    const current = order[partId]?.quantity || 0;
    if (current > 0) {
      setOrder((prev) => ({
        ...prev,
        [partId]: {
          ...prev[partId],
          quantity: current - 1,
        },
      }));
      setTotalOrder((prev) => ({
        ...prev,
        [partId]: {
          ...prev[partId],
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

  const handleWorkPriceChange = (newPrice, nodeId) => {
    setWorkPrice(newPrice);
    // correctedWorkPriceInTotalOrder(nodeId, workPrice);
  };

  const handleSalePriceChange = (newPrice, nodeId) => {
    setSalePrice(newPrice);
    // correctedSalePriceInTotalOrder(nodeId, salePrice);
  };

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
      x: e.clientX - 300, // Зміщення тултіпу від курсора по X
      y: e.clientY - 70, // Зміщення тултіпу від курсора по Y
    });
  };

  return (
    <div>
      <div
        className={clsx(
          css.subHeader,
          isEditing ? css.isEditing : css.notEditing
        )}
      >
        <p className={css.subHeaderDate}>{date}</p>
        <p className={css.subHeaderDate}></p>
        <p className={css.tableHeaderText}>{arr.needed_quantity} шт</p>
        <p className={css.tableHeaderText}>{arr.code}</p>
        <p className={css.tableHeaderText}>{arr.brand}</p>
        <p className={css.tableHeaderText}>{arr.node_name}</p>
        <div className={css.pencilWrapper}>
          {isEditing ? (
            <input
              type="text"
              value={workPrice}
              className={`${css.workPrice} ${css.tableHeaderText}`}
              onChange={(e) =>
                handleWorkPriceChange(e.target.value, arr.node_id)
              }
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <p className={css.tableHeaderText}>{workPrice} грн</p>
          )}
        </div>
        <div className={css.pencilWrapper}>
          {isEditing ? (
            <input
              type="text"
              value={salePrice}
              className={`${css.workPrice} ${css.tableHeaderText}`}
              onChange={(e) =>
                handleSalePriceChange(e.target.value, arr.node_id)
              }
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <p className={css.tableHeaderText}>{salePrice} грн</p>
          )}
        </div>
        <p></p>
        <p>{totalPurchaseAmount ? totalPurchaseAmount.toFixed(2) : 0}</p>
        <p>{totalProfit ? totalProfit : 0}</p>
        <p></p>
        <BsPencil
          className={css.pencilIcon}
          onClick={() => setIsEditing(!isEditing)}
        />
        {isEditing && (
          <FiMinusCircle
            className={css.minusIcon}
            onClick={() => onMinusBtnClick(arr.node_id)}
          />
        )}

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
                  <p className={css.tableDate}>{part.date}</p>
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
                  <div
                    className={css.nameWithOption}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p className={`${css.tableText} ${css.partName}`}>
                      {part.part_name}
                    </p>
                    {isTooltipVisible && (
                      <div
                        className={css.tooltip}
                        style={{
                          top: `${tooltipPosition.y}px`,
                          left: `${tooltipPosition.x}px`,
                        }}
                      >
                        {part.part_name}
                      </div>
                    )}
                  </div>
                  <p></p>
                  <p></p>
                  <div className={css.wrapper}>
                    <p className={css.tableText}>
                      {part.supplier.toLowerCase() === "харків"
                        ? "Наявність"
                        : part.supplier}
                    </p>
                    {part.supplier.toLowerCase() === "харків" && (
                      <p className={css.glassIconWrapper}>
                        <FaMagnifyingGlass
                          className={css.glassIcon}
                          onClick={() => setWarehouseModalOpen(true)}
                        />
                      </p>
                    )}
                  </div>
                  {/* <div className={css.checkboxWrapper}> */}
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
                  <p className={css.tableText}>{part.price}</p>
                  {/* </div> */}
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
      {warehouseModalOpen && (
        <Modal
          isOpen={warehouseModalOpen}
          onClose={() => setWarehouseModalOpen(false)}
        >
          <WarehouseAvailabilityModal
            onClose={() => setWarehouseModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
