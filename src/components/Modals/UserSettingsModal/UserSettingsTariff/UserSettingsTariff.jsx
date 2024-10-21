import { useState } from "react";
import css from "./UserSettingsTariff.module.css"
import { BsCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

export default function UserSettingsTariff({onClose}) {
    // const [isActive, setIsActive] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    

    // const handleClickActive = (index) => {
    //     setIsActive(index);
    // }

    const toggleDropdown = (index) => {
      setActiveDropdown(activeDropdown === index ? null : index);
    };

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
                    <p className={`${css.period} ${css.periodTrial}`}>14 днів безкоштовно</p>
                    
                    {/* {isActive === 0 && (
        <button type="button" className={ css.btnBuyIsActive}>
            Придбати
        </button>
                    )} */}
                    
            </div>

                <div className={css.tariffCategoryIsActive}>
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
                    
                    <div className={css.selectBox}>
                    <select id="period" name="period" className={`${css.period} ${css.periodSelect}`} onClick={() => toggleDropdown(0)}>
                        <option value='three'>3 місяці</option>
                        <option value='nine'>9 місяців</option>
                        <option value='year'>12 місяців</option>
                        </select>
                    <BsChevronDown className={`${css.arrowSelect} ${activeDropdown === 0 ? css.rotated : ''}`}  />
                    </div>

                    <p className={css.price}>45$</p>


                    
        <button type="button" className={ css.btnBuyIsActive}>
            Придбати
        </button>
                    

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
                    
                    <div className={css.selectBox}>
                    <select id="period" name="period" className={`${css.period} ${css.periodSelect}`} onClick={() => toggleDropdown(1)}>
                        <option value='three'>3 місяці</option>
                        <option value='nine'>9 місяців</option>
                        <option value='year'>12 місяців</option>
                        </select>
                    <BsChevronDown className={`${css.arrowSelect} ${activeDropdown === 1 ? css.rotated : ''}`} />
                    </div>

                    <p className={css.price}>150$</p>
                    
                     
        <button type="button" className={ css.btnBuyIsActive}>
            Придбати
        </button>
                    
            </div>
            </div>

            <div className={css.btnBox}>
                <button type="button" className={css.btnCancel} onClick={onClose}>Відміна</button>
            </div>
        </div>
    )
}