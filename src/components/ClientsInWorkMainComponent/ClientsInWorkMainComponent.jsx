import ClientsInWorkCircularPBSection from '../ClientsInWorkCircularPBSection/ClientsInWorkCircularPBSection.jsx';
import ClientsInWorkListSection from '../ClientsInWorkListSection/ClientsInWorkListSection.jsx';
import ClientsInWorkSelectorsSection from '../ClientsInWorkSelectorsSection/ClientsInWorkSelectorsSection.jsx';
import ClientsInWorkSorterSection from '../ClientsInWorkSorterSection/ClientsInWorkSorterSection.jsx';
import css from './ClientsInWorkMainComponent.module.css';

export default function ClientsInWorkMainComponent() {
    return (
      <div className={css.wrapper}>
        <ClientsInWorkSelectorsSection />
        <ClientsInWorkCircularPBSection />
        <ClientsInWorkSorterSection />
        <ClientsInWorkListSection />
      </div>
    );
};
