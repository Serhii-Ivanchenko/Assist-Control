import css from "./ChatFiles.module.css";
import { BsDownload } from "react-icons/bs";
import { ImFilePdf, ImFileExcel, ImFileWord } from "react-icons/im";
import { IoDocumentAttachOutline } from "react-icons/io5";
//  const fileUrl = "http://www.ndu.edu.ua/liceum/LR1_html.pdf";
// const fileName = "tags.pdf"; // Имя файла для сохранения
// import file from "../../../../assets/files/cars_report_16-01-2025_23_55_52.pdf";

const fileUrls = [
  "/files/cars_report_16-01-2025_23_55_52.pdf",
  "/files/Книга1.xlsx",
  "/files/Doc1.docx",
  "/files/cars_report_16-01-2025_20_55_23.pdf",
  "/files/cars_report_16-01-2025_21_55_34.pdf",
  "/files/Книга2.xls",
  "/files/Doc2.doc",
];

const handleDownload = (fileUrl, fileName) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  link.click();
};

function ChatFiles() {
  const getShortName = (filePath) => {
    const fullName = filePath.split("/").pop(); // Получаем имя файла
    const dotIndex = fullName.lastIndexOf(".");
    const extension = fullName.slice(dotIndex); // Получаем расширение
    const baseName = fullName.slice(0, dotIndex); // Имя без расширения
    const shortName = baseName.slice(0, 28); // Обрезаем до 10 символов
    return `${shortName}${extension}`; // Склеиваем короткое имя и расширение
  };

// const getShortName = (filePath) => {
//   const fullName = filePath.split("/").pop(); // Отримуємо повне ім'я файлу
//   const dotIndex = fullName.lastIndexOf(".");
//   const extension = fullName.slice(dotIndex); // Отримуємо розширення
//   const baseName = fullName.slice(0, dotIndex); // Ім'я без розширення

//   if (baseName.length > 25) {
//     // Якщо базове ім'я довше за 25 символів, обрізаємо та додаємо ...
//     return `${baseName.slice(0, 25)}...${extension}`;
//   }

//   // Якщо ім'я коротше за 25 символів, повертаємо без змін
//   return fullName;
// };


   const getFullName = (filePath) => {
    const fullName = filePath.split("/").pop(); // Получаем имя файла
    return `${fullName}`; // Склеиваем короткое имя и расширение
  };

  const getFileIcon = (filePath) => {
    const extension = filePath.split(".").pop().toLowerCase(); // Получаем расширение файла
    if (["pdf"].includes(extension))
      return <ImFilePdf className={css.iconpdf} />;
    if (["xls", "xlsx"].includes(extension))
      return <ImFileExcel className={css.iconxls} />;
    if (["doc", "docx", "rtf"].includes(extension))
      return <ImFileWord className={css.icondoc} />;
    return <IoDocumentAttachOutline style={{ transform: "scale(1.4)" }} />; // Если расширение неизвестно, возвращаем пустую иконку
  };

  return (
    <div className={css.wrapper}>
      {fileUrls.map((fileUrl, index) => {
        const shortName = getShortName(fileUrl); // Генерируем короткое имя файла
        const fileIcon = getFileIcon(fileUrl); // Получаем соответствующую иконку
        const fullName = getFullName(fileUrl);
        return (
          <div
            className={css.box}
            // onClick={handleDownload}
            key={index}
          >
            <div className={css.icontext}>
              <div className={css.iconbox}>{fileIcon}</div>
              <p className={css.text}>{shortName}</p>
            </div>
            <BsDownload
              className={css.icon}
              onClick={() => handleDownload(fileUrl, fullName)}
            />
          </div>
        );
      })}

      {/* <div
        className={css.box}
        // onClick={handleDownload}
      >
        <div className={css.icontext}>
          <div className={css.iconbox}>
            <ImFilePdf className={css.iconpdf} />
          </div>
          <p className={css.text}>Комерційна пропозиція</p>
        </div>
        <BsDownload
          className={css.icon}
          onClick={() =>
            handleDownload(fileUrl, "cars_report_16-01-2025_23_55_52.pdf")
          }
        />
      </div> */}
    </div>
  );
}

export default ChatFiles;
