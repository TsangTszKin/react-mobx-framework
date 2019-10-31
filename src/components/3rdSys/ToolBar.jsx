import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import { Button, Select, Input } from 'antd'

@withRouter @inject('store') @observer
class ToolBar extends Component {
    render() {
        return (
            <div className="clearfix" style={style.searchPanel}>
                <div className="clearfix" style={style.searchShell}>
                    <Button size="small" icon="plus" onClick={() => this.props.history.push('/mock/sysapi/sys/save')}>新增</Button>
                </div>
                <div className="clearfix" style={style.searchShell}>
                    <span style={style.searchTitle}>所属地市 :</span>
                    <Select dropdownMatchSelectWidth={false} allowClear={true} size="small" style={{ minWidth: '100px', width: 'fit-content' }} placeholder="请选择"
                        value={this.props.store.list.getData.query.city}
                        onChange={(value) => {
                            if (value === undefined) value = ''
                            let query = this.props.store.list.getData.query;
                            query.city = value
                            this.props.store.list.updateData('query', query);
                        }}>
                        {
                            this.props.store.helper.getData.city.map((item, i) =>
                                <Select.Option key={i} value={item.value}>{item.name}</Select.Option>
                            )
                        }
                    </Select>
                </div>
                <div className="clearfix" style={style.searchShell}>
                    <span style={style.searchTitle}>所属单位 :</span>
                    <Select dropdownMatchSelectWidth={false} allowClear={true} size="small" style={{ minWidth: '100px', width: 'fit-content' }} placeholder="请选择"
                        value={this.props.store.list.getData.query.unit}
                        onChange={(value) => {
                            if (value === undefined) value = ''
                            let query = this.props.store.list.getData.query;
                            query.unit = value
                            this.props.store.list.updateData('query', query);
                        }}>
                        {
                            this.props.store.helper.getData.company.map((item, i) =>
                                <Select.Option key={i} value={item.value}>{item.name}</Select.Option>
                            )
                        }
                    </Select>
                </div>
                <div className="clearfix" style={style.searchShell}>
                    <span style={style.searchTitle}>所属系统 :</span>
                    <Select dropdownMatchSelectWidth={false} allowClear={true} size="small" style={{ minWidth: '100px', width: 'fit-content' }} placeholder="请选择"
                        value={this.props.store.list.getData.query.systemName}
                        onChange={(value) => {
                            if (value === undefined) value = ''
                            let query = this.props.store.list.getData.query;
                            query.systemName = value
                            this.props.store.list.updateData('query', query);
                        }}>
                        {
                            this.props.store.helper.getData.system.map((item, i) =>
                                <Select.Option key={i} value={item.value}>{item.name}</Select.Option>
                            )
                        }
                    </Select>
                </div>
                <div className="clearfix" style={style.searchShell}>
                    <Button size="small" type="primary" onClick={this.props.store.getListForApi}>查询</Button>
                </div>
            </div>
        );
    }
}

ToolBar.propTypes = {

};

export default ToolBar;

const style = {
    searchPanel: {
        marginBottom: '20px'
    },
    searchShell: {
        margin: '0px 30px 10px 0px',
        width: 'fit-content',
        float: 'left',
        height: '25px'
    },
    searchTitle: {
        height: '21px',
        lineHeight: '21px',
        display: 'inline-block',
        marginRight: '5px'
    }
}