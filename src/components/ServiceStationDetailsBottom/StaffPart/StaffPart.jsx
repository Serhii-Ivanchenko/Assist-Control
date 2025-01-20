import css from "./StaffPart.module.css";
import avatar from "../../../assets/images/avatar_default.png";
import { BsPlusLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
// import AddTeamMember from "../../Modals/UserSettingsModal/AddTeamMember/AddTeamMember.jsx"
// import { IoStarSharp } from "react-icons/io5";
// import { useRef } from "react";
import AddStaffMemberModal from "../../Modals/AddStaffMemberModal/AddStaffMemberModal.jsx";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../sharedComponents/RatingStars/RatingStars.jsx";
// import { useDispatch } from "react-redux";
// import { getAllEmployees } from "../../../redux/settings/operations.js";
// import { useSelector } from "react-redux";
// import { selectEmployees } from "../../../redux/settings/selectors.js";
// import { BsFillCaretDownFill } from "react-icons/bs";
// import clsx from "clsx";
// import { Phone } from "@mui/icons-material";

export default function StaffPart() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await dispatch(getAllEmployees()).unwrap();
  //     } catch (error) {
  //       console.error("Помилка завантаження даних:", error);
  //     }
  //   };
  //   fetchData();
  // }, [dispatch]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  // const employees = useSelector(selectEmployees);
  const [members, setMembers] = useState(
    // []
    [
      {
        name: "Максим Коваленко",
        role: "Власник",
        phone: "+38 (073) 329 12 12",
        isDisabled: false,
      },
      {
        name: "Максим Коваленко",
        role: "Кухар",
        phone: "+38 (073) 329 42 42",
        isDisabled: false,
      },
      {
        name: "Максим Коваленко",
        role: "Механік",
        phone: "+38 (073) 329 52 52",
        isDisabled: false,
      },
      {
        name: "Максим Коваленко",
        role: "Механік",
        phone: "+38 (073) 329 62 62",
        isDisabled: false,
      },
      {
        name: "Максим Коваленко",
        role: "Механік",
        phone: "+38 (073) 329 12 12",
        isDisabled: false,
      },
    ]
  );
  // console.log("members", employees);

  // useEffect(() => {
  //   if (employees && employees.length > 0) {
  //     setMembers(employees);
  //   }
  // }, [employees]);

  const toDisable = (index) => {
    setMembers(
      members.map((member, i) =>
        i === index ? { ...member, isDisabled: !member.isDisabled } : member
      )
    );
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openEditModal = (employee) => {
    // console.log("Opening modal for employee:", employee);
    setCurrentEmployee(employee);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setCurrentEmployee(null);
    setIsOpen(false);
  };

  const deleteMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  return (
    <div className={css.StaffPart}>
      <div className={css.divForScroll}>
        <ul className={css.teamList}>
          {members.map((member, index) => (
            <li key={index} className={css.teamListItem}>
              <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                  <img
                    src={avatar}
                    alt={`user's photo`}
                    className={css.particularMemberPhoto}
                  />
                </div>

                <div className={css.nameBox}>
                  <p className={css.memberName}>{member.name}</p>
                  <p className={css.memberEmail}> {member.role}</p>
                </div>
              </div>

              <RatingStars rating={5} ratingGap={css.ratingGap} />

              <p className={css.memberRole}> {member.phone} </p>

              <div className={css.containerForBtn}>
                <SwitchableBtns
                  onEdit={() => openEditModal(members[index])}
                  onToggleDisable={() => toDisable(index)}
                  onDelete={() => deleteMember(index)}
                  isDisabled={member.isDisabled}
                  showIconSave={true}
                  id={index}
                  // isEditing={isEditing}
                  // onRepeal={() => handleRepeal(index)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className={css.addBtn} onClick={openModal}>
        <span className={css.plus}>
          <BsPlusLg className={css.iconPlus} />
        </span>
        Додати працівника
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <AddStaffMemberModal
            onClose={handleModalClose}
            employeeInfo={currentEmployee}
          />
        </Modal>
      )}
    </div>
  );
}
