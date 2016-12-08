import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Spin, Card, Form, Input, Select, Button } from 'antd';

import styles from './styles.css';

@observer
class MedicineForm extends Component {

  @observable
  name = ''

  @observable
  medicinesInteractions = []

  @observable
  contraindicationsInteractions = []

  constructor(props){
    super(props);
    this.mapPropsToState(props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.medicine !== this.props.medicine){
      this.mapPropsToState(nextProps);
    }
  }

  mapPropsToState = ({ medicine }) => {
    const { name, interactions } = medicine;
    this.name = name;
    this.medicinesInteractions = [...interactions.medicines.toJS()];
    this.contraindicationsInteractions = [...interactions.contraindications.toJS()];
  }

  onSubmit = (event) => {
    const { medicine, onClickSave } = this.props;

    event.preventDefault();

    onClickSave({
      id: medicine.id,
      name: this.name,
      medicinesInteractions: this.medicinesInteractions.toJS(),
      contraindicationsInteractions: this.contraindicationsInteractions.toJS()
    });
  }

  renderSelectMedicinesInteractions(){
    const { allMedicines } = this.props;
    return(
      <Select 
        multiple 
        value={this.medicinesInteractions.toJS()}
        onChange={(allSelected) => this.medicinesInteractions = allSelected}
        placeholder="Wybierz leki"
      >
        {allMedicines.map(({ name, id }, idx) => <Select.Option value={id} key={idx}>{name}</Select.Option>)}
      </Select>
    );
  }

  renderSelectContraindicationsInteractions(){
    const { allContraindications } = this.props;
    return(
      <Select 
        multiple 
        value={this.contraindicationsInteractions.toJS()}
        onChange={(allSelected) => this.contraindicationsInteractions = allSelected}
        placeholder="Wybierz przeciwwskazania"
      >
        {allContraindications.map(({ name, id }, idx) => <Select.Option value={id} key={idx}>{name}</Select.Option>)}
      </Select>
    );
  }

  render(){
    const { isSpinning } = this.props;
    return(
      <div className={styles.container}>
        <Spin spinning={isSpinning}>
          <Card>
            <Form onSubmit={this.onSubmit}>
              <Form.Item label="Nazwa">
                <Input 
                  value={this.name}
                  onChange={(event) => this.name = event.target.value} 
                />
              </Form.Item>
              <Form.Item label="Interakcje z lekami">
                {this.renderSelectMedicinesInteractions()}
              </Form.Item>
              <Form.Item label="Przeciwwskazania">
                {this.renderSelectContraindicationsInteractions()}
              </Form.Item>
              <Form.Item className={styles.button__container}>
                <Button type="primary" htmlType="submit" className={styles.button}>
                  Zapisz zmiany
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </div>
    );
  }
}

export default MedicineForm;