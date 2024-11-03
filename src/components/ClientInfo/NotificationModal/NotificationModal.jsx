import { Field, Formik, Form, ErrorMessage } from "formik"
import css from "./NotificationModal.module.css"
import { BsAlarm } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsWatch } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import ConnectionSelect from "./ConnectionSelect/ConnectionSelect";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// import { useRef } from "react";
import "./NotificationModal.css"
import { useId } from "react";
import * as Yup from "yup";
import { useState } from "react";



const Validation = Yup.object().shape({
  connection: Yup.string().required("Заповніть це поле"),
  date: Yup.string().required("Заповніть це поле"),
  time: Yup.string().required("Заповніть це поле"),
  comment: Yup.string().required("Заповніть це поле"),
});



export default function NotificationModal({ onClose }) {
    
const [isDateOpen, setDateOpen] = useState(false);
  const [isTimeOpen, setTimeOpen] = useState(false);

  const handleDateButtonClick = () => setDateOpen((prev) => !prev);
  const handleTimeButtonClick = () => setTimeOpen((prev) => !prev);
    

//     const datepickerRef = useRef(null);
//     const timepickerRef = useRef(null);
    

//      const handleDateButtonClick = () => {
//     if (datepickerRef.current && datepickerRef.current.setOpen) {
//       datepickerRef.current.setOpen(true);
//     }
//     };
    
//      const handleTimeButtonClick = () => {
//     if (timepickerRef.current && timepickerRef.current.setOpen) {
//       timepickerRef.current.setOpen(true);
//     }
//   };

    const initialValues = {
        date: new Date(),
        connection: "call",
        time:(() => {
        const date = new Date();  
        date.setHours(9, 0, 0, 0);
        return date;
    })(),
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


    const dateId = useId();
    const timeId = useId();
    const commentId = useId();

        
        
    return (
        <div className={css.notificationBox}> 
            <BsXLg onClick={onClose} className={css.crossBtn }/>
            <p className={css.title}>Обрати дату</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Validation}>
                { ({values, setFieldValue}) => (
                    <Form className={css.notifForm}>

                        <div className={css.selectBox}>
                            <Field as="select" name="connection" className={css.connectionSelect} component={ConnectionSelect} />
                            <ErrorMessage component="span" name="connection" className={css.errorMessage} />
                        </div>
                    
                    
                        <div className={css.dateAndTimeBox}>
                            <div className={css.inputBox}>
                                <label htmlFor={dateId} className={css.label}>Дата</label>
                                <div className={css.input}>
                                    <DatePicker
                                        id={dateId}
                                        selected={values.date}
                                        onChange={(date) => setFieldValue("date", date)}
                                        name="date"
                                        className={`${css.date} ${css.dateDate}`}
                                        dateFormat="dd/MM/yy"
                                        minDate={new Date()}
                                        // ref={datepickerRef}
                                        // onKeyDown={(e) => e.preventDefault()}
                                        open={isDateOpen} 
                                        onClickOutside={() => setDateOpen(false)} 
                                        onSelect={() => setDateOpen(false)} 
                                        toggleCalendarOnIconClick
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className={css.dateBtn}
                                        onClick={handleDateButtonClick}
                                    >
                                        <BsCalendar2Week className={css.iconBtn} size={18} />
                                    </button>
                                </div>
                            <ErrorMessage component="span" name="date" className={css.errorMessage} />

                            </div>

                            <div className={css.inputBox}>
                                <label htmlFor={timeId} className={css.label}>Час</label>
                            
                                <div className={css.input}>
                                    <DatePicker
                                        id={timeId}
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
                                        // ref={timepickerRef}
                                        // onKeyDown={(e) => e.preventDefault()}
                                         open={isTimeOpen} 
                                        onClickOutside={() => setTimeOpen(false)} 
                                        onSelect={() => setTimeOpen(false)} 
                                        readOnly

                                        />
                                    <button type="button"
                                        className={css.dateBtn}
                                        onClick={handleTimeButtonClick}
                                    >
                                        <BsWatch className={css.iconBtn} size={18} />
                                    </button>
                                </div>
                            <ErrorMessage component="span" name="time" className={css.errorMessage} />

                            </div>
                        </div>

                        <div className={css.inputBox}>
                            <label htmlFor={commentId} className={css.label}>Коментар</label>
                            <Field as="textarea" name="comment" className={css.textarea} id={commentId} />
                            <ErrorMessage component="span" name="comment" className={css.errorMessage} />
                            
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