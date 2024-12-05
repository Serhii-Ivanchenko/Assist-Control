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
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Autoworld",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 5,
  },
  {
    id: 3,
    name: "VIDI",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 3.8,
  },
  {
    id: 4,
    name: "WAG",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
    rating: 2.5,
  },
  {
    id: 5,
    name: "ATL",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 1,
  },
  {
    id: 6,
    name: "BOSCH",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 3.8,
  },
  {
    id: 7,
    name: "Garage",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: true,
    rating: 5,
  },
  {
    id: 8,
    name: "Vianor",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 4,
  },
  {
    id: 9,
    name: "ABT",
    country: "Україна",
    logo: logo,
    managerName: "Менеджер Діана",
    managerPhone: "+38 (073) 329 12 12",
    isDisabled: false,
    rating: 1,
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
