import css from "./RightSection.module.css";
import { useState , useRef} from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import ChatAvto from "./ChatAvto/ChatAvto.jsx";
import ChatFiles from "./ChatFiles/ChatFiles.jsx";
import ChatHistoryChange from "./ChatHistoryChange/ChatHistoryChange.jsx";
import ChatTags from "./ChatTags/ChatTags.jsx";
import ChatSample from "./ChatSample/ChatSample.jsx";
import ChatNotes from "./ChatNotes/ChatNotes.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ava from '../,,/../../../assets/images/ava1.png'
import {BsFiles, BsAlarm, BsFillPersonPlusFill, BsTelephone , BsPersonPlusFill} from "react-icons/bs";
import {RiUserSharedFill, RiUserShared2Fill, RiUserAddFill} from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti"

import { MdPersonAddAlt1 } from "react-icons/md";
import { BsPencil, BsXCircle } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";

//   const handleEditToggle = (event) => {
//     event.stopPropagation(); // Останавливаем всплытие события
//     if (isEditing) {
//       // Вызов функции generateBackendData через реф
//       if (detailsRef.current?.generateBackendData) {
//         detailsRef.current.generateBackendData();
//       }
//       console.log("Сохранение завершено.");
//     }
//     setIsEditing((prev) => !prev);
//   };


// const handleCancelEdit = (event) => {
//   event.stopPropagation(); 
//   setIsEditing(false);

//   // Сбрасываем данные через реф
//   if (detailsRef.current?.resetGridData) {
//     detailsRef.current.resetGridData();
//   }
// };

 




const data = {
  id: 1,
  name: "Олександр Мельник",
  avatar: ava,
  phonenum: "0733291217",
  status: "Новий"
}

export default function RightSection() {
  const [expanded, setExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isEditing, setIsEditing] = useState([]);
  const chatAvtoRef = useRef(null);
  const chatNotesRef = useRef(null);

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
     };
    console.log(`Редактирование панели "${panel}" отменено.`);
  };

  const handleSaveEdit = (panel) => {
    setIsEditing((prev) => prev.filter((p) => p !== panel));
     if (panel === "panel1" && chatAvtoRef.current) {
      chatAvtoRef.current.saveData();
    } else if (panel === "panel4" && chatNotesRef.current) {
      chatNotesRef.current.saveData();
    };
    console.log(`Изменения панели "${panel}" сохранены.`);
  };

const handleCopy = async () => {
  try {
      const plainNumber = data.phonenum.replace(/\s/g, "")
      await navigator.clipboard.writeText(plainNumber);
      alert("Текст скопирован в буфер обмена!");
    } catch (err) {
      console.error("Не удалось скопировать текст: ", err);
    }
  };

