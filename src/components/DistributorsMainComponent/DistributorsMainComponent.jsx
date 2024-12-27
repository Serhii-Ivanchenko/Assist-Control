import DistributorsCircularPBSection from '../DistributorsCircularPBSection/DistributorsCircularPBSection.jsx';
import DistributorsListSection from '../DistributorsListSection/DistributorsListSection.jsx';
import DistributorsControlBarSection from '../DistributorsControlBarSection/DistributorsControlBarSection.jsx';
import css from './DistributorsMainComponent.module.css'

export default function DistributorsMainComponent() {
     return (
       <div className={css.wrapper}>
         <DistributorsControlBarSection />
         <DistributorsCircularPBSection />
         <DistributorsListSection />
       </div>
     );
};
