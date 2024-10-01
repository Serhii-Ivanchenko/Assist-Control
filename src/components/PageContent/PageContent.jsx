import Statistics from "../Statistics/Statistics";
import css from "./PageContent.module.css"
export default function PageContent() {
  return (
    <div className={css.pageContent}>
      <Statistics />
    </div>
  );
}
