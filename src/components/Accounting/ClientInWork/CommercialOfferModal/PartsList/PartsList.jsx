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
import { RiSave3Fill } from "react-icons/ri";
import WarehouseAvailabilityModal from "../WarehouseAvailabilityModal/WarehouseAvailabilityModal";
import Modal from "../../../../Modals/Modal/Modal";
import clsx from "clsx";
import DeletePartModal from "../DeletePartModal/DeletePartModal";

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
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [workPrice, setWorkPrice] = useState("--------");
  const [salePrice, setSalePrice] = useState("------");
  const [isEditing, setIsEditing] = useState(false);
  const [deletePartModalOpen, setDeletePartModalOpen] = useState(false);
  const [nodeIdForDelete, setNodeIdForDelete] = useState("");
  const tableRef = useRef(null);

  console.log("arr", arr);

  const sortedPartsArray = [...arr.data[0].parts].sort(
    (a, b) => a.details.price - b.details.price
  );

  const displayedCarParts = showAllParts
    ? sortedPartsArray
    : sortedPartsArray.slice(0, 3);

  useEffect(() => {
    // Вычисляем высоту содержимого при изменении состояния
    if (tableRef.current) {
      setTableHeight(`${tableRef.current.scrollHeight}px`);
    }
  }, [showAllParts, displayedCarParts]);

  const lineHeight = arr.data[0].parts.length > 2 ? "160px" : "auto";

  const handleCheckboxChange = (partId, checked, price, profit) => {
    setOrder((prev) => ({
      ...prev,

      [partId]: {
        quantity: prev[partId]?.quantity || 1,
        selected: checked,
        price,
        profit,
        // node_id,
      },
    }));

    setTotalOrder((prev) => {
      if (!checked) {
        const { [partId]: _, ...rest } = prev; // Видаляємо елемент, якщо unchecked
        return rest;
      }
      return {
        ...prev,
        [partId]: {
          quantity: prev[partId]?.quantity || 1,
          selected: checked,
          price,
          profit,
          // node_id,
          work_price: workPrice,
          sale_price: salePrice,
        },
      };
    });
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
      <div className={`${css.subHeader} ${css.createCp}`}>
        <p className={css.subHeaderDate}>{"------"}</p>
        <p className={css.subHeaderDate}></p>
        <p className={css.tableHeaderText}>{"--------"} шт</p>
        <p className={css.tableHeaderText}>{"------"}</p>
        <p className={css.tableHeaderText}>{"-----"}</p>
        <p className={css.tableHeaderText}>{arr.part_name}</p>
        <div className={css.pencilWrapper}>
          {isEditing ? (
            <input
              type="text"
              value={workPrice}
              className={`${css.workPrice} ${css.tableHeaderText}`}
              onChange={(e) => setWorkPrice(e.target.value)}
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
              onChange={(e) => setSalePrice(e.target.value)}
            />
          ) : (
            <p className={css.tableHeaderText}>{salePrice} грн</p>
          )}
        </div>
        <p></p>
        <p>{totalPurchaseAmount ? totalPurchaseAmount.toFixed(2) : 0}</p>
        <p>{totalProfit ? totalProfit.toFixed(2) : 0}</p>
        <p></p>
        <div className={css.iconsWrapper}>
          {isEditing ? (
            <RiSave3Fill
              className={css.saveIcon}
              onClick={() => setIsEditing(!isEditing)}
            />
          ) : (
            <BsPencil
              className={css.pencilIcon}
              onClick={() => setIsEditing(!isEditing)}
            />
          )}

          {isEditing && (
            <FiMinusCircle
              className={css.minusIcon}
              onClick={() => {
                setDeletePartModalOpen(true);
                // setNodeIdForDelete(arr.node_id);
              }}
            />
          )}
        </div>
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
            {displayedCarParts.map((part, index) => {
              return (
                <div key={index} className={css.stringWrapper}>
                  <p className={css.tableDate}>{"----"}</p>
                  <p className={css.tableText}>{"------"} шт</p>
                  <div className={css.quantityWrapper}>
                    <button type="button" className={css.quantityBtn}>
                      <FiMinusCircle
                        className={css.quantityIcon}
                        onClick={() => handleDecrement(part.partId)}
                      />
                    </button>
                    <input
                      type="text"
                      className={css.quantity}
                      value={order[part.partId]?.quantity || 0}
                      onChange={(e) =>
                        handleQuantityChange(part.partId, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      disabled={
                        order[part.partId]?.quantity >= part.availability
                      }
                      className={css.quantityBtn}
                    >
                      <FiPlusCircle
                        className={css.quantityIcon}
                        onClick={() => handleIncrement(part.partId)}
                      />
                    </button>
                  </div>
                  <p className={css.tableText}>{part.code}</p>
                  <p className={css.tableText}>{part.details.brand}</p>
                  <div
                    className={css.nameWithOption}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p className={`${css.tableText} ${css.partName}`}>
                      {arr.part_name}
                    </p>
                    {isTooltipVisible && (
                      <div
                        className={css.tooltip}
                        style={{
                          top: `${tooltipPosition.y}px`,
                          left: `${tooltipPosition.x}px`,
                        }}
                      >
                        {arr.part_name}
                      </div>
                    )}
                  </div>
                  <p></p>
                  <p></p>
                  <div className={css.wrapper}>
                    <p className={css.tableText}>
                      {/* {part.supplier.toLowerCase() === "харків"
                        ? "Наявність"
                        : part.supplier} */}
                      {part.supplier}
                    </p>
                    {/* {part.supplier.toLowerCase() === "харків" && (
                      <p className={css.glassIconWrapper}>
                        <FaMagnifyingGlass
                          className={css.glassIcon}
                          onClick={() => setWarehouseModalOpen(true)}
                        />
                      </p>
                    )} */}
                  </div>
                  {/* <div className={css.checkboxWrapper}> */}
                  <label className={css.checkboxIcon}>
                    <input
                      type="checkbox"
                      name="checkbox"
                      className={css.checkboxInput}
                      checked={order[part.partId]?.selected || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          part.partId,
                          e.target.checked,
                          part.price,
                          part.profit
                          // arr.node_id
                        )
                      }
                    />
                    {order[part.partId]?.selected ? (
                      <FaRegCheckSquare className={css.checkboxIcon} />
                    ) : (
                      <FaRegSquare className={css.checkboxIcon} />
                    )}
                  </label>
                  <p className={css.tableText}>{part.details.price}</p>
                  {/* </div> */}
                  <p>
                    {(
                      (Number(part.details.price) * part.margin_percent) /
                      100
                    ).toFixed(2)}
                  </p>
                  <p>{part.margin_percent}</p>
                </div>
              );
            })}
          </div>
          {arr.data[0].parts.length > 3 && (
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
      {deletePartModalOpen && (
        <Modal
          isOpen={deletePartModalOpen}
          onClose={() => setDeletePartModalOpen(false)}
        >
          <DeletePartModal
            onClose={() => setDeletePartModalOpen(false)}
            order={order}
            setOrder={setOrder}
            correctedTotalOrder={correctedTotalOrder}
            nodeId={nodeIdForDelete}
          />
        </Modal>
      )}
    </div>
  );
}
