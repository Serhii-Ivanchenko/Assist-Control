import { useState } from "react"
import css from "./StationPart.module.css"
import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { BiSolidPlusSquare } from "react-icons/bi";
import clsx from "clsx";






export default function StationPart() {
    const [isEditing, setIsEditing] = useState(false);
    const [postName, setPostName] = useState("ПОСТ 1");
    const [disabled, setDisabled] = useState(false);

    const toDisable = (index) => {
        setDisabled (disabled === index ? null : index)
    }

    const handleChangePN = (e) => {
        setPostName(e.target.value)
    }

    const handleEditing = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div>
            <p className={css.title}>Назва поста</p>
            <ul className={css.postList} >
                <li className={css.postListItem}>
                    {isEditing ? (<input value={postName} onChange={handleChangePN} className={css.inputForPostName } />) : (<p>{postName}</p>)}
                    <div className={css.iconsBox}>
                        <BsPencil onClick={handleEditing}/>
                        <BsTrash />
                        <BsPower onClick={() => toDisable(0)} className={clsx(css.power, {[css.powerDisabled]: disabled === 0})}/>
                    </div>
                </li>
                <li className={css.postListItem}>
                    <p>ПОСТ 2</p>
                    <div className={css.iconsBox}>
                        <BsPencil/>
                        <BsTrash />
                        <BsPower onClick={() => toDisable(1)} className={clsx(css.power, {[css.powerDisabled]: disabled === 1})}/>
                    </div>
                </li>
                <li className={css.postListItem}>
                    <p>ПОСТ 3</p>
                    <div className={css.iconsBox}>
                        <BsPencil />
                        <BsTrash />
                        <BsPower onClick={()=>toDisable(2)} className={clsx(css.power, {[css.powerDisabled]: disabled === 2})}/>
                    </div>
                </li>
                <li className={css.postListItem}>
                    <p>ПОСТ 4</p>
                    <div className={css.iconsBox}>
                        <BsPencil />
                        <BsTrash />
                        <BsPower onClick={() => toDisable(3)} className={clsx(css.power, {[css.powerDisabled]: disabled === 3})}/>
                    </div>
                </li>
            </ul>
            <div className={css.addBox}>
                <input placeholder="Додати новий пост..." className={css.addInput} />
                <button type="button" className={css.addBtn}>
                    <BiSolidPlusSquare />
                    Додати
                </button>
            </div>
    </div>
)
}