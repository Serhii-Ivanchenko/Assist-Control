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
import { BsCalendarCheck } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPlusCircleDotted } from "react-icons/bs";
import { IoStarSharp } from "react-icons/io5";
import flag from "../../assets/images/flagUa.webp";
import toast from "react-hot-toast";






export default function ClientInfo() {

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ivan.petrenko@gmail.com')
            .then(()=>{
            toast.success("Пошта успішно скопійована :)", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
            })
    }

    const handleCopyVin = () => {
        navigator.clipboard.writeText('VW8795218794H46J')
        .then(()=>{
            toast.success("VIN-код успішно скопійований :)", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
            })
    }
    
    return (
        <div className={css.clientInfoBox}>
            <p className={css.title}>Інформація про клієнта та автомобіль</p>
            
            <div className={css.infoBox}>
                
                <div className={css.photoAndMainInfo}>
                <img src="" alt="Client's Photo" className={css.clientImg} />

            <div className={css.mainInfo}>
            <div className={css.rating}>
            <IoStarSharp color="var(--star-orange)" size={18}/>
            <IoStarSharp color="var(--star-orange)" size={18}/>
            <IoStarSharp color="var(--star-orange)" size={18}/>
            <IoStarSharp color="var(--star-orange)" size={18}/>
            <IoStarSharp color="var(--star-white)" size={18}/>
          </div>
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
                        <a href="tel:+38 073 329 12 17">
                        <button type="button" className={css.contactsBtn}>          
                            <BsTelephoneOutboundFill className={css.phoneCallIcon}/>
                            </button>
                        </a>
                    </li>

                    <li className={css.contactsInfoItem}>
                        <p className={css.contactsInput}>ivan.petrenko@gmail.com</p> 
                        <div className={css.contactsBtnBox}>
                            <a href="mailto:ivan.petrenko@gmail.com" target="_blank">
                            <button type="button" className={css.contactsBtn}>           
                                <IoIosAt className={css.iconColor} size={25}/>
                                </button>
                            </a>
                            <button type="button" className={css.contactsBtn} onClick={handleCopyEmail}>
                                <BsFiles className={css.iconColor} size={18}/>
                            </button>
                        </div>
                    </li>

                    <li className={css.contactsInfoItem}>
                        <p className={css.contactsInput}>ivan.petrenko</p>
                        <a href="http://t.me/ivan.petrenko" target="_blank">
                        <button type="button" className={css.contactsBtn}>
                            <PiTelegramLogoLight className={css.iconColor} size={22} />
                            </button>
                        </a>
                    </li>
               </ul>

            </div>

            

            
            <ul className={css.carInfo}>
                <li className={css.carCard}>

                    <div className={css.mainContent}>
                        
                    <div className={css.photoAndMainCarInfo}>
                        
                        <img src="" alt="Car's Image" className={css.carImage} />

                        <div className={css.mainCarInfo}>
                            <div className={css.carNameBox}>
                                <IoCarSport className={css.carIcon} size={30} />
                                <p className={css.carName}>HONDA CIVIC</p>
                            </div>

                            <div className={css.carYearBox}>
                                <BsCalendarCheck className={css.yearIcon} />                               
                                <p className={css.carYear}>2001 </p>
                            </div>
                        </div>

                    </div>

                    <div className={css.carCategoryBox}>
                    <ul className={css.carCategory}>
                        <li className={css.carCategoryItem}>
                            <p className={css.categoryVin}>
                                <span className={css.inBold}>VIN</span>
                                <span className={css.number}>Number</span>
                               
                            </p>
                        </li>
                        <li className={css.carCategoryItem}>
                             <p className={css.categoryCar}>
                                <span className={css.inBold}>CAR</span>
                                <span className={css.number}>Number</span>
                            </p>
                        </li>
                        </ul>

                        <ul className={css.carNumbers}>
                            <li className={css.carNumbersItem}>
                                    <p className={css.vin}>VW8795218794H46J</p>
                                    <button type="button" className={css.contactsBtn} onClick={handleCopyVin}>
                                        <BsFiles className={css.iconColor} size={18} />
                                    </button>
                               
                            </li>
                            <li className={`${css.carNumbersItem} ${css.car}`}>
                                    <div className={css.carRegContainer}>                                    
                                        <div className={css.carRegCountry}>
                                            <img
                                                className={css.carRegFlag}
                                                src={flag}
                                                alt="Car registration country flag"
                                            />                                           
                                            <p className={css.carRegCountry}>ua</p>                                      
                                        </div>                                  
                                        <p className={css.carRegNumber}>CA 6864 CO</p>                                    
                                    </div>
                                    
                            </li>
                        </ul>
                        </div>
                    </div>
                    
                    <div className={css.btnBox}>
                       <BsTrash className={css.deleteBtn}/>
                        <button type="button" className={css.addCarBtn}>
                            <BsPlusCircleDotted className={css.plus} />
                            <IoCarSport className={css.carIcon} size={20}/>
                        </button>
                    </div>
                  
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