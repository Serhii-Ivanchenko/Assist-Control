import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { NavLink } from 'react-router-dom';
import styles from './ReportsTree.module.css';

export default function ReportsTree() {

  return (
    <Box className={styles.treeBox} sx={{ minHeight: 0, minWidth: 170 }}>
      <SimpleTreeView>
        <TreeItem
          className={styles.treeItem}
          itemId="reports"
          label={
            <NavLink
              to="/reports/clients"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Клієнти
            </NavLink>
          }
        />
      </SimpleTreeView>
    </Box>
  );
}
