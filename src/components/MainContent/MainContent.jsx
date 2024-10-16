import CalendarBlock from "../CalendarBlock/CalendarBlock";
import PageContent from "../PageContent/PageContent";
import css from "./MainContent.module.css"

export default function MainContent() {
  return (
    <div>
      <h1 className={css.title}>Відеоконтроль</h1>
      <div className={css.mainContainer}>
      <PageContent />
      <CalendarBlock />
      </div>
    </div>
  );
}
