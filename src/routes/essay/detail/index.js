import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import Style from './index.less';
import { Form, Input, Button, Tabs, Modal } from 'antd';
import Ueditor from './../../../components/Ueditor/Ueditor.jsx';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
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
      offset: 6,
    },
  },
};

const ProjectDetails = ({ projectDetails, dispatch, form: {
    getFieldDecorator,
    validateFields,
    setFieldsValue
  }}) => {
  let ad = projectDetails.addEditData;
  //点击提交
  const clickHandleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'projectDetails/handleSubmit', payload: values})
      }
    });
  };

  return (
    <Form id="myForm" style={{marginTop:20}} action="#" method="post" encType="multipart/form-data"
          onSubmit={(e)=>clickHandleSubmit(e)}>
      <FormItem {...formItemLayout} label="标题" hasFeedback>
        <input type="hidden" name="_id" value={ad._id || ''}/>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入标题!' }],
        })(
          <Input placeholder="请输入标题" name="title"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="内容">
        <input type="hidden" name="view_type" value={ad.view_type}/>
        <Tabs onChange={(e)=>dispatch({ type: 'projectDetails/changeTabs', e: e })} type="card" activeKey={ad.view_type}>
          <TabPane tab="输入" key="word">
            <Ueditor id="content" value={ad.content} />
          </TabPane>
          <TabPane tab="excel导入" key="excel">
            <input type="file" id="fileInput" name="excel_file" />
            <table style={{fontSize:12,width:'100%'}}>
              {
                typeof ad.content == "object" ? ad.content.map((dd,i)=>{
                    if(i==0){
                      return(<tr>{dd.map((ddd)=><th key={{i}}><div className="no_pre t_l">{ddd}</div></th>)}</tr>)
                    }else{
                      return(<tr>{dd.map((ddd)=><td key={{i}}>{ddd}</td>)}</tr>)
                    }
                  }):''
              }
            </table>
          </TabPane>
        </Tabs>
      </FormItem>
      {
        ad.signs && ad.signs.length > 0 ?
          <FormItem {...formItemLayout} label="签名记录">
            {ad.signs.map((d,i)=><div key={{i}} className={Style.signsList}>
                <div className={Style.div1}>{d.sign_name}</div>
                {
                  d.phone?<div className={Style.div2}>{d.phone}</div>:<div className={Style.div2}>&nbsp;</div>
                }
                {
                  d.EvID?<div className={Style.div3}>{d.EvID}</div>:<div className={Style.div3}>&nbsp;</div>
                }
                <div className={Style.div4}>{d.sign_time}</div>
              </div>
            )}
          </FormItem>
          : ''
      }
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={projectDetails.projectDetailsLoading}>确认</Button>&nbsp;&nbsp;
        <Button onClick={()=>browserHistory.go(-1)} >取消</Button>
      </FormItem>
    </Form>
  );
}

ProjectDetails.propTypes = {
  form: PropTypes.object,
  projectDetails: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ projectDetails }) => ({ projectDetails }))(Form.create()(ProjectDetails));
