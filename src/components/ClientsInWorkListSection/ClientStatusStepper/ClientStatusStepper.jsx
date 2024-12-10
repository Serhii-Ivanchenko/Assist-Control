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
import StepperBtn from "../StepperBtn/StepperBtn";
import styles from "./ClientStatusStepper.module.css";

const buttons = [
  { id: 1, title: "Звернення", icon: <BsReceipt /> },
  { id: 2, title: "Діагностика", icon: <BsUiRadiosGrid /> },
  { id: 3, title: "КП", icon: <BsClipboardCheck /> },
  { id: 4, title: 2000, icon: <BsCurrencyDollar /> },
  { id: 5, title: "Замовлення", icon: <BsUiChecksGrid /> },
  { id: 6, title: "Постчальник", icon: <BsUiChecks /> },
  { id: 7, title: "Ремонт", icon: <BsWrench /> },
  { id: 8, title: 8482, icon: <BsCurrencyDollar /> },
  { id: 9, title: "", icon: <BsAlarm /> },
];

function ClientStatusStepper({ car, carImg }) {
  const groupedButtons = [
    [
      { id: "car", title: car, icon: <img src={carImg} alt="Car" /> },
      buttons[0],
      buttons[1],
      buttons[2],
    ],
    [buttons[3]],
    [buttons[4], buttons[5], buttons[6]],
    [buttons[7]],
    [buttons[8]],
  ];

  return (
    <div className={styles.wrapper}>
      {groupedButtons.map((group, index) => (
        <div key={index} className={styles.boxContainer}>
          {group.map(({ id, title, icon }) => (
            <StepperBtn key={id} value={title} icon={icon} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ClientStatusStepper;
