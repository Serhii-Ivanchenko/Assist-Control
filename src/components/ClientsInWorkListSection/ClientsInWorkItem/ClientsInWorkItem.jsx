import ClientStatusStepper from "../ClientStatusStepper/ClientStatusStepper";

function ClientsInWorkItem({ date, status, car, img }) {
  return (
    <div>
      <div>{date}</div>
      <div>{status}</div>
      <ClientStatusStepper car={car} carImg={img} />
    </div>
  );
}

export default ClientsInWorkItem;
