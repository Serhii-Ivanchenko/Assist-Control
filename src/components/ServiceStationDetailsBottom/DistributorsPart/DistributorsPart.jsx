import DistributorsList from "./DistributorsList/DistributorsList";
import { BsTruck } from "react-icons/bs";
import styles from "./DistributorsPart.module.css";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
import DistributorsModal from "./DistributorsModal/DistributorsModal";
import { useDispatch } from "react-redux";
import { getAllSuppliers } from "../../../redux/settings/operations";

function DistributorsPart() {
  const dispatch = useDispatch();
  const [distributors, setDistributors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDistributor, setCurrentDistributor] = useState(null);
  const [updatedDistributor, setUpdatedDistributor] = useState([]);

  const handleEditDistributor = (distributor) => {
    setCurrentDistributor(distributor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDistributor(null);
  };

  const handleUpdateDistributor = (updatedDistributor) => {
    setUpdatedDistributor((prev) =>
      prev.map((distr) =>
        distr.id === updatedDistributor.id ? updatedDistributor : distr
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllSuppliers());
        // console.log("distr data:", response.payload);
        setDistributors(response.payload.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, updatedDistributor]);

  return (
    <div className={styles.wrapper}>
      <DistributorsList
        distributorsData={distributors}
        onEditDistributor={handleEditDistributor}
        onDelete={() => {}}
        updateDistributors={handleUpdateDistributor}
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
            updateDistributors={handleUpdateDistributor}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsPart;
