import css from './ChatFiles.module.css'
import { BsDownload } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
 const fileUrl = "http://www.ndu.edu.ua/liceum/LR1_html.pdf";
  const fileName = "tags.pdf"; // Имя файла для сохранения

  const handleDownload = () => {
     // Создаем временный элемент `<a>`
     const link = document.createElement("a");

     // Устанавливаем URL ссылки
     link.href = fileUrl;

    // Устанавливаем атрибут `download` с именем файла
   link.download = fileName;
  link.target = "_blank";

     // Добавляем элемент в DOM, "кликаем" по нему и затем удаляем
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
 };
  
// const handleDownload = async () => {
//   try {
//     // Загружаем файл
//     const response = await fetch(fileUrl);

//     // Проверяем, что запрос успешен
//     if (!response.ok) {
//       throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
//     }

//     // Получаем данные в виде Blob
//     const blob = await response.blob();

//     // Создаем временный URL для Blob
//     const url = window.URL.createObjectURL(blob);

//     // Создаем временный элемент `<a>`
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = fileName;

//     // Добавляем элемент в DOM, "кликаем" по нему и затем удаляем
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // Освобождаем URL для Blob
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Ошибка скачивания файла:", error);
//   }
// };

function ChatFiles() {
  return (
    <div className={css.wrapper}>
      <div className={css.box} onClick={handleDownload}>
         <div className={css.icontext}>
        <div className={css.iconbox}  >
        <ImFilePdf className={css.iconpdf} />
        <span className={css.spanpdf}>pdf</span>
        </div>
        <p className={css.text}>Комерційна пропозиція</p>
        </div>
        <button className={css.btnicon}><BsDownload className={css.icon} /></button>
      </div>
      

      <div className={css.box} onClick={handleDownload}>
        <div className={css.icontext}>
        <div className={css.iconbox}  >
        <ImFilePdf className={css.iconpdf} />
        <span className={css.spanpdf}>pdf</span>
        </div>
        <p className={css.text}>Рекомендації після ремонту</p>
        </div>
        <button className={css.btnicon}><BsDownload className={css.icon} /></button>
    </div>

    </div>
  )
}

export default ChatFiles