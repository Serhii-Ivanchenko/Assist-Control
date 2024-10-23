import css from "./ClientInfo.module.css"
import { AiOutlineDollar } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";






export default function ClientInfo() {
    
    return (
        <div>
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
                        <div className="">+38 073 329 12 17</div>
                    </li>
                    <li className="">
                        <p className=""> <BsEnvelope /> E-mail</p>
                        <div className="">ivan.petrenko@gmail.com</div>
                    </li>
                    <li className="">
                        <p className=""> <PiTelegramLogoLight /> Telegram</p>
                        <p className="">ivan.petrenko</p>
                    </li>
                </ul>

            </div>
    </div>

    )
};
