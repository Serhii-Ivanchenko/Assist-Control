import DistributorsInvoicesList from "../DistributorsInvoicesList/DistributorsInvoicesList.jsx";
import css from "./DistributorsListSection.module.css";

export default function DistributorsListSection() {
  return (
    <div className={css.wrapper}>
      <DistributorsInvoicesList />
    </div>
  );
}
