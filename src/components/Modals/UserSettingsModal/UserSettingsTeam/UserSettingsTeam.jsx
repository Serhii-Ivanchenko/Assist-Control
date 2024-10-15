import TeamList from "./TeamList/TeamList";
import css from "./UserSettingsTeam.module.css"
import Modal from "../../Modal/Modal"
import AddTeamMember from "../AddTeamMember/AddTeamMember"
import { useState } from "react";
import { BsPersonPlusFill } from "react-icons/bs";


export default function UserSettingsTeam() {
    const [modalIsOpen, setIsOpen] = useState(false);

    
    const openModal = () => {
      setIsOpen(true);
        };
        
        const handleModalClose = () => {
      setIsOpen(false);
  };
  
    return (
      <div className={css.teamBox}>
            <div className={css.contentBox}>
                <p className={css.title}>Команда</p>
                <p className={css.text}>Додайте нового користувача до команди, надавши йому права доступу.
                    <br />
                    <br/>
                    Вкажіть ім&apos;я та електронну адресу нового члена команди для завершення процесу.</p>
                <button type="button" className={css.addBtn} onClick={openModal}> <BsPersonPlusFill /> Додати користувача</button>
                {
          modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
            <AddTeamMember onClose={handleModalClose}/>
          </Modal>
          }
            </div>
            <TeamList/>
        </div>
    )
}