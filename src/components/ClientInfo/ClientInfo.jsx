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
import AddAutoServiceModal from "../Modals/AddAutoServiceModal/AddAutoServiceModal";
import AddCarModal from "../Modals/AddCarModal/AddCarModal";
import { FiPlus } from "react-icons/fi";
import AddNewClientModal from "../Modals/AddNewClientModal/AddNewClientModal.jsx";
import ClientOrganizationInfo from "../Modals/ClientInfo/ClientOrganizationInfo/ClientOrganizationInfo.jsx";
import ClientPersonInfo from "../Modals/ClientInfo/ClientPersonInfo/ClientPersonInfo.jsx";

export default function ClientInfo({ clientInfo,car }) {
  console.log(car);
  
  // Client
  const client = clientInfo.client;

  const clientEmail = client?.email || "дані відсутні";
  const clientName = client?.name || "дані відсутні";
  const clientPhone = client?.phone || "дані відсутні";
  const clientTg = client?.telegram || "дані відсутні";
  const clientBirthday = client?.date_of_birth;
  const age = new Date() - clientBirthday;
  const clientTotalSpent = client?.total_spent;
  const clientRating = client?.rating;
  const clientId = client?.id || "";

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
  const [tg, setTg] = useState(clientTg);
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

  const [detailedInfoModalIsOpen, setDetailedInfoModalIsOpen] = useState(false);

  const openDetailedInfoModal = () => {
    setDetailedInfoModalIsOpen(true);
  };

  const handleDetailedInfoModalClose = () => {
    setDetailedInfoModalIsOpen(false);
  };

  const [addCarModalOpen, setAddCarModalOpen] = useState(false);

  const openAddCarModal = () => {
    setAddCarModalOpen(true);
  };

  const handleAddCarModalClose = () => {
    setAddCarModalOpen(false);
  };

  const [addClientModalOpen, setAddClientModalOpen] = useState(false);

  const openAddClientModal = () => {
    setAddClientModalOpen(true);
  };

  const handleAddClientModalClose = () => {
    setAddClientModalOpen(false);
  };

  const [clientInfoModalOpen, setClientInfoModalOpen] = useState(false);

  const openClientInfoModal = () => {
    setClientInfoModalOpen(true);
  };

  const handleClientInfoModalClose = () => {
    setClientInfoModalOpen(false);
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
                ratingGap={css.rating}
              />
              <div className={css.moneyBox}>
                <AiOutlineDollar className={css.dollarIcon} />
                <p className={css.moneyAmount}>{clientTotalSpent}</p>
              </div>
            </div>

            <div className={css.nameAndEditBox}>
              <p className={css.clientName}>{clientName}</p>
              {clientId === "" ? (
                <button className={css.addBtn} onClick={openAddClientModal}>
                  <FiPlus className={css.plusIcon} size={24} />
                </button>
              ) : isEditing ? (
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
            {clientBirthday ? (
              <p className={css.dateOfBirth}>
                {clientBirthday} ({age} р.)
              </p>
            ) : (
              <p className={css.dateOfBirth}>данні відсутні</p>
            )}

            <div className={css.legalInfo}>
              <p className={css.lIText}>Юридична інформація</p>
              <button
                type="button"
                className={css.editBtn}
                onClick={openClientInfoModal}

                // onClick={() => {
                //   openDetailedInfoModal(), notEditInfo();
                // }}
              >
                <BsEyeFill
                  size={16}
                  className={css.pencilIcon}
                  // onClick={openClientInfoModal}
                />
              </button>
              <button
                type="button"
                className={css.editBtn}
                onClick={() => {
                  openDetailedInfoModal();
                }}
              >
                <BsPencil size={16} className={css.pencilIcon} />
              </button>
              {detailedInfoModalIsOpen && (
                <Modal
                  isOpen={detailedInfoModalIsOpen}
                  onClose={handleDetailedInfoModalClose}
                >
                  <AddAutoServiceModal
                    onClose={handleDetailedInfoModalClose}
                    createClient={true}
                  />
                </Modal>
              )}
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
                className={`${css.contactsInput} ${css.contactsInputActive}`}
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
                    // nextService="clientNextService"
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
                className={`${css.contactsInput} ${css.contactsInfoItemTg}`}
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
            cars.map((car) => <CarsList car={car} key={car?.car_id} />)
          ) : (
            <CarsList car={cars} />
          )}
        </ul>
        <button
          type="button"
          className={css.addCarBtn}
          onClick={openAddCarModal}
        >
          <BsPlusCircleDotted className={css.plus} />
          <IoCarSport className={css.carIcon} size={20} />
        </button>
        {addCarModalOpen && (
          <Modal isOpen={addCarModalOpen} onClose={handleAddCarModalClose}>
            <AddCarModal onClose={handleAddCarModalClose} />
          </Modal>
        )}
        {addClientModalOpen && (
          <Modal
            isOpen={addClientModalOpen}
            onClose={handleAddClientModalClose}
          >
            <AddNewClientModal onClose={handleAddClientModalClose} />
          </Modal>
        )}

        {clientInfoModalOpen && (
          <Modal
            isOpen={clientInfoModalOpen}
            onClose={handleClientInfoModalClose}
          >
            <ClientPersonInfo onClose={handleClientInfoModalClose} />
          </Modal>
        )}
      </div>
    </div>
  );
}
