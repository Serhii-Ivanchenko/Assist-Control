import AppointmentTable from "../AppointmentTable/AppointmentTable.jsx";
import CRMCalendar from "../CRMCalendar/CRMCalendar.jsx";
import css from './AppointmentBlock.module.css'

export default function AppointmentBlock() {
    return <div className={css.appointmentBlockContainer}>
        <CRMCalendar />
         <AppointmentTable/> 
    </div>
};
