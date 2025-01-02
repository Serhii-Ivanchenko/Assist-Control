import css from "./ClientInfo.module.css";
import { AiOutlineDollar } from "react-icons/ai";
// import { BsDownload } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { BsFiles } from "react-icons/bs";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoIosAt } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
// import { BsCalendarCheck } from "react-icons/bs";
// import { BsTrash } from "react-icons/bs";
import { BsPlusCircleDotted } from "react-icons/bs";
// import { IoStarSharp } from "react-icons/io5";
// import flag from "../../assets/images/flagUa.webp";
import toast from "react-hot-toast";
import { BsAlarm } from "react-icons/bs";
// import absentAutoImg from "../../assets/images/absentAutoImg.webp";
import { useState } from "react";
import Modal from "../Modals/Modal/Modal";
import NotificationModal from "../sharedComponents/NotificationModal/NotificationModal";
import { BsPencil } from "react-icons/bs";
import avatar_default from "../../assets/images/avatar_default.png";
import { RiSave3Fill } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import RatingStars from "../sharedComponents/RatingStars/RatingStars";
import CarsList from "./CarsList/CarsList";

export default function ClientInfo({ clientInfo }) {
  // Client
  const client = clientInfo.client;

  const clientEmail = client?.email || "xxxxxxxxxxxxx";
  const clientName = client?.name || "XXXXXXXX";
  const clientPhone = client?.phone || "xxxxxxxxxx";
  const clientBirthday = client?.date_of_birth || "xxxxxxxx";
  const age = new Date() - clientBirthday || "xx";
  const clientTotalSpent = client?.total_spent;
  const clientRating = client?.rating;

  //Car
  const cars = clientInfo.car;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNum, setPhoneNum] = useState(clientPhone);
  const [email, setEmail] = useState(clientEmail);
  const [tg, setTg] = useState("ivan.petrenko");

  const handleChangePN = (e) => {
    setPhoneNum(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeTg = (e) => {
    setTg(e.target.value);
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ivan.petrenko@gmail.com").then(() => {
      toast.success("Пошта успішно скопійована :)", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
    });
  };

  // const handleCopyVin = () => {
  //   navigator.clipboard.writeText("VW8795218794H46J").then(() => {
  //     toast.success("VIN-код успішно скопійований :)", {
  //       position: "top-right",
  //       duration: 5000,
  //       style: {
  //         background: "var(--bg-input)",
  //         color: "var(--white)FFF",
  //       },
  //     });
  //   });
  // };

  return (
    <div className={css.clientInfoBox}>
      <p className={css.title}>Інформація про клієнта та автомобіль</p>

      <div className={css.infoBox}>
        <div className={css.photoAndMainInfo}>
          <img
            src={avatar_default}
            alt="Client's Photo"
            className={css.clientImg}
          />

          <div className={css.mainInfo}>
            <div className={css.ratingAndMoney}>
              {/* <div className={css.rating}>
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-white)" size={18} />
              </div> */}
              <RatingStars rating={clientRating} />
              <div className={css.moneyBox}>
                <AiOutlineDollar className={css.dollarIcon} />
                <p className={css.moneyAmount}>{clientTotalSpent}</p>
              </div>
            </div>

            <div className={css.nameAndEditBox}>
              <p className={css.clientName}>{clientName}</p>
              {isEditing ? (
                <button
                  type="button"
                  className={css.btnSave}
                  onClick={handleEditing}
                >
                  <RiSave3Fill size={19} className={css.pencilIcon} />
                </button>
              ) : (
                <button
                  type="button"
                  className={css.editBtn}
                  onClick={handleEditing}
                >
                  <BsPencil size={16} className={css.pencilIcon} />
                </button>
              )}
            </div>

            <p className={css.dateOfBirth}>
              {clientBirthday} ({age} р.)
            </p>
            <div className={css.legalInfo}>
              <p className={css.lIText}>Юридична інформація</p>
              <button type="button" className={css.editBtn}>
                <BsEyeFill size={16} className={css.pencilIcon} />
              </button>
              <button type="button" className={css.editBtn}>
                <BsPencil size={16} className={css.pencilIcon} />
              </button>
              {/* <a href="" download="">
                <button className={css.sbBtn}>
                  <BsDownload className={css.downloadIcon} />
                  .pdf
                </button>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className={css.contactsBox}>
        <ul className={css.categoryList}>
          <li className={css.categoryListItem}>
            <BsTelephone className={css.categoryIcon} />
            <p className={css.category}>Tel</p>
          </li>
          <li className={css.categoryListItem}>
            <BsEnvelope className={css.categoryIcon} />
            <p className={css.category}> E-mail</p>
          </li>
          <li className={css.categoryListItem}>
            <PiTelegramLogoLight className={css.categoryIcon} />
            <p className={css.category}> Telegram</p>
          </li>
        </ul>

        <ul className={css.contactsInfo}>
          <li className={css.contactsInfoItem}>
            {isEditing ? (
              <input
                type="text"
                value={phoneNum}
                onChange={handleChangePN}
                className={css.contactsInput}
              />
            ) : (
              <p className={css.contactsInput}>{phoneNum}</p>
            )}
            <div className={css.contactsBtnBox}>
              <a href={`tel:${phoneNum}`}>
                <button type="button" className={css.contactsBtn}>
                  <BsTelephoneOutboundFill className={css.phoneCallIcon} />
                </button>
              </a>
              <button
                type="button"
                className={css.contactsBtn}
                onClick={openModal}
              >
                <BsAlarm className={css.clock} size={18} />
              </button>
              {modalIsOpen && (
                <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                  <NotificationModal
                    onClose={handleModalClose}
                    time="clientTime"
                    date="clientDate"
                    comment="clientComment"
                    connectionType="clientConnection"
                    // accountingModal={true}
                    // service="clientService"
                  />
                </Modal>
              )}
            </div>
          </li>

          <li className={css.contactsInfoItem}>
            {isEditing ? (
              <input
                type="text"
                value={email}
                onChange={handleChangeEmail}
                className={css.contactsInput}
              />
            ) : (
              <p className={css.contactsInput}>{email}</p>
            )}
            <div className={css.contactsBtnBox}>
              <a href={`mailto:${email}`} target="_blank">
                <button type="button" className={css.contactsBtn}>
                  <IoIosAt className={css.iconColor} size={25} />
                </button>
              </a>
              <button
                type="button"
                className={css.contactsBtn}
                onClick={handleCopyEmail}
              >
                <BsFiles className={css.iconColor} size={18} />
              </button>
            </div>
          </li>

          <li className={css.contactsInfoItem}>
            {isEditing ? (
              <input
                type="text"
                value={tg}
                onChange={handleChangeTg}
                className={css.contactsInput}
              />
            ) : (
              <p className={css.contactsInput}>{tg}</p>
            )}
            <a href={`https://t.me/${tg}`} target="_blank">
              <button type="button" className={css.contactsBtn}>
                <PiTelegramLogoLight className={css.iconColor} size={22} />
              </button>
            </a>
          </li>
        </ul>
      </div>

      <div className={css.carListAndAddBtn}>
        <ul className={css.carInfo}>
          {Array.isArray(cars) ? (
            cars.map((car) => <CarsList car={car} key={car?.id} />)
          ) : (
            <CarsList car={cars} />
          )}
        </ul>
        <button type="button" className={css.addCarBtn}>
          <BsPlusCircleDotted className={css.plus} />
          <IoCarSport className={css.carIcon} size={20} />
        </button>
      </div>

      {/* Cars */}

      {/* <div className={css.carListAndAddBtn}>
        <ul className={css.carInfo}>
          {Array.isArray ? (
            cars.map((car, index) => (
              <li key={index} className={css.carCard}>
                <div className={css.mainContent}>
                  <div className={css.photoAndMainCarInfo}>
                    <img
                      src={absentAutoImg}
                      alt="Car's Image"
                      className={css.carImage}
                    />

                    <div className={css.mainCarInfo}>
                      <div className={css.modelAndYear}>
                        <div className={css.carNameBox}>
                          <IoCarSport className={css.carIcon} size={30} />
                          <p className={css.carName}>HONDA CIVIC</p>
                        </div>

                        <div className={css.carYearBox}>
                          <BsCalendarCheck className={css.yearIcon} />
                          <p className={css.carYear}>2001 </p>
                        </div>
                      </div>

                      <div className={css.serviceBook}>
                        <p className={css.sbText}>Сервісна книга</p>
                        <a href="" download="">
                          <button className={css.sbBtn}>
                            <BsDownload className={css.downloadIcon} />
                            .pdf
                          </button>
                        </a>
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
                        <p className={css.vin}>VW8795218794H46J</p>
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
                          <p className={css.carRegNumber}>CA 6864 CO</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <BsTrash className={css.deleteBtn} />
              </li>
            ))
          ) : (
            <li className={css.carCard}>
              <div className={css.mainContent}>
                <div className={css.photoAndMainCarInfo}>
                  <img
                    src={absentAutoImg}
                    alt="Car's Image"
                    className={css.carImage}
                  />

                  <div className={css.mainCarInfo}>
                    <div className={css.modelAndYear}>
                      <div className={css.carNameBox}>
                        <IoCarSport className={css.carIcon} size={30} />
                        <p className={css.carName}>HONDA CIVIC</p>
                      </div>

                      <div className={css.carYearBox}>
                        <BsCalendarCheck className={css.yearIcon} />
                        <p className={css.carYear}>2001 </p>
                      </div>
                    </div>

                    <div className={css.serviceBook}>
                      <p className={css.sbText}>Сервісна книга</p>
                      <a href="" download="">
                        <button className={css.sbBtn}>
                          <BsDownload className={css.downloadIcon} />
                          .pdf
                        </button>
                      </a>
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
                      <p className={css.vin}>VW8795218794H46J</p>
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
                        <p className={css.carRegNumber}>CA 6864 CO</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <BsTrash className={css.deleteBtn} />

            </li>
          )}
        </ul>
        <button type="button" className={css.addCarBtn}>
          <BsPlusCircleDotted className={css.plus} />
          <IoCarSport className={css.carIcon} size={20} />
        </button>
      </div> */}
    </div>
  );
}

{
  /* <ul className={css.contactsList}>
                    <li className={css.contactsListItem}>
                        <p className=""> <BsTelephone /> Tel</p>
                        <input className="" value="+38 073 329 12 17"/>
                    </li>
                    <li className={css.contactsListItem}>
                        <p className=""> <BsEnvelope /> E-mail</p>
                        <input className="" value="ivan.petrenko@gmail.com"/>
                    </li>
                    <li className={css.contactsListItem}>
                        <p className=""> <PiTelegramLogoLight /> Telegram</p>
                        <input className="" value="ivan.petrenko"/>
                    </li>
                </ul>*/
}
