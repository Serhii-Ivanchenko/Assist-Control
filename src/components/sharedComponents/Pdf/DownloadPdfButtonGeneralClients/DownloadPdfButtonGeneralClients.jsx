import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfButtonGeneralClients.module.css";
import logo from "../../../../assets/images/logo-light-theme.png";
import { selectUser } from "../../../../redux/auth/selectors.js";
import "../../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { selectVisibilityAllClients } from "../../../../redux/visibility/selectors.js";
import { dataGeneralClients } from "../../../../utils/dataToRender.js";

export default function DownloadPdfButtonGeneralClients() {
  const userData = useSelector(selectUser);
  const visibility = useSelector(selectVisibilityAllClients);

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
      doc.text("Загальна інформація по клієнту", styles.title.x, styles.title.y);

      const tableData = dataGeneralClients.map((client) => {
        const row = [
            client.date
            ? new Date(client.date).toLocaleString("uk-UA", {
                month: "2-digit",
                day: "2-digit",
              })
            : "—",
          client.name || "Гість",
          visibility?.rating ? client.raiting || "—": "—",
          visibility?.appeal ? client.connection || "—": "—",
          visibility?.repair ? client.repair || "—": "—",
          visibility?.averageCheck ? client.middlecheck || "—": "—",
          visibility?.paydesk ? client.cash || "—": "—",
          visibility?.workPayment ? client.work || "—": "—",
          visibility?.salaryMechanics ? client.paymmechc || "—": "—",
          visibility?.spareParts ? client.parts || "—": "—",
          visibility?.markUp ? client.mark || "—": "—",
          visibility?.salaryManager ? client.paymmng || "—": "—",
          visibility?.salaryAdmin ? client.paymadm || "—": "—",
          visibility?.coefficient ? client.coeff || "—": "—",
          visibility?.NG ? client.ng || "—": "—",
          visibility?.profit ? client.income || "—": "—",
          visibility?.percent ? client.percent || "—": "—",
        ];

        return row;
      });

      doc.autoTable({
        startY: styles.title.y + 10,
        head: [
          [
            "Дата",
            "Ім'я гостя",
            "Рейтинг",
            "Звернення",
            "Ремонт",
            "Срередній чек, грн",
            "Каса, грн",
            "Робота, грн",
            "ЗП Механіка, грн",
            "Запчастини, грн",
            "Націнка, грн",
            "ЗП Менеджер, грн",
            "ЗП Адмін, грн",
            "Коеф",
            "НГ, грн",
            "Прибуток, грн",
            "%",
          ],
        ],
        body: tableData,
        styles: {
          fontSize: 9,
          font: "Roboto-Regular",
          halign: "center",
          valign: "middle",
        },
        headStyles: { fillColor: [22, 160, 133], halign: "center" },
      });
      

      doc.save(`clients_report_${new Date().toISOString().split("T")[0]}.pdf`);
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
