import React, { Component } from 'react';
import { observer } from 'mobx-react';

import storeUser from '../../store/user';
import storeMedicines from '../../store/medicines';

import MenuTop from '../../components/MenuTop';
import Search from '../../components/Search';
import MedicineForm from '../../components/MedicineForm';

import styles from './styles.css';

@observer
class ManagementPanel extends Component {
  
  onClickMenu = ({ key }) => {
    const { logout } = storeUser;

    switch(key){
      case 'logout': return logout();
      default: return;
    }
  }

  render(){
    const { username } = storeUser;
    const { medicinesNames, selectedMedicine, setSelectedMedicine } = storeMedicines;

    return(
      <div className={styles.container}>
        <MenuTop username={username} onClickMenu={this.onClickMenu} />
        <div className={styles.content}>
          <Search 
            medicinesNames={medicinesNames} 
            onSelect={setSelectedMedicine}
          />
          { selectedMedicine &&
            <MedicineForm medicine={selectedMedicine} />
          }
        </div>
      </div>
    );
  }
}

export default ManagementPanel;