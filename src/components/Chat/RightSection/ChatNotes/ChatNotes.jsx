import css from './ChatNotes.module.css'
import { forwardRef, useImperativeHandle,useState } from 'react';
let dataNotes = {
   id: 1,
   note: "Клієнт новий, виявив ввічливість та готовність співпрацювати. Забезпечити швидку діагностику для створення позитивного першого враження.",  
 }

const dataNotesEmpty = {
  id: 1,
  note: "Поки немає нотаток", 
  avtoYear: "Рік",
  avtoType : "Марка авто"
}
const ChatNotes = forwardRef(({ isEditable }, ref) => {
  const dataNotesChat = dataNotes && Object.keys(dataNotes).length > 0 ? dataNotes : dataNotesEmpty;

  const [data, setData] = useState(dataNotesChat);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useImperativeHandle(ref, () => ({
    saveData() {
      console.log("Данные сохранены:", data);
    },
    resetData() {
      console.log("Данные сброшены");
      setData(dataNotesChat); 
    },
  }));

return (
  <div className={css.wrapper}>
    {isEditable ? (
      <textarea
        name="note"
        value={data.note}
        onChange={handleInputChange}
        className={css.editInput}
      />
    ) : (
      <p className={css.dataValue}>{data.note}</p>
    )}
  </div>
);
});


ChatNotes.displayName = "ChatNotes";

export default ChatNotes