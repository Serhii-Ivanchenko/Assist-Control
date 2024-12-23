import css from "./ProblemCall.module.css";
import { BsPersonSquare } from "react-icons/bs";
import { BsCalendarWeek } from "react-icons/bs";
import { FaAt } from "react-icons/fa6";
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
    email: "ivan-ivan",
    problemCall: true,
    problemRequest: false,
    message: null,
  },
  {
    name: "Петр Петренко",
    phone: "+38 073 329 12 35",
    date: "25 листопада 2024 р. 09:50",
    email: "petr-petr",
    problemCall: false,
    problemRequest: true,
    message:
      "Чому у мене збільшився чек на послуги. Ви мене за це не попереджували",
  },
  {
    name: "Іван Петренко",
    phone: "+38 073 329 12 16",
    date: "29 листопада 2024 р. 09:39",
    email: "ivan-petr",
    problemCall: false,
    problemRequest: true,
    message:
      "Чому у мене збільшився чек на послуги. Ви мене за це не попереджували",
  },
  {
    name: "Іван Франко",
    phone: "+38 073 329 12 78",
    date: "30 листопада 2024 р. 09:10",
    email: "ivan-franko",
    problemCall: true,
    problemRequest: false,
    message: null,
  },
];

export default function ProblemCall() {
  return (
    <div className={css.sectionWrapper}>
      {calls.map((call, index) => {
        return (
          <div className={css.wrapper} key={index}>
            {call.problemCall ? (
              <h3 className={css.header}>Проблемний дзвінок</h3>
            ) : (
              <h3 className={css.header}>Проблемне звернення</h3>
            )}
            {call.problemCall ? (
              <p className={`${css.phoneNumber} ${css.problemCallPhoneNumber}`}>
                {call.phone}
              </p>
            ) : (
              <div className={css.emailWrapper}>
                <FaAt className={css.emailIcon} />
                <p className={css.phoneNumber}>{call.email}</p>
              </div>
            )}
            <div className={css.nameWrapper}>
              <BsPersonSquare className={css.icon} />
              <p className={css.name}>{call.name}</p>
            </div>
            <div className={css.dateWrapper}>
              <BsCalendarWeek className={css.icon} />
              <p className={css.date}>{call.date}</p>
            </div>
            <div className={css.line}></div>
            <div className={css.bottomWrapper}>
              {call.problemRequest ? (
                <p className={css.problemRequestMessage}>{call.message}</p>
              ) : (
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
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
