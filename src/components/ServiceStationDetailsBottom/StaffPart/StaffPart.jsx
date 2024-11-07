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

    //  const [isEditing, setIsEditing] = useState(false);
    // const [memberName, setMemberName] = useState("Максим Коваленко")
    // const [memberEmail, setMemberEmail] = useState("maksim.kovalenko@example.com")
    // const [memberRole, setMemberRole] = useState("Власник")
    const [modalIsOpen, setIsOpen] = useState(false);
    // const [disabled, setDisabled] = useState(false);
    const [members, setMembers] = useState([
        {name:"Максим Коваленко", email:"maksim.kovalenko@example.com", role:"Власник", isEditing:false, isDisabled: false},
        {name:"Максим Коваленко", email:"maksim.kovalenko@example.com", role:"Власник", isEditing:false, isDisabled: false },
        {name:"Максим Коваленко", email:"maksim.kovalenko@example.com", role:"Власник", isEditing:false, isDisabled: false},
        {name:"Максим Коваленко", email:"maksim.kovalenko@example.com", role:"Власник", isEditing:false, isDisabled: false},
        {name:"Максим Коваленко", email:"maksim.kovalenko@example.com", role:"Власник", isEditing:false, isDisabled: false},
        
    ])


    const toDisable = (index) => {
        setMembers(members.map((member, i) => i === index ? { ...member, isDisabled: !member.isDisabled } : member));
    }

    const openModal = () => {
      setIsOpen(true);
        };
        
        const handleModalClose = () => {
      setIsOpen(false);
  };


    const handleChangeMN = (index, newName) => {
        setMembers(members.map((member, i) => i === index ? { ...member, name: newName } : member));
    }

     const handleChangeME = (index, newEmail) => {
         setMembers(members.map((member, i) => i === index ? { ...member, email: newEmail } : member));
    }

     const handleChangeMR = (index, newRole) => {
         setMembers(members.map((member, i) => i === index ? { ...member, role: newRole } : member));
    }

    const handleEditing = (index) => {
        setMembers(members.map((member, i) => i === index ? { ...member, isEditing: !member.isEditing } : member));
    }

    const deleteMember = (index)=>{
        setMembers((prevMembers) => prevMembers.filter((_,i) => i !== index))
    }

    return (
        <div>
            <ul className={css.teamList}>
                {members.map((member, index) =>(
                <li key={index} className={css.teamListItem}>

                    <div className={css.contentBox}>
                        
                        <div className={css.memberPhoto}>                        
                            <img src={avatar} alt={`user's photo`} className={css.particularMemberPhoto} />                           
                        </div>
    
                        
                            {member.isEditing ? (<div className={css.nameBox}>
                                <input type="text" value={member.name} onChange={(e)=>handleChangeMN(index, e.target.value)}/>
                                <input type="text" value={member.email} onChange={(e)=>handleChangeME(index, e.target.value)}/>
                            </div>)
                                : (  <div className={css.nameBox}>
                                <p className={css.memberName}>{ member.name}</p>
                                    <p className= {css.memberEmail} > {member.email}</p>
                        </div> )}
                        </div>
                    

                    {member.isEditing ? (<select onChange={(e)=>handleChangeMR(index, e.target.value)} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {member.role} </p>)}
                       
                    

                    <div className={css.iconsBox}>
        
                           <button type="button" className={css.iconBtn} onClick={()=>handleEditing(index)}>
                             {member.isEditing ?  <RiSave3Fill className={css.icons} /> : <BsPencil className={css.icons}/>  }
                                                       
                        </button>
                        <button type="button" className={css.iconBtn} onClick={()=>deleteMember(index)}>
                            <BsTrash className={css.icons} />
                        </button>
                        <button type="button" onClick={()=>toDisable(index)} className={css.iconBtn}>
                            <BsPower  className={clsx(css.power, { [css.powerDisabled]: member.isDisabled })}/>
                        </button>

                    </div>
                </li>
                ))}
                 
            </ul>
            <button type="button" className={css.addBtn} onClick={openModal}><BiSolidPlusSquare />Додати користувача</button>
            {modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <AddTeamMember onClose={handleModalClose}/>
            </Modal>}
      </div>
  )  
}