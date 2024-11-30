import DistributorsList from "./DistributorsList/DistributorsList";
import logo from "../../../assets/images/distrImg.png";
import { BsTruck } from "react-icons/bs";
import styles from "./DistributorsPart.module.css";

const distributors = [
  {
    id: 1,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
  },
  {
    id: 2,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 3,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 1,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
  },
  {
    id: 2,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 3,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 1,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
  },
  {
    id: 2,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 3,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 1,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
  },
  {
    id: 2,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
  {
    id: 3,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
  },
];

function DistributorsPart() {
  return (
    <div className={styles.wrapper}>
      <DistributorsList distributorsData={distributors} />
      <button className={styles.btn} type="button">
        <BsTruck />
        Додати постачальника
      </button>
    </div>
  );
}

export default DistributorsPart;
