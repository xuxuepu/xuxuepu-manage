import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import Style from './index.less';
import {Layout, Menu, Breadcrumb, Dropdown, Icon, Modal} from 'antd';
import { Link } from 'dva/router';
import login from './../../models/login';
const {Header, Content, Footer} = Layout;

function clickMenu(v, dispatch) {
  if(v.key == 'list'){
    
  }else if(v.key == 'logout'){
    dispatch({type: 'layout/logOut'});
  }else{
    Modal.info({
      title: '提示',
      content: (
        <div>
          <p>更多功能敬请期待...</p>
        </div>
      ),
      onOk() {}
    });
  }
}

const LayoutDOM = ({children, location, dispatch}) => {

  if (location.pathname == "/login" || location.pathname == "/") {
    return <div>{children}</div>
  }

  return (
    <Layout>
      <Header>
        <div style={{width: 1024, margin: '0 auto'}}>
          <div className={Style.logo}>胖墩XXXXXXXXL</div>
          <Menu theme="dark" mode="horizontal" selectedKeys={['list']} style={{lineHeight: '64px', float: 'left'}} onClick={(v)=>clickMenu(v, dispatch)}>
            <Menu.Item key="list">文章列表</Menu.Item>
            <Menu.Item key="2">picture</Menu.Item>
            <Menu.Item key="3">audio</Menu.Item>
            <Menu.Item key="4">more</Menu.Item>
            <Menu.Item key="5">about</Menu.Item>
          </Menu>
          <Dropdown overlay={<Menu onClick={(v)=>clickMenu(v, dispatch)}>
            <Menu.Item key="logout" style={{textAlign: 'center'}}>退出登录</Menu.Item>
          </Menu>} trigger={['click']}>
    <span style={{color: '#fff', float: 'right', cursor: 'pointer', height: 48}}>
  {'许学普'}&nbsp;<Icon type="down"/>
  </span>
          </Dropdown>
        </div>
      </Header>
      <Content style={{width: 1024, margin: '0 auto'}}>
        <Breadcrumb style={{margin: '12px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
          {
            true ? <Breadcrumb.Item>Details</Breadcrumb.Item> : ''
          }
        </Breadcrumb>
        <div style={{background: '#fff', padding: 24, minHeight: 450}}>
          {children}
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        xuxuepu-manage ©2017 Created by xuxuepu
      </Footer>
    </Layout>
  );
};

LayoutDOM.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect()(LayoutDOM);
