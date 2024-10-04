import { FaTrash } from "react-icons/fa6";
import css from "./TeamList.module.css"

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

                <select id="role" name="role" className={css.memberRole}>
                    <option value="owner">owner</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                    </select>
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

                <select id="role" name="role" className={css.memberRole}>
                    <option value="owner">owner</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                    </select>
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

                <select id="role" name="role" className={css.memberRole}>
                    <option value="owner">owner</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                    </select>
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

                <select id="role" name="role" className={css.memberRole}>
                    <option value="owner">owner</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                    </select>
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

                <select id="role" name="role" className={css.memberRole}>
                    <option value="owner">owner</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                    </select>
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

                <select id="role" name="role" className={css.memberRole}>
                    <option value="owner">owner</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                    </select>
                </div>
                <FaTrash className={css.binIcon} />
            </li>
        </ul>
    )
}