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

// Массив кнопок
const buttons = [
  { id: 1, title: "Звернення", icon: <BsReceipt />, isActive: true },
  { id: 2, title: "Діагностика", icon: <BsUiRadiosGrid />, isActive: true },
  { id: 3, title: "КП", icon: <BsClipboardCheck />, isActive: true },
  { id: 4, title: 2000, icon: <BsCurrencyDollar />, isActive: true },
  { id: 5, title: "Замовлення", icon: <BsUiChecksGrid />, isActive: false },
  { id: 6, title: "Постчальник", icon: <BsUiChecks />, isActive: false },
  { id: 7, title: "Ремонт", icon: <BsWrench />, isActive: false },
  { id: 8, title: 8482, icon: <BsCurrencyDollar />, isActive: true },
  {
    id: 9,
    icon: <BsAlarm style={{ transform: "scale(1.7)" }} />,
    noBackground: true,
    isActive: true,
  },
];

function ClientStatusStepper({ car, carImg, status }) {
  const groupedButtons = [
    [
      {
        id: "car",
        title: car,
        icon: <img src={carImg} alt="img" className={styles.carImage} />,
      },
      buttons[0],
      buttons[1],
      buttons[2],
    ],
    [buttons[3]],
    [buttons[4], buttons[5], buttons[6]],
    [buttons[7]],
    [buttons[8]],
  ];

  // Ось тут додаємо класи для статусу
  const getStatusClass = (status) => {
    switch (status) {
      case "new":
        return styles.newStatus;
      case "diagnostic":
        return styles.diagnosticStatus;
      case "repair":
        return styles.repairStatus;
      case "complete":
        return styles.completeStatus;
      default:
        return "";
    }
  };

  return (
    <div className={styles.wrapper}>
      {groupedButtons.map((group, idx) => (
        <ul
          key={idx}
          className={`${styles.boxContainer} ${getStatusClass(status)}`}
        >
          {group.map(({ id, title, icon, isActive, noBackground }) => (
            <li key={id} className={styles.listItem}>
              <StepperBtn
                value={title}
                icon={icon}
                isActive={isActive}
                noBackground={noBackground}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default ClientStatusStepper;
