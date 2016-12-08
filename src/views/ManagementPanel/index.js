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

  onClickButtonAdd = () => {
    storeMedicines.setEmptySelectedMedicine();
  }

  render(){
    const { username } = storeUser;
    const {
      medicines,
      contraindications, 
      medicinesNames, 
      selectedMedicine, 
      setSelectedMedicine,
      saveMedicine,
      isSaveMedicineInProgress
    } = storeMedicines;

    return(
      <div className={styles.container}>
        <MenuTop username={username} onClickMenu={this.onClickMenu} />
        <div className={styles.content}>
          <Search 
            medicinesNames={medicinesNames} 
            onSelect={setSelectedMedicine}
            onClickButtonAdd={this.onClickButtonAdd}
          />
          { selectedMedicine &&
            <MedicineForm
              medicine={selectedMedicine}
              allMedicines={medicines}
              allContraindications={contraindications} 
              onClickSave={saveMedicine}
              isSpinning={isSaveMedicineInProgress}
            />
          }
        </div>
      </div>
    );
  }
}

export default ManagementPanel;