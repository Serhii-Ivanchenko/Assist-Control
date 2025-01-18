import css from "./CarsList.module.css";
import absentAutoImg from "../../../assets/images/absentAutoImg.webp";
import { IoCarSport } from "react-icons/io5";
import { BsCalendarCheck } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
// import { BsPlusCircleDotted } from "react-icons/bs";
import flag from "../../../assets/images/flagUa.webp";
import { BsFiles } from "react-icons/bs";
import toast from "react-hot-toast";

export default function CarsList({ car, key }) {
  const handleCopyVin = () => {
    if (!car.vin) {
      return;
    }
    navigator.clipboard.writeText(car?.vin).then(() => {
      toast.success("VIN-код успішно скопійований :)", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)",
        },
      });
    });
  };

  return (
    // <div className={css.carListAndAddBtn}>
    //   <ul className={css.carInfo}>
    <li key={key} className={css.carCard}>
      <div className={css.mainContent}>
        <div className={css.photoAndMainCarInfo}>
          <img
            src={car?.photo_url || absentAutoImg}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = absentAutoImg;
            }}
            alt="Car's Image"
            className={css.carImage}
          />

          <div className={css.mainCarInfo}>
            <div className={css.modelAndYear}>
              <div className={css.carNameBox}>
                <IoCarSport className={css.carIcon} size={30} />
                <p className={css.carName}>
                  {car?.car_model || "дані відсутні"}
                </p>
              </div>

              <div className={css.carYearBox}>
                <BsCalendarCheck className={css.yearIcon} />
                <p className={css.carYear}>{car?.year || "дані відсутні"} </p>
              </div>
            </div>

            <div className={css.serviceBook}>
              {!car?.service_book ? (
                <p>Сервісна книга відсутня </p>
              ) : (
                <>
                  <p className={css.sbText}>Сервісна книга</p>
                  <a href="" download={car?.service_book}>
                    <button className={css.sbBtn}>
                      <BsDownload className={css.downloadIcon} />
                      .pdf
                    </button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={css.carCategoryBox}>
          <ul className={css.carCategory}>
            <li className={css.carCategoryItem}>
              <p className={css.categoryVin}>
                <span className={css.inBold}>VIN</span>
                <span className={css.number}>Number</span>
              </p>
            </li>
            <li className={css.carCategoryItem}>
              <p className={css.categoryCar}>
                <span className={css.inBold}>CAR</span>
                <span className={css.number}>Number</span>
              </p>
            </li>
          </ul>

          <ul className={css.carNumbers}>
            <li className={css.carNumbersItem}>
              <p className={css.vin}>{car?.vin || "дані відсутні"}</p>
              <button
                type="button"
                className={css.contactsBtn}
                onClick={handleCopyVin}
              >
                <BsFiles className={css.iconColor} size={18} />
              </button>
            </li>
            <li className={`${css.carNumbersItem} ${css.car}`}>
              <div className={css.carRegContainer}>
                <div className={css.carRegCountry}>
                  <img
                    className={css.carRegFlag}
                    src={flag}
                    alt="Car registration country flag"
                  />
                  <p className={css.carRegCountry}>ua</p>
                </div>
                <p className={css.carRegNumber}>{car?.plate || "AA0000AA"}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <BsTrash className={css.deleteBtn} />
    </li>
    //   </ul>
    //   <button type="button" className={css.addCarBtn}>
    //     <BsPlusCircleDotted className={css.plus} />
    //     <IoCarSport className={css.carIcon} size={20} />
    //   </button>
    // </div>
  );
}
