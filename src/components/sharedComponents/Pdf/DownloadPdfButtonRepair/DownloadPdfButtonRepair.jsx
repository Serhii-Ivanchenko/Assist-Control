import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfButtonRepair.module.css";
import logo from "../../../../assets/images/logo-light-theme.png";
import { selectUser } from "../../../../redux/auth/selectors.js";
import "../../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DownloadPdfButtonRepair({ carsData}) {
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
      doc.text(
        `Дата: ${new Date().toISOString().split("T")[0]}`,
        styles.dateInfo.x,
        styles.dateInfo.y,
        { align: styles.dateInfo.alignment }
      );
      doc.setFontSize(styles.title.fontSize);
      doc.text("Загальна інформація по ремонту", styles.title.x, styles.title.y);
  
      const headers = [
        "№",
        "Код",
        "Бренд",
        "Номенклатура",
        "Кількість",
        "Наявність",
        "Ціна, грн",
        "Сума, грн",
        "Механік",
      ].filter(Boolean);
  
      const tableData = carsData.map((car) => {
        const row = [
          car.id || "-",
          car.code || "—",
          car.brand || "-",
          car.nomenclature || "—",
          car.quantity || "—",
          car.availability || "—",
          car.sellingPrice || "—",
          car.soldAmount || "—",
          car.mechanic?.fullName || "—",
        ];

        return row;
      });
  
      doc.autoTable({
        startY: styles.title.y + 10,
        head: [headers],
        body: tableData,
        styles: {
          fontSize: 9,
          font: "Roboto-Regular",
          halign: "center",
          valign: "middle",
        },
        headStyles: { fillColor: [22, 160, 133], halign: "center" },
      });
  
      const now = new Date();

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const time = now.toTimeString().split(" ")[0];
      
      doc.save(`repair_report_${day}-${month}-${year}_${time}.pdf`);
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
