import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd';
import Style from './index.less';

const FormItem = Form.Item;

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFields
    }
  }) => {
  const { loginLoading } = login;
  //点击登录
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({type: 'login/login', payload: values});
      }
    });
  };

  return (
    <div className={Style.loginBody}>
      <Form className={Style.loginForm} onSubmit={handleSubmit}>
        <FormItem className={Style.title}>胖墩XXXXXXXXL</FormItem>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{required: true, message: '请输入用户名!'}]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码!'}]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem className={Style.bottom}>
          <Button type="primary" htmlType="submit" loading={loginLoading}>登录</Button>
        </FormItem>
      </Form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ login }) => ({login}))(Form.create()(Login));
