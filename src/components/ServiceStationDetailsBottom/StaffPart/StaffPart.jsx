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
  // const baseUrl = "https://aps.assist.cam/developers#";

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
  const employees = useSelector(selectEmployees);
  // const [members, setMembers] = useState([]);
  console.log("employees", employees);
  // const imgSrc = baseUrl / member.logo;

  // useEffect(() => {
  //   if (employees && employees.length > 0) {
  //     setMembers(employees);
  //   }
  // }, [employees]);

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
      <div className={css.divForScroll}>
        <ul className={css.teamList}>
          {employees.map((member, index) => (
            <li key={index} className={css.teamListItem}>
              <div className={css.contentBox}>
                <div className={css.memberPhoto}>
                  <img
                    src={member.logo || avatar}
                    alt={`user's photo`}
                    className={css.particularMemberPhoto}
                  />
                </div>
                {/* {console.log(`${baseUrl}/${member.logo}`)} */}
                <div className={css.nameBox}>
                  <p className={css.memberName}>{member.name}</p>
                  <p className={css.memberEmail}> {member.role}</p>
                </div>
              </div>

              <RatingStars
                rating={member.rating}
                ratingGap={css.ratingGap}
              />

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
