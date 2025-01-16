import css from "./ChatSample.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectSelectedPrompt } from "../../../../redux/chat/selectors.js";
import { changeActualPrompt } from "../../../../redux/chat/slice.js";
import { BsTrash, BsXCircle } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";

const datas = [
  {
    id: 1,
    categ: 1,
    text: "Доброго дня! Дякуємо за звернення до нашого автосервісу. Як ми можемо вам допомогти?",
  },

  {
    id: 2,
    categ: 1,
    text: "Раді вас бачити знову! Чим можемо допомогти цього разу?",
  },

  {
    id: 3,
    categ: 2,
    text: "Дякуємо за звернення! Ми можемо записати вас на діагностику. Який день і час вам зручні?",
  },
  {
    id: 4,
    categ: 2,
    text: "Ваш запис підтверджено! Чекаємо вас [дата] о [час] у нашому автосервісі за адресою [адреса].",
  },
  {
    id: 5,
    categ: 3,
    text: "Дякуємо за запит! Вартість діагностики становить [сума]. Інші послуги уточнюйте у менеджера під час візиту.",
  },
  {
    id: 6,
    categ: 3,
    text: "Так, необхідні запчастини є в наявності. Ми можемо встановити їх під час вашого візиту.",
  },
  {
    id: 7,
    categ: 4,
    text: "Просимо вибачення за незручності! Ваш автомобіль буде готовий на [дата/час]. Ми працюємо над цим.",
  },
  {
    id: 8,
    categ: 4,
    text: "На жаль, запчастини ще в дорозі. Ми повідомимо вам, як тільки вони надійдуть.",
  },

  {
    id: 9,
    categ: 5,
    text: "Дякуємо, що скористалися послугами нашого автосервісу! Будемо раді бачити вас знову.",
  },
  {
    id: 10,
    categ: 5,
    text: "Будемо вдячні за ваш відгук! Це допоможе нам стати ще кращими.",
  },
];

function ChatSample({ filter, selectedCateg, action, onActionChange }) {
  const SelectPrompt = useSelector(selectSelectedPrompt);
  const dispatch = useDispatch();

  console.log("SelectPrompt", SelectPrompt);

  // const filteredData = datas.filter(item =>
  //   (selectedCateg === undefined || item.categ === selectedCateg) && // Фильтрация по категории
  //   item.text.toLowerCase().includes(filter.toLowerCase()) // Фильтрация по тексту
  // );

  const [data, setData] = useState([]);

  const [localEditing, setLocalEditing] = useState(
    action === "edit" ? true : false
  ); // Локальное состояние для управления
  const [localDeleting, setLocalDeleting] = useState(
    action === "delete" ? true : false
  );
  const [localAdding, setLocalAdding] = useState(
    action === "add" ? true : false
  );
  const [tempText, setTempText] = useState("");
  const [backupData, setBackupData] = useState([]);

  useEffect(() => {
    const filteredData = datas.filter(
      (item) =>
        (selectedCateg === undefined || item.categ === selectedCateg) && // Фильтрация по категории
        item.text.toLowerCase().includes(filter.toLowerCase()) // Фильтрация по тексту
    );
    setData(filteredData);
  }, [filter, selectedCateg]);

  useEffect(() => {
    setLocalEditing(action === "edit" ? true : false);
    setLocalDeleting(action === "delete" ? true : false);
    setLocalAdding(action === "add" ? true : false);
    if (action === "edit") {
      setBackupData(data.map((item) => ({ ...item }))); // Сохранение резервной копии
    }
  }, [action]);

  const handleSaveAllChanges = () => {
    onActionChange(""); // Сброс действия
    setLocalEditing(false);
  };

  const handleCancelChanges = () => {
    setData(backupData); // Восстановление данных из резервной копии
    setLocalEditing(false);
    onActionChange("");
  };

  const handleDelete = (idDel) => {
    const updatedData = data.filter((item) => item.id !== idDel);
    setData(updatedData);
    onActionChange("");
    setLocalDeleting(false);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      categ: selectedCateg || 1,
      text: tempText,
    };
    setData([...data, newItem]);
    setTempText("");
    setLocalAdding(false);
    onActionChange("");
  };

  return (
    <div className={css.wrapper}>
      <ul className={css.items}>
        {localAdding && (
          <div className={css.boxInput}>
            <textarea
              name="note"
              className={css.editInput}
              value={tempText} // Используем временное состояние
              onChange={(e) => {
                setTempText(e.target.value); // Сохраняем текст в локальном состоянии
              }}
            />
            <div className={css.boxBtn}>
              <button className={css.btnicon} onClick={handleAdd}>
                <RiSave3Fill className={css.icon} />
              </button>

              <button
                className={css.btnicon}
                onClick={() => {
                  setTempText("");
                  setLocalAdding(false);
                  onActionChange("");
                }}
              >
                <BsXCircle className={css.icon} />
              </button>
            </div>
          </div>
        )}

        {data.map((item, index) => (
          <li key={index}>
            {localEditing ? (
              <div className={css.boxInput}>
                <textarea
                  name="note"
                  className={css.editInput}
                  value={item.text}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index].text = e.target.value;
                    setData(updatedData);
                  }}
                />
                <div className={css.boxBtn}>
                  <button
                    className={css.btnicon}
                    onClick={handleSaveAllChanges}
                  >
                    <RiSave3Fill className={css.icon} />
                  </button>
                  <button className={css.btnicon} onClick={handleCancelChanges}>
                    <BsXCircle className={css.icon} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={css.boxInput}>
                <p
                  className={css.text}
                  onClick={() => dispatch(changeActualPrompt(item.text))}
                >
                  {" "}
                  {item.text}{" "}
                </p>
                {localDeleting && (
                  <button
                    className={css.btnicon}
                    onClick={() => handleDelete(item.id)}
                  >
                    <BsTrash className={css.icon} />
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatSample;
