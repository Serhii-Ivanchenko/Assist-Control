import css from "./RightSection.module.css";
import { useState } from "react";
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

export default function RightSection() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
            <div className={css.accboxtitle}>
              <Typography>Тегі</Typography>
              <ExpandMoreIcon
                sx={{
                  fill: "var(--light-gray)",
                  transform:
                    expanded === "panel2" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {expanded === "panel2" && (
              <AccordionDetails
              // sx={{
              //   maxHeight: expanded === "panel2" ? "100px" : "0px",
              //   overflow: "hidden",
              //   transition: "max-height 0.3s ease",
              // }}
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
    </div>
  );
}
