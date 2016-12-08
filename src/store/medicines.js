import { observable, computed, action } from 'mobx';

import { getAllMedicines, getAllContraindications, updateMedicine } from '../api';

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
  saveMedicine = async (medicineToSave) => {
    this.isSaveMedicineInProgress = true;

    try {
      const result = await updateMedicine(medicineToSave);
      const { updatedMedicine, changedMedicines } = result;

      this.medicines = this.medicines.map((medicine) => {

        if(changedMedicines.interactions.added.includes(medicine.id)){
          medicine.interactions.medicines.push(medicineToSave.id);
        }
        if(changedMedicines.interactions.removed.includes(medicine.id)){
          const interactions = medicine.interactions;
          interactions.medicines = interactions.medicines.filter((id) => id !== medicineToSave.id);
        }

        if(medicine.id !== medicineToSave.id) return medicine;

        return {
          ...medicine,
          name: updatedMedicine.name,
          interactions: {
            medicines: updatedMedicine.interactions.medicines,
            contraindications: updatedMedicine.interactions.contraindications 
          }
        };

      });
           
    }
    catch(err){
      console.error(err);
    }
    
    this.isSaveMedicineInProgress = false;
  }

}

function _removeMedicineInteraction(medicine, interactionId){
  const { interactions } = medicine; 
  const medicinesInteractions = interactions.medicines.filter((id) => id !== interactionId);
  return {
    ...medicine,
    interactions: {
      medicines: medicinesInteractions,
      contraindications: interactions.contraindications
    }
  };
}

const storeMedicines = new StoreMedicines();
export default storeMedicines;