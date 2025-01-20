import css from './CRMCalendar.module.css';
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";

export default function CRMCalendar() {
     return <div className={css.crmCalendarContainer}>
        <CalendarPagination page={'crm'}/>
       
    </div>
};
