import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./RatingPage.module.css";

export default function RatingPage() {
  return (
    <div className={css.wrapper}>
      <Header />
      <div className={css.contentContainer}>
        <SideBar />
        <div>Rating Page Content</div>
      </div>
    </div>
  );
}
