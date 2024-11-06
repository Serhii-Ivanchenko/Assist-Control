import { useState } from "react"
import css from "./StationPart.module.css"
import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { BiSolidPlusSquare } from "react-icons/bi";






export default function StationPart() {
    const [isEditing, setIsEditing] = useState(false);
    const [postName, setPostName] = useState("ПОСТ 1")

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
                    {isEditing ? (<input value={postName} onChange={handleChangePN} />) : (<p>{postName}</p>)}
                    <div className={css.iconsBox}>
                        <BsPencil onClick={handleEditing}/>
                        <BsTrash />
                        <BsPower />
                    </div>
                </li>
                <li className={css.postListItem}>
                    <p>ПОСТ 2</p>
                    <div className={css.iconsBox}>
                        <BsPencil/>
                        <BsTrash />
                        <BsPower />
                    </div>
                </li>
                <li className={css.postListItem}>
                    <p>ПОСТ 3</p>
                    <div className={css.iconsBox}>
                        <BsPencil />
                        <BsTrash />
                        <BsPower />
                    </div>
                </li>
                <li className={css.postListItem}>
                    <p>ПОСТ 4</p>
                    <div className={css.iconsBox}>
                        <BsPencil />
                        <BsTrash />
                        <BsPower />
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