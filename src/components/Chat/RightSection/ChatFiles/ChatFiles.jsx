import css from "./ChatFiles.module.css";
import { BsDownload } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
//  const fileUrl = "http://www.ndu.edu.ua/liceum/LR1_html.pdf";
// const fileName = "tags.pdf"; // Имя файла для сохранения
// import file from "../../../../assets/files/cars_report_16-01-2025_23_55_52.pdf";
 
const fileUrl = "/files/cars_report_16-01-2025_23_55_52.pdf";

 const handleDownload = (fileUrl, fileName) => {
   const link = document.createElement("a");
   link.href = fileUrl;
   link.download = fileName;
   link.click();
 };


function ChatFiles() {
  return (
    <div className={css.wrapper}>
      <div
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
      </div>
    </div>
  );
}

export default ChatFiles;
