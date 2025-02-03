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
import toast from "react-hot-toast";

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

  const handleDeleteDistributor = useCallback(
    (distributor) => {
      dispatch(deleteSupplier(distributor.id))
        .unwrap()
        .then(() => {
          toast.success("Постачальник успішно видалений :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          dispatch(getAllSuppliers());
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          toast.error("Щось пішло не так :(", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        });
    },
    [dispatch]
  );

  const closeModalHandler = () => {
    dispatch(closeModal());
    setSelectedDistributor(null);
  };

  const handleEditDistributor = useCallback(
    (distributor) => {
      if (!isModalOpen) {
        setSelectedDistributor(distributor);
        dispatch(openModal());
      }
    },
    [dispatch, isModalOpen]
  );

  const handleAddDistributor = () => {
    if (!isModalOpen) {
      setSelectedDistributor(null);
      dispatch(openModal());
    }
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
            distributorData={selectedDistributor || null}
          />
        </Modal>
      )}
    </div>
  );
}

export default DistributorsPart;
