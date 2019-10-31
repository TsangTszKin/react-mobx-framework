/*
 * @Author: zengzijian
 * @Date: 2018-10-12 16:59:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-24 14:06:50
 * @Description: 
 */
import React, { Component } from 'react';
import { Avatar, Divider, Icon, Menu, Dropdown, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TopNav from '@/components/TopNav';
import PropTypes from 'prop-types';
import authService from '@/api/authService';
import common from '@/utils/common';
import logo from '@/assets/logo2.png';
import nongxinlogo from '@/assets/nongxin-logo.png';
import shuangzhaokeji from '@/assets/shuangzhaokeji.png';

@withRouter
@inject('GlobalStore')
@observer
class Top extends Component {
    constructor(props) {
        super(props);
        this.resizePanelCallBackFunc = this.resizePanelCallBackFunc.bind(this);
        this.resizePanelCallBackFunc();
    }

    componentDidMount() {
        // let self = this;
        // window.onresize = function () {
        //     self.resizePanelCallBackFunc();
        // }

    }

    resizePanelCallBackFunc = () => {
        let winWidth = 0;
        if (window.innerWidth) winWidth = window.innerWidth;
        else if (document.body && document.body.clientWidth)     //IE 
            winWidth = document.body.clientWidth;
        if (winWidth < 1190 && !this.props.collapsed) {
            this.props.changeCollapsed();
        }
    }

    logout = () => {
        common.loading.show();
        authService.logout().then(() => {
            common.loading.hide();
            // if (!publicUtils.isOk(res)) return
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            this.props.history.replace('/login')
        }).catch(() => common.loading.hide())

        // localStorage.removeItem('token');
        // localStorage.removeItem('userName');
        // this.props.history.replace('/login')
    }
    callback = () => {
        // console.log(key);
    }
    componentWillMount() {
        if (this.props.GlobalStore.userInfo.getName == '') {
            this.props.GlobalStore.userInfo.setName(localStorage.userName);
            this.props.GlobalStore.userInfo.setOrgName(localStorage.orgName);
        }
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1"
                    //  onClick={() => this.logout()}
                    onClick={() => this.props.history.push('/login')}

                ><Icon type="logout" /><span style={{ marginLeft: "5px" }}>退出</span></Menu.Item>
            </Menu>
        );
        // console.log("this.props.GlobalStore.menu.getTop layout top", this.props.GlobalStore.menu.getTop);
        return (
            <div className='header clear clearFix'>
                <div className="aside-o">
                    <Button className="aside-ctr" type="primary" onClick={this.props.changeCollapsed} style={{ boxShadow: 'none', backgroundColor: '#262a34', color: '#fff' }}>
                        <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>

                </div>


                {/* <div className='userInfo clearfix' style={{width: 'fit-content', position: 'absolute', top: '0', left: '15px'}}>
                    <div className="right" style={{ width: '90px', height: '100%', lineHeight: '60px'}}>
                        <img src={nongxinlogo} style={{ height: '40px' }} />
                    </div>
                    <Divider type="vertical" style={{float: 'left', height: '40%', marginTop: '22px'}} />
                    <div className="left" style={{ width: '38px', height: '100%', lineHeight: '60px'}}>
                        <img src={logo} style={{ height: '22px' }} />
                    </div>
                    <div className="right" style={{display: 'block', height: '100%', lineHeight: '60px'}}>
                        <img src={shuangzhaokeji} style={{ width: '55px',}} />
                    </div>

                </div> */}

                <div className="nav-o">
                    <TopNav topMenu={this.props.topMenu} />
                </div>

                <div className='user'>
                    <Avatar size="small" icon="user" />
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link name" href="javascript:void(0);">
                            {this.props.GlobalStore.userInfo.getOrgName} - {this.props.GlobalStore.userInfo.getName}<Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}
Top.propTypes = {
    changeCollapsed: PropTypes.func,
    collapsed: PropTypes.bool
}
Top.defaultProps = {
    changeCollapsed: () => { },
    collapsed: false
}
export default Top