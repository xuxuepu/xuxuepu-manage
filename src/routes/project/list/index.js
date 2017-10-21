import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import './index.less';
import { Table, Icon, Button, Popover, Modal, Popconfirm, Tooltip } from 'antd';
import { Link } from 'dva/router';

let url = location.protocol + '//' + window.location.hostname;
let wlp = window.location.port;
if(wlp != '' && wlp != '80'){
  url = url + ':' + wlp;
}

//复制链接
const copyText = (index)=> {
  let inputText = document.getElementById('btnCopy'+index);
  let currentFocus = document.activeElement;
  inputText.focus();
  inputText.setSelectionRange(0, inputText.value.length);
  document.execCommand('copy', true);
};

const columns = (dispatch)=>{
  let column = [{
    title: '序号',
    render: (text, record, index) => <span>{index+1}</span>
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <a href="javascript:void(0);" onClick={()=>dispatch({ type: 'projectList/showModal', payload: record._id })}>{text}</a>
  },
    {
      title: '类型',
      dataIndex: 'view_type',
      key: 'view_type'
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
    }, {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record, index) => (
        <span>
          <Popover placement="topRight" content={<div id={`qrcode${record._id}`} style={{minWidth:100,minHeight:100,margin:'8px 0'}}></div>} trigger="click">
              <Icon type="qrcode" style={{fontSize:20,cursor:'pointer'}} onClick={()=>{
                let fun = ()=>{
                  let qrcodedom = document.getElementById(`qrcode${record._id}`);
                  if(qrcodedom){
                    if(!qrcodedom.innerHTML){
                      let src = url + '/mobile?id=' + record._id ;
                      let qrcode = new QRCode(qrcodedom, {width: 100, height: 100});
                      qrcode.makeCode(src);
                    }
                  }else{
                    setTimeout(()=>{
                      fun();
                    },500);
                  }
                };
                fun();
              }}/>
          </Popover>
          <span className="ant-divider" />
          <Tooltip placement="top" trigger="click" title={`${url +'/mobile?id='+record._id} 已复制到剪贴板`}>
              <a href="javascript:void(0);" onClick={()=>copyText(index+1)}>url</a>
          </Tooltip>
          <input type='text' id={"btnCopy"+(index+1).toString()}  style={{position:'absolute',opacity:0,zIndex:-1}}
                 value={url +'/mobile?id='+record._id}/>
          <span className="ant-divider" />
          <Link to={`/project/details?id=${record._id}`}><Icon type="edit" style={{fontSize:20}} /></Link>
          <span className="ant-divider" />
          <Popconfirm title="确认是否复制？" onConfirm={()=>dispatch({type: 'projectList/viewCopy', _id: record._id})}><a href="javascript:void(0);"><Icon type="copy" style={{fontSize:20}} /></a></Popconfirm>
          <span className="ant-divider" />
          <Popconfirm title="确认是否删除？" onConfirm={()=>dispatch({type: 'projectList/viewDelete', _id: record._id})}><a href="javascript:void(0);"><Icon type="delete" style={{fontSize:20}} /></a></Popconfirm>
        </span>
      ),
    }];

  return column;
};

const ProjectList = ({ projectList, dispatch }) => {
  return (
    <div>
      <div style={{marginBottom:10}}>
        <Link to="/project/details">
          <Button type="primary" icon="plus">新增</Button>
        </Link>
      </div>
      <div>
        <Table columns={columns(dispatch)} dataSource={projectList.dataItem} loading={projectList.loading} pagination={false}/>
      </div>
      <Modal title="横屏预览" visible={projectList.modalVisble} footer={null} onCancel={()=>dispatch({ type: 'projectList/hideModel' })} width={698}>
        <iframe src={projectList.iframeUrl} width="667" height="375" style={{padding:0,margin:0,border:'1px solid #ccc'}}/>
      </Modal>
    </div>
  );
};

ProjectList.propTypes = {
  form: PropTypes.object,
  projectList: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ projectList }) => ({ projectList }))(ProjectList);
