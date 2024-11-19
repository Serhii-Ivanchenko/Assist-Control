import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./ReportsPage.module.css";

export default function ReportsPage() {
return (
  <div className={css.wrapper}>
    <Header />
    <div className={css.contentContainer}>
      <SideBar />
      <div>Reports Page Content</div>
    </div>
  </div>
);
}
