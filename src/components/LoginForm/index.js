import React, { Component } from 'react';

import { Spin, Card, Form, Input, Icon, Button, Alert } from 'antd';

import styles from './styles.css';

class LoginForm extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmitForm({ 
      username: this.username.refs.input.value,
      password: this.password.refs.input.value
    });
  }

  render(){
    const { isSpinning, errorMessage } = this.props;

    return(
      <div className={styles.container}>
        <Spin spinning={isSpinning}>
          <Card title="Panel logowania">
            <Form onSubmit={this.onSubmit}>
              <Form.Item>
                <Input 
                  addonBefore={<Icon type="user" />} 
                  placeholder="Username" 
                  ref={(ref) => this.username = ref} 
                />
              </Form.Item>
              <Form.Item>
                <Input 
                  addonBefore={<Icon type="lock" />} 
                  placeholder="Password" 
                  type="password"
                  ref={(ref) => this.password = ref} 
                />
              </Form.Item>
              <Form.Item className={styles.button__container}>
                <Button type="primary" htmlType="submit" className={styles.button}>
                  Zaloguj
                </Button>
              </Form.Item>
            </Form>
            {errorMessage &&
              <Alert 
                message={errorMessage}
                type="error"
                showIcon
              />
            }
          </Card>
        </Spin>
      </div>
    );
  }
}

export default LoginForm;
