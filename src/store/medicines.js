import { observable, computed, action } from 'mobx';

import { getAllMedicines, getAllContraindications } from '../api';

class StoreMedicines {

  @observable
  medicines = []

  contraindications = []

  @observable
  selectedMedicine = null

  @observable 
  isSaveMedicineInProgress = false

  constructor(){
    this.downloadData();
  }

  @computed
  get medicinesNames(){
    return this.medicines.map( ({ name }) => name );
  }

  @action
  async downloadData(){
    try {
      const medicines = await getAllMedicines();
      const contraindications = await getAllContraindications();

      this.medicines = medicines;
      this.contraindications = contraindications;
    }
    catch(err){
      console.error(err);
    }
  }

  @action
  setSelectedMedicine = (medicineName) => {
    this.selectedMedicine = this.medicines.find( ({ name }) => name === medicineName );
  }

  @action
  saveMedicine = ({ id, name, medicinesInteractions, contraindicationsInteractions }) => {
    this.isSaveMedicineInProgress = true;
    this.medicines = this.medicines.map((medicine) => {
      if(medicine.id !== id) return medicine;
      return {
        ...medicine,
        name,
        interactions: {
          medicines: medicinesInteractions,
          contraindications: contraindicationsInteractions 
        }
      };
    });

    setTimeout(() => this.isSaveMedicineInProgress = false, 500);
  }

}

const storeMedicines = new StoreMedicines();
export default storeMedicines;