import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types';
import Style from './index.less';
import {Layout, Menu, Breadcrumb, Dropdown, Icon, Modal} from 'antd';
import { Link } from 'dva/router';

const { Header, Sider, Content } = Layout;

function clickMenu(v, dispatch) {
  if(v.key == 'logout'){
    dispatch({type: 'layout/logOut'});
  }else if(v.key.indexOf('null') >= 0){
    Modal.info({
      title: '提示',
      content: (
        <div>
          <p>更多功能敬请期待...</p>
        </div>
      ),
      onOk() {}
    });
  }else{
    dispatch({type: 'layout/skip', action: v.key});
  }
}

const LayoutDOM = ({children, location, dispatch, layout}) => {

  let loginInfo = layout.loginInfo;

  if (location.pathname == "/login" || location.pathname == "/") {
    return <div>{children}</div>
  }

  const toggleSider = ()=>{
    dispatch({type: 'layout/toggleSider'});
  }

  return (
    <Layout className={Style.layout}>
      <Sider trigger={null} collapsible collapsed={layout.collapsed} >
          <div className={Style.logo}>胖墩&nbsp;-&nbsp;后台管理系统</div>
          <Menu theme="dark" selectedKeys={['list']} onClick={(v)=>clickMenu(v, dispatch)}>
            <Menu.Item key="/essay/list">
            <Icon type="file-text" />
              <span>文章列表</span>
            </Menu.Item>
            <Menu.Item key="/resume/my">
              <Icon type="solution" />
              <span>我的简历</span>
            </Menu.Item>
            <Menu.Item key="null1">
              <Icon type="appstore" />
              <span>更多...</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon className={Style.trigger} type={layout.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggleSider} />
            <div className={Style.dropdownDiv}>
              <Dropdown overlay={<Menu onClick={(v)=>clickMenu(v, dispatch)}>
                <Menu.Item key="logout" style={{textAlign: 'center'}}>退出登录</Menu.Item>
              </Menu>} trigger={['click']}>
          <span style={{color: '#333', float: 'right', cursor: 'pointer', height: 48}}>
        {loginInfo && loginInfo.username}&nbsp;<Icon type="down"/>
        </span>
              </Dropdown>
            </div>
          </Header>
          <Content style={{position: 'relative'}}>
            <div className={Style.contentDiv}>
              {children}
            </div>
          </Content>
        </Layout>
    </Layout>
  );
};

LayoutDOM.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  layout: PropTypes.object
};

export default connect(({ layout }) => ({ layout }))(LayoutDOM);
