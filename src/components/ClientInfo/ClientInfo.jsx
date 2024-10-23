import css from "./ClientInfo.module.css"
import { AiOutlineDollar } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { BsFiles } from "react-icons/bs";






export default function ClientInfo() {
    
    return (
        <div className={css.clientInfoBox}>
            <p className={css.title}>Інформація про клієнта та автомобіль</p>
            
        <div className={css.infoBox}>
                <img src="" alt="" />
                <p className={css.clientName}>Іван Петренко</p>
                <p className={css.dateOfBirth}>12 Трав, 1987 (37р.)</p>
                <div className={css.serviceBook}>
                    <p>Сервісна книга</p>
                    <button>
                        <BsDownload />
                        .pdf
                    </button>                   
                </div>
                <div className={css.moneyBox}>
                    <AiOutlineDollar />
                    <p>₴12 482</p>
                </div>
            </div>
            
            
            <div className={css.contactsBox}>
                <ul className="">
                    <li className="">
                        <p className=""> <BsTelephone /> Tel</p>
                        <input className="" value="+38 073 329 12 17"/>
                    </li>
                    <li className="">
                        <p className=""> <BsEnvelope /> E-mail</p>
                        <input className="" value="ivan.petrenko@gmail.com"/>
                    </li>
                    <li className="">
                        <p className=""> <PiTelegramLogoLight /> Telegram</p>
                        <input className="" value="ivan.petrenko"/>
                    </li>
                </ul>

            </div>

            <ul className={css.carInfo}>
                <li className={css.carCard}>
                    <img />
                    <p className={css.carName}>HONDA CIVIC</p>
                    <p className={css.carYear}>2001 </p>
                    <ul>
                        <li className="">
                            <p>
                                <span className={css.inBold}>VIN</span>
                                <span className={css.number}>Number</span>
                                <div>
                                    <p>VW8795218794H46J</p>
                                    <button><BsFiles /></button>
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
