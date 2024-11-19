import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import css from "./ProficiencyPage.module.css";

export default function ProficiencyPage() {
   return (
     <div className={css.wrapper}>
       <Header />
       <div className={css.contentContainer}>
         <SideBar />
         <div>Proficiency Page Content</div>
       </div>
     </div>
   );
}
