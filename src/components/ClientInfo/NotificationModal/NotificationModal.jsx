import { Field, Formik, Form } from "formik"
import css from "./NotificationModal.module.css"
import { BsAlarm } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsWatch } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";




// import { newDate } from "react-datepicker/dist/date_utils"

export default function NotificationModal({onClose}) {

    const initialValues = {
        date: new Date(),
    }
        
        
    return (
        <div className={css.notificationBox}> 
            <BsXLg onClick={onClose} className={css.crossBtn }/>
            <p className={css.title}>Обрати дату</p>
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                <Form className={css.notifForm}>

                    <div className={css.selectBox}>                        
                <Field as="select" name="connection" className={css.connectionSelect}>
                  <option> <BsFillTelephoneOutboundFill /> Передзвонити</option>
                    </Field>
                        <BsCaretDownFill className={css.arrowIcon} />
                    </div>
                    
                    
                    <div className={css.dateAndTimeBox}> 
                        <div className={css.inputBox}>
                            <label htmlFor="" className={css.label}>Дата</label>

                            <div className={css.input}>
                            <Field type="date" name="date" className={`${css.date} ${css.dateDate}`} />
                        <button type="button" className={css.dateBtn}><BsCalendar2Week className={css.iconBtn}  size={18}/>
                                </button>
                            </div>
                        </div>

                        <div className={css.inputBox}>                          
                            <label htmlFor="" className={css.label}>Час</label>
                            
                            <div className={css.input}>                       
                            <Field type="time" name="time" className={css.date} />
                            <button type="button"  className={css.dateBtn}><BsWatch className={css.iconBtn} size={18}/>
                                </button>
                                </div>
                        </div>
                    </div>

                    <div className={css.inputBox}>               
                <label htmlFor="" className={css.label}>Коментар</label>
                        <Field as="textarea" name="comment" className={ css.textarea} />
                    </div>
                    
            <div className={css.btnBox}>
                <button type="button" className={css.closeBtn} onClick={onClose}>Закрити</button>
                <button type="submit" className={css.createBtn}> <BsAlarm size={18}/>
Створити нагадування</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}