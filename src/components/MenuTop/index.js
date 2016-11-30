import React from 'react';

import { Menu, Icon } from 'antd';
const { SubMenu, Item } = Menu;

import styles from './styles.css';

function MenuTop ({ username, onClickMenu }) {
  return(
    <div className={styles.container}>
      <Menu mode="horizontal" onClick={onClickMenu}>
        <SubMenu title={(
          <span>
            <Icon type="user" />
            Logged in as <strong>{username}</strong>
          </span>
          )}
        >
          <Item key="logout">
            <span>
              <Icon type="logout" />
              Log out
            </span>
          </Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default MenuTop;