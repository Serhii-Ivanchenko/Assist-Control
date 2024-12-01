import "jspdf-autotable";
import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfButton.module.css";
import logo from "../../../assets/images/logo-light-theme.png";

import { selectUser } from "../../../redux/auth/selectors";
import { selectDate } from "../../../redux/cars/selectors";
import "../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";


export default function DownloadPdfButton({ carsData = [], status }) {
  const userData = useSelector(selectUser);
  const selectedDate = useSelector(selectDate);

  const getStatusLabel = (status) => {
    return status === "all" && "Всі авто" ||
           status === "new" && "Нові" ||
           status === "diagnostic" && "Діагностика" ||
           status === "repair" && "Ремонт" ||
           status === "view_repair" && "Огляд ПР" ||
           status === "complete" && "Завершено" ||
           "Невідомий статус";
  };

  const styles = {
    logo: {
      x: 14,
      y: 10,
      width: 40,
      height: 9,
    },
    dateInfo: {
      fontSize: 10,
      x: 195,
      y: 10 + 8,
      alignment: 'right',
    },
    companyInfo: {
      fontSize: 12,
      x: 195,
      y: 10 + 8 + 5,
      alignment: 'right',
    },
    statusInfo: {
      fontSize: 10,
      x: 195,
      y: 10 + 8 + 10,
      alignment: 'right',
    },
    title: {
      fontSize: 14,
      x: 83,
      y: 10 + 10 + 15,
    },
  };

  const handleDownload = () => {
    const generatePdf = () => {
      const doc = new jsPDF();
      doc.setFont("Roboto-Regular", "normal");

      const logoUrl = userData.company_logo || logo;
      doc.addImage(logoUrl, 'PNG', styles.logo.x, styles.logo.y, styles.logo.width, styles.logo.height);

      doc.setFontSize(styles.companyInfo.fontSize);
      doc.text(userData.company_name || "Назва компанії", styles.companyInfo.x, styles.companyInfo.y, { align: styles.companyInfo.alignment });

      const statusLabel = getStatusLabel(status);
      doc.setFontSize(styles.statusInfo.fontSize);
      doc.text(`Статус: ${statusLabel}`, styles.statusInfo.x, styles.statusInfo.y, { align: styles.statusInfo.alignment });

      doc.setFontSize(styles.dateInfo.fontSize);
      doc.text(`Дата: ${selectedDate || new Date().toISOString().split("T")[0]}`, styles.dateInfo.x, styles.dateInfo.y, { align: styles.dateInfo.alignment });

      doc.setFontSize(styles.title.fontSize);
      doc.text("Звіт про машини", styles.title.x, styles.title.y);

      const tableData = carsData.map((car) => [
        car.date_s ? new Date(car.date_s).toLocaleString("uk-UA") : "—",
        // car.name || "—",
        // car.phone || "—",
        car.auto || "—",
        car.plate || "—",
        car.vin || "—",
        getStatusLabel(car.status) || "—",
        // car.prepayment || "—",
        // car.payment || "—",
        // car.date_e || "—",
      ]);

      doc.autoTable({
        startY: styles.title.y + 10,
        head: [
          [
            "Дата заїзду",
            // "Ім'я гостя",
            // "Телефон",
            "Марка авто",
            "Номер авто",
            "VIN код",
            "Статус",
            // "Передоплата",
            // "Оплата",
            // "Час роботи",
          ],
        ],
        body: tableData,
        styles: { fontSize: 9, font: "Roboto-Regular" },
        headStyles: { fillColor: [22, 160, 133] },
      });

      doc.save(`cars_report_${selectedDate}.pdf`);
    };

    generatePdf();
  };
  return (
      <button className={css.btnPdf} onClick={handleDownload}>
        <BsDownload size={16} color="var(--icon-gray)" />
        <span className={css.btnPdfText}>.pdf</span>
      </button>
  );
}
