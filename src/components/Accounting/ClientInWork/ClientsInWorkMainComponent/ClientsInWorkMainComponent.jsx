import ClientsInWorkCircularPBSection from "../../ClientInWork/ClientsInWorkCircularPBSection/ClientsInWorkCircularPBSection.jsx";
import ClientsInWorkControlBarSection from "../../ClientInWork/ClientsInWorkControlBarSection/ClientsInWorkControlBarSection.jsx";
import ClientsInWorkSorterSection from "../../ClientInWork/ClientsInWorkSorterSection/ClientsInWorkSorterSection.jsx";
import css from "./ClientsInWorkMainComponent.module.css";
import { useEffect, useState } from "react";
// import { clientsData } from "./clientsData.js";
import ClientsInWorkListSection from "../../ClientInWork/ClientsInWorkListSection/ClientsInWorkListSection.jsx";
import { useDispatch } from "react-redux";
import { getClientsInWork } from "../../../../redux/accounting/operations.js";

export default function ClientsInWorkMainComponent() {
  const dispatch = useDispatch();
  const [clients, setClients] = useState([]);
  const [sortedClients, setSortedClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await dispatch(getClientsInWork());
        console.log("getClientsInWork", response.payload);

        if (response.payload?.cars) {
          setClients(response.payload.cars);
          setSortedClients(response.payload.cars);
        }
      } catch (er) {
        console.log("er", er);
      }
    };

    fetchClients();
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <ClientsInWorkControlBarSection />
      <ClientsInWorkCircularPBSection />
      <ClientsInWorkSorterSection
        clients={clients}
        setSortedClients={setSortedClients}
      />
      <ClientsInWorkListSection clients={sortedClients} />
    </div>
  );
}
