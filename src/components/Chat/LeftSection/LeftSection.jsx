import css from "./LeftSection.module.css";
import SearchByMessages from "./SearchByMessages/SearchByMessages";

export default function LeftSection() {
  return (
    <div className={css.leftSectionWrapper}>
      LeftSection
      <SearchByMessages />
    </div>
  );
}
