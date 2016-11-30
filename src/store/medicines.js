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
    const medicine = this.medicines.find( ({ name }) => name === medicineName );
    const { 
      medicines: medicinesInteractions,
      contraindications: contraindicationsInteractions
    } = medicine.interactions;

    this.selectedMedicine = {
      ...medicine,
      interactions: {
        medicines: {
          ids: medicinesInteractions,
          names: this.getMedicinesName(medicinesInteractions)
        },
        contraindications: {
          ids: contraindicationsInteractions,
          names: this.getContraindicationsName(contraindicationsInteractions)
        }
      }
    }
  }

  getMedicinesName = (medicinesIds) => {
    return this.medicines
            .filter(({ id }) => medicinesIds.includes(id) )
            .map(({ name }) => name);
  }

  getContraindicationsName = (contraindicationsIds) => {
    return this.contraindications
            .filter(({ id }) => contraindicationsIds.includes(id) )
            .map(({ name }) => name);
  }

}

const storeMedicines = new StoreMedicines();
export default storeMedicines;