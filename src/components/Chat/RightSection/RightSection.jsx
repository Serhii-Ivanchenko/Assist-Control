import css from "./RightSection.module.css";
import { useEffect, useState } from "react";
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

import { FaPlus } from "react-icons/fa";
import SearchTags from "./ChatTags/SearchTags/SearchTags.jsx";
import { BsPencil } from "react-icons/bs";

const tags = [
  {
    id: "1",
    tagName: "Записи на послуги",
    bgdColor: "darkGreen",
    isChecked: false,
  },
  {
    id: "2",
    tagName: "Новий рік 2024",
    bgdColor: "midOrange",
    isChecked: true,
  },
  {
    id: "3",
    tagName: "Чорна п’ятниця",
    bgdColor: "lightViolet",
    isChecked: true,
  },
  {
    id: "4",
    tagName: "Ремонт",
    bgdColor: "darkPink",
    isChecked: true,
  },
  {
    id: "5",
    tagName: "Новий",
    bgdColor: "lightRed",
    isChecked: true,
  },
  {
    id: "6",
    tagName: "Діагностика",
    bgdColor: "lightYellow",
    isChecked: false,
  },
];

export default function RightSection() {
  const [expanded, setExpanded] = useState(false);
  const [tagsArr, setTagsArr] = useState(tags);
  const [checkedTagsIdArray, setCheckedTagsIdArray] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    setTagsArr(tagsArr);
  }, [tagsArr]);

  return (
    <div className={css.rightSectionWrapper}>
      <div className={css.client}></div>
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
            height: expanded === "panel1" ? 127 : 56,
          }}
          className={css.accordionTitle}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className={css.accbox}>
            <div className={css.accboxtitle}>
              <Typography>Авто</Typography>
              <ExpandMoreIcon
                sx={{
                  fill: "var(--light-gray)",
                  transform:
                    expanded === "panel1" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
            {expanded === "panel1" && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel1" ? "72px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
              >
                <ChatAvto />
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
            height: expanded === "panel2" ? 172 : 56,
          }}
          className={css.accordionTitle}
          // expandIcon={<ExpandMoreIcon style={{fill: "var(--light-gray)"}}/>}
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
                    transform:
                      expanded === "panel2" ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              </div>
              <div className={css.plus} onClick={handlePlusBtnClick}>
                <FaPlus />
              </div>
            </div>

            {expanded === "panel2" && (
              <>
                <AccordionDetails
                // sx={{
                //   maxHeight: expanded === "panel2" ? "100px" : "0px",
                //   overflow: "hidden",
                //   transition: "max-height 0.3s ease",
                // }}
                >
                  <ChatTags
                    tagsArray={tagsArr}
                    checkedTagsIdArray={checkedTagsIdArray}
                    setTagsArr={setTagsArr}
                  />
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
            height: expanded === "panel3" ? 209 : 56,
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
                    expanded === "panel3" ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
              />
            </div>
            {expanded === "panel3" && (
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
            height: expanded === "panel4" ? 161 : 56,
          }}
          className={css.accordionTitle}
          // expandIcon={<ExpandMoreIcon style={{fill: "var(--light-gray)"}}/>}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <div className={css.accbox}>
            <div className={css.accboxtitle}>
              <Typography>Нотатки</Typography>
              <ExpandMoreIcon
                sx={{
                  fill: "var(--light-gray)",
                  transform:
                    expanded === "panel4" ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
              />
            </div>
            {expanded === "panel4" && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel4" ? "100px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
              >
                <ChatNotes />
              </AccordionDetails>
            )}
          </div>
        </AccordionSummary>
        {/* <AccordionDetails >
          <ChatNotes />
        </AccordionDetails> */}
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
            height: expanded === "panel5" ? 173 : 56,
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
                    expanded === "panel5" ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
              />
            </div>
            {expanded === "panel5" && (
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
            height: expanded === "panel6" ? 170 : 56,
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
                    expanded === "panel6" ? "rotate(180deg)" : "rotate(0deg)",
                  //  transition: "transform 0.3s"
                }}
              />
            </div>
            {expanded === "panel6" && (
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
      {isSearchTagModalOpen && (
        <SearchTags
          onClose={handleCloseSearchTagModal}
          checkedTagsArray={checkedTagsIdArray}
          tagsArray={tagsArr}
          setTagsArr={setTagsArr}
        />
      )}
    </div>
  );
}
