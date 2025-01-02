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
  
      const headers = [
        "Дата",
        "Ім'я гостя",
        visibility?.rating && "Рейтинг",
        visibility?.appeal && "Звернення",
        visibility?.repair && "Ремонт",
        visibility?.averageCheck && "Середній чек, грн",
        visibility?.paydesk && "Каса, грн",
        visibility?.workPayment && "Робота, грн",
        visibility?.salaryMechanics && "ЗП Механіка, грн",
        visibility?.spareParts && "Запчастини, грн",
        visibility?.markUp && "Націнка, грн",
        visibility?.salaryManager && "ЗП Менеджер, грн",
        visibility?.salaryAdmin && "ЗП Адмін, грн",
        visibility?.coefficient && "Коеф",
        visibility?.NG && "НГ, грн",
        visibility?.profit && "Прибуток, грн",
        visibility?.percent && "%",
      ].filter(Boolean);
  
      const tableData = [];
      let lastId = null;
  
      dataGeneralClients.forEach((client) => {
        // Перевірка на унікальність клієнта
        const isUniqueClient = dataGeneralClients.filter(c => c.id === client.id).length === 1;
  
        if (client.id !== lastId) {
          // Якщо id змінився, додаємо один порожній рядок замість всіх елементів
          if (lastId !== null) {
            tableData.push([""]); // Один порожній рядок
          }
          lastId = client.id;
        }
  
        // Умовна перевірка для значення parent
        const date = (client.parent === 0 && !isUniqueClient)
        ? ""
        : (client.date
            ? new Date(client.date).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
              }).split('.').reverse().join('.')
            : "—");
      
  
  
        tableData.push([
          date,
          client.name || "Гість",
          visibility?.rating ? client.raiting || "—" : null,
          visibility?.appeal ? client.connection || "—" : null,
          visibility?.repair ? client.repair || "—" : null,
          visibility?.averageCheck ? client.middlecheck || "—" : null,
          visibility?.paydesk ? client.cash || "—" : null,
          visibility?.workPayment ? client.work || "—" : null,
          visibility?.salaryMechanics ? client.paymmechc || "—" : null,
          visibility?.spareParts ? client.parts || "—" : null,
          visibility?.markUp ? client.mark || "—" : null,
          visibility?.salaryManager ? client.paymmng || "—" : null,
          visibility?.salaryAdmin ? client.paymadm || "—" : null,
          visibility?.coefficient ? client.coeff || "—" : null,
          visibility?.NG ? client.ng || "—" : null,
          visibility?.profit ? client.income || "—" : null,
          visibility?.percent ? client.percent || "—" : null,
          
        ]);
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
      
      doc.save(`clients_report_${day}-${month}-${year}_${time}.pdf`);
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
