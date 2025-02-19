import css from "./StaffPart.module.css";
import avatar from "../../../assets/images/avatar_default.png";
import { BsPlusLg } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
// import AddTeamMember from "../../Modals/UserSettingsModal/AddTeamMember/AddTeamMember.jsx"
// import { IoStarSharp } from "react-icons/io5";
// import { useRef } from "react";
import AddStaffMemberModal from "../../Modals/AddStaffMemberModal/AddStaffMemberModal.jsx";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../sharedComponents/RatingStars/RatingStars.jsx";
import { useDispatch } from "react-redux";
import {
  deleteEmployee,
  getAllEmployees,
  updateEmployeeStatus,
} from "../../../redux/settings/operations.js";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../../redux/settings/selectors.js";
import toast from "react-hot-toast";
// import { BsFillCaretDownFill } from "react-icons/bs";
// import clsx from "clsx";
// import { Phone } from "@mui/icons-material";

export default function StaffPart() {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const isFirstDataLoad = useRef(true);
  const scrollToTheLastItemRef = useRef();
  const [staffLength, setStaffLength] = useState(employees.length);

  console.log("employees", employees);

  const [updatedPhotos, setUpdatedPhotos] = useState({});

  useEffect(() => {
    if (employees.length > 0) {
      const newPhotos = {};
      employees.forEach((member) => {
        newPhotos[member.id] = member.logo
          ? `${member.logo}?t=${Date.now()}`
          : avatar;
      });
      setUpdatedPhotos(newPhotos);
    }
  }, [employees]);

  useEffect(() => {
    if (isFirstDataLoad.current && employees.length > 0) {
      isFirstDataLoad.current = false;
      setStaffLength(employees.length);
      return;
    }

    if (employees.length > staffLength) {
      requestAnimationFrame(() => {
        scrollToTheLastItemRef.current?.scrollTo({
          top: scrollToTheLastItemRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    setStaffLength(employees.length);
  }, [employees, staffLength]);

  const toDisable = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    dispatch(updateEmployeeStatus({ employee_id: id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success("Статус успішно змінено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openEditModal = (employee) => {
    console.log("Opening modal for employee:", employee);
    setCurrentEmployee(employee);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setCurrentEmployee(null);
    setIsOpen(false);
  };

  // const deleteMember = (id) => {
  //   dispatch(deleteEmployee(id))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(getAllEmployees())
  //         .then(() => {
  //           toast.success("Успішно видалено :)", {
  //             position: "top-center",
  //             duration: 3000,
  //             style: {
  //               background: "var(--bg-input)",
  //               color: "var(--white)FFF",
  //             },
  //           });
  //         })
  //         .catch((error) => {
  //           console.error("Error updating user data:", error);
  //           toast.error("Щось пішло не так :(", {
  //             position: "top-center",
  //             duration: 3000,
  //             style: {
  //               background: "var(--bg-input)",
  //               color: "var(--white)FFF",
  //             },
  //           });
  //         });
  //     });
  // };

  const deleteMember = (id) => {
    dispatch(deleteEmployee(id))
      .unwrap()
      .then(() => {
        toast.success("Успішно видалено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
  };

  return (
    <div className={css.StaffPart}>
      <div className={css.divForScroll} ref={scrollToTheLastItemRef}>
        <ul className={css.teamList}>
          {employees.map((member, index) => (
            <li key={index} className={css.teamListItem}>
              <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                  <img
                    src={updatedPhotos[member.id] || avatar}
                    alt={`user's photo`}
                    className={css.particularMemberPhoto}
                  />
                </div>
                <div className={css.nameBox}>
                  <p className={css.memberName}>{member.name}</p>
                  <p className={css.memberEmail}> {member.role}</p>
                </div>
              </div>

              <RatingStars rating={member.rating} ratingGap={css.ratingGap} />

              <p className={css.memberRole}> {member.phone} </p>

              <div className={css.containerForBtn}>
                <SwitchableBtns
                  onEdit={() => openEditModal(employees[index])}
                  onToggleDisable={() => toDisable(member.id, member.status)}
                  onDelete={() => deleteMember(member.id)}
                  isDisabled={member.status}
                  showIconSave={true}
                  id={index}
                  text={`працівника ${member.name}`}
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
