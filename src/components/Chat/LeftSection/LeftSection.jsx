import css from "./LeftSection.module.css";
import MessagesPart from "./MessagesPart/MessagesPart";

export default function LeftSection() {
  return (
    <div className={css.leftSectionWrapper}>
      LeftSection
      <MessagesPart />
    </div>
  );
}
