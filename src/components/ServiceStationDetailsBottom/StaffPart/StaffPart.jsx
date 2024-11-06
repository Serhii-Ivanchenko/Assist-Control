import css from "./StaffPart.module.css"
import avatar from "../../../assets/images/avatar_default.png"
import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { useState } from "react";
import { BiSolidPlusSquare } from "react-icons/bi";
import Modal from "../../Modals/Modal/Modal";
import AddTeamMember from "../../Modals/UserSettingsModal/AddTeamMember/AddTeamMember.jsx"
import { RiSave3Fill } from "react-icons/ri";
import clsx from "clsx";



export default function StaffPart() {

     const [isEditing, setIsEditing] = useState(false);
    const [memberName, setMemberName] = useState("Максим Коваленко")
    const [memberEmail, setMemberEmail] = useState("maksim.kovalenko@example.com")
    const [memberRole, setMemberRole] = useState("Власник")
    const [modalIsOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const toDisable = () => {
        setDisabled (!disabled)
    }

    const openModal = () => {
      setIsOpen(true);
        };
        
        const handleModalClose = () => {
      setIsOpen(false);
  };


    const handleChangeMN = (e) => {
        setMemberName(e.target.value)
    }

     const handleChangeME = (e) => {
        setMemberEmail(e.target.value)
    }

     const handleChangeMR = (e) => {
        setMemberRole(e.target.value)
    }

    const handleEditing = () => {
        setIsEditing(!isEditing)
    }


    return (
        <div>
            <ul className={css.teamList}>
                <li className={css.teamListItem}>

                    <div className={css.contentBox}>
                        
                        <div className={css.memberPhoto}>                        
                            <img src={avatar} alt={`user's photo`} className={css.particularMemberPhoto} />                           
                        </div>
    
                        
                            {isEditing ? (<div className={css.nameBox}>
                                <input type="text" value={memberName} onChange={handleChangeMN}/>
                                <input type="text" value={memberEmail} onChange={handleChangeME}/>
                            </div>)
                                : (  <div className={css.nameBox}>
                                <p className={css.memberName}>{ memberName}</p>
                                    <p className= {css.memberEmail} > {memberEmail}</p>
                        </div> )}
                        </div>
                    

                    {isEditing ? (<select onChange={handleChangeMR} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {memberRole} </p>)}
                       
                    

                    <div className={css.iconsBox}>
                        {isEditing ? <RiSave3Fill onClick={handleEditing}/>:<BsPencil onClick={handleEditing}/>}
                        <BsTrash />
                        <BsPower onClick={toDisable} className={clsx(css.power, {[css.powerDisabled]: disabled})} />
                    </div>
                </li>
                
                 {/* <li className={css.teamListItem}>

                    <div className={css.contentBox}>
                        
                        <div className={css.memberPhoto}>                        
                            <img src={avatar} alt={`user's photo`} className={css.particularMemberPhoto} />                           
                        </div>
    
                        
                            {isEditing ? (<div className={css.nameBox}>
                                <input type="text" value={memberName} onChange={handleChangeMN}/>
                                <input type="text" value={memberEmail} onChange={handleChangeME}/>
                            </div>)
                                : (  <div className={css.nameBox}>
                                <p className={css.memberName}>{ memberName}</p>
                                    <p className= {css.memberEmail} > {memberEmail}</p>
                        </div> )}
                        </div>
                    

                    {isEditing ? (<select onChange={handleChangeMR} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {memberRole} </p>)}
                       
                    

                    <div className={css.iconsBox}>
                        <BsPencil onClick={handleEditing}/>
                        <BsTrash />
                        <BsPower />
                    </div>
                </li>
                
                 <li className={css.teamListItem}>

                    <div className={css.contentBox}>
                        
                        <div className={css.memberPhoto}>                        
                            <img src={avatar} alt={`user's photo`} className={css.particularMemberPhoto} />                           
                        </div>
    
                        
                            {isEditing ? (<div className={css.nameBox}>
                                <input type="text" value={memberName} onChange={handleChangeMN}/>
                                <input type="text" value={memberEmail} onChange={handleChangeME}/>
                            </div>)
                                : (  <div className={css.nameBox}>
                                <p className={css.memberName}>{ memberName}</p>
                                    <p className= {css.memberEmail} > {memberEmail}</p>
                        </div> )}
                        </div>
                    

                    {isEditing ? (<select onChange={handleChangeMR} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {memberRole} </p>)}
                       
                    

                    <div className={css.iconsBox}>
                        <BsPencil onClick={handleEditing}/>
                        <BsTrash />
                        <BsPower />
                    </div>
            </li> */}
            </ul>
            <button type="button" className={css.addBtn} onClick={openModal}><BiSolidPlusSquare />Додати користувача</button>
            {modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <AddTeamMember onClose={handleModalClose}/>
            </Modal>}
      </div>
  )  
}