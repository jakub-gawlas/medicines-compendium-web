import React from 'react';

import { Button } from 'antd';

import styles from './styles.css';

function Toolbar({ onClickDelete, showDeleteButton }){
  return(
    <div className={styles.container}>
      {showDeleteButton &&
        <Button 
          type="dashed" 
          icon="delete"
          onClick={onClickDelete}
          className={styles['button--remove']}
        >
          Usuń lek
        </Button>
      }
    </div>
  );
}

export default Toolbar;