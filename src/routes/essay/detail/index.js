import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import Style from './index.less';
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

const EssayDetail = ({ essayDetail, dispatch, form: {
    getFieldDecorator,
    validateFields,
    setFieldsValue
  }}) => {
  let ad = essayDetail.addEditData;
  //点击提交
  const clickHandleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'essayDetail/handleSubmit', payload: values})
      }
    });
  };

  return (
    <Form id="myForm" style={{marginTop:20}} action="#" method="post" encType="multipart/form-data" onSubmit={(e)=>clickHandleSubmit(e)}>
      <FormItem {...formItemLayout} label="标题" hasFeedback>
        <input type="hidden" name="id" value={ad.id || ''}/>
        {getFieldDecorator('title', {
          initialValue: ad.title,
          rules: [{ required: true, message: '请输入标题!' }],
        })(
          <Input placeholder="请输入标题" name="title"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="作者" hasFeedback>
        {getFieldDecorator('author', {
          initialValue: ad.author,
          rules: [{ required: true, message: '请输入作者!' }],
        })(
          <Input placeholder="请输入作者" name="author"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="简介" hasFeedback>
        {getFieldDecorator('description', {
          initialValue: ad.description,
          rules: [{ required: true, message: '请输入简介!' }],
        })(
          <Input placeholder="请输入简介" name="description"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="内容">
        <Ueditor id="content" value={ad.content} />
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={essayDetail.essayDetailLoading}>确认</Button>&nbsp;&nbsp;
        <Button onClick={()=>browserHistory.go(-1)} >取消</Button>
      </FormItem>
    </Form>
  );
}

EssayDetail.propTypes = {
  form: PropTypes.object,
  essayDetail: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ essayDetail }) => ({ essayDetail }))(Form.create()(EssayDetail));
