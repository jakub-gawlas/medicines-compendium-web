import React, { Component } from 'react';

class MedicineForm extends Component {
  render(){
    const { medicine } = this.props;
    const { name, interactions } = medicine;
    console.log(medicine);
    return(
      <div>
        <h2>{name}</h2>
        Medicines:
        <ul>
          {interactions.medicines.names.map((name) => <li>{name}</li>)}
        </ul>
        Contraindications:
        <ul>
          {interactions.contraindications.names.map((name) => <li>{name}</li>)}
        </ul>
      </div>
    );
  }
}

export default MedicineForm;