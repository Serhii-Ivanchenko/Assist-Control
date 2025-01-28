import { IoIosClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Formik, Field, Form } from "formik";
import css from "./SelectStatusModal.module.css";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { returnArchiveItem } from "../../../redux/archive/operations";
import { getRecordsForPeriod } from "../../../redux/crm/operations";
import { useSelector } from "react-redux";
import { selectDates } from "../../../redux/crm/selectors";

const returnStatus = [
  {
    id: "1",
    statusClass: css.yellow,
    statusText: "НОВА",
    statusMapping: 'new',
    background: "var(--status-gradient-new)",
    borderColor: "var(--border-gradient-new)",
  },
  {
    id: "2",
    statusClass: css.lightBlue,
    statusText: "ДІАГНОСТИКА",
    statusMapping: 'diagnostic',
    background: "var(--status-gradient-archive-light-blue)",
    borderColor: "var(--border-gradient-diag)",
  },
  {
    id: "3",
    statusClass: css.violet,
    statusText: "РЕМОНТ",
    statusMapping: 'repair',
    background: "var(--status-gradient-archive-violet)",
    borderColor: "var(--border-gradient-repair)",
  },
  {
    id: "4",
    statusClass: css.red,
    statusText: "ОГЛЯД ПР",
    statusMapping: 'view_repair',
    background: "var(--status-gradient-view-repair)",
    borderColor: "var(--border-gradient-invoices-red)",
  },
  {
    id: "5",
    statusClass: css.green,
    statusText: "ЗАВЕРШЕНО",
    statusMapping: 'complete',
    background: "var(--status-gradient-complete)",
    borderColor: "var(--border-gradient-complete)",
  },
];

export default function SelectStatusModal({ onClose, id }) {
  const dispatch = useDispatch();
  const dates = useSelector(selectDates);

  const handleSubmit = async (values) => {
    if (!values.status) {
      toast.error("Будь ласка, оберіть статус.");
      return;
    }

    const selectedStatus = returnStatus.find((status) => status.id === values.status);

    if (!selectedStatus) {
      toast.error("Статус не знайдено.");
      return;
    }

    const newStatus = selectedStatus.statusMapping;

    const itemData = {
      archive_id: id,
      status: newStatus,
    };

    try {
      await dispatch(returnArchiveItem(itemData)).unwrap();
      await dispatch(getRecordsForPeriod(dates));      
      toast.success("Запис успішно відновлено!");
      onClose();
    } catch (error) {
      toast.error(`Помилка: ${error.message || error}`);
    }
  };

  return (
    <div className={css.wrapper}>
      <button className={css.exitBtn} onClick={onClose}>
        <IoIosClose className={css.icon} />
      </button>

      <Formik
        initialValues={{ status: "" }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const selectedStatus = returnStatus.find(
            (status) => status.id === values.status
          );

          return (
            <Form className={css.form}>
              <label htmlFor="status">Оберіть статус для відновлення з архіву:</label>
              <Field
                as="select"
                id="status"
                name="status"
                className={`${css.select} ${selectedStatus ? selectedStatus.statusClass : ""}`}
                style={{
                  background: selectedStatus ? selectedStatus.background : undefined,
                  borderColor: selectedStatus ? selectedStatus.borderColor : undefined,
                }}
              >
                <option value="" disabled>
                  Оберіть статус...
                </option>
                {returnStatus.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.statusText}
                  </option>
                ))}
              </Field>

              <div className={css.btnsGroup}>
                <button type="button" className={css.closeBtn} onClick={onClose}>
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
