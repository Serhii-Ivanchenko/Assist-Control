import css from "./WarehousePart.module.css"
import { RiDatabaseLine } from "react-icons/ri";
import { RiFridgeLine } from "react-icons/ri";
import { RiTableAltLine } from "react-icons/ri";
import { RiFolder5Line } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { BsFolderPlus, BsThreeDotsVertical  } from "react-icons/bs";





export default function WarehousePart() {
    return (
        <div>

            <div className={css.listAndButton}>
            <ul className={css.itemsList}>
                <li className={css.items}>
                    <BiBuildingHouse/>
                    <p>6</p>
                    <p>Склади</p>
                </li>
                <li className={css.items}>
                    <RiDatabaseLine />
                    <p>14</p>
                    <p>Секції</p>
                </li>
                <li className={css.items}>
                    <RiFridgeLine />
                    <p>46</p>
                    <p>Стелажі</p>
                </li>
                <li className={css.items}>
                    <RiTableAltLine/>
                    <p>94</p>
                    <p>Полиці</p>
                </li>
                <li className={css.items}>
                    <RiFolder5Line/>
                    <p>116</p>
                    <p>Місця</p>
                </li>
            </ul>

                <button type="button" className={css.newWarehouse}>
                    <BsFolderPlus/>
                    Новий склад
                    <BsThreeDotsVertical />
                </button>
            </div>

        </div>
    )
}