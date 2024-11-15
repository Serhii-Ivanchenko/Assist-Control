import css from "./SparesPart.module.css"
import { BsCheckSquare } from "react-icons/bs";
 import CustomRadioBtn from "../../CustomRadioBtn/CustomRadioBtn.jsx"


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
        </div>
    )
}