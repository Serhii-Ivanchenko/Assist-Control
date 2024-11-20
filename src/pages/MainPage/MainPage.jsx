import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={css.wrapper}>
      <Header />
      <div className={css.contentContainer}>
        <SideBar />
        <div>Main Page Content</div>
      </div>
    </div>
  );
}
