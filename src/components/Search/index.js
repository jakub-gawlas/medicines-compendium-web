import React from 'react';

import { AutoComplete, Icon, Button } from 'antd';

import styles from './styles.css';

function Search({ medicinesNames, onSelect, onClickButtonAdd }){
  return(
    <div className={styles.container}>
      <Icon
        type="search"
        className={styles.search__icon}
      />
      <AutoComplete
        dataSource={medicinesNames}
        onSelect={onSelect}
        className={styles.search__input}
        placeholder="Wybierz lek"
        allowClear
      />
      <Button 
        type="dashed" 
        icon="plus"
        onClick={onClickButtonAdd}
        className={styles.button}
      >
        Dodaj lek
      </Button>
    </div>
  );
}

export default Search;