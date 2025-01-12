import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { NavLink } from "react-router-dom";
import { FaUserFriends, FaFileInvoice } from "react-icons/fa";
import styles from "./AccountingTree.module.css";
import { selectIsChatOpen } from "../../../redux/chat/selectors";
import { useSelector } from "react-redux";
import clsx from "clsx";

export default function AccountingTree() {
  const chatIsOpen = useSelector(selectIsChatOpen);

  return (
    <Box
      className={clsx(styles.treeBox, { [styles.treeBoxOpenChat]: chatIsOpen })}
      sx={{ minHeight: 0, width: chatIsOpen ? 42 : 170 }}
    >
      <SimpleTreeView>
        <TreeItem
          className={styles.treeItem}
          itemId="clients"
          label={
            <NavLink
              to="/accounting/clients"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {chatIsOpen ? (
                <FaUserFriends className={styles.icon} size={20}/>
              ) : (
                "В Роботі"
              )}
            </NavLink>
          }
        />
        <TreeItem
          itemId="invoices"
          label={
            <NavLink
              to="/accounting/documents/goods"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {chatIsOpen ? (
                <FaFileInvoice className={styles.icon} size={20}/>
              ) : (
                "Накладні"
              )}
            </NavLink>
          }
        />
      </SimpleTreeView>
    </Box>
  );
}
