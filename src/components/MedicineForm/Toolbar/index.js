import React from 'react';

import { Button } from 'antd';

import styles from './styles.css';

function Toolbar({ onClickDelete }){
  return(
    <div className={styles.container}>
      <Button 
        type="dashed" 
        icon="delete"
        onClick={onClickDelete}
        className={styles['button--remove']}
      >
        Usuń lek
      </Button>
    </div>
  );
}

export default Toolbar;