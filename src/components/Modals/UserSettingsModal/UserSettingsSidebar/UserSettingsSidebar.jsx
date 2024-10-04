import { NavLink } from "react-router-dom";
import css from "./UserSettingsSidebar.module.css"
import clsx from "clsx";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { FiCreditCard } from "react-icons/fi";





export default function UserSettingsSidebar() {
    return (
        <div className={css.sideBarBox}>

            <div className={css.titleBox}>
                <p className={css.title}>Налаштування</p>
            </div>

            <nav className={css.sideBarNav}>
                <ul className={css.sideBarNavList}>
                    <li className={css.sideBarNavItem}>
                        <NavLink to="" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                                    <HiOutlineUser width={13} height={15}/>
                            <p>Профіль</p>
                        </NavLink>
                    </li>
                    <li className={css.sideBarNavItem}>
                        <NavLink to="*" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                                    <CiSettings/>
                            <p>Акаунт</p>
                        </NavLink>
                    </li>
                    <li className={css.sideBarNavItem}>
                         <NavLink to="**" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                                    <FiCreditCard width={13} height={8}/>
                            <p>Тариф</p>
                        </NavLink>
                    </li>
                    <li className={css.sideBarNavItem}>
                         <NavLink to="***" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                                    <HiOutlineUsers/>
                            <p>Команда</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}