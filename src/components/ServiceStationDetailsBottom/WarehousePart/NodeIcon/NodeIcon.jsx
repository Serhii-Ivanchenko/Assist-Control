import { RiDatabaseLine } from "react-icons/ri";
import { RiFridgeLine } from "react-icons/ri";
import { RiTableAltLine } from "react-icons/ri";
import { RiFolder5Line } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import css from "./NodeIcon.module.css";

export default function NodeIcon({ type }) {
  switch (type) {
    case "warehouse":
      return <BiBuildingHouse className={css.icon} />;
    case "section":
      return <RiDatabaseLine className={css.icon} />;
    case "rack":
      return <RiFridgeLine className={css.icon} />;
    case "shelf":
      return <RiTableAltLine className={css.icon} />;
    case "place":
      return <RiFolder5Line className={css.icon} />;
    default:
      return <BiBuildingHouse className={css.icon} />;
  }
}
