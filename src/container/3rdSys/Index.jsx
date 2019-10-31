/* eslint-disable react/display-name */
import React, { Component, Fragment } from 'react';
import { Provider, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import store from '@/store/3rdSys/Index'
import Paging from '@/components/Paging';
import { Tag, Spin, Table, Divider, Popconfirm } from 'antd'
import common from '@/utils/common';
import ToolBar from '@/components/3rdSys/ToolBar'

@withRouter @observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.store = new store({ query: { city: '', unit: '', systemName: '' } })
        this.init = this.init.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {

        this.store.getSelectionForApi();
        this.store.getListForApi();
    }

    changePage = (pageNum, pageSize) => {
        console.log("分页回调：当前页码" + pageNum);
        console.log("分页回调：获取条数" + pageSize);
        this.store.list.updateData('pageNum', pageNum);
        this.store.list.updateData('pageSize', pageSize);
        this.store.getListForApi();
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className='panel'>
                    <PageHeader meta={this.props.meta} />
                    <div className="pageContent">

                        <ToolBar />

                        <Spin spinning={this.store.list.getData.loading} size="large">
                            <Table
                                scroll={{ x: this.store.list.getData.dataSource.length > 0 ? 1100 : 'auto' }}
                                // rowSelection={rowSelection}
                                columns={columns}
                                dataSource={(() => {
                                    let dataSource = common.deepClone(this.store.list.getData.dataSource);
                                    dataSource.forEach((el, i) => {
                                        el.index = i + 1;
                                        el.action = <Fragment>
                                            <a onClick={() => {
                                                this.props.history.push(`/mock/sysapi/sys/save/${el.id}`)
                                            }}>编辑</a>
                                            <Divider type="vertical" />
                                            <Popconfirm
                                                title="确定删除该数据吗？"
                                                onConfirm={() => {
                                                    this.store.deleteForApi(el.id);
                                                }}
                                                onCancel={() => { }}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <a >删除</a>
                                            </Popconfirm>
                                        </Fragment>
                                    })
                                    return dataSource
                                })()}
                                pagination={false} />
                        </Spin>
                        <Paging
                            pageNum={this.store.list.getData.pageNum}
                            total={this.store.list.getData.total}
                            showPageSize={this.store.list.getData.pageSize}
                            changePage={this.changePage}
                        />

                    </div>
                </div>

            </Provider>
        );
    }
}

export default Index;

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: '服务端系统',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '所属地市',
        dataIndex: 'cityName',
        key: 'cityName'
    },
    {
        title: '所属单位',
        dataIndex: 'unitName',
        key: 'unitName'
    },
    {
        title: '协议类型',
        dataIndex: 'protocolTypeName',
        key: 'protocolTypeName',
        render: (value) => {
            return <Tag>{value}</Tag>
        }
    },
    {
        title: '报文格式',
        dataIndex: 'messageFormatName',
        key: 'messageFormatName',
        render: (value) => {
            return <Tag>{value}</Tag>
        }
    },
    {
        title: '编码方式',
        dataIndex: 'encodeName',
        key: 'encodeName',
        render: (value) => {
            return <Tag>{value}</Tag>
        }
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime'
    },
    {
        title: '修改人',
        dataIndex: 'updatePeople',
        key: 'updatePeople'
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 50
    }];

