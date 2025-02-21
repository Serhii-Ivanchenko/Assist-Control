import { useState } from "react";
import css from "./PartsList.module.css";
import { BsPencil } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import { FiMinusCircle } from "react-icons/fi";
import DeletePartModal from "../DeletePartModal/DeletePartModal";
import Modal from "../../../../Modals/Modal/Modal";

export default function PartsListExistedComOffer({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workPrice, setWorkPrice] = useState("--------");
  const [salePrice, setSalePrice] = useState("------");
  const [deletePartModalOpen, setDeletePartModalOpen] = useState(false);
  const [arr, setArr] = useState(data);

  //   console.log(arr);

  const totalPurchaseAmount = 0;
  const totalProfit = 0;

  return (
    <div className={`${css.subHeader} ${css.existedCp}`}>
      <p className={css.subHeaderDate}>{"------"}</p>
      <p className={css.subHeaderDate}>{arr.quantity_parts} шт</p>
      <p className={css.tableHeaderText}>{arr.code}</p>
      <p className={css.tableHeaderText}>{arr.brand}</p>
      <p className={css.tableHeaderText}>{arr.name}</p>
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
      <p>{arr.supplier}</p>
      <p>{(Number(arr.price) * Number(arr.quantity_parts)).toFixed(2)} грн</p>
      <p>
        {(
          Number(arr.price) *
          Number(arr.quantity_parts) *
          (arr.margin_percent / 100)
        ).toFixed(2)}{" "}
        грн
      </p>
      <p>{arr.margin_percent}</p>
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
      {deletePartModalOpen && (
        <Modal
          isOpen={deletePartModalOpen}
          onClose={() => setDeletePartModalOpen(false)}
        >
          <DeletePartModal
            onClose={() => setDeletePartModalOpen(false)}
            //   order={order}
            //   setOrder={setOrder}
            //   correctedTotalOrder={correctedTotalOrder}
            //   nodeId={nodeIdForDelete}
          />
        </Modal>
      )}
    </div>
  );
}
