import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";
import css from "./DownloadPdfDistributors.module.css";
import logo from "../../../../assets/images/logo-light-theme.png";
import { selectUser } from "../../../../redux/auth/selectors";
import "../../../../assets/fonts/Roboto-Regular-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { selectVisibilitySuppliers } from "../../../../redux/visibility/selectors.js";
import { dataArrDistributors } from "../../../../utils/dataToRender.js";

export default function DownloadPdfDistributors() {
  const userData = useSelector(selectUser);
  const visibility = useSelector(selectVisibilitySuppliers);

  const styles = {
    logo: { x: 14, y: 10, width: 40, height: 9 },
    dateInfo: { fontSize: 10, x: 282, y: 18, alignment: "right" },
    companyInfo: { fontSize: 12, x: 282, y: 25, alignment: "right" },
    title: { fontSize: 14, x: 120, y: 30 },
  };

  const groupByDate = (data) => {
    return data.reduce((groups, item) => {
      const date = item.orderDate || "Без дати";
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    doc.setFont("Roboto-Regular", "normal");

    // Логотип
    const logoUrl = userData.company_logo || logo;
    doc.addImage(
      logoUrl,
      "PNG",
      styles.logo.x,
      styles.logo.y,
      styles.logo.width,
      styles.logo.height
    );

    // Інформація про компанію
    doc.setFontSize(styles.companyInfo.fontSize);
    doc.text(
      userData.company_name || "Назва компанії",
      styles.companyInfo.x,
      styles.companyInfo.y,
      { align: styles.companyInfo.alignment }
    );

    // Дата
    doc.setFontSize(styles.dateInfo.fontSize);
    doc.text(
      `Дата: ${new Date().toISOString().split("T")[0]}`,
      styles.dateInfo.x,
      styles.dateInfo.y,
      { align: styles.dateInfo.alignment }
    );

    // Заголовок
    doc.setFontSize(styles.title.fontSize);
    doc.text("Звіт по постачальникам", styles.title.x, styles.title.y);

    // Групування даних за датами замовлень
    const groupedData = groupByDate(dataArrDistributors);
    let currentY = styles.title.y + 10;

    // Додавання таблиць для кожної дати
    Object.entries(groupedData).forEach(([date, distributors]) => {
      // Заголовок групи
      doc.setFontSize(10);
      doc.text(`Дата замовлення: ${date}`, styles.logo.x, currentY);
      currentY += 7;

      const tableData = [];

      distributors.forEach((distributor) => {
        // Додавання основної інформації про постачальника
        const row = [
          distributor.distributorName || "—",
          distributor.invoiceSum || "—",
          visibility?.date ? distributor.deliveryDate || "—" : "—",
          visibility?.quantity ? distributor.carPartsQuantity || "—" : "—",
        ];

        // Додавання основного рядка для постачальника
        tableData.push(row);

        const carPartsData = distributor.carParts || [];
        if (carPartsData.length > 0) {
          if (distributor.carNumber) {
            tableData.push([
              `${distributor.carNumber || "—"}`,
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              `Загальна сума: ${distributor.salesAmount || "—"}грн`,
              `Середній  відсоток: ${distributor.percent || "—"}%`,
            ]);
          }

          // Додавання окремих рядків для запчастин
          carPartsData.forEach((part) => {
            tableData.push([
              "",
              "",
              "",
              "",
              part.carPartsName || "—",
              part.quantity || "—",
              part.article || "—",
              part.brandName || "—",
              part.price || "—",
              part.purchaseAmount || "—",
              part.salesAmount || "—",
              part.salesPercent || "—",
            ]);
          });
        }
      });

      // Заголовки таблиці
      const tableHeaders = [
        "Назва постачальника",
        "Сума рахунку",
        "Дата доставки",
        "Загальна кількість",
        "Назва деталі",
        "Кількість",
        "Артикул",
        "Бренд",
        "Ціна закупки",
        "Сума закупки",
        "Сума продажу",
        "% Прибутку",
      ];

      // Налаштування ширини стовпців
      const columnStyles = {
        4: { cellWidth: 30},
      };

    

      // Додавання таблиці
      doc.autoTable({
        startY: currentY,
        head: [tableHeaders],
        body: tableData,
        styles: { fontSize: 9, font: "Roboto-Regular" },
        headStyles: { fillColor: [22, 160, 133] },
        columnStyles: columnStyles,

      });

      currentY = doc.lastAutoTable.finalY + 10;
    });

    const now = new Date();

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const time = now.toTimeString().split(" ")[0];
      
      doc.save(`distributor_report_${day}-${month}-${year}_${time}.pdf`);

    
  };

  return (
    <button className={css.btnPdf} onClick={handleDownload}>
      <BsDownload size={16} color="var(--icon-gray)" />
      <span className={css.btnPdfText}>.pdf</span>
    </button>
  );
}
