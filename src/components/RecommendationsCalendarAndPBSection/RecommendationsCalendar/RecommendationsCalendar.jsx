import css from './RecommendationsCalendar.module.css';
import CalendarPagination from "../../CalendarPagination/CalendarPagination.jsx";

export default function RecommendationsCalendar() {
 return <div className={css.recomCalendarContainer}>
        <CalendarPagination page={'recom'}/>
       
    </div>

};
