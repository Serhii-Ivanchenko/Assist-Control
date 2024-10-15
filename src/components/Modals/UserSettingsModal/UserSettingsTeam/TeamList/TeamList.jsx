import css from "./TeamList.module.css"
import TeamListItem from "../TeamListItem/TeamListItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";


export default function TeamList() {

    const user = useSelector(selectUser);
    const userName = user.name;
    const userEmail = user.email;
    const userPhoto = user.avatar_url;


    return (
        <ul className={css.teamList}>
            <li className={css.teamListItem}>
                <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                        <img src={userPhoto} alt={`${userName}'s photo`} className={css.particularMemberPhoto } />
                    </div>
                    
                     <div className={css.container}>


                <div className={css.nameBox}>
                            <p className={css.memberName}>{userName}</p>
                            <p className={css.memberEmail}>{userEmail }</p>
                </div>

                <div className={css.selectAndBin}>
                 <div className={css.selectBox}>
                <p className={css.memberRole}> Власник </p>
                    </div>
                        </div>
                        </div>
                </div>
            </li>

            <li>
                <TeamListItem/>
            </li>

             <li>
                <TeamListItem/>
            </li>

             <li>
                <TeamListItem/>
            </li>
             <li> 
                <TeamListItem/>
            </li>
             <li>
                <TeamListItem/>
            </li>

        </ul>
    )
}



//                <li className={css.teamListItem}>
//                 <div className={css.contentBox}>
//                 <div className={css.memberPhoto}>
//                     <img src="" alt="" />
//                     </div>
                    
//                      <div className={css.container}>


//                 <div className={css.nameBox}>
//                 <p className={css.memberName}>Name Surname</p>
//                     <p className={css.memberEmail}>juliakharetonchuk@gmail.com</p>
//                     </div>
                    
//                     <div className={css.selectAndBin}>
                        
//                <div className={css.selectBox}>
//                 <select id="role" name="role" className={css.memberRole}>
//                       <option value="owner">Власник</option>
//                     <option value="admin" selected>Адміністратор</option>
//                     <option value="viewer">Перегляд</option>
//                         </select>
//                         <IoIosArrowDown className={css.selectIcon} />
//                     </div>

               
//                         <BsTrash className={css.binIcon} />
//                         </div>
//                         </div>
//                 </div>
//             </li>

//               <li className={css.teamListItem}>
//                 <div className={css.contentBox}>
//                 <div className={css.memberPhoto}>
//                     <img src="" alt="" />
//                     </div>
                    
//                      <div className={css.container}>


//                 <div className={css.nameBox}>
//                 <p className={css.memberName}>Name Surname</p>
//                     <p className={css.memberEmail}>email@gmail.com</p>
//                     </div>

//                 <div className={css.selectAndBin}>
//                  <div className={css.selectBox}>
//                 <select id="role" name="role" className={css.memberRole}>
//                       <option value="owner">Власник</option>
//                     <option value="admin" selected>Адміністратор</option>
//                     <option value="viewer">Перегляд</option>
//                         </select>
//                         <IoIosArrowDown className={css.selectIcon} />
//                     </div>
                
//                     <BsTrash className={css.binIcon} />
//                         </div>
//                         </div>
//                 </div>
//             </li>

//  <li className={css.teamListItem}>
//                 <div className={css.contentBox}>
//                 <div className={css.memberPhoto}>
//                     <img src="" alt="" />
//                     </div>
                    
//                     <div className={css.container}>

//                 <div className={css.nameBox}>
//                 <p className={css.memberName}>Name Surname</p>
//                     <p className={css.memberEmail}>email@gmail.com</p>
//                 </div>

//                       <div className={css.selectAndBin}>
//                  <div className={css.selectBox}>
//                 <select id="role" name="role" className={css.memberRole}>
//                       <option value="owner">Власник</option>
//                     <option value="admin">Адміністратор</option>
//                     <option value="viewer" selected>Перегляд</option>
//                         </select>
//                         <IoIosArrowDown className={css.selectIcon} />
//                     </div>

                
//                         <BsTrash className={css.binIcon} />
//                     </div>
//                     </div>
//                 </div>
//             </li>

//              <li className={css.teamListItem}>
//                 <div className={css.contentBox}>
//                 <div className={css.memberPhoto}>
//                     <img src="" alt="" />
//                     </div>
                    
//                     <div className={css.container}>


//                 <div className={css.nameBox}>
//                 <p className={css.memberName}>Name Surname</p>
//                     <p className={css.memberEmail}>email@gmail.com</p>
//                     </div>
                    
//                       <div className={css.selectAndBin}>

//                  <div className={css.selectBox}>
//                 <select id="role" name="role" className={css.memberRole}>
//                       <option value="owner">Власник</option>
//                     <option value="admin">Адміністратор</option>
//                     <option value="viewer" selected>Перегляд</option>
//                         </select>
//                         <IoIosArrowDown className={css.selectIcon} />
//                     </div>
                    
                
//                         <BsTrash className={css.binIcon} />
//                     </div>
//                     </div>
//                     </div>
//             </li>

//              <li className={css.teamListItem}>
//                 <div className={css.contentBox}>
//                 <div className={css.memberPhoto}>
//                     <img src="" alt="" />
//                     </div>
                    
//                      <div className={css.container}>


//                 <div className={css.nameBox}>
//                 <p className={css.memberName}>Name Surname</p>
//                     <p className={css.memberEmail}>email@gmail.com</p>
//                 </div>

//                       <div className={css.selectAndBin}>
//                 <div className={css.selectBox}>
//                 <select id="role" name="role" className={css.memberRole}>
//                       <option value="owner">Власник</option>
//                     <option value="admin">Адміністратор</option>
//                     <option value="viewer" selected>Перегляд</option>
//                         </select>
//                         <IoIosArrowDown className={css.selectIcon} />
//                     </div>

                
//                         <BsTrash className={css.binIcon} />
//                         </div>
//                         </div>
//                 </div>
//             </li>