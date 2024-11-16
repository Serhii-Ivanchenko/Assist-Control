import css from "./SparesPart.module.css"
// import { BsCheckSquare } from "react-icons/bs";
// import CustomRadioBtn from "../../CustomRadioBtn/CustomRadioBtn.jsx"
import { BsPlusLg } from "react-icons/bs";
import { BsDashSquareFill } from "react-icons/bs";
import { BsCheckLg  } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import { BsRecordFill } from "react-icons/bs";


 


export default function SparesPart() {
    return (
        <div>
            <div className={css.cbPartBox}>
                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}><BsCheck size={24} className={css.cbIcon} /></span>
                    Загальна
                </label>

                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}>
                        {/* <BsCheck size={24} className={css.cbIcon} /> */}
                    </span>
                    Постачальник
                </label>

                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}>
                        {/* <BsCheck size={24} className={css.cbIcon} /> */}
                    </span>
                    Бренд
                </label>

                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}><BsCheck size={24} className={css.cbIcon}/></span>
                    Група
                </label>
            </div>

            <div className={css.radioAndInputs}>
            
            <div className={css.radioBtns}>
                <label className={css.radioLabel}>
                    <input type="radio" className={css.radiobutton } />
                        <span className={css.radiospan}> <BsRecordFill size={15} className={css.dotIcon} /> </span>
                    Фіксована націнка (%)
                </label>

                <label className={css.radioLabel}>
                    <input type="radio" className={css.radiobutton }/>
                    <span className={css.radiospan}> <BsRecordFill size={12} className={css.dotIcon}/> </span>
                    Динамічна націнка (%)
                </label>
            </div>

                <div className={css.inputsPart}>
                    
                <div className={css.Inputs}>
                <div className={css.inputBox}>
                    <label className={css.inputLabel}>грн</label>
                        <input placeholder="400" className={css.input} />
                </div>

                <div className={css.inputBox}>
                    <label className={css.inputLabel}>%</label>
                    <input placeholder="10"  className={css.input}/>
                </div>
                    </div>

                    <div className={css.labelAndInputs}>

                    <div className={css.labels}>
                    <label className={css.inputLabel}>Від грн</label>
                    <label className={css.inputLabel}>До грн</label>
                    <label className={css.inputLabel}>%</label>
                    </div>

                    
                        <ul className={css.inputsList}>
                            <li className={css.Inputs}>
               {/* <div  className={css.inputBox}>
                    <label className={css.inputLabel}>Від грн</label> */}
                        <input placeholder="250" className={css.input} />
                        {/* </div> */}
{/*                         
                          <div  className={css.inputBox}>
                    <label className={css.inputLabel}>До грн</label> */}
                        <input placeholder="400" className={css.input} />
                {/* </div> */}
{/* 
                <div className={css.inputBox}>
                    <label className={css.inputLabel}>%</label> */}
                    <input placeholder="7"  className={css.input}/>
                        {/* </div> */}
                           
                            <BsDashSquareFill className={css.iconMinus } size={24}/>
                         
                            </li>

                            <li className={css.Inputs}>
<input placeholder="250" className={css.input} />
                       
                        <input placeholder="400" className={css.input} />
              
                    <input placeholder="7"  className={css.input}/>
                        
                        <button type="button" className={css.btnPlus}>
                            <span className={css.plus}>
              <BsPlusLg className={css.iconPlus} />
            </span>
                        </button>
                            </li>


                        </ul>

                        <div className={css.btnBox}>
                            <button type="button" className={css.cancel}>Закрити</button>
                            <button type="button" className={css.save}> <BsCheckLg size={18}/> Зберегти</button>
               </div>
                        
                        
                    </div>

                </div>
            </div>
        </div>
    )
}