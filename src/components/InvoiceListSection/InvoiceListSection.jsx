import { Outlet } from 'react-router-dom';
import css from './InvoiceListSection.module.css'

export default function InvoiceListSection() {
     return (
       <div className={css.wrapper}>
         <Outlet />
         
       </div>
     );
};
