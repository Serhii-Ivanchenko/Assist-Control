import SearchBar from "../SearchBar/SearchBar.jsx";
import Support from "../Support/Support.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.jsx";
import UserBar from "../UserBar/UserBar.jsx";
import css from './ControlBar.module.css'
import Modal from "../Modal/Modal.jsx";
import SupportModal from "../SupportModal/SupportModal.jsx";
import { useState } from "react";

export default function ControlBar() {
const [modalIsOpen, setIsOpen] = useState(false);

    
const openModal = () => {
  setIsOpen(true);
    };
    
    const handleModalClose = () => {
  setIsOpen(false);
};

  return <div className={css.wrapper}>
    <SearchBar />
    <ThemeSwitcher />
    <Support openModal={openModal}/>
{
          modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
            <SupportModal onClose={handleModalClose}/>
          </Modal>
}
    <UserBar/>
  </div>;
}
