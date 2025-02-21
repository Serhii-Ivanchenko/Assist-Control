import css from "./DeletePartModal.module.css";

export default function DeletePartModal({
  onClose,
  order,
  setOrder,
  correctedTotalOrder,
  nodeId,
}) {
  const onMinusBtnClick = (id) => {
    const updatedItems = Object.entries(order).reduce((acc, [key, value]) => {
      acc[key] = { ...value, selected: false };
      return acc;
    }, {});
    setOrder(updatedItems);
    correctedTotalOrder(id);
    onClose();
  };

  return (
    <div className={css.modal}>
      <p className={css.text}>
        Ви дійсно бажаєте видалили запчастину із комерційної пропозиції ?
      </p>
      <div className={css.wrapper}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          Скасувати
        </button>
        <button
          type="button"
          className={css.submitBtn}
          onClick={(e) => {
            e.stopPropagation();
            onMinusBtnClick(nodeId);
          }}
        >
          Видалити
        </button>
      </div>
    </div>
  );
}
