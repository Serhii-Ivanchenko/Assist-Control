import InvoiceListSection from '../InvoiceListSection/InvoiceListSection.jsx';
import InvoicesNavigationSection from '../InvoicesNavigationSection/InvoicesNavigationSection.jsx';
import InvoicesControlBar from '../InvoicesControlBar/InvoicesControlBar.jsx';
import css from './InvoicesMainComponent.module.css'

export default function InvoicesMainComponent() {
     return (
       <div className={css.wrapper}>
         <InvoicesControlBar />
         <InvoicesNavigationSection />
         <InvoiceListSection />
       </div>
     );
};
