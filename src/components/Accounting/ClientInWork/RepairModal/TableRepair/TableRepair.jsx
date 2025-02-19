import clsx from "clsx";
import styles from "./TableRepair.module.css";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useState } from "react";
import ava1 from "../../../../../assets/images/avatar_default.png";
import { HiMinus } from "react-icons/hi2";
import DeleteModal from "../../../../sharedComponents/SwitchableBtns/DeleteModal/DeleteModal";
import Modal from "../../../../Modals/Modal/Modal";
import MechanicPopover from "../MechanicPopover/MechanicPopover";

const TableRepair = ({ data, onDelete }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [openModalForRow, setOpenModalForRow] = useState({});
  const [selectedMechanics, setSelectedMechanics] = useState({});
  

  const staffs = [
    {
      id: 1,
      name: "Євген Коваль",
      avatar: ava1,
    },
    {
      id: 2,
      name: "Олег Авраменко",
      avatar: ava1,
    },
    {
      id: 3,
      name: "Микола Тисовий",
      avatar: ava1,
    },
  ];

  // Реалізація видалення рядка
  const handleMouseEnter = (rowId) => {
    setHoveredRow(rowId);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleDelete = (rowId) => {
    setRowToDelete(rowId);
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    onDelete(rowToDelete);
    setShowDeleteModal(false);
  };

  // Реалізація зміни механіка
  const handleArrowClick = (rowId) => {
    setOpenModalForRow((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleMechanicSelect = (rowId, staff) => {
    setSelectedMechanics((prev) => ({
      ...prev,
      [rowId]: staff,
    }));
    setOpenModalForRow((prev) => ({
      ...prev,
      [rowId]: false,
    }));
  };

  const handlePopoverClose = () => {
    setOpenModalForRow((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, false])));
  };

  return (
    <div className={styles.customTableWrapper}>
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <DeleteModal
            text="дані"
            onClose={handleModalClose}
            onDelete={handleConfirmDelete}
          />
        </Modal>
      )}
      <table className={styles.customTable}>
        <thead>
          <tr className={styles.headerTop}>
            <th className={styles.columnId}>№</th>
            <th className={styles.columnCode}>Код</th>
            <th className={styles.columnBrand}>Бренд</th>
            <th className={styles.columnNomenclature}>Номенклатура</th>
            <th className={styles.columnQuantity}>К-ть</th>
            <th className={styles.columnPurchasePrice}>Ціна закупки</th>
            <th className={styles.columnSellingPrice}>Ціна продажу</th>
            <th className={styles.columnSoldAmount}>Сума продажу</th>
            <th className={styles.columnAvailability}>Наяв-ність</th>
            <th className={styles.columnPartsPurchase}>Націнка запчастини</th>
            <th className={styles.columnWorkCost}>Вартість робіт</th>
            <th className={styles.columnPosition} colSpan={3}>
              Механік
            </th>
            <th className={styles.columnMargin}>Маржа</th>
            <th className={styles.columnDelete}></th>
          </tr>
          <tr className={styles.headerBottom}>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={styles.emptyCell}></th>
            <th className={clsx(styles.emptyCell, styles.nameColumn)}>ПІБ</th>
            <th className={clsx(styles.emptyCell, styles.percentColumn)}>%</th>
            <th className={clsx(styles.emptyCell, styles.salaryColumn)}>ЗП</th>
            <th className={styles.emptyCell}></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row.id}
                onMouseEnter={() => handleMouseEnter(row.id)}
                onMouseLeave={handleMouseLeave}
                className={styles.rowWrapper}
              >
                <td className={styles.columnId}>{row.id}</td>
                <td className={styles.columnCode}>{row.code}</td>
                <td className={styles.columnBrand}>{row.brand}</td>
                <td className={styles.columnNomenclature}>
                  {row.nomenclature}
                </td>
                <td className={styles.columnQuantity}>{row.quantity}</td>
                <td className={styles.columnPurchasePrice}>
                  {row.purchasePrice}
                </td>
                <td className={styles.columnSellingPrice}>
                  {row.sellingPrice}
                </td>
                <td className={styles.columnSoldAmount}>{row.soldAmount}</td>
                <td className={styles.columnAvailability}>
                  {row.availability === "Є" ? (
                    <BsCheckCircleFill size={18} color="#008000" />
                  ) : row.availability === "Немає" ? (
                    <BsXCircleFill size={18} color="#D54E4F" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className={styles.columnPartsPurchase}>
                  {row.partsPurchase}
                </td>
                <td className={styles.columnWorkCost}>{row.workCost}</td>
                <td className={clsx(styles.columnPosition, styles.nameColumn)} onClick={() => handleArrowClick(row.id)}>
                  {selectedMechanics[row.id]
                    ? selectedMechanics[row.id].name
                    : row.mechanic.fullName}
                  <span
                    className={styles.arrowIcon}
                    
                  >
                    {openModalForRow[row.id] ? (
                      <BiSolidUpArrow size={8} />
                    ) : (
                      <BiSolidDownArrow size={8} />
                    )}
                  </span>
                  {openModalForRow[row.id] && (
                    <MechanicPopover
                      isOpen={openModalForRow[row.id]}
                      onClose={handlePopoverClose}
                      staffs={staffs}
                      onStaffSelect={(staff) =>
                        handleMechanicSelect(row.id, staff)
                      }
                    />
                  )}
                </td>

                <td className={styles.columnPercentage}>
                  {row.mechanic.percentage}%
                </td>
                <td className={clsx(styles.columnPosition, styles.nameColumn)}>
                  {row.mechanic.fullName}
                </td>
                <td className={styles.columnPercentage}>
                  {row.mechanic.percentage}%
                </td>
                <td className={styles.columnSalary}>{row.mechanic.salary}</td>
                <td className={styles.columnMargin}>{row.margin}</td>
                {hoveredRow === row.id && (
                  <td className={styles.columnDelete}>
                    <div
                      className={styles.deleteIconContainer}
                      onClick={() => handleDelete(row.id)}
                    >
                      <HiMinus 
                        size={16}
                        className={styles.deleteIcon}
                      />
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15} className={styles.noData}>
                Дані Відсутні
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableRepair;
