import css from "./RightSection.module.css";
import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  AccordionActions,
  Button,
} from "@mui/material";

import ChatAvto from "./ChatAvto/ChatAvto.jsx";
import ChatFiles from "./ChatFiles/ChatFiles.jsx";
import ChatHistoryChange from "./ChatHistoryChange/ChatHistoryChange.jsx";
import ChatTags from "./ChatTags/ChatTags.jsx";
import ChatSample from "./ChatSample/ChatSample.jsx";
import ChatNotes from "./ChatNotes/ChatNotes.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ava from "../../../assets/images/ava1.png";
import ava1 from "../../../assets/images/avatar_default.png";
import { BsFiles, BsAlarm, BsTelephone, BsThreeDots } from "react-icons/bs";
import { RiUserSharedFill, RiUserAddFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";

import { BsPencil, BsXCircle } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import Modal from "../../Modals/Modal/Modal.jsx";
import NotificationModal from "../../sharedComponents/NotificationModal/NotificationModal.jsx";
import SearchTags from "./ChatTags/SearchTags/SearchTags.jsx";
import { tags } from "../RightSection/ChatTags/tags.js";
import PhoneModal from "./PopUp/PhoneModal/PhoneModal.jsx";
import StaffModal from "./PopUp/StaffModal/StaffModal.jsx";
import CategoryModal from "./PopUp/CategoryModal/CategoryModal.jsx";
import ActionModal from "./PopUp/ActionModal/ActionModal.jsx";
import clsx from "clsx";

const data = {
  id: 1,
  name: "Олександр Мельник",
  avatar: ava,
  phonenum: "0733291217",
  status: "Новий",
  phonenums: ["0675432109", "0502345678", "0733291217"],
};

export default function RightSection() {
  const [expanded, setExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isEditing, setIsEditing] = useState([]);
  const chatAvtoRef = useRef(null);
  const chatNotesRef = useRef(null);

  const [filters, setFilters] = useState(["", ""]);
  const [activeFilters, setActiveFilters] = useState([false, false]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRowClick = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEditToggle = (panel) => {
    setIsEditing((prev) =>
      prev.includes(panel) ? prev.filter((p) => p !== panel) : [...prev, panel]
    );
  };

  const handleCancelEdit = (panel) => {
    setIsEditing((prev) => prev.filter((p) => p !== panel));
    if (panel === "panel1" && chatAvtoRef.current) {
      chatAvtoRef.current.resetData();
    } else if (panel === "panel4" && chatNotesRef.current) {
      chatNotesRef.current.resetData();
    }
    console.log(`Редактирование панели "${panel}" отменено.`);
  };

  const handleSaveEdit = (panel) => {
    setIsEditing((prev) => prev.filter((p) => p !== panel));
    if (panel === "panel1" && chatAvtoRef.current) {
      chatAvtoRef.current.saveData();
    } else if (panel === "panel4" && chatNotesRef.current) {
      chatNotesRef.current.saveData();
    }
    console.log(`Изменения панели "${panel}" сохранены.`);
  };

  const handleCopy = async () => {
    try {
      const plainNumber = data.phonenum.replace(/\s/g, "");
      await navigator.clipboard.writeText(plainNumber);
      toast.success("Номер телефону успішно скопійовано", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
    } catch (err) {
      toast.success("Не вдалось скопіювати номер телефону :(", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "var(--bg-input)",
          color: "var(--white)FFF",
        },
      });
      console.error("Не удалось скопировать текст: ", err);
    }
  };

  const formatPhoneNumber = (number) => {
    return number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
  };

  //*TagsPart start*//
  const [tagsArr, setTagsArr] = useState(tags);
  const [checkedTagsIdArray, setCheckedTagsIdArray] = useState([]);

  const [isSearchTagModalOpen, setIsSearchTagModalOpen] = useState(false);

  const handlePlusBtnClick = (e) => {
    e.stopPropagation();
    setIsSearchTagModalOpen(true);
  };

  const handleCloseSearchTagModal = () => {
    setIsSearchTagModalOpen(false);
  };

  useEffect(() => {
    let checkedTagsById = [];

    tagsArr.map((item) => {
      if (item.isChecked === true) {
        checkedTagsById.push(item.id);
      }
    });
    setCheckedTagsIdArray(checkedTagsById);
  }, [tagsArr]);

  //*TagsPart finish*//

  const handleFilterToggle = (index) => (e) => {
    e.stopPropagation(); // Остановить всплытие события
    const newActiveFilters = [...activeFilters];
    newActiveFilters[index] = !activeFilters[index];
    setActiveFilters(newActiveFilters);

    if (!newActiveFilters[index]) {
      const newFilters = [...filters];
      newFilters[index] = ""; // Сброс фильтра при отключении
      setFilters(newFilters);
    }
  };

  const handleFilterChange = (index) => (e) => {
    const newFilters = [...filters];
    newFilters[index] = e.target.value;
    setFilters(newFilters);
  };

  const categories = [
    { categ: 1, fullname: "Нові шаблони", shortname: "Нові" },
    { categ: 2, fullname: "Запис на послуги", shortname: "Запис" },
    { categ: 3, fullname: "Інформація про послуги", shortname: "Послуги" },
    { categ: 4, fullname: "Повідомлення про затримки", shortname: "Затримка" },
    { categ: 5, fullname: "Подяка", shortname: "Подяка" },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]); // Выбрана первая категория по умолчанию
  const [isCategory, setIsCategory] = useState(false); // Видимость справочника
  const triggerCategoryRef = useRef(null);

  const toggleCategorySelector = () => {
    setIsCategory(!isCategory);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setIsCategory(false);
  };

  // width change if isScrolled * start
  const wrapperRef = useRef(null); // Ссилка на контейнер
  const [isScrolled, setIsScrolled] = useState(false); // Стан для перевірки наявності скролу

  useEffect(() => {
    const checkScrollbar = () => {
      if (wrapperRef.current) {
        const container = wrapperRef.current;
        const scrollbarVisible =
          container.scrollHeight > container.clientHeight;
        setIsScrolled((prev) => {
          if (prev !== scrollbarVisible) {
            return scrollbarVisible;
          }
          return prev; // Избегаем лишнего рендеринга
        });
      }
    };

    // Используем ResizeObserver для изменения размеров контейнера
    const resizeObserver = new ResizeObserver(checkScrollbar);
    const mutationObserver = new MutationObserver(checkScrollbar); // Для добавления/удаления контента

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
      mutationObserver.observe(wrapperRef.current, {
        childList: true,
        subtree: true,
      });
    }

    checkScrollbar(); // Выполняем проверку сразу при монтировании

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
  // width change if isScrolled * end

  const actions = [
    { id: 1, action: "add", fullname: "Додати шаблон" },
    { id: 2, action: "edit", fullname: "Змінити шаблон" },
    { id: 3, action: "delete", fullname: "Видалити шаблон" },
    { id: 4, action: "", fullname: "Закрити" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "add", "edit", "delete"
  const triggerActionRef = useRef(null);
  const handleOpenModal = (type) => {
    setActionType(type);
    setModalOpen(!modalOpen);
  };

  const handleActionChange = (value) => {
    setActionType(value);
    setModalOpen(false);
  };

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const buttonRef = useRef(null);
  const makeCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handlePhoneClick = () => {
    // if (!data.phonenums.includes(data.phonenum)) {
    //   data.phonenums.push(data.phonenum);
    // };
    if (data.phonenums.length === 0) {
      setIsPhoneModalOpen(false);
    } else {
      setIsPhoneModalOpen((prevState) => !prevState);
    }
  };

  const staffs = [
    {
      id: 1,
      name: "Катерина Матяш",
      email: "kate@avtoatmosfera.com",
      avatar: ava1,
      isActive: true,
    },
    {
      id: 2,
      name: "Олена Ким",
      email: "kim@avtoatmosfera.com",
      avatar: ava1,
      isActive: true,
    },
    {
      id: 3,
      name: "Катерина Котасонова",
      email: "kate.k@avtoatmosfera.com",
      avatar: ava1,
      isActive: false,
    },
  ];

  const [isModalStaff, setIsModalStaff] = useState(false);
  const staffButtonRef = useRef(null);
  const handleStaffClick = () => {
    setIsModalStaff((prevState) => !prevState);
  };

  const [isModalStaffPlus, setIsModalStaffPlus] = useState(false);
  const staffButtonPlusRef = useRef(null);
  const handleStaffPlusClick = () => {
    setIsModalStaffPlus((prevState) => !prevState);
  };

  const [isModalNote, setIsModalNote] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const closeModal = () => {
    setIsModalNote(false);
  };


  return (
    <div className={css.rightSectionWrapper}>
      <div className={css.client}>
        <div className={css.clientbox}>
          <img
            className={css.photoavatar}
            src={data.avatar || ava}
            alt={data.name}
          />
          <div className={css.clientdata}>
            <p className={css.name}>{data.name}</p>
            <div className={css.phonebox}>
              <p className={css.phone}> {formatPhoneNumber(data.phonenum)}</p>
              <div className={css.status}> {data.status} </div>
              <button className={css.btnicon} onClick={handleCopy}>
                <BsFiles className={css.icon} />
              </button>
            </div>
          </div>
        </div>
        <div className={css.btnbox}>
          <button
            ref={buttonRef}
            className={css.btnaction}
            onClick={handlePhoneClick}
          >
            <BsTelephone className={css.iconaction} />
          </button>

          <button
            className={css.btnaction}
            onClick={() => {
              setIsModalNote(true);
            }}
          >
            <BsAlarm className={css.iconaction} />
          </button>

          <button
            className={css.btnaction}
            ref={staffButtonRef}
            // onClick={() => {
            //   setIsModalStaff(true);
            // }}
            onClick={handleStaffClick}
          >
            <RiUserSharedFill className={css.iconaction} />
          </button>

          <button
            className={css.btnaction}
            ref={staffButtonPlusRef}
            onClick={handleStaffPlusClick}
          >
            <RiUserAddFill className={css.iconaction} />
          </button>

          {isPhoneModalOpen && (
            <PhoneModal
              isOpen={isPhoneModalOpen}
              onClose={() => setIsPhoneModalOpen(false)}
              phoneNumbers={data.phonenums}
              onPhoneSelect={(phone) => {
                makeCall(phone);
                setIsPhoneModalOpen(false);
              }}
              triggerRef={buttonRef}
            />
          )}

          {isModalStaff && (
            <StaffModal
              isOpen={isModalStaff}
              onClose={() => setIsModalStaff(false)}
              staffs={staffs}
              onStaffSelect={(staff) => {
                console.log(staff);
                setIsModalStaff(false);
              }}
              offsetLeft={20}
              triggerRef={staffButtonRef}
            />
          )}

          {isModalStaffPlus && (
            <StaffModal
              isOpen={isModalStaffPlus}
              onClose={() => setIsModalStaffPlus(false)}
              staffs={staffs}
              onStaffSelect={(staff) => {
                console.log(staff);
                setIsModalStaffPlus(false);
              }}
              offsetLeft={68}
              triggerRef={staffButtonPlusRef}
            />
          )}

          {isModalNote && (
            <Modal isOpen={isModalNote} onClose={closeModal}>
              <NotificationModal
                onClose={closeModal}
                time="clientTime"
                date="clientDate"
                comment="clientComment"
                connectionType="clientConnection"
                accountingModal={true}
                service="clientService"
                setNotificationSent={setNotificationSent}
              />
            </Modal>
          )}
        </div>
      </div>

      <div className={css.wrapper} ref={wrapperRef}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          disableGutters={true}
          // className={css.accordion}
          className={`${css.accordion} ${isScrolled && css.accordionScrolled}`}
          sx={{
            "& .Mui-focusVisible": {
              backgroundColor: "var(--bg-secondary) !important",
            },
            background: "none",
            color: "var(--light-gray)",
            boxShadow: "none",
            overflow: "hidden",
            minHeight: expandedRows.includes("panel1") ? 127 : 56,
          }}
        >
          <AccordionSummary
            sx={{
              height: expandedRows.includes("panel1") ? 127 : 56,
              "&:hover": {
                cursor: "default !important",
              },
            }}
            className={css.accordionTitle}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className={css.accbox}>
              <div className={css.accboxicon}>
                <div className={css.accboxtitle}>
                  <Typography>Авто</Typography>
                  <ExpandMoreIcon
                    sx={{
                      fill: "var(--light-gray)",
                      transform: expandedRows.includes("panel1")
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick("panel1")}
                  />
                </div>
                {expandedRows.includes("panel1") &&
                  (isEditing.includes("panel1") ? (
                    <div className={css.blockflex}>
                      <button
                        onClick={() => handleCancelEdit("panel1")}
                        className={css.editbtn}
                        style={{ marginRight: "0" }}
                      >
                        <BsXCircle className={css.mainIcon} size={16} />{" "}
                      </button>
                      <button
                        onClick={() => handleSaveEdit("panel1")}
                        className={css.editbtn}
                      >
                        {" "}
                        <RiSave3Fill className={css.mainIcon} size={16} />{" "}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditToggle("panel1")}
                      className={css.editbtn}
                    >
                      <BsPencil className={css.mainIcon} />{" "}
                    </button>
                  ))}
              </div>

              {expandedRows.includes("panel1") && (
                <AccordionDetails>
                  <ChatAvto
                    ref={chatAvtoRef}
                    isEditable={isEditing.includes("panel1")}
                  />
                </AccordionDetails>
              )}
            </div>
          </AccordionSummary>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          disableGutters={true}
          // className={css.accordion}
          className={`${css.accordion} ${isScrolled && css.accordionScrolled}`}
          sx={{
            "& .Mui-focusVisible": {
              backgroundColor: "var(--bg-secondary)",
            },
            background: "none",
            color: "var(--light-gray)",
            boxShadow: "none",
            overflow: "hidden",
            minHeight: expandedRows.includes("panel2") ? 172 : 56,
          }}
        >
          <AccordionSummary
            sx={{
              height: expandedRows.includes("panel2") ? 172 : 56,
              "&:hover": {
                cursor: "default !important",
              },
            }}
            className={css.accordionTitle}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className={css.accbox}>
              <div className={css.topWrapper}>
                <div className={css.leftWrapper}>
                  <Typography>Теги</Typography>
                  <ExpandMoreIcon
                    sx={{
                      fill: "var(--light-gray)",
                      transform: expandedRows.includes("panel2")
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick("panel2")}
                  />
                </div>
                <div className={css.plus} onClick={handlePlusBtnClick}>
                  <FaPlus />
                </div>
              </div>

              {expandedRows.includes("panel2") && (
                <>
                  <AccordionDetails>
                    <ChatTags tagsArray={tagsArr} />
                  </AccordionDetails>
                  <AccordionActions
                    sx={{ justifyContent: "flex-start" }}
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                  >
                    <Button
                      sx={{ padding: 0 }}
                      className={css.bottomWrapper}
                      onClick={handlePlusBtnClick}
                    >
                      <BsPencil className={css.pencil} />
                      <p className={css.bottomText}>Змінити Теги</p>
                    </Button>
                  </AccordionActions>
                </>
              )}
            </div>
          </AccordionSummary>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          disableGutters={true}
          // className={css.accordion}
          className={`${css.accordion} ${isScrolled && css.accordionScrolled}`}
          sx={{
            "& .Mui-focusVisible": {
              backgroundColor: "var(--bg-secondary) !important",
            },
            background: "none",
            color: "var(--light-gray)",
            boxShadow: "none",
            overflow: "hidden",
            minHeight: expandedRows.includes("panel3") ? 209 : 56,
          }}
        >
          <AccordionSummary
            sx={{
              height: expandedRows.includes("panel3") ? 209 : 56,
              "&:hover": {
                cursor: "default !important",
              },
            }}
            className={css.accordionTitle}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <div className={css.accbox}>
              <div className={css.accboxtitle}>
                <Typography>Шаблони</Typography>
                <ExpandMoreIcon
                  sx={{
                    fill: "var(--light-gray)",
                    transform: expandedRows.includes("panel3")
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick("panel3")}
                />

                {expandedRows.includes("panel3") && (
                  <IoIosSearch
                    style={{
                      cursor: "pointer",
                      color: activeFilters[0]
                        ? "var(--current-mileage-text)"
                        : "var(--light-gray)",
                      position: "relative",
                    }}
                    onClick={handleFilterToggle(0)}
                  />
                )}

                {expandedRows.includes("panel3") && activeFilters[0] && (
                  <input
                    className={css.editInput}
                    type="text"
                    value={filters[0]}
                    onChange={handleFilterChange(0)}
                  />
                )}

                {expandedRows.includes("panel3") && (
                  <div
                    className={css.categoryDisplay}
                    ref={triggerCategoryRef}
                    onClick={toggleCategorySelector} // Открываем/закрываем справочник
                  >
                    <span>{activeCategory.shortname}</span>
                    <ExpandMoreIcon
                      sx={{
                        fill: "var(--light-gray)",
                        transform: isCategory
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                        marginLeft: "4px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}
                {expandedRows.includes("panel3") && (
                  <div
                    style={{
                      position: "absolute",
                      left: "360px",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <button
                      ref={triggerActionRef}
                      className={css.btnicon}
                      onClick={() => {
                        handleOpenModal("");
                      }}
                    >
                      <BsThreeDots className={css.icon} />
                    </button>
                  </div>
                )}

                {expandedRows.includes("panel3") && isCategory && (
                  <div>
                    <CategoryModal
                      isOpen={isCategory}
                      onClose={() => setIsCategory(false)}
                      categories={categories}
                      activeCategory={activeCategory}
                      onSelect={handleCategorySelect}
                      triggerRef={triggerCategoryRef}
                    />
                  </div>
                )}

                {expandedRows.includes("panel3") && modalOpen && (
                  <div>
                    <ActionModal
                      isOpen={modalOpen}
                      onClose={() => setModalOpen(false)}
                      actions={actions}
                      onActionSelect={handleActionChange}
                      triggerRef={triggerActionRef}
                    />
                  </div>
                )}
              </div>

              {expandedRows.includes("panel3") && (
                <AccordionDetails>
                  <ChatSample
                    filter={filters[0]}
                    selectedCateg={activeCategory.categ}
                    action={actionType}
                    onActionChange={handleActionChange}
                  />
                </AccordionDetails>
              )}
            </div>
          </AccordionSummary>
        </Accordion>

        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          disableGutters={true}
          // className={css.accordion}
          className={`${css.accordion} ${isScrolled && css.accordionScrolled}`}
          sx={{
            "& .Mui-focusVisible": {
              backgroundColor: "var(--bg-secondary) !important",
            },
            background: "none",
            color: "var(--light-gray)",
            boxShadow: "none",
            overflow: "hidden",
            minHeight: expandedRows.includes("panel4") ? 161 : 56,
          }}
        >
          <AccordionSummary
            sx={{
              height: expandedRows.includes("panel4") ? 161 : 56,
              "&:hover": {
                cursor: "default !important",
              },
            }}
            className={css.accordionTitle}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <div className={css.accbox}>
              <div className={css.accboxicon}>
                <div className={css.accboxtitle}>
                  <Typography>Нотатки</Typography>
                  <ExpandMoreIcon
                    sx={{
                      fill: "var(--light-gray)",
                      transform: expandedRows.includes("panel4")
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick("panel4")}
                  />
                </div>
                {expandedRows.includes("panel4") &&
                  (isEditing.includes("panel4") ? (
                    <div className={css.blockflex}>
                      <button
                        onClick={() => handleCancelEdit("panel4")}
                        className={css.editbtn}
                      >
                        <BsXCircle className={css.mainIcon} size={16} />{" "}
                      </button>
                      <button
                        onClick={() => handleSaveEdit("panel4")}
                        className={css.editbtn}
                      >
                        {" "}
                        <RiSave3Fill className={css.mainIcon} size={16} />{" "}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditToggle("panel4")}
                      className={css.editbtn}
                    >
                      <BsPencil className={css.mainIcon} />{" "}
                    </button>
                  ))}
              </div>

              {expandedRows.includes("panel4") && (
                <AccordionDetails>
                  <ChatNotes
                    ref={chatNotesRef}
                    isEditable={isEditing.includes("panel4")}
                  />
                </AccordionDetails>
              )}
            </div>
          </AccordionSummary>
        </Accordion>

        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          disableGutters={true}
          // className={css.accordion}
          className={`${css.accordion} ${isScrolled && css.accordionScrolled}`}
          sx={{
            "& .Mui-focusVisible": {
              backgroundColor: "var(--bg-secondary) !important",
            },
            background: "none",
            color: "var(--light-gray)",
            boxShadow: "none",
            overflow: "hidden",
            minHeight: expandedRows.includes("panel5") ? 173 : 56,
          }}
        >
          <AccordionSummary
            sx={{
              height: expandedRows.includes("panel5") ? 173 : 56,
              "& .Mui-focusVisible": {
                backgroundColor: "var(--bg-secondary)",
              },
              "&:hover": {
                cursor: "default !important",
              },
            }}
            className={css.accordionTitle}
            // expandIcon={<ExpandMoreIcon style={{fill: "var(--light-gray)"}}/>}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <div className={css.accbox}>
              <div className={css.accboxtitle}>
                <Typography>Історія змін</Typography>
                <ExpandMoreIcon
                  sx={{
                    fill: "var(--light-gray)",
                    transform: expandedRows.includes("panel5")
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick("panel5")}
                />

                {expandedRows.includes("panel5") && (
                  <IoIosSearch
                    style={{
                      cursor: "pointer",
                      color: activeFilters[1]
                        ? "var(--current-mileage-text)"
                        : "var(--light-gray)",
                    }}
                    onClick={handleFilterToggle(1)}
                  />
                )}
                {expandedRows.includes("panel5") && activeFilters[1] && (
                  <input
                    className={css.editInput}
                    type="text"
                    // placeholder="Фільтр"
                    value={filters[1]}
                    onChange={handleFilterChange(1)}
                  />
                )}
              </div>
              {expandedRows.includes("panel5") && (
                <AccordionDetails>
                  <ChatHistoryChange filter={filters[1]} />
                </AccordionDetails>
              )}
            </div>
          </AccordionSummary>
        </Accordion>

        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
          disableGutters={true}
          // className={css.accordion}
          className={`${css.accordion} ${isScrolled && css.accordionScrolled}`}
          sx={{
            "& .Mui-focusVisible": {
              backgroundColor: "var(--bg-secondary)",
            },
            background: "none",
            color: "var(--light-gray)",
            boxShadow: "none",
            overflow: "hidden",
            minHeight: expandedRows.includes("panel6") ? 200 : 56,
          }}
        >
          <AccordionSummary
            sx={{
              height: expandedRows.includes("panel6") ? 200 : 56,
              "&:hover": {
                cursor: "default !important",
              },
            }}
            className={css.accordionTitle}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            <div className={css.accbox}>
              <div className={css.accboxtitle}>
                <Typography>Прикріплені файли </Typography>
                <ExpandMoreIcon
                  sx={{
                    fill: "var(--light-gray)",
                    transform: expandedRows.includes("panel6")
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick("panel6")}
                />
              </div>
              {expandedRows.includes("panel6") && (
                <AccordionDetails>
                  <ChatFiles />
                </AccordionDetails>
              )}
            </div>
          </AccordionSummary>
        </Accordion>
        {isSearchTagModalOpen && (
          <SearchTags
            onClose={handleCloseSearchTagModal}
            checkedTagsArray={checkedTagsIdArray}
            tagsArray={tagsArr}
            setTagsArr={setTagsArr}
            leftSectionTag={false}
          />
        )}
      </div>
    </div>
  );
}
