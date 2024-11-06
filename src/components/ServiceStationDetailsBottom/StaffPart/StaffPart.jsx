import css from "./StaffPart.module.css"
import avatar from "../../../assets/images/avatar_default.png"
import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { useState } from "react";

export default function StaffPart() {

     const [isEditing, setIsEditing] = useState(false);
    const [memberName, setMemberName] = useState("Максим Коваленко")
    const [memberEmail, setMemberEmail] = useState("maksim.kovalenko@example.com")
    const [memberRole, setMemberRole] = useState("Власник")


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
            <ul>
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
            </li>
            </ul>
            
      </div>
  )  
}