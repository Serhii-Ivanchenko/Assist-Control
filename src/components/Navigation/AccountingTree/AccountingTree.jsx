// import { useState } from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { NavLink } from 'react-router-dom';
// import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
// import clsx from 'clsx';
import styles from './AccountingTree.module.css';

export default function AccountingTree() {
  // const [expanded, setExpanded] = useState([]);

  // const handleToggle = (nodeId) => {
  //   setExpanded((prev) =>
  //     prev.includes(nodeId)
  //       ? prev.filter((id) => id !== nodeId)
  //       : [...prev, nodeId]
  //   );
  // };

  return (
    <Box className={styles.treeBox} sx={{ minHeight: 0, minWidth: 170 }}>
      <SimpleTreeView>
        <TreeItem
          className={styles.treeItem}
          itemId="clients"
          label={
            <NavLink
              to="/accounting/clients"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Клієнти
            </NavLink>
          }
        />

        <TreeItem
          itemId="distributors"
          label={
            <NavLink
              to="/accounting/distributors"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Постачальники
            </NavLink>
          }
        />

        <TreeItem
          itemId="invoices"
          label={
            <NavLink
              to="/accounting/documents/goods"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Накладні
            </NavLink>
          }
        />
      </SimpleTreeView>
    </Box>
  );
}
