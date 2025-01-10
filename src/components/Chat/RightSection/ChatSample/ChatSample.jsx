import css from './ChatSample.module.css'
import { useDispatch,useSelector } from "react-redux";
import { selectSelectedPrompt } from "../../../../redux/chat/selectors.js";
import { changeActualPrompt } from "../../../../redux/chat/slice.js"


const data = [
  {
    id: 1,
    categ: 1,
    text: "Доброго дня! Дякуємо за звернення до нашого автосервісу. Як ми можемо вам допомогти?"
  },

  {
    id: 2,
    categ: 1,
    text: "Раді вас бачити знову! Чим можемо допомогти цього разу?"
  },

  {
    id: 3,
    categ: 2,
    text: "Дякуємо за звернення! Ми можемо записати вас на діагностику. Який день і час вам зручні?"
  },
  {
    id: 4,
    categ: 2,
    text: "Ваш запис підтверджено! Чекаємо вас [дата] о [час] у нашому автосервісі за адресою [адреса]."
  },
  {
    id: 5,
    categ: 3,
    text: "Дякуємо за запит! Вартість діагностики становить [сума]. Інші послуги уточнюйте у менеджера під час візиту."
  },
  {
    id: 6,
    categ: 3,
    text: "Так, необхідні запчастини є в наявності. Ми можемо встановити їх під час вашого візиту."
  },
  {
    id: 7,
    categ: 4,
    text: "Просимо вибачення за незручності! Ваш автомобіль буде готовий на [дата/час]. Ми працюємо над цим."
  },
  {
    id: 8,
    categ: 4,
    text: "На жаль, запчастини ще в дорозі. Ми повідомимо вам, як тільки вони надійдуть."
  },

  {
    id: 9,
    categ: 5,
    text: "Дякуємо, що скористалися послугами нашого автосервісу! Будемо раді бачити вас знову."
  },
  {
    id: 10,
    categ: 5,
    text: "Будемо вдячні за ваш відгук! Це допоможе нам стати ще кращими."
  },
      
];

function ChatSample({ filter, selectedCateg }) {


  const SelectPrompt = useSelector(selectSelectedPrompt);
   const dispatch = useDispatch();

  console.log(SelectPrompt);

 const filteredData = data.filter(item => 
    (selectedCateg === undefined || item.categ === selectedCateg) && // Фильтрация по категории
    item.text.toLowerCase().includes(filter.toLowerCase()) // Фильтрация по тексту
  );

  return (
  
      
<div className={css.wrapper}>
<ul className={css.items}>
        {filteredData.map((item, index) => (
          <li key={index}>
            <p className={css.text}
              onClick={() =>
               dispatch(changeActualPrompt(item.text))}
            > {item.text} </p>
          </li>
        ))}
      </ul>

    </div>


   
  )
}

export default ChatSample