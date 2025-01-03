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
import { useRef } from "react";
import { useEffect } from "react";

export default function ClientInfo({ clientInfo }) {
  // Client
  const client = clientInfo.client;

  const clientEmail = client?.email || "дані відсутні";
  const clientName = client?.name || "дані відсутні";
  const clientPhone = client?.phone || "дані відсутні";
  const clientBirthday = client?.date_of_birth || "дані відсутні";
  const age = new Date() - clientBirthday || "xx";
  const clientTotalSpent = client?.total_spent;
  const clientRating = client?.rating;

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    return phone;
  };

  //Car
  const cars = clientInfo.car;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNum, setPhoneNum] = useState(formatPhoneNumber(clientPhone));
  const [email, setEmail] = useState(clientEmail);
  const [tg, setTg] = useState("ivan.petrenko");
  const inputFocusRef = useRef();

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

  useEffect(() => {
    if (isEditing) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(clientEmail).then(() => {
      toast.success("Пошта успішно скопійована :)", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
    });
  };

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
              <RatingStars
                rating={clientRating}
                clientInfo={true}
                ratingGap={css.rating}
              />
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
                className={`${css.contactsInput} ${css.contactsInputPhone}`}
                ref={inputFocusRef}
              />
            ) : (
              <p className={`${css.contactsInput} ${css.contactsInputPhone}`}>
                {phoneNum}
              </p>
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
                className={`${css.contactsInput} ${css.contactsInputEmail}`}
              />
            ) : (
              <p className={`${css.contactsInput} ${css.contactsInputText}`}>
                {email}
              </p>
            )}
            <div className={css.contactsBtnBox}>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
              >
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
    </div>
  );
}
