import { useState } from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { NavLink} from 'react-router-dom';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
import clsx from 'clsx';
import styles from './AccountingTree.module.css';

export default function AccountingTree() {
  const [expanded, setExpanded] = useState([]);

  const handleToggle = (nodeId) => {
    setExpanded((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <Box className={styles.treeBox} sx={{ minHeight: 0, minWidth: 170 }}>
      <SimpleTreeView>
        <TreeItem
          className={styles.treeItem}
          itemId="clients"
          label={
            <span className={styles.treeLabel} onClick={() => handleToggle('clients')}>
              Клієнти
              <span className={styles.arrowIcon}>
                {expanded.includes('clients') ? (
                  <BiSolidDownArrow />
                ) : (
                  <BiSolidRightArrow />
                )}
              </span>
            </span>
          }
        >
          <ul className={styles.nestedList}>
            <li
              className={clsx(styles.listItem, {
                [styles.activeContainer]: location.pathname === '/accounting/clients/clients-list-general',
              })}
            >
              <NavLink
                to="/accounting/clients/clients-list-general"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Загальний список клієнтів з рейтингом
              </NavLink>
            </li>
            <li
              className={clsx(styles.listItem, {
                [styles.activeContainer]: location.pathname === '/accounting/clients/clients-list-in-work',
              })}
            >
              <NavLink
                to="/accounting/clients/clients-list-in-work"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                У роботі список клієнтів
              </NavLink>
            </li>
          </ul>
        </TreeItem>

        <TreeItem
          itemId="suppliers"
          label={
            <span className={styles.treeLabel} onClick={() => handleToggle('suppliers')}>
              Постачальники
              <span className={styles.arrowIcon}>
                {expanded.includes('suppliers') ? (
                  <BiSolidDownArrow />
                ) : (
                  <BiSolidRightArrow />
                )}
              </span>
            </span>
          }
        >
          <ul className={styles.nestedList}>
            <li
              className={clsx(styles.listItem, {
                [styles.activeContainer]: location.pathname === '/accounting/distributors/spare-parts',
              })}
            >
              <NavLink
                to="/accounting/distributors/spare-parts"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Запчастини
              </NavLink>
            </li>
            <li
              className={clsx(styles.listItem, {
                [styles.activeContainer]: location.pathname === '/accounting/distributors/invoices',
              })}
            >
              <NavLink
                to="/accounting/distributors/invoices"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Накладні
              </NavLink>
            </li>
          </ul>
        </TreeItem>

        <TreeItem
          itemId="cashbox"
          label={
            <NavLink
              to="/accounting/funds"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Каса
            </NavLink>
          }
        />

        <TreeItem
          itemId="equipment"
          label={
            <NavLink
              to="/accounting/equipment"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Обладнання
            </NavLink>
          }
        />
      </SimpleTreeView>
    </Box>
  );
}
