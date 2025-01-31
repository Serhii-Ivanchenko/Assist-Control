import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DistributorsList from "./DistributorsList/DistributorsList";
import Modal from "../../Modals/Modal/Modal";
import DistributorsModal from "./DistributorsModal/DistributorsModal";
import { BsTruck } from "react-icons/bs";
import {
  deleteSupplier,
  getAllSuppliers,
  getSupplierData,
} from "../../../redux/settings/operations";
import {
  selectAllSuppliers,
  selectCurrentSupplier,
  selectIsModalOpen,
} from "../../../redux/settings/selectors";
import { openModal, closeModal } from "../../../redux/settings/slice";
import styles from "./DistributorsPart.module.css";

function DistributorsPart() {
  const dispatch = useDispatch();
  const distributors = useSelector(selectAllSuppliers);
  const currentDistributor = useSelector(selectCurrentSupplier);
  const isModalOpen = useSelector(selectIsModalOpen);

  useEffect(() => {
    // Викликається лише один раз після монтування компонента
    if (distributors.length === 0) {
      dispatch(getAllSuppliers());
    }
  }, [dispatch, distributors.length]);

  const handleEditDistributor = useCallback(
    (currentDistributor) => {
      dispatch(getSupplierData(currentDistributor.id));
      dispatch(openModal(currentDistributor));
    },
    [dispatch]
  );

  const handleDeleteDistributor = useCallback(
    (currentDistributor) => {
      dispatch(deleteSupplier(currentDistributor.id));
    },
    [dispatch]
  );

  const handleAddDistributor = () => {
    dispatch(openModal(null));
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
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

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <DistributorsModal
            onClose={closeModalHandler}
            distributorData={currentDistributor}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsPart;
