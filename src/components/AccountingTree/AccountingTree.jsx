import { useState } from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AnimatedCollapse } from "../sharedComponents/AnimatedCollapse/AnimatedCollapse";
import styles from "./AccountingTree.module.css";

export default function AccountingTree() {
  const [openNodes, setOpenNodes] = useState({});

  const handleToggle = (nodeId) => {
    setOpenNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  return (
    <div className={styles.treeContainer}>
      <List>
        {/* Перша гілка */}
        <ListItem disablePadding>
          <ListItemButton
            className={styles.text}
            onClick={() => handleToggle("2")}
            sx={{ pl: 1, pb: 0.1 }}
          >
            <ListItemText primary="Клієнти" />
            {openNodes["2"] ? <ExpandLess sx={{ fontSize: "16px" }} /> : <ExpandMore sx={{ fontSize: "16px" }} />}
          </ListItemButton>
        </ListItem>
        <AnimatedCollapse inProp={openNodes["2"]}>
          <List component="div" disablePadding>
            <ListItemButton className={styles.text} sx={{ pl: 3, pb: 0.1 }}>
              <NavLink to="/client-list" className={styles.navLink}>
                <ListItemText className={styles.textSecond} primary="Загальний список клієнтів з рейтингом" />
              </NavLink>
            </ListItemButton>
            <ListItemButton className={styles.text} sx={{ pl: 3, pb: 0.1 }}>
              <NavLink to="/clients-in-work" className={styles.navLink}>
                <ListItemText className={styles.textSecond} primary="У роботі список клієнтів" />
              </NavLink>
            </ListItemButton>
          </List>
        </AnimatedCollapse>

        {/* Друга гілка */}
        <ListItem disablePadding>
          <ListItemButton
            className={styles.text}
            onClick={() => handleToggle("5")}
            sx={{ pl: 1, pb: 0.1 }}
          >
            <ListItemText primary="Постачальники" />
            {openNodes["5"] ? <ExpandLess sx={{ fontSize: "16px" }} /> : <ExpandMore sx={{ fontSize: "16px" }} />}
          </ListItemButton>
        </ListItem>
        <AnimatedCollapse inProp={openNodes["5"]}>
          <List component="div" disablePadding>
            <ListItemButton className={styles.text} sx={{ pl: 3, pb: 0.1 }}>
              <NavLink to="/spare-parts" className={styles.navLink}>
                <ListItemText className={styles.textSecond} primary="Запчастини" />
              </NavLink>
            </ListItemButton>
            <ListItemButton className={styles.text} sx={{ pl: 3, pb: 0.1 }}>
              <NavLink to="/invoices" className={styles.navLink}>
                <ListItemText className={styles.textSecond} primary="Накладні" />
              </NavLink>
            </ListItemButton>
          </List>
        </AnimatedCollapse>

        {/* Інші пункти */}
        <ListItemButton className={styles.text} sx={{ pl: 1, pb: 0.1 }}>
          <NavLink to="/cash" className={styles.navLink}>
            <ListItemText primary="Каса" />
          </NavLink>
        </ListItemButton>
        <ListItemButton className={styles.text} sx={{ pl: 1, pb: 0.1 }}>
          <NavLink to="/equipment" className={styles.navLink}>
            <ListItemText primary="Обладнання" />
          </NavLink>
        </ListItemButton>
      </List>
    </div>
  );
}
