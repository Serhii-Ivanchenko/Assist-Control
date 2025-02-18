import css from "./WarehouseAvailabilityModal.module.css";
import { BsXLg } from "react-icons/bs";
import { BiBuildingHouse, BiBuildings, BiCabinet } from "react-icons/bi";
import { RiFolder5Line } from "react-icons/ri";

const warehouse = {
  name: "м. Академіка павлова (Назва склада)",
  floor: "2 Поверх (Назва секції)",
  rack: "Стелаж 025",
  shelf: "Полиця 036",
  place: "Місце 0243",
};

export default function WarehouseAvailabilityModal({ onClose }) {
  return (
    <div className={css.modal}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <div className={css.wrapper}>
        <BiBuildingHouse className={css.icon} />
        <p className={`${css.text} ${css.headerText}`}>{warehouse.name}</p>
      </div>
      <div className={css.wrapper}>
        <BiBuildings className={css.icon} />
        <p className={`${css.text} ${css.floor}`}>{warehouse.floor}</p>
      </div>
      <div className={css.wrapper}>
        <BiCabinet className={css.icon} />
        <p className={`${css.text} ${css.rack}`}>{warehouse.rack}</p>
      </div>
      <div className={css.wrapper}>
        <BiCabinet className={css.icon} />
        <p className={`${css.text} ${css.shelf}`}>{warehouse.shelf}</p>
      </div>
      <div className={css.wrapper}>
        <RiFolder5Line className={css.icon} />
        <p className={`${css.text} ${css.place}`}>{warehouse.place}</p>
      </div>
    </div>
  );
}
