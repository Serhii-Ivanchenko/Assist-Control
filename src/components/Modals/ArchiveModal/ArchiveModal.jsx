import { IoIosClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Formik, Field, Form } from "formik";
import css from "./ArchiveModal.module.css";
import { useDispatch } from "react-redux";
import { addItemToArchive } from "../../../redux/archive/operations";
import toast from "react-hot-toast";

const archiveReasons = [
  {
    id: "2",
    statusClass: css.lightBlue,
    statusText: "СПІВРОБІТНИК",
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--glow-archive-light-blue)",
  },
  {
    id: "3",
    statusClass: css.lightBlue,
    statusText: "ВИПАДКОВИЙ",
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--glow-archive-light-blue)",
  },
  {
    id: "1",
    statusClass: css.lightBlue,
    statusText: "ДУБЛЬ",
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--glow-archive-light-blue)",
  },
  {
    id: "4",
    statusClass: css.violet,
    statusText: "ВІДМОВА",
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--glow-archive-violet)",
  },
  {
    id: "5",
    statusClass: css.violet,
    statusText: "НЕ ПРИЇХАВ",
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--glow-archive-violet)",
  },
  {
    id: "6",
    statusClass: css.violet,
    statusText: "РЕЙТИНГ",
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--glow-archive-violet)",
  },
  {
    id: "7",
    statusClass: css.red,
    statusText: "НЕ ДОПОМОГЛИ",
    background: "var(--status-gradient-view-repair)",
    borderColor: "var(--glow-view-repair)",
  },
];

export default function ArchiveModal({ onClose, carId, location, isRecommendation, onSuccess }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    if (!carId) {
      console.error("Помилка: у запису відсутній car_id");
      toast.error("Помилка: у запису відсутній car_id");
      return;
    }
    
    const itemData = {
      car_id: carId,
      location: location,
      reason_add: Number(values.reason_add),
      comment: values.comment || "",
    };
  
    console.log("Дані для архівації:", itemData);
  
    try {
      await dispatch(addItemToArchive(itemData)).unwrap();
      toast.success("Автомобіль успішно додано в архів!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(`Помилка: ${error}`);
    }
  };
  

  return (
    <div className={css.wrapper}>
      <button className={css.exitBtn}>
        <IoIosClose className={css.icon} onClick={onClose} />
      </button>

      <Formik
        initialValues={{
          comment: "",
          reason_add: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const selectedReason = archiveReasons.find(
            (reason) => reason.id === values.reason_add
          );

          return (
            <Form className={css.form}>
              <label htmlFor="comment">Привід додавання в архів</label>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Введіть ваш коментар..."
                className={css.textarea}
              />

              {!isRecommendation ? (
                <>
                  <label htmlFor="reason_add">Оберіть причину:</label>
                  <Field
                    as="select"
                    id="reason_add"
                    name="reason_add"
                    className={`${css.select} ${
                      selectedReason ? selectedReason.statusClass : ""
                    }`}
                    style={{
                      background: selectedReason
                        ? selectedReason.background
                        : undefined,
                      borderColor: selectedReason
                        ? selectedReason.borderColor
                        : undefined,
                    }}
                  >
                    <option value="" disabled className={css.defReason}>
                      Оберіть причину
                    </option>
                    {archiveReasons.map((reason) => (
                      <option key={reason.id} value={reason.id}>
                        {reason.statusText}
                      </option>
                    ))}
                  </Field>
                </>
              ) : (
                <>{null}</>
              )}
              <div className={css.btnsGroup}>
                <button
                  type="button"
                  className={css.closeBtn}
                  onClick={onClose}
                >
                  Закрити
                </button>
                <button type="submit" className={css.submitBtn}>
                  <MdDone />
                  Підтвердити
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
