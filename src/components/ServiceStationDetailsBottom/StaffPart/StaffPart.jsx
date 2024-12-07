import css from "./StaffPart.module.css";
import avatar from "../../../assets/images/avatar_default.png";
import { BsPlusLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import Modal from "../../Modals/Modal/Modal";
// import AddTeamMember from "../../Modals/UserSettingsModal/AddTeamMember/AddTeamMember.jsx"
import { IoStarSharp } from "react-icons/io5";
import { useRef } from "react";
import AddStaffMemberModal from "../../Modals/AddStaffMemberModal/AddStaffMemberModal.jsx";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns.jsx";

export default function StaffPart() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([
    {
      name: "Максим Коваленко",
      role: "Власник",
      salary: "20000 + 7%",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Кухарка",
      salary: "15000 + 5%",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Механік",
      salary: "40 % ВР",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Механік",
      salary: "40 % ВР",
      isDisabled: false,
    },
    {
      name: "Максим Коваленко",
      role: "Механік",
      salary: "40 % ВР",
      isDisabled: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
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

                {isEditing === index ? (
                  <div className={`${css.nameBox} ${css.inputBox}`}>
                    <input
                      type="text"
                      className={css.input}
                      ref={inputFocusRef}
                      value={member.name}
                      onChange={(e) => handleChangeMN(index, e.target.value)}
                    />
                    <input
                      type="text"
                      className={css.input}
                      value={member.role}
                      onChange={(e) => handleChangeMR(index, e.target.value)}
                    />
                  </div>
                ) : (
                  <div className={css.nameBox}>
                    <p className={css.memberName}>{member.name}</p>
                    <p className={css.memberEmail}> {member.role}</p>
                  </div>
                )}
              </div>

              <div className={css.rating}>
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-orange)" size={18} />
                <IoStarSharp color="var(--star-white)" size={18} />
              </div>

              {/* {isEditing === index ? (<select onChange={(e)=>handleChangeMR(index, e.target.value)} className={css.select}>
                        <option value="Власник">Власник</option>
                        <option value="Перегляд">Перегляд</option>
                        <option value="Адміністратор">Адміністратор</option>
</select>): (<p className={css.memberRole}> {member.role} </p>)} */}

              <p className={css.memberRole}> {member.salary} </p>

              <SwitchableBtns
                onEdit={() => handleEditing(index)}
                onToggleDisable={() => toDisable(index)}
                onDelete={() => deleteMember(index)}
                isDisabled={member.isDisabled}
                showIconSave={true}
                id={index}
                isEditing={isEditing}
              />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className={css.addBtn} onClick={openModal}>
        <span className={css.plus}>
          <BsPlusLg className={css.iconPlus} />
        </span>
        Додати користувача
      </button>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
          <AddStaffMemberModal onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}
