import styles from './DayCarsItemLine.module.css';
import carImage from "../../assets/images/carsItem.png";
import { BsPersonFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";



export default function DayCarsItemLine({photoUrl}) {
    const defaultCarImage = carImage;
    const carPhoto = photoUrl || defaultCarImage;

    return (
      <div className={styles.carLineContainer}>
        <div className={styles.carPhoto}>
            <img src={carPhoto} alt="Фото автомобіля" />
        </div>
        <div className={styles.infoName}>
            <BsPersonFill size={13} color="#617651" />
            <span className={styles.textName}>Іван Петренко</span>
        </div>
        <div className={styles.rating}>
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#F5A623" />
            <AiFillStar color="#FFF" />
          </div>

      </div>
    );
  }
  