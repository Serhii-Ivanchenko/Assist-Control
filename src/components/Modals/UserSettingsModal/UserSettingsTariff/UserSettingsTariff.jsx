import { useState } from "react";
import css from "./UserSettingsTariff.module.css"
import { BsCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";

export default function UserSettingsTariff() {
    // const [isActive, setIsActive] = useState(false);

    // const handleClickActive = () => {
    //     setIsActive(true)
    // }


    return (
        <div className={css.tariffContainer}>
            <p className={css.title}>Тарифи</p>
            <div className={css.tariffBox} >
                <div>
                  <p className={css.tariffNameCat}>Names</p>
                <ul className={css.list}>
               <li className={css.nameListItem}> <p>Камери</p> </li>
               <li className={css.nameListItem}> <p>Команда</p></li>
               <li className={css.nameListItem}> <p>Планувальник</p></li>
               <li className={css.nameListItem}> <p>Зберігання архіву</p></li>
               <li className={css.nameListItem}> <p>Транскрибація дзвінків</p></li>
               <li className={css.nameListItem}> <p>Рейтинг клієнтів</p></li>
               <li className={css.nameListItem}> <p>Облік</p></li>
                </ul>
            </div>

            <div className={css.tariffCategory}>
                <p className={css.tariffName}>Trial</p>
                <ul className={css.list}>
                    <li className={css.listItem}>
                        <p className=''>3</p>
                    </li>
                    <li className={css.listItem}>
                        <p className="">10</p>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick} /></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                </ul>
                    <p className={css.period}>14 днів безкоштовно</p>
                    
                    <button type="button" className={css.btnBuy}>Придбати</button>
            </div>

            <div className={css.tariffCategory}>
                <p className={css.tariffName}>Basic</p>
                <ul className={css.list}>
                    <li className={css.listItem}>
                        <p className=''>10</p>
                    </li>
                    <li className={css.listItem}>
                        <p className="">12</p>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                            <span className=""><BsFillXCircleFill className={css.iconCross} /></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsFillXCircleFill className={css.iconCross}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsFillXCircleFill className={css.iconCross}/></span>
                    </li>
                </ul>
                    <p className={css.period}>3 місяці</p>
                    <p className={css.price}>45$</p>


                    <button type="button" className={css.btnBuy}>Придбати</button>

            </div>

            <div className={css.tariffCategory}>
                <p className={css.tariffName}>Pro</p>
                <ul className={css.list}>
                    <li className={css.listItem}>
                        <p className=''>12</p>
                    </li>
                    <li className={css.listItem}>
                        <p className=''>&infin;</p>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                    <li className={css.listItem}>
                        <span className=""><BsCheckCircleFill className={css.iconTick}/></span>
                    </li>
                </ul>
                    <p className={css.period}>3 місяці</p>
                    <p className={css.price}>150$</p>
                    
                    <button type="button" className={css.btnBuy}>Придбати</button>
            </div>
             </div>

        </div>
    )
}