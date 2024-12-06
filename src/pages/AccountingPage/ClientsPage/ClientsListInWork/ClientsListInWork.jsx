import ClientsInWorkMainComponent from "../../../../components/ClientsInWorkMainComponent/ClientsInWorkMainComponent.jsx";
import Header from "../../../../components/Header/Header.jsx";
import SideBar from "../../../../components/SideBar/SideBar.jsx";
import css from "./ClientsListInWork.module.css";

export default function ConnectionsPage() {
    return (
      <div className={css.wrapper}>
        <Header />
        <div className={css.contentContainer}>
          <SideBar />
          <ClientsInWorkMainComponent />
        </div>
      </div>
    );
};
