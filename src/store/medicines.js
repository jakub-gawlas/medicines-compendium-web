import { observable, computed, action } from 'mobx';

import * as api from '../api';

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
      const medicines = await api.getAllMedicines();
      const contraindications = await api.getAllContraindications();

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
  setEmptySelectedMedicine = () => {
    this.selectedMedicine = {
      id: null,
      name: '',
      interactions: {
        medicines: [],
        contraindications: []
      }
    };
  }

  @action
  saveMedicine = async (medicineToSave) => {
    this.isSaveMedicineInProgress = true;

    medicineToSave.id ?
        await this.updateMedicine(medicineToSave) 
      :
        await this.addMedicine(medicineToSave);
    
    this.isSaveMedicineInProgress = false;
  }

  @action
  addMedicine = async (medicineToAdd) => {
    try {
      const addedMedicine = await api.addMedicine(medicineToAdd);

      this.medicines = this.medicines.map((medicine) => {
        if(addedMedicine.interactions.medicines.includes(medicine.id)){
          medicine.interactions.medicines.push(addedMedicine.id);
        }
        return medicine;
      });

      this.medicines.push(addedMedicine);
      this.selectedMedicine = addedMedicine;
    }
    catch(err){
      console.error(err);
    }
  }

  @action
  updateMedicine = async (medicineToUpdate) => {
    try {
      const result = await api.updateMedicine(medicineToUpdate);
      const { updatedMedicine, changedMedicines } = result;

      this.medicines = this.medicines.map((medicine) => {

        if(changedMedicines.interactions.added.includes(medicine.id)){
          medicine.interactions.medicines.push(medicineToUpdate.id);
        }
        if(changedMedicines.interactions.removed.includes(medicine.id)){
          const interactions = medicine.interactions;
          interactions.medicines = interactions.medicines.filter((id) => id !== medicineToUpdate.id);
        }

        if(medicine.id !== medicineToUpdate.id) return medicine;

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
  }

  @action
  deleteMedicine = async (medicineId) => {
    try {
      await api.deleteMedicine(medicineId);
      
      /** Remove medicine from list */
      this.medicines = this.medicines.filter(({ id }) => id !== medicineId);

      /** Remove medicine from interactions lists */
      this.medicines = this.medicines.map((medicine) => {
        const { interactions } = medicine;

        if(!interactions.medicines.includes(medicineId)){
          return medicine;
        }

        const medicinesInteractions = _removeValueFromArray(interactions.medicines, medicineId);
        return {
          ...medicine,
          interactions: {
            ...interactions,
            medicines: medicinesInteractions
          }
        };
      });

      this.selectedMedicine = null;
    }
    catch(err){
      console.error(err);
    }
  }

}

function _removeValueFromArray(array, valueToRemove){
  return array.filter((value) => value !== valueToRemove);
}

const storeMedicines = new StoreMedicines();
export default storeMedicines;