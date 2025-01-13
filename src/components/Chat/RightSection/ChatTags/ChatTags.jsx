import css from "./ChatTags.module.css";

export default function ChatTags({ tagsArray }) {
  return (
    <div className={css.buttonWrapper}>
      {tagsArray.map((tag, index) => {
        if (tag.isChecked === false) {
          return;
        } else {
          return (
            <p key={index} className={`${css[tag.bgdColor]} ${css.tag}`}>
              {tag.tagName}
            </p>
          );
        }
      })}
    </div>
  );
}
