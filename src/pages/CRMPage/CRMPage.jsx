import CRMMainContent from "../../components/CRMMainContent/CRMMainContent.jsx";
import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from './CRMPage.module.css'

export default function CRMPage() {
  return (
    <div className={css.CRMMainContainer}>
      <Header />
      <div className={css.mainContent}>
        <SideBar />
        <CRMMainContent />
      </div>
    </div>
  );
}
