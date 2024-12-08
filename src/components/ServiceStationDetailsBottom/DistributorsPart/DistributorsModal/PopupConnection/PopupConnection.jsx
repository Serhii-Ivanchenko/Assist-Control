import styles from "./PopupConnection.module.css";

function PopupConnection() {
  return (
    <>
      <p className={styles.connectionTitle}>Підключення</p>
      <div className={styles.connectionWrapper}>
        <div className={styles.popupInnerContainer}>
          <p className={styles.connectDesc}>
            Для отримання токена перейдіть на сторінку{" "}
            <a
              href="https://login.bm.parts/api"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              login.bm.parts/api
            </a>
            , натисніть кнопку &quot;Новий токен&quot;, введіть будь-яку назву
            та натисніть кнопку &quot;СГЕНЕРУВАТИ&quot;.
          </p>
        </div>
      </div>
    </>
  );
}

export default PopupConnection;
