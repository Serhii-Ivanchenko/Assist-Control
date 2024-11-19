import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./BonusesPage.module.css";

export default function BonusesPage() {
  return (
    <div className={css.wrapper}>
      <Header />
      <div className={css.contentContainer}>
        <SideBar />
        <div>Bonuses Page Content</div>
      </div>
    </div>
  );
}
