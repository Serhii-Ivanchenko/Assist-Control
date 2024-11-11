import css from "./StaffPart.module.css"
import avatar from "../../../assets/images/avatar_default.png"
import { BsPencil, BsPlusLg } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
import AddTeamMember from "../../Modals/UserSettingsModal/AddTeamMember/AddTeamMember.jsx"
import { RiSave3Fill } from "react-icons/ri";
import clsx from "clsx";
import { IoStarSharp } from "react-icons/io5";
import { useRef } from "react";




export default function StaffPart() {

    // const [memberName, setMemberName] = useState("Максим Коваленко")
    // const [memberEmail, setMemberEmail] = useState("maksim.kovalenko@example.com")
    // const [memberRole, setMemberRole] = useState("Власник")
    const [modalIsOpen, setIsOpen] = useState(false);
    // const [disabled, setDisabled] = useState(false);
    const [members, setMembers] = useState([
        { name: "Максим Коваленко", email: "maksim.kovalenko@example.com", role: "Власник", isDisabled: false },
        { name: "Максим Коваленко", email: "maksim.kovalenko@example.com", role: "Власник", isDisabled: false },
        { name: "Максим Коваленко", email: "maksim.kovalenko@example.com", role: "Власник", isDisabled: false },
        { name: "Максим Коваленко", email: "maksim.kovalenko@example.com", role: "Власник", isDisabled: false },
        { name: "Максим Коваленко", email: "maksim.kovalenko@example.com", role: "Власник", isDisabled: false },
        
    ]);

     const [isEditing, setIsEditing] = useState(null)
  const inputFocusRef = useRef();


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
        setIsEditing(isEditing === index ? null : index);
    }

    useEffect(() => {
        if (isEditing !== null && inputFocusRef.current) {
            inputFocusRef.current.focus()
        }
    }, [isEditing])

    const deleteMember = (index)=>{
        setMembers((prevMembers) => prevMembers.filter((_,i) => i !== index))
    }

    return (
        <div>
            <div className={css.divForScroll}>
            <ul className={css.teamList}>

                {members.map((member, index) =>(
                <li key={index} className={css.teamListItem}>

                    <div className={css.contentBox}>
                        
                        <div className={css.memberPhoto}>                        
                            <img src={avatar} alt={`user's photo`} className={css.particularMemberPhoto} />                           
                        </div>
    
                        
                            {isEditing === index ? (<div className={`${css.nameBox} ${css.inputBox}`}>
                                <input type="text" className={css.input} ref={inputFocusRef} value={member.name} onChange={(e)=>handleChangeMN(index, e.target.value)}/>
                                <input type="text" className={css.input} value={member.email} onChange={(e)=>handleChangeME(index, e.target.value)}/>
                            </div>)
                                : (  <div className={css.nameBox}>
                                <p className={css.memberName}>{ member.name}</p>
                                    <p className= {css.memberEmail} > {member.email}</p>
                        </div> )}
                        </div>

                        <div className={css.rating}>
                  <IoStarSharp color="var(--star-orange)" size={18} />
                  <IoStarSharp color="var(--star-orange)" size={18} />
                  <IoStarSharp color="var(--star-orange)" size={18} />
                  <IoStarSharp color="var(--star-orange)" size={18} />
                  <IoStarSharp color="var(--star-white)" size={18} />
                </div>
                    

                    {isEditing === index ? (<select onChange={(e)=>handleChangeMR(index, e.target.value)} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {member.role} </p>)}
                       
                    

                    <div className={css.iconsBox}>
                                {isEditing === index ?
                                    <RiSave3Fill className={css.icons} onClick={() => handleEditing(index)} />
                                    : <BsPencil className={css.icons} onClick={()=>handleEditing(index)}/>}
                                                       
                            <BsTrash className={css.icons} onClick={()=>deleteMember(index)}/>
                    
                            <BsPower onClick={()=>toDisable(index)}  className={clsx(css.power, { [css.powerDisabled]: member.isDisabled })}/>

                    </div>
                </li>
                ))}
                 
                </ul>
            </div>
            <button type="button" className={css.addBtn} onClick={openModal}>
                <span className={css.plus}>
              <BsPlusLg className={css.iconPlus} />
            </span>
                Додати користувача</button>
            {modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <AddTeamMember onClose={handleModalClose}/>
            </Modal>}
      </div>
  )  
}