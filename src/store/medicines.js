import { observable, computed, action, asMap } from 'mobx';

import data from './data';

class StoreMedicines {

  @observable
  medicines = []

  @observable
  selectedMedicine = null

  constructor(){
    this.medicines = data.medicines;
    this.contraindications = data.contraindications;
  }

  @computed
  get medicinesNames(){
    return this.medicines.map( ({ name }) => name );
  }

  @action
  setSelectedMedicine = (medicineName) => {
    this.selectedMedicine = this.medicines.find( ({ name }) => name === medicineName );
  }

}

const storeMedicines = new StoreMedicines();
export default storeMedicines;