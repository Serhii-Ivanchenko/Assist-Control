import AppointmentBlock from "../AppointmentBlock/AppointmentBlock.jsx";
import CRMBlock from "../CRMBlock/CRMBlock.jsx";
import css from './CRMMainContent.module.css'

export default function CRMMainContent() {
    return <div className={css.mainContent}>
        <CRMBlock />
        <AppointmentBlock/>
    </div> 
};
