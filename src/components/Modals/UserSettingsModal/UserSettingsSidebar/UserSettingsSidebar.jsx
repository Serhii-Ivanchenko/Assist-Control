import { NavLink } from "react-router-dom";
import css from "./UserSettingsSidebar.module.css"
import clsx from "clsx";

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
                            <p>Профіль</p>
                        </NavLink>
                    </li>
                    <li className={css.sideBarNavItem}>
                        <NavLink to="*" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                            <p>Акаунт</p>
                        </NavLink>
                    </li>
                    <li className={css.sideBarNavItem}>
                         <NavLink to="**" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                            <p>Тариф</p>
                        </NavLink>
                    </li>
                    <li className={css.sideBarNavItem}>
                         <NavLink to="***" className={({ isActive }) =>
                                clsx(css.sideBarNavItemLink, { [css.linkIsActive]: isActive })}>
                            <p>Команда</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}