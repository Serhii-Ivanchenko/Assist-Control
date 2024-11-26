import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import styles from "./DownloadPdfButton.module.css";
import logo from "../../../assets/logo.svg";
import { svg2pdf } from "svg2pdf.js";
import { selectUser } from "../../../redux/auth/selectors";
import { selectDate } from "../../../redux/cars/selectors";
import "../../../assets/fonts/Roboto-Regular-normal.js";

export default function DownloadPdfButton({ carsData = [], status }) {
  const userData = useSelector(selectUser);
  const selectedDate = useSelector(selectDate);

  const handleDownload = () => {
    const date = selectedDate || new Date().toISOString().split("T")[0];

    const generatePdf = () => {
      const doc = new jsPDF();

      doc.setFont("Roboto-Regular", "normal");

      // Логотип компанії (якщо є)
      const svgElement = document.createElement("div");
      svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><image href="${
        userData.company_logo || logo
      }" /></svg>`;

      svg2pdf(svgElement, doc, {
        x: 14,
        y: 10,
        width: 40,
        height: 20,
      });

      // Додаємо основну інформацію
      doc.setFontSize(12);
      doc.text(
        `Компанія: ${userData.company_name || "Назва компанії"}`,
        14 + 40 + 5,
        10 + 8
      );
      doc.text(`Дата: ${date}`, 14, 10 + 20 + 5);
      doc.text(`Статус: ${status || "Всі"}`, 100, 10 + 20 + 5);

      // Заголовок
      doc.setFontSize(16);
      doc.text("Звіт про машини", 14, 10 + 20 + 15);

      // Підготовка даних для таблиці
      const tableData = carsData.map((car) => [
        car.date_s ? new Date(car.date_s).toLocaleString("uk-UA") : "—",
        car.auto || "—",
        car.plate || "—",
        car.vin || "—",
        car.status || "—",
      ]);

      // Створення таблиці
      doc.autoTable({
        startY: 10 + 20 + 25,
        head: [
          [
            "#",
            "Ім'я гостя",
            "Телефон",
            "Марка авто",
            "VIN код",
            "Номер авто",
            "Передоплата",
            "Оплата",
            "Час роботи",
          ],
        ],
        body: tableData,
        styles: { fontSize: 9, font: "Roboto-Regular" }, // Використовуємо стандартний шрифт
        headStyles: { fillColor: [22, 160, 133] },
      });

      // Збереження PDF
      doc.save(`cars_report_${date}.pdf`);
    };

    generatePdf();
  };

  return (
    <div className={styles.btnPdfContainer}>
      <button className={styles.btnPdf} onClick={handleDownload}>
        <BsDownload size={16} color="var(--icon-gray)" />
        <span className={styles.btnPdfText}>.pdf</span>
      </button>
    </div>
  );
}
