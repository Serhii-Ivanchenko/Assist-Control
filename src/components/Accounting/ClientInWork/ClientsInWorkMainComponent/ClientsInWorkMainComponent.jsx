import ClientsInWorkCircularPBSection from "../../ClientInWork/ClientsInWorkCircularPBSection/ClientsInWorkCircularPBSection.jsx";
import ClientsInWorkControlBarSection from "../../ClientInWork/ClientsInWorkControlBarSection/ClientsInWorkControlBarSection.jsx";
import ClientsInWorkSorterSection from "../../ClientInWork/ClientsInWorkSorterSection/ClientsInWorkSorterSection.jsx";
import css from "./ClientsInWorkMainComponent.module.css";
import { useState } from "react";
import { clientsData } from "./clientsData.js";
import ClientsInWorkListSection from "../../ClientInWork/ClientsInWorkListSection/ClientsInWorkListSection.jsx";

export default function ClientsInWorkMainComponent() {
  const [sortedClients, setSortedClients] = useState(clientsData);

  return (
    <div className={css.wrapper}>
      <ClientsInWorkControlBarSection />
      <ClientsInWorkCircularPBSection />
      <ClientsInWorkSorterSection
        clients={sortedClients}
        setSortedClients={setSortedClients}
      />
      <ClientsInWorkListSection clients={sortedClients} />
    </div>
  );
}
