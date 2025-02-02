import ClientsInWorkCircularPBSection from "../ClientsInWorkCircularPBSection/ClientsInWorkCircularPBSection.jsx";
import ClientsInWorkListSection from "../ClientsInWorkListSection/ClientsInWorkListSection.jsx";
import ClientsInWorkControlBarSection from "../ClientsInWorkControlBarSection/ClientsInWorkControlBarSection.jsx";
import ClientsInWorkSorterSection from "../ClientsInWorkSorterSection/ClientsInWorkSorterSection.jsx";
import css from "./ClientsInWorkMainComponent.module.css";
import { useState } from "react";
import { clientsData } from "./clientsData.js";

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
