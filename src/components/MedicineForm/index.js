import React, { Component } from 'react';

import { Spin, Card, Form, Input, Select } from 'antd';

import styles from './styles.css';

class MedicineForm extends Component {

  onSubmit = () => {}

  renderSelectMedicinesInteractions(){
    const { medicine, allMedicines } = this.props;
    const { interactions } = medicine;
    return(
      <Select 
        multiple 
        defaultValue={interactions.medicines.toJS()}
        onChange={(value) => console.log(value)}
        placeholder="Wybierz leki"
      >
        {allMedicines.map(({ name, id }) => <Select.Option value={id}>{name}</Select.Option>)}
      </Select>
    );
  }

  renderSelectContraindicationsInteractions(){
    const { medicine, allContraindications } = this.props;
    const { interactions } = medicine;
    return(
      <Select 
        multiple 
        defaultValue={interactions.contraindications.toJS()}
        onChange={(value) => console.log(value)}
        placeholder="Wybierz przeciwwskazania"
      >
        {allContraindications.map(({ name, id }) => <Select.Option value={id}>{name}</Select.Option>)}
      </Select>
    );
  }

  render(){
    const { name } = this.props.medicine;

    return(
      <div className={styles.container}>
        <Spin spinning={false}>
          <Card>
            <Form onSubmit={this.onSubmit}>
              <Form.Item label="Nazwa">
                <Input 
                  defaultValue={name} 
                  ref={(ref) => this.name = ref} 
                />
              </Form.Item>
              <Form.Item label="Interakcje z lekami">
                {this.renderSelectMedicinesInteractions()}
              </Form.Item>
              <Form.Item label="Przeciwwskazania">
                {this.renderSelectContraindicationsInteractions()}
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </div>
    );
  }
}

export default MedicineForm;