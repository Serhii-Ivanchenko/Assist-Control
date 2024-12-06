import ConnectionsMainComponent from '../../components/ConnectionsMainComponent/ConnectionsMainComponent.jsx';
import Header from '../../components/Header/Header.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import css from './ConnectionsPage.module.css'

export default function ConnectionsPage() {
    return (
      <div className={css.wrapper}>
        <Header />
        <div className={css.contentContainer}>
          <SideBar />
          <ConnectionsMainComponent/>
        </div>
      </div>
    );
};
