import { useEffect, useRef, useState } from "react";
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
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import styles from "./ClientStatusStepper.module.css";
import Modal from "../../../../Modals/Modal/Modal.jsx";
import DetailedClientInfo from "../../../../DetailedClientInfo/DetailedClientInfo.jsx";
import EnterAmountModal from "../../../../Modals/EnterAmountModal/EnterAmountModal.jsx";
import PaymentModal from "../../PaymentModal/PaymentModal.jsx";
import NotificationModal from "../../../../sharedComponents/NotificationModal/NotificationModal.jsx";
import { useSelector } from "react-redux";
import { selectVisibilityClientsInWork } from "../../../../../redux/visibility/selectors.js";
import { categoryIdClients } from "../../../../../utils/dataToRender.js";
import { useDispatch } from "react-redux";
import { getClientInfo } from "../../../../../redux/client/operations.js";
import StepperBtn from "./StepperBtn/StepperBtn.jsx";
import RepairModal from "../../RepairModal/RepairModal.jsx";
import RecievedPartsPopup from "./RecievedPartsPopup/RecievedPartsPopup.jsx";
import CommercialOfferModal from "../../CommercialOfferModal/CommercialOfferModal.jsx";
import DiagnosticsModals from "../../../DiagnosticsModals/DiagnosticsModals.jsx";
import PaymentDistrModal from "../../PaymentDistrModal/PaymentDistrModal.jsx";
import { getCommercialOfferData } from "../../../../../redux/accounting/operations.js";

function ClientStatusStepper({ item, carId, car, carImg, status, postPaid }) {
  const visibility = useSelector(selectVisibilityClientsInWork);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [notificationSent, setNotificationSent] = useState(false);
  const dispatch = useDispatch();
  const [isCrm, setIsCrm] = useState("record");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const buttonRef = useRef(null);
  // const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const popupIcon = isPopupOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />;

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
    { id: 4, title: "Аванс", icon: <BsCurrencyDollar /> },
    { id: 5, title: "Замовлено", icon: <BsUiChecksGrid /> },
    {
      id: 6,
      title: "Отримано",
      icon: <BsUiChecks />,
      extraIcon: popupIcon,
    },
    { id: 7, title: "Ремонт", icon: <BsWrench /> },
    { id: 8, title: postPaid, icon: <BsCurrencyDollar /> },
    {
      id: 9,
      icon: <BsAlarm style={{ transform: "scale(1.7)" }} />,
      noBackground: true,
    },
  ];

  // backend request

  // useEffect(() => {
  //   dispatch(getCommercialOfferData());
  // }, [dispatch]);

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
    [buttons[5]],
    [buttons[6]],
    [buttons[7]],
    [buttons[8]],
    [buttons[9]],
  ];

  // виклик модалки на групі кнопок
  const handleClick = (idx, event) => {
    // setIsModalOpen(false);
    // setIsPopupOpen(false);
    switch (idx) {
      case 0:
        dispatch(getClientInfo({ carId: 38701 }));
        setIsModalOpen(true);
        setModalContent(<DetailedClientInfo onClose={closeModal} car={item} />);
        break;
      case 1:
        setIsModalOpen(true);
        setModalContent("Modal for contact information");
        break;
      case 2:
        setIsModalOpen(true);
        setModalContent(<DiagnosticsModals onClose={closeModal} />);
        break;
      case 3:
        dispatch(getCommercialOfferData());
        setIsModalOpen(true);
        setModalContent(<CommercialOfferModal onClose={closeModal} />);
        break;
      case 4:
        setIsModalOpen(true);
        // setModalContent(<EnterAmountModal onClose={closeModal} />);
        setModalContent(<PaymentModal onClose={closeModal} />);
        break;
      case 5:
        setIsModalOpen(true);
        setModalContent("Recieved Modal");
        break;
      case 6:
        // console.log("Opening popup...");
        // if (event.currentTarget) {
        //   buttonRef.current = event.currentTarget;
        //   const rect = buttonRef.current.getBoundingClientRect();
        //   setPopupPosition({
        //     top: rect.bottom + window.scrollY,
        //   });
        // }
        // setIsPopupOpen(true);
        setIsPopupOpen((prev) => !prev);
        break;

      case 7:
        setIsModalOpen(true);
        setModalContent(<RepairModal onClose={closeModal} car={item} />);
        break;
      case 8:
        setIsModalOpen(true);
        setModalContent(<PaymentDistrModal onClose={closeModal} />);
        break;
      case 9:
        setIsModalOpen(true);
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
              onClick={(event) => {
                handleClick(idx, event);
              }}
            >
              {group.map(({ id, title, icon, extraIcon, noBackground }) => {
                const visibilityKey = categoryIdClients[id];
                return (
                  <li
                    key={id}
                    className={`${styles.listItem} ${
                      !visibility[visibilityKey] ? styles.hidden : ""
                    }`}
                  >
                    <StepperBtn
                      ref={buttonRef}
                      value={title}
                      icon={icon}
                      extraIcon={extraIcon}
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

      {isPopupOpen && (
        <RecievedPartsPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          buttonRef={buttonRef}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
          // popupRef={popupRef}
        />
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}

export default ClientStatusStepper;
