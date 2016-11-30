import React from 'react';

import { Menu, Icon } from 'antd';
const { SubMenu, Item } = Menu;

import styles from './styles.css';

function MenuTop ({ username, onClickMenu }) {
  return(
    <div className={styles.container}>
      <span className={styles.logo}>
        Kompendium leków
        <small>| Panel administratora</small>
      </span>
      <Menu mode="horizontal" onClick={onClickMenu}>
        <SubMenu title={(
          <span>
            <Icon type="user" />
            Zalogowany jako <strong>{username}</strong>
          </span>
          )}
        >
          <Item key="logout">
            <span>
              <Icon type="logout" />
              Wyloguj
            </span>
          </Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default MenuTop;