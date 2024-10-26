import { Accordion } from "react-accessible-accordion";
import css from "./ServiceHistory.module.css";
import ItemOfRecord from "./ItemOfRecord/ItemOfRecord";

export default function ServiceHistory() {
  const messages = [
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
    {
      orClientMsg: true,
      time: "00:00",
      message:
        "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
    },
    {
      orClientMsg: false,
      time: "00:15",
      message:
        "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
    },
  ];
  const recordRace = [
    {
      index: "1",
      totalkilometrs: "246741",
      newkilometrs: "9272",
      date: "14.06.2024",
      time: "16:08",
    },
    {
      index: "2",
      totalkilometrs: "246742",
      newkilometrs: "9272",
      date: "14.06.2024",
      time: "16:08",
    },
    {
      index: "3",
      totalkilometrs: "246743",
      newkilometrs: "9272",
      date: "14.06.2024",
      time: "16:08",
    },
  ];
  return (
    <div>
      <h3 className={css.title}>Історія обслуговування</h3>
      <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
        <div className={css.recordsListWrapper}>
          <ul className={css.listOfAccardion}>
            {recordRace.map((item) => (
              <ItemOfRecord key={item.index} item={item} messages={messages} />
            ))}
          </ul>
        </div>
      </Accordion>
    </div>
  );
}
