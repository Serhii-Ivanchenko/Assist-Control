import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfButtonKP.module.css";
import logo from "../../../../assets/images/logo-light-theme.png";
import { selectUser } from "../../../../redux/auth/selectors.js";
import "../../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DownloadPdfButtonKP({ carsData }) {
  const userData = useSelector(selectUser);
  console.log(carsData);  // Перевірте виведення даних


  const styles = {
    logo: { x: 14, y: 10, width: 40, height: 9 },
    dateInfo: { fontSize: 10, x: 282, y: 10 + 8, alignment: "right" },
    companyInfo: { fontSize: 12, x: 282, y: 10 + 8 + 5, alignment: "right" },
    statusInfo: { fontSize: 10, x: 282, y: 10 + 8 + 10, alignment: "right" },
    title: { fontSize: 14, x: 120, y: 10 + 10 + 15 },
    clientInfo: { fontSize: 10, x: 14, y: 10 + 17, alignment: "left" },
    mechanicInfo: { fontSize: 10, x: 282, y: 10 + 20, alignment: "right" },
    managerInfo:{fontSize: 10, x: 282, y: 10 + 25, alignment: "right"}
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
      doc.addImage(
        logoUrl,
        "PNG",
        styles.logo.x,
        styles.logo.y,
        styles.logo.width,
        styles.logo.height
      );

      doc.setFontSize(styles.companyInfo.fontSize);
      doc.text(
        userData.company_name || "Назва компанії",
        styles.companyInfo.x,
        styles.companyInfo.y,
        { align: styles.companyInfo.alignment }
      );

      doc.setFontSize(styles.dateInfo.fontSize);
      doc.text(
        `Дата: ${new Date().toISOString().split("T")[0]}`,
        styles.dateInfo.x,
        styles.dateInfo.y,
        { align: styles.dateInfo.alignment }
      );

      // Додавання інформації про клієнта
      doc.setFontSize(styles.clientInfo.fontSize);
      doc.text(
        `Клієнт: ${carsData.client.client_name}`,
        styles.clientInfo.x,
        styles.clientInfo.y,
        { align: styles.clientInfo.alignment }
      );
      doc.text(
        `Телефон: ${carsData.client.phone}`,
        styles.clientInfo.x,
        styles.clientInfo.y + 5,
        { align: styles.clientInfo.alignment }
      );
      doc.text(
        `Передплата: ${carsData.client.prepayment}`,
        styles.clientInfo.x,
        styles.clientInfo.y + 10,
        { align: styles.clientInfo.alignment }
      );

      // Додавання інформації про механіка
      doc.setFontSize(styles.mechanicInfo.fontSize);
      doc.text(
        `Механік: ${carsData.mechanic.mechanic_name}`,
        styles.mechanicInfo.x,
        styles.mechanicInfo.y,
        { align: styles.mechanicInfo.alignment }
      );

      doc.setFontSize(styles.dateInfo.fontSize);
      doc.text(
        `Менеджер: ${carsData.manager.manager_name}`,
        styles.managerInfo.x,
        styles.managerInfo.y,
        { align: styles.managerInfo.alignment }
      );


      // Додавання заголовка
      doc.setFontSize(styles.title.fontSize);
      doc.text("Загальна інформація по КП", styles.title.x, styles.title.y);

      const headers = [
        "Дата",
        "Наявність",
        "Кількість",
        "Артикул",
        "Бренд",
        "Номенклатура",
        "Ціна роботи",
        "Ціна продажу",
        "Склад",
        "Сума закупки",
        "Прибуток",
        "%"
      ].filter(Boolean);

      const tableData = [];

carsData.nodes.forEach((node) => {
  const row = [
    node.repair_date || "",
    "",
    node.needed_quantity || "—",
    node.code || "—",
    node.brand || "—",
    node.node_name || "—",
    node.work_price || "—",
    node.sale_price || "—",
    "",
    node.priceSum || "",
    node.profitSum || "",
    "",
  ];
  tableData.push(row);
  
  // Додавання деталей запчастин для кожного вузла (node)
  if (node.parts && node.parts.length > 0) {
    node.parts.forEach((part) => {
      tableData.push([
        part.date || "—",
        part.availability || "—",
        part.status || "—",
        part.code || "—",
        part.brand || "—",
        part.part_name || "—",
        "",
        "",
        part.supplier || "—",
        part.price || "—",
        part.profit || "—",
        part.percent || "—",
      ]);
    });
  }
  tableData.push([]);

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

      doc.save(`KP_report_${day}-${month}-${year}_${time}.pdf`);
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
