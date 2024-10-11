import clsx from "clsx";
import { BsPerson } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { BsCreditCard2Back } from "react-icons/bs";
// import { BsJustify } from "react-icons/bs";
import css from "./MobileMenu.module.css"
import { TfiClose } from "react-icons/tfi";


export default function MobileMenu({page, setPage, onClose}) {
    return (
        <div className={css.mobileMenu} >
            <TfiClose onClick={onClose} className={css.closeBtn} />
                <nav className={css.sideBarNav}>
                <ul className={css.sideBarNavList}>
                    <li className={css.sideBarNavItem}>
                        <button type="button"
                            onClick={() => {
                                setPage("profile");
                                onClose();
                            }}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "profile"
                            })}>
                                    <BsPerson  />
                            <p>Профіль</p>
                       </button>
                       </li>
                    <li className={css.sideBarNavItem}>
                    <button type="button"
                            onClick={() => {
                                setPage("account");
                                onClose();  
                            }}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "account"
                            })}>
                                    <BsGear/>
                            <p>Акаунт</p>
                       </button>
                    </li>
                    <li className={css.sideBarNavItem}>
                    <button type="button"
                            onClick={() => {
                                setPage("tariff");
                                onClose();
                            }}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "tariff"
                            })}>
                                    <BsCreditCard2Back />
                            <p>Тариф</p>
                        </button>
                    </li>
                    <li className={css.sideBarNavItem}>
                    <button 
                            onClick={() => {
                                setPage("team");
                                onClose();
                            }}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "team"
                            })}>
                                    <BsPeople/>
                            <p>Команда</p>
                        </button>
                    </li>
                </ul>
                </nav>
                
                </div>
    )
}