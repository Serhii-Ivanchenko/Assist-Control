import css from "./UserSettingsSidebar.module.css";
import clsx from "clsx";
import { BsPerson } from "react-icons/bs";
// import { BsPeople } from "react-icons/bs";
// import { BsGear } from "react-icons/bs";
// import { BsCreditCard2Back } from "react-icons/bs";
import { BsJustify } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import PaymentTopUpAccountModal from "../../PaymentTopUpAccountModal/PaymentTopUpAccountModal";

export default function UserSettingsSidebar({ setPage, page, onOpen }) {
  // const [mobMenu, setOpenMobMenu] = useState(false);

  // const openMobMenu = () => {
  //     setOpenMobMenu(true)
  // }

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const user = useSelector(selectUser);
  const userBalance = user.balance || "0";

  return (
    <div className={css.sideBarBox}>
      <div className={css.iconBox}>
        <BsJustify className={css.burgerMenu} onClick={onOpen} />
      </div>

      <div className={css.contentBox}>
        <div className={css.titleBox}>
          <h3 className={css.title}>Налаштування</h3>
        </div>

        <nav className={css.sideBarNav}>
          <ul className={css.sideBarNavList}>
            <li className={css.sideBarNavItem}>
              <button
                type="button"
                onClick={() => setPage("profile")}
                className={clsx(css.sideBarNavItemLink, {
                  [css.linkIsActive]: page === "profile",
                })}
              >
                <BsPerson />
                <p>Профіль</p>
              </button>
            </li>
            {/* <li className={css.sideBarNavItem}>
                    <button type="button"
                        onClick={() => setPage("account")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "account"
                            })}>
                                    <BsGear/>
                            <p>Акаунт</p>
                       </button>
                    </li>
                    <li className={css.sideBarNavItem}>
                    <button type="button"
                        onClick={() => setPage("tariff")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "tariff"
                            })}>
                                    <BsCreditCard2Back />
                            <p>Тариф</p>
                        </button>
                    </li>
                    <li className={css.sideBarNavItem}>
                    <button 
                        onClick={() => setPage("team")}  
                         className={clsx(css.sideBarNavItemLink, {
                                [css.linkIsActive]: page === "team"
                            })}>
                                    <BsPeople/>
                            <p>Команда</p>
                        </button>
                    </li> */}
          </ul>
        </nav>
        <div className={css.balanceBox}>
          <p className={css.balance}>Баланс:</p>
          <button type="button" className={css.amount} onClick={openModal}>
            {userBalance} грн <BsChevronRight />
          </button>
          {modalIsOpen && (
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
              <PaymentTopUpAccountModal onClose={handleModalClose} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
