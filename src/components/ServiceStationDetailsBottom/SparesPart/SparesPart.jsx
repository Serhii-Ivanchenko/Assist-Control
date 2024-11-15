import css from "./SparesPart.module.css"
import { BsCheckSquare } from "react-icons/bs";
import CustomRadioBtn from "../../CustomRadioBtn/CustomRadioBtn.jsx"
import { BsPlusLg } from "react-icons/bs";
import { BsDashSquareFill } from "react-icons/bs";

 


export default function SparesPart() {
    return (
        <div>
            <div className={css.cbPartBox}>
                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}><BsCheckSquare size={24} className={css.cbIcon} /></span>
                    Загальна
                </label>

                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}><BsCheckSquare size={24} className={css.cbIcon}/></span>
                    Постачальник
                </label>

                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}><BsCheckSquare size={24} className={css.cbIcon}/></span>
                    Бренд
                </label>

                <label className={css.cbLabel}>
                    <input type="checkbox" className={css.checkbox}></input>
                    <span className={css.cbMark}><BsCheckSquare size={24} className={css.cbIcon}/></span>
                    Група
                </label>
            </div>

            <div className={css.radioAndInputs}>
            
            <div className={css.radioBtns}>
                <label className={css.radioLabel}>
                    <input type="radio" className={css.radiobutton } />
                    <CustomRadioBtn />
                    Фіксована націнка (%)
                </label>

                <label className={css.radioLabel}>
                    <input type="radio" className={css.radiobutton }/>
                    <CustomRadioBtn />
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

               
                        
                        
                    </div>

                </div>
            </div>
        </div>
    )
}