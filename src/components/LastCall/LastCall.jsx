import clsx from "clsx";
import css from "../LastCall/LastCall.module.css";
import { BsPersonSquare } from "react-icons/bs";
import { BsCalendarWeek } from "react-icons/bs";
import defaultAvatar from "../../assets/images/avatar_default.png";
import PlayerAndTranscription from "../sharedComponents/PlayerAndTranscription/PlayerAndTranscription.jsx";
const summary =
  "Привіт! Мене звати [Ім'я], і я хочу записатися на ремонт свого автомобіля. У мене[марка і модель авто], і після нещодавньої аварії потрібен огляд і ремонт кузова, зокрема вирівнювання геометрії та заміна пошкоджених деталей.Також цікавить діагностика стану автомобіля після ремонту.Чи є у вас вільні дати на цьому тижні, щоб я міг під'їхати на оцінку? Дякую!";
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
const calls = [
  {
    name: "Іван Іваненко",
    phone: "+38 073 329 12 78",
    date: "30 листопада 2024 р. 09:10",
    avatar: null,
    lost: true,
  },
  {
    name: "Петр Петренко",
    phone: "+38 073 329 12 35",
    date: "25 листопада 2024 р. 09:50",
    avatar: null,
    lost: false,
  },
  {
    name: "Іван Петренко",
    phone: "+38 073 329 12 16",
    date: "29 листопада 2024 р. 09:39",
    avatar: null,
    lost: false,
  },
];

const lastCallDetails = calls.length > 0 ? calls[calls.length - 1] : null;

console.log(lastCallDetails);

export default function LastCall() {
  return (
    <div className={css.wrapper}>
      <h3 className={css.header}>Останній дзвінок</h3>
      <p
        className={clsx(
          css.phoneNumber,
          lastCallDetails.lost ? css.lost : css.active
        )}
      >
        {lastCallDetails.phone}
      </p>
      <div className={css.nameWrapper}>
        <BsPersonSquare className={css.icon} />
        <p className={css.name}>{lastCallDetails.name}</p>
      </div>
      <div className={css.dateWrapper}>
        <BsCalendarWeek className={css.icon} />
        <p className={css.date}>{lastCallDetails.date}</p>
      </div>
      <div
        className={clsx(
          css.line,
          lastCallDetails.lost ? css.lostLine : css.activeLine
        )}
      ></div>
      <div className={css.bottomWrapper}>
        {/* <img
          src={lastCallDetails.avatar || defaultAvatar}
          alt=""
          className={css.avatar}
        /> */}
        <PlayerAndTranscription
          sizePlayer="big"
          sizeBtn="small"
          summary={summary}
          messages={messages}
          // audio={audio}
          userAvatar={defaultAvatar}
          showPhoto={true}
          accounting={false}
        />
      </div>
    </div>
  );
}