const formatPhoneNumber = (number) => {
    return number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
  };

  return (
    <div className={css.rightSectionWrapper}>

      <div className={css.client}> <div className={css.clientbox}> 
          <img  className={css.photoavatar}
          src={data.avatar || ava} alt={data.name} /> 
        <div className={css.clientdata}>
          <p className={css.name }>{data.name}</p>
          <div className={css.phonebox}>
            <p className={css.phone}> {formatPhoneNumber(data.phonenum)}</p>
            <div className={css.status}> {data.status} </div>
            <button className={css.btnicon} onClick={handleCopy}><BsFiles className={css.icon } /></button>
        </div>
        </div>
      </div>
        <div className={css.btnbox}>
        <button className={css.btnaction}><BsTelephone className={css.iconaction} /></button>
        <button className={css.btnaction}><BsAlarm className={css.iconaction} /></button>
        <button className={css.btnaction}><RiUserSharedFill className={css.iconaction}  /></button>
        <button className={css.btnaction}><RiUserAddFill className={css.iconaction}  /></button>
      </div>
      </div>

     
<div className={css.wrapper}>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--light-gray)",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          sx={{
              height: expandedRows.includes("panel1") ? 127 : 56,
           
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
                  transform:
                    expandedRows.includes("panel1")  ? "rotate(180deg)" : "rotate(0deg)",
                }}
                onClick={() => handleRowClick("panel1")}
              />
            </div>
            {expandedRows.includes("panel1") && (
              isEditing.includes("panel1") ? (
                <div className={css.blockflex}>
                  <button onClick={() => handleCancelEdit("panel1")} className={css.editbtn} style={{ marginRight: "0" }} >
                    <BsXCircle className={css.mainIcon} size={16} /> </button>
                  <button onClick={() => handleSaveEdit("panel1")}
                    className={css.editbtn} 
                  > <RiSave3Fill className={css.mainIcon} size={16} /> </button>
                </div>
              ) : (
                <button onClick={() => handleEditToggle("panel1")} className={css.editbtn}  >
                  <BsPencil className={css.mainIcon} /> </button>
              ))}
            </div>
 
           {expandedRows.includes("panel1")   && (
              <AccordionDetails
  //             sx={{
  //   maxHeight: expanded === "panel1" ? "none" : "0px",
  //   // overflow: expanded === "panel1" ? "visible" : "hidden",
  //   transition: "max-height 0.3s ease",
  // }}
              >
                <ChatAvto ref={chatAvtoRef} isEditable={isEditing.includes("panel1")} />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>
        {/* <AccordionDetails > 
          <ChatAvto />
        </AccordionDetails> */}
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--light-gray)",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          sx={{
              height: expandedRows.includes("panel2") ? 172 : 56,
             flexGrow: "1",
             overflow: "hidden"
          }}
          className={css.accordionTitle}
          // expandIcon={<ExpandMoreIcon style={{fill: "var(--light-gray)"}}/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className={css.accbox}>
            <div className={css.accboxtitle}>
              <Typography>Тегі</Typography>
              <ExpandMoreIcon
                sx={{
                  fill: "var(--light-gray)",
                  transform:
                   expandedRows.includes("panel2") ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
                onClick={() => handleRowClick("panel2")}
              />
            </div>
            {expandedRows.includes("panel2")
              // expanded === "panel2"
              && (
              <AccordionDetails
              sx={{
    maxHeight: expanded === "panel1" ? "none" : "0px",
    overflow: expanded === "panel1" ? "visible" : "hidden",
    transition: "max-height 0.3s ease",
  }}
              >
                <ChatTags />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>
        {/* <AccordionDetails>
          <ChatTags />
        </AccordionDetails> */}
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--light-gray)",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          sx={{
            height: expandedRows.includes("panel3") ? 209 : 56,
          }}
          className={css.accordionTitle}
          // expandIcon={<ExpandMoreIcon style={{fill: "var(--light-gray)"}}/>}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div className={css.accbox}>
            <div className={css.accboxtitle}>
              <Typography>Шаблони</Typography>
              <ExpandMoreIcon
                sx={{
                  fill: "var(--light-gray)",
                  transform:
                    expandedRows.includes("panel3") ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
                onClick={() => handleRowClick("panel3")}
              />
            </div>
            {expandedRows.includes("panel3")
              // expanded === "panel3"
              && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel3" ? "100px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
              >
                <ChatSample />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>
        {/* <AccordionDetails >
          <ChatSample />
        </AccordionDetails> */}
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--light-gray)",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          sx={{
            height: expandedRows.includes("panel4") ? 161 : 56,
          }}
          className={css.accordionTitle}
          // expandIcon={<ExpandMoreIcon style={{fill: "var(--light-gray)"}}/>}
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
                  transform:
                    expandedRows.includes("panel4")  ? "rotate(180deg)" : "rotate(0deg)",
                }}
                onClick={() => handleRowClick("panel4")}
              />
            </div>
            {expandedRows.includes("panel4") && (
              isEditing.includes("panel4") ? (
                <div className={css.blockflex}>
                  <button onClick={() => handleCancelEdit("panel4")} className={css.editbtn}  >
                    <BsXCircle className={css.mainIcon} size={16} /> </button>
                  <button onClick={() => handleSaveEdit("panel4")}
                    className={css.editbtn} 
                  > <RiSave3Fill className={css.mainIcon} size={16} /> </button>
                </div>
              ) : (
                <button onClick={() => handleEditToggle("panel4")} className={css.editbtn}  >
                  <BsPencil className={css.mainIcon} /> </button>
              ))}
            </div>
 
           {expandedRows.includes("panel4")   && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel1" ? "72px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
              >
                <ChatNotes ref={chatNotesRef} isEditable={isEditing.includes("panel4")} />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>

         
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--light-gray)",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          sx={{
            height: expandedRows.includes("panel5") ? 173 : 56,
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
                  transform:
                    expandedRows.includes("panel5") ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
                onClick={() => handleRowClick("panel5")}
              />
            </div>
            {expandedRows.includes("panel5")
              // expanded === "panel5"
              && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel5" ? "100px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
              >
                <ChatHistoryChange />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>
        {/* <AccordionDetails >
          <ChatHistoryChange />
        </AccordionDetails> */}
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
        disableGutters={true}
        sx={{
          background: "none",
          color: "var(--light-gray)",
          boxShadow: "none",
          // "&:before": {
          //   display: "none",
          // },
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          sx={{
            height: expandedRows.includes("panel6") ? 170 : 56,
          }}
          className={css.accordionTitle}
          // expandIcon={<ExpandMoreIcon style={{ fill: "var(--light-gray)", marginRight: "auto" }} />}
          aria-controls="panel6-content"
          id="panel6-header"
        >
          <div className={css.accbox}>
            <div className={css.accboxtitle}>
              <Typography>Прикріплені файли </Typography>
              <ExpandMoreIcon
                sx={{
                  fill: "var(--light-gray)",
                  transform:
                    expandedRows.includes("panel6") ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
                onClick={() => handleRowClick("panel6")}
              />
            </div>
            {expandedRows.includes("panel6")
              // expanded === "panel6"
              && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel6" ? "100px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
              >
                <ChatFiles />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>
        {/* <AccordionDetails >
          <ChatFiles />
        </AccordionDetails> */}
      </Accordion>

</ div>


    </div>
  );
}
