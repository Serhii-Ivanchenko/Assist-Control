import CarInfo from "../../../sharedComponents/CarInfo/CarInfo.jsx";

import PopUp from "../PopUp/PopUp.jsx"
import { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import {
  BsPersonLinesFill,
  BsFillCaretDownFill,
  BsCurrencyDollar,
  BsPencil,
  BsCheck,
  BsDownload,
} from "react-icons/bs";
import carImg from "../../../../assets/images/car.png";
import css from "./PaymentModal.module.css";

const datakp = {
  car: {
    car_id: 66967,
    make: "AUDI",
    model: "A6 QUATTRO",
    vin: "WAUZZZ4AZSN114501",
    year: "2001",
    car_number: "CA 6864 CO",
    mileage: "284563",
  },
  client: {
    client_name: "Іван Петренко",
    phone: "+38 073 329 12 17",
    prepayment: "2482",
  },

  manager: {
    mechanic_id: 10,
    manager_name: "Олег А.В.",
  },
};

const cash = [
  { id: 1, name: "Каса1" },
  { id: 2, name: "Каса2" },
  { id: 3, name: "Каса3" },
  { id: 4, name: "Каса4" },
  { id: 5, name: "Каса5" },
];

const paytype = [
  { id: 1, name: "Оплата покупця" },
  { id: 2, name: "Повернення покупцю" },
];

const avtoservice = [
  { id: 1, name: "ФОП Блудов" },
  { id: 2, name: "ФОП Шевченко" },
  { id: 3, name: "ФОП Черкський" },
  { id: 4, name: "ФОП Київський" },
  { id: 5, name: "ФОП Франко" },
];

const data = {
  id: 1,
  commercId: 1,
  cash: 1,
  avtoservice: 1,
  paytype: 1,
  sumpay: 0,
  sumkp: 20000,
};

const date = new Date();

const day = String(date.getDate()).padStart(2, "0"); // "06"
const month = String(date.getMonth() + 1).padStart(2, "0"); // "02" (месяцы начинаются с 0)
const year = date.getFullYear(); // 2025

const formattedDate = `${day}.${month}.${year}`;

export default function PaymentModal({ onClose }) {
  const [editedData, setEditedData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  // автоматичний фокус інпуту суми
  const inputRef = useRef();
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditedData((prev) => ({ ...prev, sumpay: prev.sumpay ||0 }));  
  };

  //  const handleSelectChange = (field, value) => {
  //    setEditedData((prev) => ({
  //      ...prev,
  //      [field]: value,
  //    }));
  //  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseFloat(value) ;
    setEditedData((prev) => ({ ...prev, sumpay: numericValue }));
  };

  // const renderSelect = (field, value, dictionary, width) => {
  //   return (
  //     <div className={css.customSelectWrapper} style={{ width }}>
  //       {field === "cash" && <BsCurrencyDollar className={css.dollar} />}
  //       <select
  //         className={`${css.customSelect} ${
  //           field === "cash" ? css.cashSelect : ""
  //         }`}
  //         value={value}
  //         onChange={(e) => handleSelectChange(field, e.target.value)}
  //         style={{ width }}
  //       >
  //         {dictionary.map((item) => (
  //           <option key={item.id} value={item.id} className={css.dictionoption}>
  //             {item.name}
  //           </option>
  //         ))}
  //       </select>
  //       <BsFillCaretDownFill className={css.customSelectIcon} />
  //     </div>
  //   );
  // };

  const [activeService, setActiveService] = useState( avtoservice.find((service) => service.id === editedData.avtoservice) || avtoservice[0]); 
  const [isAvtoservice, setIsAvtoservice] = useState(false); // Видимость справочника
  const triggerAvtoserviceRef = useRef(null);

  const toggleAvtoserviceSelector = () => {
    setIsAvtoservice(!isAvtoservice);
  };

  const handleAvtoserviceSelect = (idService) => {
    setActiveService(idService);
    setIsAvtoservice(false);
  };

  const [activeCash, setActiveCash] = useState( cash.find((cashitem) => cashitem.id === editedData.cash) || cash[0]); 
  const [isCash, setIsCash] = useState(false); // Видимость справочника
  const triggerCashRef = useRef(null);

  const toggleCashSelector = () => {
    setIsCash(!isCash);
  };

  const handleCashSelect = (idCash) => {
    setActiveCash(idCash);
    setIsCash(false);
  };


   const [activePayType, setActivePayType] = useState( paytype.find((typeitem) => typeitem.id === editedData.paytype) || cash[0]); 
  const [isPayType, setIsPayType] = useState(false); // Видимость справочника
  const triggerPayTypeRef = useRef(null);

  const togglePayTypeSelector = () => {
    setIsPayType(!isPayType);
  };

  const handlePayTypeSelect = (idPayType) => {
    setActivePayType(idPayType);
    setIsPayType(false);
  };

  return (
    <div className={css.container}>
      <BsXLg className={css.closeIcon} onClick={onClose} />
      <p className={css.title}>Надходження №</p>
      <div className={css.topsection}>
        <CarInfo
          clientName={datakp.client.client_name}
          clientPhone={datakp.client.phone}
          carImg={carImg}
          carNumber={datakp.car.car_number}
          carMake={datakp.car.make}
          carModel={datakp.car.model}
          carYear={datakp.car.year}
          vin={datakp.car.vin}
          mileage={datakp.car.mileage}
        />
        <div className={css.toprigthsection}>
          <p className={css.date}>{formattedDate}</p>
          <p className={css.link}>КП № </p>

          <div className={css.managerWrapper}>
            <BsPersonLinesFill className={css.personIcon} />
            <p className={css.mechanicText}>Менеджер:</p>
            <p className={css.mechanicName}>{datakp.manager.manager_name}</p>
          </div>

         
          <div className={css.selectWrapper}>
            <div
                    className={css.serviceDisplay}
                    ref={triggerAvtoserviceRef}
                    onClick={toggleAvtoserviceSelector} // Открываем/закрываем справочник
                  >
                    <span>{activeService.name}</span>
                    <BsFillCaretDownFill className={css.customSelectIcon}
                      style={{
                        fill: "var(--light-gray)",
                        transform: isAvtoservice
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                        // marginLeft: "4px",
                        cursor: "pointer",
                      }}
                    />
            </div>
            
            {isAvtoservice && (
              <div>
                <PopUp
                  isOpen={isAvtoservice}
                  onClose={() => setIsAvtoservice(false)}
                  service={avtoservice}
                  activeService={activeService}
                  onSelect={handleAvtoserviceSelect}
                  triggerRef={triggerAvtoserviceRef}
                  top={275}
                  left={569}
                  width={200}
                  bckgr={"var(--current-mileage-text)"}
                />

              </div>)}

            {/* <div style={{}}>
              {renderSelect(
                "avtoservice",
                editedData.avtoservice,
                avtoservice,
                160
              )}
            </div> */}

<div
                    className={css.cashDisplay}
                    ref={triggerCashRef}
                    onClick={toggleCashSelector} // Открываем/закрываем справочник
            >
              <BsCurrencyDollar className={css.dollar} /> 
                    <span>{activeCash.name}</span>
                    <BsFillCaretDownFill className={css.customSelectIcon}
                      style={{
                        fill: "var(--light-gray)",
                        transform: isCash
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                        // marginLeft: "4px",
                        cursor: "pointer",
                      }}
                    />
            </div>
            
            {isCash && (
              <div>

                  <PopUp
                  isOpen={isCash}
                  onClose={() => setIsCash(false)}
                  service={cash}
                  activeService={activeCash}
                  onSelect={handleCashSelect}
                  triggerRef={triggerCashRef}
                  top={275}
                  left={786}
                  width={120}
                  bckgr={"var(--current-mileage-text)"}
                />

              </div>)}


             {/* <div style={{}}>
              {renderSelect("cash", editedData.cash, cash, 120)}
            </div>  */}

            </div>
         
        </div>
      </div>
      <div className={css.bottomsection}>
        <div className={css.bottomfirst}>

 
            <div
                    className={css.payTypeDisplay}
                    ref={triggerPayTypeRef}
                    onClick={togglePayTypeSelector} // Открываем/закрываем справочник
                  >
                    <span>{activePayType.name}</span>
                    <BsFillCaretDownFill className={css.customSelectIcon}
                      style={{
                        fill: "var(--light-gray)",
                        transform: isPayType
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                        // marginLeft: "4px",
                        cursor: "pointer",
                      }}
                    />
            </div>
            
            {isPayType && (
            <div>
               <PopUp
                  isOpen={isPayType}
                  onClose={() => setIsPayType(false)}
                  service={paytype}
                  activeService={activePayType}
                  onSelect={handlePayTypeSelect}
                  triggerRef={triggerPayTypeRef}
                  top={378}
                  left={50}
                  width={200}
                  bckgr={"var(--current-mileage-text)"}
                />
                
              </div>)}

          {/* {renderSelect("paytype", editedData.paytype, paytype, 200)} */}
        </div>
        <div className={css.bottomsecond}>
          <div className={css.blocksecond}>
            <p className={css.titlefield}>Сума</p>
            {isEditing ? (
              <input
                ref={inputRef}
                name="sumpay"
                type="number"
                min={0}
                value={editedData.sumpay}
                onChange={handleInputChange}
                className={css.datavalue}
              />
            ) : (
              <p className={css.datavalue}>{editedData.sumpay}</p>
            )}
            <button onClick={handleEditToggle} className={css.editbtn}>
              {" "}
              <BsPencil className={css.mainIcon} />{" "}
            </button>
          </div>

          <div className={css.blocksecond}>
            <p className={css.titlefield}>Ремонт</p>

            <p className={css.datavalue}>{editedData.sumkp}</p>
          </div>
          <div className={css.blocksecond}>
            <p className={css.titlefield}>Залишок</p>

            <p className={css.datavalue}>
              {(editedData.sumpay || 0) - editedData.sumkp}
            </p>
          </div>
        </div>
        <div className={css.bottomthird}>
          <button className={css.btnPdf}>
            <BsDownload size={16} color="var(--icon-gray)" />
            <span className={css.btnPdfText}>.pdf</span>
          </button>
          <button
            className={css.btnclose}
            type="button"
            onClick={() => onClose()}
          >
            Закрити
          </button>
          <button
            className={css.btnsave}
            type="button"
            // onClick={() => }
          >
            <BsCheck className={css.iconsave} />
            Внести
          </button>
        </div>
      </div>
    </div>
  );
}
