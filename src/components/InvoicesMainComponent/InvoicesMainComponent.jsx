import InvoiceListSection from '../InvoiceListSection/InvoiceListSection.jsx';
import InvoicesNavigationSection from '../InvoicesNavigationSection/InvoicesNavigationSection.jsx';
import InvoicesSelectorsSection from '../InvoicesSelectorsSection/InvoicesSelectorsSection.jsx';
import css from './InvoicesMainComponent.module.css'

export default function InvoicesMainComponent() {
     return (
       <div className={css.wrapper}>
         <InvoicesSelectorsSection />
         <InvoicesNavigationSection />
         <InvoiceListSection />
       </div>
     );
};
