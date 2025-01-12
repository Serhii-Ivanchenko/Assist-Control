import css from "./ProblemCall.module.css";
import { BsPersonSquare } from "react-icons/bs";
import { BsCalendarWeek } from "react-icons/bs";
import { FaAt } from "react-icons/fa6";
import defaultAvatar from "../../assets/images/avatar_default.png";
import PlayerAndTranscription from "../sharedComponents/PlayerAndTranscription/PlayerAndTranscription.jsx";
import { useEffect, useRef, useState } from "react";
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
    name: "Іван Іваненко",
    phone: "+38 073 329 12 78",
    date: "30 листопада 2024 р. 09:10",
    email: "ivan-ivan",
    problemCall: true,
    problemRequest: false,
    message: null,
  },
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
  const containerRef = useRef(null); // Ссилка на контейнер
  const [isScrolled, setIsScrolled] = useState(false); // Стан для перевірки наявності скролу

  useEffect(() => {
    const handleResizeOrScroll = () => {
      // Перевірка наявності вертикального скролу
      if (containerRef.current) {
        const hasVerticalScroll =
          containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setIsScrolled(hasVerticalScroll);
      }
    };

    // Викликаємо при завантаженні, зміні розміру чи скролі
    handleResizeOrScroll();
    window.addEventListener("resize", handleResizeOrScroll);
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleResizeOrScroll);
    }

    // Очищення ефекту
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "scroll",
          handleResizeOrScroll
        );
      }
    };
  }, [calls]);

  const childRefs = useRef([]);
  const renderCount = useRef(0); // Используем ref для пропуска первой обработки

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (renderCount.current < childRefs.current.length) {
        renderCount.current += 1; // Пропускаем обработку для первого рендера
        return;
      }
      entries.forEach((entry) => {
        const index = childRefs.current.findIndex(
          (ref) => ref === entry.target
        );
        if (index !== -1 && containerRef.current) {
          const parent = containerRef.current;
          const offsetTop = entry.target.offsetTop - parent.offsetTop;

          parent.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    childRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      childRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={css.sectionWrapper} ref={containerRef}>
      {calls.map((call, index) => {
        return (
          <div
            className={`${css.wrapper} ${isScrolled && css.wrapperScrolled}`}
            key={index}
            ref={(el) => (childRefs.current[index] = el)}
          >
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
