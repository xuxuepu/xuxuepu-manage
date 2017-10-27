import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Form, Input, Button, Modal } from 'antd';
import Ueditor from './../../../components/Ueditor/Ueditor.jsx';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 3,
    },
  },
};

const ResumeDetail = ({ resumeMy, dispatch, form: {
    getFieldDecorator,
    validateFields,
    setFieldsValue
  }}) => {
  let ad = resumeMy.addEditData;
  //点击提交
  const clickHandleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'resumeMy/editResume', data: values})
      }
    });
  };

  return (
    <Form id="myForm" style={{marginTop:20}} action="#" method="post" encType="multipart/form-data" onSubmit={(e)=>clickHandleSubmit(e)}>
      <FormItem {...formItemLayout} label="标题" hasFeedback>
        {getFieldDecorator('title', {
          initialValue: ad.title,
          rules: [{ required: true, message: '请输入标题!' }],
        })(
          <Input placeholder="请输入标题" name="title"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="授权码" hasFeedback>
        {getFieldDecorator('authorization_code', {
          initialValue: ad.authorization_code,
          rules: [{ required: true, message: '请输入授权码!' }],
        })(
          <Input placeholder="请输入授权码" name="authorization_code"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="内容">
        <Ueditor id="content" value={ad.content} />
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={resumeMy.loading}>确认</Button>&nbsp;&nbsp;
        <Button onClick={()=>browserHistory.go(-1)} >取消</Button>
      </FormItem>
    </Form>
  );
}

ResumeDetail.propTypes = {
  form: PropTypes.object,
  resumeMy: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ resumeMy }) => ({ resumeMy }))(Form.create()(ResumeDetail));
