import styles from "./StatusBtn.module.css";

function StatusBtn({ car, setIsModalOpen, setSelectedCar }) {
  const handleModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };
  return (
    <div>
      <button className={styles.carDetails} onClick={() => handleModal(car)}>
        Статус
      </button>
    </div>
  );
}

export default StatusBtn;
