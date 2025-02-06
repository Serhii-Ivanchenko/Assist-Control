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
      numberBottom2: "237",
      numberBottom: "150 ",
    },

    {
      title: "MechanikAPP",
      number: "720",
      numberBottom: "27020",
      numberBottom2: " ",
    },
    {
      title: "ServiceBook",
      number: "5076",
      numberBottom: "7020",
      numberBottom2: " ",
    },
    {
      title: "Portal",
      number: "5206",
      numberBottom: "7020",
      numberBottom2: " ",
    },
    {
      title: "AI менеджер",
      number: "2100",
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
              {card.title === "Portal" ? (
                <BsGlobe className={css.icon} size={18} />
              ) : card.title === "AI менеджер" ? (
                <FaMicrochip className={css.icon} size={18} />
              ) : (
                " "
              )}
              <p className={css.number}>{card.number}</p>
              <span className={css.statisticalData}>+1.34%</span>
            </div>
            <div className={css.bottomPart}>
              {card.title === "CRMmech" ? (
                <p className={css.numberBottom}>{card.numberBottom2}</p>
              ) : (
                ""
              )}

              {card.title === "MechanikAPP" || card.title === "ServiceBook" ? (
                <IoCarSport className={css.iconCar} size={18} />
              ) : (
                <BsPersonFill className={css.icon} size={18} />
              )}
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
