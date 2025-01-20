import { useState } from "react";
import {
  BsReceipt,
  BsUiRadiosGrid,
  BsClipboardCheck,
  BsCurrencyDollar,
  BsUiChecksGrid,
  BsUiChecks,
  BsWrench,
  BsAlarm,
} from "react-icons/bs";
import StepperBtn from "../ClientsStatusStepper/StepperBtn/StepperBtn";
import styles from "./ClientStatusStepper.module.css";
import Modal from "../../Modals/Modal/Modal";
import DetailedClientInfo from "../../DetailedClientInfo/DetailedClientInfo";
import EnterAmountModal from "../../Modals/EnterAmountModal/EnterAmountModal";
import NotificationModal from "../../sharedComponents/NotificationModal/NotificationModal";
import { useSelector } from "react-redux";
import { selectVisibilityClientsInWork } from "../../../redux/visibility/selectors";
import { categoryIdClients } from "../../../utils/dataToRender";
import { useDispatch } from "react-redux";
import { getClientInfo } from "../../../redux/client/operations.js";

function ClientStatusStepper({
  carId,
  car,
  carImg,
  status,
  prePaid,
  postPaid,
}) {
  const visibility = useSelector(selectVisibilityClientsInWork);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [notificationSent, setNotificationSent] = useState(false);
  const dispatch = useDispatch();
  const [isCrm, setIsCrm] = useState("record");

  // Масив кнопок
  const buttons = [
    {
      id: "0",
      title: car,
      icon: <img src={carImg} alt="img" className={styles.carImage} />,
    },
    { id: 1, title: "Звернення", icon: <BsReceipt /> },
    { id: 2, title: "Діагностика", icon: <BsUiRadiosGrid /> },
    { id: 3, title: "КП", icon: <BsClipboardCheck /> },
    { id: 4, title: prePaid, icon: <BsCurrencyDollar /> },
    { id: 5, title: "Замовлення", icon: <BsUiChecksGrid /> },
    { id: 6, title: "Постчальник", icon: <BsUiChecks /> },
    { id: 7, title: "Ремонт", icon: <BsWrench /> },
    { id: 8, title: postPaid, icon: <BsCurrencyDollar /> },
    {
      id: 9,
      icon: <BsAlarm style={{ transform: "scale(1.7)" }} />,
      noBackground: true,
    },
  ];

  // визнчення кольору іконок степера
  const [completedSteps, setCompletedSteps] = useState(() => {
    if (status === "complete") {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    if (status === "repair") {
      return [1, 2, 3, 7];
    }
    return [1];
  });

  const isStepCompleted = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const groupedButtons = [
    [buttons[0]],
    [buttons[1]],
    [buttons[2]],
    [buttons[3]],
    [buttons[4]],
    [buttons[5], buttons[6], buttons[7]],
    [buttons[8]],
    [buttons[9]],
  ];

  // виклик модалки на групі кнопок
  const handleClick = (idx) => {
    switch (idx) {
      case 0:
        dispatch(getClientInfo({ carId: carId}));
        setModalContent(<DetailedClientInfo onClose={closeModal} />);
        break;
      case 1:
        setModalContent("Modal for contact information");
        break;
      case 2:
        setModalContent("Modal for diagnostics");
        break;
      case 3:
        setModalContent("Modal for commercial offer");
        break;
      case 4:
        setModalContent(<EnterAmountModal onClose={closeModal} />);
        break;
      case 5:
        setModalContent("Modal for ordering parts");
        break;
      case 6:
        setModalContent(<EnterAmountModal onClose={closeModal} />);
        break;
      case 7:
        setModalContent(
          <NotificationModal
            onClose={closeModal}
            time="clientTime"
            date="clientDate"
            comment="clientComment"
            connectionType="clientConnection"
            accountingModal={true}
            service="clientService"
            setNotificationSent={setNotificationSent}
            nextService="ClientInWorkNextService"
          />
        );

        break;
      default:
        setModalContent(null);
        setCompletedSteps([]);
        setNotificationSent(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Ось тут додаємо класи для статусу
  const getStatusClass = (status) => {
    switch (status) {
      case "all":
        return styles.allStatus;
      case "new":
        return styles.newStatus;
      case "diagnostic":
        return styles.diagnosticStatus;
      case "repair":
        return styles.repairStatus;
      case "viewRepair":
        return styles.viewRepairStatus;
      case "complete":
        return styles.completeStatus;
      default:
        return "";
    }
  };

  const areAllItemsHidden = (group) => {
    return group.every(({ id }) => {
      const visibilityKey = categoryIdClients[id];
      return !visibility[visibilityKey];
    });
  };

  return (
    <div>
      <ul className={styles.wrapper}>
        {groupedButtons.map((group, idx) => {
          if (areAllItemsHidden(group)) {
            return null;
          }

          return (
            <ul
              key={idx}
              className={`${styles.boxContainer} ${
                idx === groupedButtons.length - 1 ? "" : getStatusClass(status)
              }`}
              onClick={() => handleClick(idx)}
            >
              {group.map(({ id, title, icon, noBackground }) => {
                const visibilityKey = categoryIdClients[id];
                return (
                  <li
                    key={id}
                    className={`${styles.listItem} ${
                      !visibility[visibilityKey] ? styles.hidden : ""
                    }`}
                  >
                    <StepperBtn
                      value={title}
                      icon={icon}
                      isActive={isStepCompleted(id)}
                      noBackground={noBackground}
                      notificationSent={notificationSent}
                      status={status}
                    />
                  </li>
                );
              })}
            </ul>
          );
        })}
      </ul>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}

export default ClientStatusStepper;
