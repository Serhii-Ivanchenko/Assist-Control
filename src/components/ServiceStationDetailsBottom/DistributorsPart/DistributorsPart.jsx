import DistributorsList from "./DistributorsList/DistributorsList";
import logo from "../../../assets/images/distrImg.png";
import { BsTruck } from "react-icons/bs";
import styles from "./DistributorsPart.module.css";
import { useState } from "react";
import Modal from "../../Modals/Modal/Modal";
import DistributorsModal from "./DistributorsModal/DistributorsModal";

const distributors = [
  {
    id: 1,
    name: "Busmarket",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+380733291212",
    isDisabled: true,
    rating: 4.5,
    deliverySchedule: [
      { day: "Monday", startTime: 9, endTime: 12, isActive: true },
      { day: "Tuesday", startTime: 14, endTime: 16, isActive: true },
      { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
      { day: "Thirsday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 2,
    name: "Autoworld",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Олексій",
    managerPhone: "+380733291212",
    isDisabled: false,
    rating: 5,
    deliverySchedule: [
      { day: "Monday", startTime: 9, endTime: 12, isActive: true },
      { day: "Monday", startTime: 14, endTime: 16, isActive: true },
      { day: "Tuesday", startTime: 10, endTime: 15, isActive: true },
      { day: "Tuesday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 3,
    name: "VIDI",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Тамара",
    managerPhone: "+380733291212",
    isDisabled: false,
    rating: 3.8,
    deliverySchedule: [
      { day: "Friday", startTime: 9, endTime: 12, isActive: true },
      { day: "Friday", startTime: 14, endTime: 16, isActive: true },
      { day: "Friday", startTime: 10, endTime: 15, isActive: true },
      { day: "Friday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 4,
    name: "WAG",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Юрій",
    managerPhone: "+380733291212",
    isDisabled: true,
    rating: 2.5,
    deliverySchedule: [
      { day: "Monday", startTime: 9, endTime: 12, isActive: true },
      { day: "Monday", startTime: 14, endTime: 16, isActive: true },
      { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
      { day: "Friday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 5,
    name: "ATL",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Світлана",
    managerPhone: "+380733291212",
    isDisabled: false,
    rating: 1,
    deliverySchedule: [
      { day: "Monday", startTime: 9, endTime: 12, isActive: true },
      { day: "Monday", startTime: 14, endTime: 16, isActive: true },
      { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
      { day: "Friday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 6,
    name: "BOSCH",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Оксана",
    managerPhone: "+380733291212",
    isDisabled: false,
    rating: 3.8,
    deliverySchedule: [
      { day: "Thuesday", startTime: 9, endTime: 12, isActive: true },
      { day: "Thuesday", startTime: 14, endTime: 16, isActive: true },
      { day: "Tuesday", startTime: 10, endTime: 15, isActive: true },
      { day: "Thuesday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 7,
    name: "Garage",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Олександр",
    managerPhone: "+380733291212",
    isDisabled: true,
    rating: 5,
    deliverySchedule: [
      { day: "Wednesday", startTime: 9, endTime: 12, isActive: true },
      { day: "Wednesday", startTime: 14, endTime: 16, isActive: true },
      { day: "Wednesday", startTime: 10, endTime: 15, isActive: true },
      { day: "Wednesday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 8,
    name: "Vianor",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Віктор",
    managerPhone: "+380733291212",
    isDisabled: false,
    rating: 4,
    deliverySchedule: [
      { day: "Thursday", startTime: 9, endTime: 12, isActive: true },
      { day: "Thursday", startTime: 14, endTime: 16, isActive: true },
      { day: "Thursday", startTime: 10, endTime: 15, isActive: true },
      { day: "Thursday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
  {
    id: 9,
    name: "ABT",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Григорій",
    managerPhone: "+380733291212",
    isDisabled: false,
    rating: 1,
    deliverySchedule: [
      { day: "Sunday", startTime: 9, endTime: 12, isActive: true },
      { day: "Sunday", startTime: 14, endTime: 16, isActive: true },
      { day: "Sunday", startTime: 10, endTime: 15, isActive: true },
      { day: "Sunday", startTime: 8, endTime: 11, isActive: true },
    ],
  },
];

function DistributorsPart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDistributor, setCurrentDistributor] = useState(null);

  const handleEditDistributor = (distributor) => {
    setCurrentDistributor(distributor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDistributor(null);
  };

  return (
    <div className={styles.wrapper}>
      <DistributorsList
        distributorsData={distributors}
        onEditDistributor={handleEditDistributor}
      />
      <button
        className={styles.btn}
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        <BsTruck />
        Додати постачальника
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DistributorsModal
            onClose={closeModal}
            distributorData={currentDistributor}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsPart;
