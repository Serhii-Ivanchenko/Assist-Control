import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { NavLink } from "react-router-dom";
import styles from "./ReportsTree.module.css";
import { selectIsChatOpen } from "../../../redux/chat/selectors";
import { useSelector } from "react-redux";
import { FaTruck, FaUserFriends } from "react-icons/fa";
import clsx from "clsx";

export default function ReportsTree() {
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
              to="/reports/clients"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {chatIsOpen ? (
                <FaUserFriends className={styles.icon} size={20} />
              ) : (
                "Клієнти"
              )}
            </NavLink>
          }
        />
         <TreeItem
                  itemId="distributors"
                  label={
                    <NavLink
                      to="/reports/distributors"
                      className={({ isActive }) =>
                        isActive ? styles.activeLink : styles.link
                      }
                    >
                      {chatIsOpen ? (
                        <FaTruck className={styles.icon} size={20}/>
                      ) : (
                        "Постачальники"
                      )}
                    </NavLink>
                  }
                />
      </SimpleTreeView>
    </Box>
  );
}
