import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./AccountingPage.module.css";

export default function AccountingPage() {
  return (
    <div className={css.wrapper}>
      <Header />
      <div className={css.contentContainer}>
        <SideBar />
        <div>AccountingPage</div>
      </div>
    </div>
  );
}
