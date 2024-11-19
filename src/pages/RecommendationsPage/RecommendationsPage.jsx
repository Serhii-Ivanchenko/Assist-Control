import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./RecommendationsPage.module.css";

export default function RecommendationsPage() {
  return (
    <div className={css.wrapper}>
      <Header />
      <div className={css.contentContainer}>
        <SideBar />
        <div>RecommendationsPage</div>
      </div>
    </div>
  );
}
