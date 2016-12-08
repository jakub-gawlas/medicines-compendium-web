import React from 'react';

import { AutoComplete, Icon } from 'antd';

import styles from './styles.css';

function Search({ medicinesNames, onSelect }){
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
    </div>
  );
}

export default Search;