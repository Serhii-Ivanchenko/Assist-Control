import css from "./StaffPart.module.css";
import avatar from "../../../assets/images/avatar_default.png";
import { BsPlusLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
// import AddTeamMember from "../../Modals/UserSettingsModal/AddTeamMember/AddTeamMember.jsx"
// import { IoStarSharp } from "react-icons/io5";
import { useRef } from "react";
import AddStaffMemberModal from "../../Modals/AddStaffMemberModal/AddStaffMemberModal.jsx";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";
import RatingStars from "../../sharedComponents/RatingStars/RatingStars.jsx";
import { BsFillCaretDownFill } from "react-icons/bs";
import clsx from "clsx";
// import { Phone } from "@mui/icons-material";

export default function StaffPart() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([
    {
      name: "Максим Коваленко",
      role: "Власник",
      phone: "+38 (073) 329 12 12",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Кухарка",
      phone: "+38 (073) 329 12 12",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Механік",
      phone: "+38 (073) 329 12 12",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Механік",
      phone: "+38 (073) 329 12 12",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Механік",
      phone: "+38 (073) 329 12 12",
      isDisabled: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editedValue, setEditedValue] = useState({});

  // const selectRef = useRef(null);

  const inputFocusRef = useRef();

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

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleChangeMN = (index, newName) => {
    setMembers(
      members.map((member, i) =>
        i === index ? { ...member, name: newName } : member
      )
    );
  };

  //  const handleChangeME = (index, newEmail) => {
  //      setMembers(members.map((member, i) => i === index ? { ...member, email: newEmail } : member));
  // }

  const handleChangeMR = (index, newRole) => {
    setMembers(
      members.map((member, i) =>
        i === index ? { ...member, role: newRole } : member
      )
    );
  };

  const handleEditing = (index) => {
    const memberToEdit = members[index];
    setEditedValue({ ...memberToEdit, index });
    setIsEditing(isEditing === index ? null : index);
  };

  useEffect(() => {
    if (isEditing !== null && inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const deleteMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const toggleDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  const handleRepeal = () => {
    if (editedValue && editedValue.index !== undefined) {
      setMembers(
        members.map((member, index) =>
          index === editedValue.index
            ? { ...member, name: editedValue.name }
            : member
        )
      );
      // setIsEditing(null);
    }
  };

  return (
    <div className={css.StaffPart} onBlur={handleBlur}>
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

                {isEditing === index ? (
                  <div className={`${css.nameBox} ${css.inputBox}`}>
                    <input
                      type="text"
                      className={css.input}
                      ref={inputFocusRef}
                      value={member.name}
                      onChange={(e) => handleChangeMN(index, e.target.value)}
                    />
                    <div className={css.SelectAndArrowBox}>
                      <select
                        type="text"
                        className={`${css.input} ${css.select}`}
                        value={member.role}
                        onChange={(e) => handleChangeMR(index, e.target.value)}
                        onClick={toggleDropdown}
                      >
                        <option value="Працівник">Працівник</option>
                        <option value="Механік">Механік</option>
                        <option value="Прибиральниця">Прибиральниця</option>
                      </select>
                      <BsFillCaretDownFill
                        className={clsx(css.arrow, {
                          [css.rotated]: activeDropdown,
                        })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={css.nameBox}>
                    <p className={css.memberName}>{member.name}</p>
                    <p className={css.memberEmail}> {member.role}</p>
                  </div>
                )}
              </div>

              <RatingStars rating={5} ratingGap={css.ratingGap} />

              {/* {isEditing === index ? (<select onChange={(e)=>handleChangeMR(index, e.target.value)} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {member.role} </p>)} */}
              <p className={css.memberRole}> {member.phone} </p>

              <div className={css.containerForBtn}>
                <SwitchableBtns
                  onEdit={() => handleEditing(index)}
                  onToggleDisable={() => toDisable(index)}
                  onDelete={() => deleteMember(index)}
                  isDisabled={member.isDisabled}
                  showIconSave={true}
                  id={index}
                  isEditing={isEditing}
                  onRepeal={() => handleRepeal(index)}
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
          <AddStaffMemberModal onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}
