/*
 * @Author: zengzijian
 * @Date: 2018-07-24 15:51:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-31 10:43:24
 * @Description: 每个容器的页眉
 */
import React, { Component } from 'react';
import BreadCrumb from '@/components/BreadCrumb';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/**
 * 容器页面的面包屑导航以及页面基础信息
 * 
 * @class PageHeader
 * @extends {Component}
 */
@withRouter
@inject('store')
@observer
class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { index: 0 }
    }

    render() {
        return (
            <div className="panel-header">
                <BreadCrumb nav={this.props.meta.nav} />
                {/* <p className='title'>
                    {this.props.meta.title} <span className="description">{this.props.meta.descript}</span>
                </p> */}
            </div>
        )
    }
}
PageHeader.propTypes = {
    isShowBtns: PropTypes.bool,
    isShowSelect: PropTypes.bool,
    auth: PropTypes.shape({
        test: PropTypes.bool,
        sql: PropTypes.bool,
        version: PropTypes.bool,
    })
}
PageHeader.defaultProps = {
    isShowBtns: false,
    isShowSelect: false,
    auth: {
        test: false,
        sql: false,
        version: false,
    }
}
export default PageHeader