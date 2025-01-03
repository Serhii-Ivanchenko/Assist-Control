import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfButtonModalCar.module.css";
import logo from "../../../../assets/images/logo-light-theme.png";
import { selectUser } from "../../../../redux/auth/selectors.js";
import { selectDate} from "../../../../redux/cars/selectors.js";
import "../../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { renderTime } from "../../../../utils/renderTime.jsx";
import { selectVisibilityCar } from "../../../../redux/visibility/selectors.js";

export default function DownloadPdfButtonModalCar({ carsData = [], status }) {
  const userData = useSelector(selectUser);
  const selectedDate = useSelector(selectDate);
  const visibility = useSelector(selectVisibilityCar);

  const getStatusLabel = (status) => {
    return (
      (status === "all" && "Всі авто") ||
      (status === "new" && "Нові") ||
      (status === "diagnostic" && "Діагностика") ||
      (status === "repair" && "Ремонт") ||
      (status === "view_repair" && "Огляд ПР") ||
      (status === "complete" && "Завершено") ||
      "Невідомий статус"
    );
  };

  const styles = {
    logo: { x: 14, y: 10, width: 40, height: 9 },
    dateInfo: { fontSize: 10, x: 282, y: 10 + 8, alignment: "right" },
    companyInfo: { fontSize: 12, x: 282, y: 10 + 8 + 5, alignment: "right" },
    statusInfo: { fontSize: 10, x: 282, y: 10 + 8 + 10, alignment: "right" },
    title: { fontSize: 14, x: 120, y: 10 + 10 + 15 },
  };

  const handleDownload = () => {
    const generatePdf = () => {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      doc.setFont("Roboto-Regular", "normal");

      const logoUrl = userData.company_logo || logo;
      doc.addImage(logoUrl, "PNG", styles.logo.x, styles.logo.y, styles.logo.width, styles.logo.height);

      doc.setFontSize(styles.companyInfo.fontSize);
      doc.text(userData.company_name || "Назва компанії", styles.companyInfo.x, styles.companyInfo.y, { align: styles.companyInfo.alignment });

      const statusLabel = getStatusLabel(status);
      doc.setFontSize(styles.statusInfo.fontSize);
      doc.text(`Статус: ${statusLabel}`, styles.statusInfo.x, styles.statusInfo.y, { align: styles.statusInfo.alignment });

      doc.setFontSize(styles.dateInfo.fontSize);
      doc.text(`Дата: ${selectedDate || new Date().toISOString().split("T")[0]}`, styles.dateInfo.x, styles.dateInfo.y, { align: styles.dateInfo.alignment });

      doc.setFontSize(styles.title.fontSize);
      doc.text("Звіт про машини", styles.title.x, styles.title.y);

      const tableData = carsData.map((car) => {
        const row = [
          car.date_s
            ? new Date(car.date_s).toLocaleString("uk-UA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—",
          visibility?.name ? car.client?.name || "Гість" : "Гість",
          visibility?.time ? renderTime(car.complete_d, car.date_s) : "—",
          car.auto || "—",
          car.plate || "—",
          car.vin || "—",
          getStatusLabel(car.status) || "—",
          visibility?.mileage ? car.mileage || "—" : "—",
          visibility?.totalPrice ? car.totalPrice || "—" : "—",
        ];

        return row;
      });

      doc.autoTable({
        startY: styles.title.y + 10,
        head: [
          [
            "Дата заїзду",
            "Ім'я гостя",
            "Час в роботі",
            "Марка авто",
            "Номер авто",
            "VIN код",
            "Статус",
            "Пробіг",
            "Оплата",
          ],
        ],
        body: tableData,
        styles: { fontSize: 9, font: "Roboto-Regular" },
        headStyles: { fillColor: [22, 160, 133] },
      });

      const now = new Date();

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const time = now.toTimeString().split(" ")[0];
      
      doc.save(`cars_report_${day}-${month}-${year}_${time}.pdf`);
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
