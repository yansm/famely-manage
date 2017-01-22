import React from 'react';
const PropTypes = React.PropTypes;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isEmpty} from 'lodash';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

@connect((user) => (user), null)
class Component extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.displayName = 'Component';
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  onMenuSelect = function({key}){
    this.context.router.push('/'+key);
  }
  render() {
    const {
      location
    } = this.props;
    return (
      <Layout className="main-layout">
        <Header className="main-header">
          <div>FAME</div>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu  onSelect={this.onMenuSelect} className={'main-menu'} defaultOpenKeys={['auto']} mode="inline" defaultSelectedKeys={['1']}>
              <SubMenu key="auto" title={<span><Icon type="appstore" /><span>通用</span></span>}>
                  <Menu.Item key="fame/moment-user">通用榜单</Menu.Item>
                  <Menu.Item key="fame/switch">通用开关</Menu.Item>
              </SubMenu>
              <SubMenu key="pubsub" title={<span><Icon type="tags" /><span>订阅</span></span>}>
                  <Menu.Item key="pubsub/users">用户列表</Menu.Item>
                  <Menu.Item key="pubsub/albums">专辑列表</Menu.Item>
                  <Menu.Item key="pubsub/medias">媒体列表</Menu.Item>
                  <Menu.Item key="pubsub/orders">订单列表</Menu.Item>
              </SubMenu>
              <SubMenu key="fame" title={<span><Icon type="windows" /><span>程序</span></span>}>
                  <Menu.Item key="fame/hotfix">用户列表</Menu.Item>
                  <Menu.Item key="fame/lang">专辑列表</Menu.Item>
                  <Menu.Item key="fame/versions">媒体列表</Menu.Item>
                  <Menu.Item key="fame/sticker">订单列表</Menu.Item>
              </SubMenu>
              <SubMenu key="manager" title={<span><Icon type="dot-chart" /><span>后台</span></span>}>
                  <Menu.Item key="operator">操作者管理</Menu.Item>
                  <Menu.Item key="role">角色管理</Menu.Item>
                  <Menu.Item key="module">模块管理</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content className="main-content">
              {
                React.Children.map(this.props.children, child => React.cloneElement(child))
              }
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Copyright © 2016 fameapp.us All rights reserved.
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Component;
 