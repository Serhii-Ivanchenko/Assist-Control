import CalendarBlock from "../CalendarBlock/CalendarBlock";
import PageContent from "../PageContent/PageContent";
import css from "./MainContent.module.css"

export default function MainContent() {
  return (
    <div>
      <div className={css.mainContainer}>
      <PageContent />
      <CalendarBlock />
      </div>
    </div>
  );
}
