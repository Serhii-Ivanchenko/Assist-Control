import toast from "react-hot-toast";
import css from "./CarInfo.module.css";
import { BsFiles } from "react-icons/bs";

export default function CarInfo({
  clientName,
  clientPhone,
  carImg,
  carNumber,
  carMake,
  carModel,
  carYear,
  vin,
  mileage,
}) {
  const handleCopyVin = () => {
    if (!vin) {
      return;
    }
    navigator.clipboard.writeText(vin).then(() => {
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
    <>
      <div className={css.headerWrapper}>
        <h3 className={css.clientName}>{clientName}</h3>
        <p className={css.phone}>{clientPhone}</p>
      </div>
      <div className={css.wrapper}>
        <div className={css.imgWrapper}>
          <img src={carImg} alt="car image" className={css.img} />
          <div className={css.carNumberWrapper}>
            <div className={css.carNumberLeft}>
              <div className={css.flag}>
                <div className={css.flagTop}></div>
                <div className={css.flagBottom}></div>
              </div>
              <p className={css.numberCountry}>UA</p>
            </div>
            <div className={css.carNumberRight}>
              <p className={css.carNumber}>{carNumber}</p>
            </div>
          </div>
        </div>
        <div>
          <div className={css.carInfoWrapper}>
            <h3 className={css.carName}>
              {carMake} {carModel}
            </h3>
            <p className={css.carYear}>{carYear}</p>
          </div>
          <div className={css.carNumbersItem}>
            <p className={css.vin}>{vin}</p>
            <button
              type="button"
              className={css.copyBtn}
              onClick={handleCopyVin}
            >
              <BsFiles className={css.iconColor} size={18} />
            </button>
          </div>
          <div className={css.mileageWrapper}>
            <p className={css.mileageText}>КМ</p>
            <p className={css.mileage}>{mileage}</p>
          </div>
        </div>
      </div>
    </>
  );
}
