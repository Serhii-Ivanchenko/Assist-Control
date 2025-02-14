import clsx from "clsx";
import styles from "./TableRepair.module.css";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useState } from "react";
import { HiMiniMinusCircle } from "react-icons/hi2";
import DeleteModal from "../../../../sharedComponents/SwitchableBtns/DeleteModal/DeleteModal";
import Modal from "../../../../Modals/Modal/Modal";

const TableRepair = ({ data, onDelete }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Стан для показу модального вікна
  const [rowToDelete, setRowToDelete] = useState(null); // Стан для вибору рядка для видалення

  const handleMouseEnter = (rowId) => {
    setHoveredRow(rowId);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleDelete = (rowId) => {
    setRowToDelete(rowId); // Зберігаємо ідентифікатор рядка для видалення
    setShowDeleteModal(true); // Відкриваємо модальне вікно
  };

  const handleModalClose = () => {
    setShowDeleteModal(false); // Закриваємо модальне вікно
  };

  const handleConfirmDelete = () => {
    onDelete(rowToDelete);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.customTableWrapper}>
      {showDeleteModal && (
        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
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
            <th className={styles.columnAvailability}>Наяв</th>
            <th className={styles.columnPartsPurchase}>Закупка Запчастин</th>
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
                <td className={styles.columnNomenclature}>{row.nomenclature}</td>
                <td className={styles.columnQuantity}>{row.quantity}</td>
                <td className={styles.columnPurchasePrice}>{row.purchasePrice}</td>
                <td className={styles.columnSellingPrice}>{row.sellingPrice}</td>
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
                <td className={styles.columnPartsPurchase}>{row.partsPurchase}</td>
                <td className={styles.columnWorkCost}>{row.workCost}</td>
                <td className={clsx(styles.columnPosition, styles.nameColumn)}>
                  {row.mechanic.fullName}
                </td>
                <td className={styles.columnPercentage}>{row.mechanic.percentage}%</td>
                <td className={styles.columnSalary}>{row.mechanic.salary}</td>
                <td className={styles.columnMargin}>{row.margin}</td>
                {hoveredRow === row.id && (
                  <td className={styles.columnDelete}>
                    <HiMiniMinusCircle
                      size={20}
                      onClick={() => handleDelete(row.id)}
                      className={styles.deleteIcon}
                    />
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
