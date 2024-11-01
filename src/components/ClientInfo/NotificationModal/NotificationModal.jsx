import { Field, Formik, Form } from "formik"
import css from "./NotificationModal.module.css"
import { BsAlarm } from "react-icons/bs";
// import { BsCaretDownFill } from "react-icons/bs";
// import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsWatch } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import ConnectionSelect from "./ConnectionSelect/ConnectionSelect";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useRef } from "react";
// import TimePicker from "react-time-picker";
// import { useState } from "react";
 import "./NotificationModal.css"





// import { newDate } from "react-datepicker/dist/date_utils"

export default function NotificationModal({ onClose }) {
    
    const datepickerRef = useRef(null);
    const timepickerRef = useRef(null);
    // const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    

     const handleDateButtonClick = () => {
    if (datepickerRef.current && datepickerRef.current.setOpen) {
      datepickerRef.current.setOpen(true);
    }
    };
    
     const handleTimeButtonClick = () => {
    if (timepickerRef.current && timepickerRef.current.setOpen) {
      timepickerRef.current.setOpen(true);
    }
  };

    const initialValues = {
        date: new Date(),
        connection: "call",
        time: new Date(),
        comment:""
    }

    const handleSubmit = (values, actions) => {
        const timeOnly = values.time ? values.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
        const dateOnly = values.date ? values.date.toLocaleDateString("en-CA") : null;
        const submittedValues = { ...values, time: timeOnly, date: dateOnly };
        console.log(submittedValues);
        actions.resetForm();
        onClose()
    }
        
        
    return (
        <div className={css.notificationBox}> 
            <BsXLg onClick={onClose} className={css.crossBtn }/>
            <p className={css.title}>Обрати дату</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                { ({values, setFieldValue}) => (
                    <Form className={css.notifForm}>

                        <div className={css.selectBox}>
                            <Field as="select" name="connection" className={css.connectionSelect} component={ConnectionSelect} />
                        </div>
                    
                    
                        <div className={css.dateAndTimeBox}>
                            <div className={css.inputBox}>
                                <label htmlFor="" className={css.label}>Дата</label>
                                <div className={css.input}>
                                    <DatePicker
                                        selected={values.date}
                                        onChange={(date) => setFieldValue("date", date)}
                                        name="date"
                                        className={`${css.date} ${css.dateDate}`}
                                        dateFormat="dd/MM/yy"
                                        minDate={new Date()}
                                        ref={datepickerRef}
                                        onKeyDown={(e) => e.preventDefault()}
                                    />
                                    <button
                                        type="button"
                                        className={css.dateBtn}
                                        onClick={handleDateButtonClick}
                                    >
                                        <BsCalendar2Week className={css.iconBtn} size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className={css.inputBox}>
                                <label htmlFor="" className={css.label}>Час</label>
                            
                                <div className={css.input}>
                                    <DatePicker
                                        name="time"
                                        className={`${css.date} ${css.dateTime}`}
                                         selected={values.time}
                                        onChange={(time) => setFieldValue("time", time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                         timeFormat="H:mm" 
                                        dateFormat="H:mm"
                                        showTimeCaption={false}
                                        ref={timepickerRef}
                                        onKeyDown={(e) => e.preventDefault()}

                                        />
                                    <button type="button"
                                        className={css.dateBtn}
                                        onClick={handleTimeButtonClick}
                                    >
                                        <BsWatch className={css.iconBtn} size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={css.inputBox}>
                            <label htmlFor="" className={css.label}>Коментар</label>
                            <Field as="textarea" name="comment" className={css.textarea} />
                        </div>
                    
                        <div className={css.btnBox}>
                            <button type="button" className={css.closeBtn} onClick={onClose}>
                                Закрити
                            </button>
                            <button type="submit" className={css.createBtn}>
                                <BsAlarm size={18} />
                                Створити нагадування
                            </button>
                        </div>
                          
                    </Form>
                )}
            </Formik>
        </div>
    )
}