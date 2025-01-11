import css from './ChatHistoryChange.module.css'

const data = [
  {
    date: '2024-10-11 09:07',
    histnote: 'Додано тег "Новий"'
  },
  {
    date: '2024-11-13 13:05',
    histnote: 'Додано нотатку.'
  },
  {
    date: '2024-12-01 11:20',
    histnote: 'Записано на діагностику (15:00)'
  },

  {
    date: '2024-12-03 11:20',
    histnote: 'Записано на ремонт (12:00)'
  },
  {
    date: '2024-12-24 09:08',
    histnote: 'Додано тег "Новий рік 2024"'
  },
  {
    date: '2024-12-25 09:09',
    histnote: 'Додано нотатку.'
  },
   {
    date: '2024-12-27 09:12',
    histnote: 'Додано нотатку.'
  },

];

const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

function ChatHistoryChange({ filter }) {
  
 const filteredData = sortedData.filter((item) =>
    item.histnote.toLowerCase().includes(filter.toLowerCase())
  );

  const formatDate = (dateString) => {
  const [datePart, timePart] = dateString.split(' '); // Разделяем дату и время
  const [year, month, day] = datePart.split('-'); // Разделяем год, месяц, день
  return `${day}.${month}.${year} ${timePart}`; // Формируем новую строку
};

  return (
    <div className={css.wrapper}>
<ul className={css.items}>
        {filteredData.map((item, index) => (
          <li key={index}>
            <p className={css.text }>{formatDate(item.date)} — {item.histnote} </p>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default ChatHistoryChange