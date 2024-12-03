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
    rating: 4.5,
  },
  {
    id: 2,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 5,
  },
  {
    id: 3,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 3.8,
  },
  {
    id: 4,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
    rating: 2.5,
  },
  {
    id: 5,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 1,
  },
  {
    id: 6,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 3.8,
  },
  {
    id: 7,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
    rating: 5,
  },
  {
    id: 8,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 4,
  },
  {
    id: 9,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 1,
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
