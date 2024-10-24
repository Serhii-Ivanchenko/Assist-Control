import css from "./ClientInfo.module.css"
import { AiOutlineDollar } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { BsFiles } from "react-icons/bs";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoIosAt } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";








export default function ClientInfo() {
    
    return (
        <div className={css.clientInfoBox}>
            <p className={css.title}>Інформація про клієнта та автомобіль</p>
            
            <div className={css.infoBox}>
                
                <div className={css.photoAndMainInfo}>
                <img src="" alt="Client's Photo" className={css.clientImg} />

                <div className={css.mainInfo}>
                <p className={css.clientName}>Іван Петренко</p>
                <p className={css.dateOfBirth}>12 Трав, 1987 (37р.)</p>
                <div className={css.serviceBook}>
                    <p className={css.sbText}>Сервісна книга</p>
                    <button className={css.sbBtn}>
                        <BsDownload className={css.downloadIcon} />
                        .pdf
                    </button>                   
                    </div>
                </div>
</div>
                <div className={css.moneyBox}>
                    <AiOutlineDollar className={css.dollarIcon } />
                    <p className={css.moneyAmount}>₴12 482</p>
                </div>
            </div>
            
            
            <div className={css.contactsBox}>
                <ul className={css.categoryList}>
                    <li className={css.categoryListItem}>
                        <BsTelephone className={css.categoryIcon } />
                        <p className={css.category}>Tel</p>
                    </li>
                    <li className={css.categoryListItem}>
                        <BsEnvelope className={css.categoryIcon }/>
                        <p className={css.category}> E-mail</p>
                    </li>
                    <li className={css.categoryListItem}>
                        <PiTelegramLogoLight className={css.categoryIcon }/>
                        <p className={css.category}> Telegram</p>
                    </li>
                </ul>

               <ul className={css.contactsInfo}>
                    <li className={css.contactsInfoItem}>
                        <p className={css.contactsInput}>+38 073 329 12 17</p> 
                        <button type="button" className={css.contactsBtn}>
                            <BsTelephoneOutboundFill className={css.phoneCallIcon} />
                        </button>
                    </li>

                    <li className={css.contactsInfoItem}>
                        <p className={css.contactsInput}>ivan.petrenko@gmail.com</p> 
                        <div className={css.contactsBtnBox}>
                            <button type="button" className={css.contactsBtn}>
                                <IoIosAt className={css.atIcon} />
                            </button>
                            <button type="button" className={css.contactsBtn}>
                                <BsFiles className={css.copyIcon} />
                            </button>
                        </div>
                    </li>

                    <li className={css.contactsInfoItem}>
                        <p className={css.contactsInput}>ivan.petrenko</p> 
                        <button type="button" className={css.contactsBtn}>
                            <PiTelegramLogoLight className={css.planeIcon} />
                        </button>
                    </li>
               </ul>

            </div>

            
            <ul className={css.carInfo}>
                <li className={css.carCard}>

                    <div className={css.photoAndMainCarInfo}>
                        
                        <img src="" alt="Car's Image" className={css.carImage} />

                        <div className={css.mainCarInfo}>
                    <p className={css.carName}>HONDA CIVIC</p>
                    <p className={css.carYear}>2001 </p>
                        </div>

                    </div>

                    <ul>
                        <li className="">
                            <p>
                                <span className={css.inBold}>VIN</span>
                                <span className={css.number}>Number</span>
                                <div>
                                    <p>VW8795218794H46J</p>
                                    <button type="button"><BsFiles /></button>
                                </div>
                            </p>
                        </li>
                        <li className="">
                             <p>
                                <span className={css.inBold}>CAR</span>
                                <span className={css.number}>Number</span>
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
    </div>

    )
};


  {/* <ul className={css.contactsList}>
                    <li className={css.contactsListItem}>
                        <p className=""> <BsTelephone /> Tel</p>
                        <input className="" value="+38 073 329 12 17"/>
                    </li>
                    <li className={css.contactsListItem}>
                        <p className=""> <BsEnvelope /> E-mail</p>
                        <input className="" value="ivan.petrenko@gmail.com"/>
                    </li>
                    <li className={css.contactsListItem}>
                        <p className=""> <PiTelegramLogoLight /> Telegram</p>
                        <input className="" value="ivan.petrenko"/>
                    </li>
                </ul>*/}