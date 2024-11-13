import DatePicker from "react-datepicker"
import css from "./AddStaffMemberModal.module.css"

export default function AddStaffMemberModal() {
    return (
        <div className={css.modal}>
            <div className={css.mainInfo}>
                <div className={css.nameBox}>
                    <p className={css.label}>ПІБ</p>
                    <input className={css.input} />
                </div>

                <div className={css.nameBox}>
                    <p className={css.label}>Посада</p>
                    <select className={css.input}>
                        <option value="mec">Механік</option>
                    </select>
                </div>

                <DatePicker
                    dateFormat="dd.mm.yyyy"
                />
                
            </div>
        </div>
    )
}