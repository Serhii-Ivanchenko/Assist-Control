import { FaTrash } from "react-icons/fa6";
import css from "./TeamList.module.css"
import { IoIosArrowDown } from "react-icons/io";


export default function TeamList() {
    return (
        <ul className={css.teamList}>
            <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                </div>

                <div className={css.nameBox}>
                <p className={css.memberName}>Name Surname</p>
                    <p className={css.memberEmail}>email@gmail.com</p>
                </div>

                 <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                      <option value="owner">Власник</option>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>
                    
                </div>
                <FaTrash className={css.binIcon} />
            </li>

               <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                </div>

                <div className={css.nameBox}>
                <p className={css.memberName}>Name Surname</p>
                    <p className={css.memberEmail}>email@gmail.com</p>
                </div>

               <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                      <option value="owner">Власник</option>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>

                </div>
                <FaTrash className={css.binIcon} />
            </li>

              <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                </div>

                <div className={css.nameBox}>
                <p className={css.memberName}>Name Surname</p>
                    <p className={css.memberEmail}>email@gmail.com</p>
                </div>
                 <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                      <option value="owner">Власник</option>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>
                </div>
                <FaTrash className={css.binIcon} />
            </li>

 <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                </div>

                <div className={css.nameBox}>
                <p className={css.memberName}>Name Surname</p>
                    <p className={css.memberEmail}>email@gmail.com</p>
                </div>

                 <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                      <option value="owner">Власник</option>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>

                </div>
                <FaTrash className={css.binIcon} />
            </li>

             <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                </div>

                <div className={css.nameBox}>
                <p className={css.memberName}>Name Surname</p>
                    <p className={css.memberEmail}>email@gmail.com</p>
                </div>

                 <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                      <option value="owner">Власник</option>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>
                    
                </div>
                <FaTrash className={css.binIcon} />
            </li>

             <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                    <img src="" alt="" />
                </div>

                <div className={css.nameBox}>
                <p className={css.memberName}>Name Surname</p>
                    <p className={css.memberEmail}>email@gmail.com</p>
                </div>

                <div className={css.selectBox}>
                <select id="role" name="role" className={css.memberRole}>
                      <option value="owner">Власник</option>
                    <option value="admin">Адміністратор</option>
                    <option value="viewer">Перегляд</option>
                        </select>
                        <IoIosArrowDown className={css.selectIcon} />
                    </div>

                </div>
                <FaTrash className={css.binIcon} />
            </li>
        </ul>
    )
}