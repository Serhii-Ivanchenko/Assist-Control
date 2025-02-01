import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DistributorsList from "./DistributorsList/DistributorsList";
import Modal from "../../Modals/Modal/Modal";
import DistributorsModal from "./DistributorsModal/DistributorsModal";
import { BsTruck } from "react-icons/bs";
import {
  deleteSupplier,
  getAllSuppliers,
} from "../../../redux/settings/operations";
import {
  selectAllSuppliers,
  selectIsModalOpen,
} from "../../../redux/settings/selectors";
import { openModal, closeModal } from "../../../redux/settings/slice";
import styles from "./DistributorsPart.module.css";

function DistributorsPart() {
  const dispatch = useDispatch();
  const distributors = useSelector(selectAllSuppliers);
  const isModalOpen = useSelector(selectIsModalOpen);

  const [selectedDistributor, setSelectedDistributor] = useState(null);

  useEffect(() => {
    // Викликається лише один раз після монтування компонента
    if (distributors.length === 0) {
      dispatch(getAllSuppliers());
    }
  }, [dispatch, distributors.length]);

  const handleEditDistributor = useCallback(
    (distributor) => {
      setSelectedDistributor(distributor);
      dispatch(openModal());
    },
    [dispatch]
  );

  const handleDeleteDistributor = useCallback(
    (currentDistributorId) => {
      dispatch(deleteSupplier(currentDistributorId))
        .unwrap()
        .then(() => {
          dispatch(getAllSuppliers());
        })
        .catch((error) => {
          console.error("Error deleting supplier:", error);
        });
    },
    [dispatch]
  );

  const handleAddDistributor = () => {
    setSelectedDistributor(null);
    dispatch(openModal());
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
    setSelectedDistributor(null);
  };

  const memoizedDistributorsList = useMemo(
    () => (
      <DistributorsList
        distributorsData={distributors}
        onEditDistributor={handleEditDistributor}
        onDelete={handleDeleteDistributor}
      />
    ),
    [distributors, handleDeleteDistributor, handleEditDistributor]
  );

  return (
    <div className={styles.wrapper}>
      {memoizedDistributorsList}
      <button
        className={styles.btn}
        type="button"
        onClick={handleAddDistributor}
      >
        <BsTruck />
        Додати постачальника
      </button>

      {isModalOpen && selectedDistributor && (
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <DistributorsModal
            onClose={closeModalHandler}
            distributorData={selectedDistributor}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsPart;
