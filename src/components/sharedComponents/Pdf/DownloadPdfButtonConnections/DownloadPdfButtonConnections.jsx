import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfButtonConnections.module.css";
import logo from "../../../../assets/images/logo-light-theme.png";
import { selectUser } from "../../../../redux/auth/selectors.js";
import "../../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const statusesCommunications = [
  { status: "ALL", label: "Всі" },
  { status: "NEW", label: "Нові" },
  { status: "CLIENT", label: "Клієнти" },
  { status: "LOST", label: "Втрачено" },
  { status: "APPOINTMENT", label: "Запис" },
];

export default function DownloadPdfButtonConnections({ carsData = []}) {
  const userData = useSelector(selectUser);

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

      doc.setFontSize(styles.dateInfo.fontSize);
      const currentDate = new Date().toISOString().split("T")[0];
      doc.text(`Дата: ${currentDate}`, styles.dateInfo.x, styles.dateInfo.y, { align: styles.dateInfo.alignment });

      doc.setFontSize(styles.title.fontSize);
      doc.text("Звіт по зверненнях", styles.title.x, styles.title.y);

      const tableData = carsData.map((car) => {
        const row = [
          car.created_at
            ? new Date(car.created_at).toLocaleString("uk-UA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—",
            car.customer_name || "Гість",
            car.customer_phone || "-",
          statusesCommunications.find(item => item.status === car.status)?.label || "—", // Тут також замінюємо
          car.source || "-",
          car.contact_method || "-",
          car.car_name || "—",
          car.latest_note || "—",
        ];

        return row;
      });

      doc.autoTable({
        startY: styles.title.y + 10,
        head: [
          [
            "Дата звернення",
            "Ім'я гостя",
            "Номер телефону",
            "Статус",
            "Ресурс зв'язку",
            "Метод зв'язку",
            "Марка машини",
            "Інформація",
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
      
      doc.save(`connections_list_${day}-${month}-${year}_${time}.pdf`);
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
