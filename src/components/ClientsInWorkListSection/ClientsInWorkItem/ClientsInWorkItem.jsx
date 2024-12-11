import ClientStatusStepper from "../ClientsStatusStepper/ClientStatusStepper";

function ClientsInWorkItem({ item }) {
  return (
    <div>
      <ul>
        <li>04.02</li>
        <li>{item.status}</li>
        <li>
          <div>
            <ClientStatusStepper car={item.car_model} carImg={item.car_img} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ClientsInWorkItem;
