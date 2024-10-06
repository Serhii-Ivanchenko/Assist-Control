import css from "./UserSettingsSidebar.module.css"
import clsx from "clsx";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { FiCreditCard } from "react-icons/fi";





export default function UserSettingsSidebar({setPage, page}) {
    return (
        <div className={css.sideBarBox}>

            <div className={css.titleBox}>
                <h3 className={css.title}>Налаштування</h3>
            </div>

            <nav className={css.sideBarNav}>
                <ul className={css.sideBarNavList}>
                    <li className={css.sideBarNavItem}>
                        <button type="button"
                        onClick={() => setPage("profile")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "profile"
                            })}>
                                    <HiOutlineUser />
                            <p>Профіль</p>
                       </button>
                       </li>
                    <li className={css.sideBarNavItem}>
                    <button type="button"
                        onClick={() => setPage("account")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "account"
                            })}>
                                    <CiSettings/>
                            <p>Акаунт</p>
                       </button>
                    </li>
                    <li className={css.sideBarNavItem}>
                    <button type="button"
                        onClick={() => setPage("tariff")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "tariff"
                            })}>
                                    <FiCreditCard />
                            <p>Тариф</p>
                        </button>
                    </li>
                    <li className={css.sideBarNavItem}>
                    <button 
                        onClick={() => setPage("team")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "team"
                            })}>
                                    <HiOutlineUsers/>
                            <p>Команда</p>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}