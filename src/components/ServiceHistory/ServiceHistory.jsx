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
      totalkilometrs: "246750",
      newkilometrs: "9272",
      date: "19.06.2024",
      time: "16:08",
    },
    {
      index: "3",
      totalkilometrs: "246749",
      newkilometrs: "9272",
      date: "18.06.2024",
      time: "16:08",
    },
    {
      index: "2",
      totalkilometrs: "246748",
      newkilometrs: "9272",
      date: "17.06.2024",
      time: "16:08",
    },
    {
      index: "4",
      totalkilometrs: "246747",
      newkilometrs: "9272",
      date: "16.06.2024",
      time: "16:08",
    },
  ];
  const sortedArr = recordRace.sort((a, b) =>
    a.totalkilometrs > b.totalkilometrs ? -1 : 1
  );
  return (
    <div>
      <h3 className={css.title}>Історія обслуговування</h3>
      <div className={css.recordsListWrapper}>
        <ul className={css.listOfAccardion}>
          {sortedArr.map((item, index) => {
            return (
              <ItemOfRecord
                key={item.index}
                item={item}
                messages={messages}
                isExpanded={index === 0}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
