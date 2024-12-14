import DistributorsCircularPBSection from '../DistributorsCircularPBSection/DistributorsCircularPBSection.jsx';
import DistributorsListSection from '../DistributorsListSection/DistributorsListSection.jsx';
import DistributorsSorterAndSelectorsSection from '../DistributorsSorterAndSelectorsSection/DistributorsSorterAndSelectorsSection.jsx';
import css from './DistributorsMainComponent.module.css'

export default function DistributorsMainComponent() {
     return (
       <div className={css.wrapper}>
         <DistributorsCircularPBSection />
         <DistributorsSorterAndSelectorsSection />
         <DistributorsListSection />
       </div>
     );
};
