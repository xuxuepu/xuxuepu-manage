import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import './index.less';
import { Table, Icon, Button, Popconfirm } from 'antd';
import { Link } from 'dva/router';

const columns = (dispatch)=>{
  let column = [{
    title: '序号',
    render: (text, record, index) => <span>{index+1}</span>
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '创建时间',
      dataIndex: 'create_date',
      key: 'create_date',
    }, {
      title: '操作',
      width: 100,
      render: (text, record, index) => (
        <span>
          <Link to={`/essay/detail?id=${record.id}`}><Icon type="edit" style={{fontSize:20}} /></Link>
          <span className="ant-divider" />
          <Popconfirm title="确认是否删除？" onConfirm={()=>dispatch({type: 'essayList/viewDelete', id: record.id})}><a href="javascript:void(0);"><Icon type="delete" style={{fontSize:20}} /></a></Popconfirm>
        </span>
      ),
    }];

  return column;
};

const EssayList = ({ essayList, dispatch }) => {
  return (
    <div>
      <div style={{marginBottom:10}}>
        <Link to="/essay/detail">
          <Button type="primary" icon="plus">新增</Button>
        </Link>
      </div>
      <div>
        <Table columns={columns(dispatch)} dataSource={essayList.dataItem} loading={essayList.loading} pagination={false}/>
      </div>
    </div>
  );
};

EssayList.propTypes = {
  form: PropTypes.object,
  essayList: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ essayList }) => ({ essayList }))(EssayList);
