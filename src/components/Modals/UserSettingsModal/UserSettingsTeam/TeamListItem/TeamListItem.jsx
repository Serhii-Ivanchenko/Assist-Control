import css from "./TeamListItem.module.css"
import { IoIosArrowDown } from "react-icons/io";
import { BsTrash } from "react-icons/bs";


export default function TeamListItem() {
    return (
        <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                    </div>
                    
                     <div className={css.container}>


                <div className={css.nameBox}>
                <p className={css.memberName}>Максим Коваленко</p>
                    <p className={css.memberEmail}>maksim.kovalenko@example.com</p>
                </div>

                <div className={css.selectAndBin}>
                 <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>
                        <BsTrash className={css.binIcon} />
                        </div>
                        </div>
                </div>
        
    )
}