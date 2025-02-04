import css from "./DashboardRightSide.module.css";
import { BsPersonFill } from "react-icons/bs";
import { IoCarSport } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { FaMicrochip } from "react-icons/fa6";

export default function DashboardRightSide() {
  const cards = [
    {
      title: "CRMmech",
      number: "576",
      iconMiddle: "",
      iconBottom: <BsPersonFill className={css.icon} size={18} />,
      numberBottom2: "237",
      numberBottom: "150 ",
    },

    {
      title: "MechanikAPP",
      number: "720",
      iconMiddle: "",
      iconBottom: <IoCarSport className={css.iconCar} size={18} />,
      numberBottom: "27020",
      numberBottom2: " ",
    },
    {
      title: "ServiceBook",
      number: "5076",
      iconMiddle: "",
      iconBottom: <IoCarSport className={css.iconCar} size={18} />,
      numberBottom: "7020",
      numberBottom2: " ",
    },
    {
      title: "Portal",
      number: "5206",
      iconMiddle: <BsGlobe className={css.icon} size={18} />,
      iconBottom: <BsPersonFill size={18} />,
      numberBottom: "7020",
      numberBottom2: " ",
    },
    {
      title: "AI менеджер",
      number: "2100",
      iconMiddle: <FaMicrochip className={css.icon} size={18} />,
      iconBottom: <BsPersonFill className={css.icon} size={18} />,
      numberBottom: "452",
      numberBottom2: " ",
    },
  ];

  return (
    <div className={css.wrapper}>
      <ul className={css.cardsList}>
        {cards.map((card, index) => (
          <li key={index} className={css.listItem}>
            <p className={css.title}>{card.title}</p>
            <div className={css.middlePart}>
              {card.iconMiddle}
              <p className={css.number}>{card.number}</p>
              <span className={css.statisticalData}>+1.34%</span>
            </div>
            <div className={css.bottomPart}>
              {card.title === "CRMmech" ? (
                <p className={css.numberBottom}>{card.numberBottom2}</p>
              ) : (
                ""
              )}

              {card.iconBottom}
              <p
                className={`${css.numberBottom} ${
                  card.title === "CRMmech" && css.numberBottomRed
                } `}
              >
                {card.numberBottom}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
