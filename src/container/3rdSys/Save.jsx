/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import store from '@/store/3rdSys/Save'
import { Divider, Modal, Table, Button, Icon, Popconfirm, Select, Input, message } from 'antd'
import Info from '@/components/3rdSys/info';
import common from '@/utils/common';
import EditModal from '@/components/3rdSys/EditModal';
import Content from '@/components/3rdSys/Content';
import FormButtonGroup from '@/components/3rdSys/FormButtonGroup';

@withRouter @observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.store = new store
        this.init = this.init.bind(this);
        this.state = {
            tabActiveKey: '1'
        }
    }

    componentDidMount() {
        
        this.store.getAddPageSelectionForApi();
        if (this.props.match.params.id) this.init()

    }

    init() {
        this.store.getDetailForApi(this.props.match.params.id);
    }

    changeEditData(key, value) {
        let field = this.store.edit.getData.field
        field[key] = value
        this.store.edit.updateData('field', field)
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className='panel'>
                    <PageHeader meta={this.props.meta} />
                    <div className="pageContent">

                        <Info />

                        <Divider orientation="left" style={{ marginTop: '60px' }}>数据包结构</Divider>

                        <Table
                            scroll={{ x: this.store.details.getData.messageDataAreas.length > 0 ? 1100 : 'auto' }}
                            size="small"
                            columns={columns}
                            dataSource={(() => {
                                let rs = [];
                                // let layer = 0
                                let list = this.store.details.getData.messageDataAreas
                                list.forEach((el, i) => {
                                    // let originEl = common.deepClone(el)
                                    el.index = i + 1;
                                    el.name_ = <Input value={el.name} size="small" style={{ width: '200px' }} placeholder="请输入"
                                        onChange={e => {
                                            list[i].name = e.target.value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    />
                                    el.encode_ = <Input value={el.encode} size="small" style={{ width: '100px' }} placeholder="请输入"
                                        onChange={e => {
                                            list[i].encode = e.target.value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    />
                                    el.type_ = <Select value={el.type} size="small" style={{ width: '120px' }} placeholder="请选择"
                                        onChange={value => {
                                            list[i].type = value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    >
                                        {
                                            this.store.helper.getData.dataAreaType.map((item, i) =>
                                                <Select.Option key={i} {...item}>{item.name}</Select.Option>
                                            )
                                        }
                                    </Select>
                                    el.need_ = <Select value={el.need} size="small" style={{ width: '50px' }} placeholder="请选择"
                                        onChange={value => {
                                            list[i].need = value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    >
                                        <Select.Option value="1">是</Select.Option>
                                        <Select.Option value="0">否</Select.Option>
                                    </Select>
                                    el.general_ = <Select value={el.general} size="small" style={{ width: '50px' }} placeholder="请选择"
                                        onChange={value => {
                                            list[i].general = value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                        disabled={!common.isEmpty(el.id)}
                                    >
                                        <Select.Option value="1">是</Select.Option>
                                        <Select.Option value="0">否</Select.Option>
                                    </Select>
                                    el.loop_ = <Select value={el.loop} size="small" style={{ width: '50px' }} placeholder="请选择"
                                        onChange={value => {
                                            list[i].loop = value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    >
                                        <Select.Option value="1">是</Select.Option>
                                        <Select.Option value="0">否</Select.Option>
                                    </Select>
                                    el.lengthCode_ = el.loop === '1'?<Input value={el.lengthCode} size="small" style={{ width: '100px' }} placeholder="请输入"
                                        onChange={e => {
                                            list[i].lengthCode = e.target.value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    />
                                    :
                                    <span></span>
                                    el.remark_ = <Input value={el.remark} size="small" style={{ width: '150px' }} placeholder="请输入"
                                        onChange={e => {
                                            list[i].remark = e.target.value
                                            this.store.details.updateData('messageDataAreas', list)
                                        }}
                                    />
                                    el.action = <div style={{ textAlign: 'center' }}>
                                        <Popconfirm title="确定删除该条数据吗" okText="确定" cancelText="取消"
                                            onConfirm={() => {
                                                list.splice(i, 1)
                                                this.store.details.updateData('messageDataAreas', list)
                                            }}
                                        >
                                            <Icon type="delete" style={{ cursor: 'pointer' }} title="删除" />
                                        </Popconfirm>
                                        <Divider type="vertical" />
                                        <Icon type="arrow-up" style={{ cursor: i === 0 ? 'not-allowed' : 'pointer' }} title="向上移动一行"
                                            onClick={() => {
                                                if (i === 0) return
                                                const index1 = i - 1;
                                                const index2 = i;
                                                list.splice(index2, 1, list[index1])
                                                list[index1] = el
                                                this.store.details.updateData('messageDataAreas', list)
                                            }}
                                        />
                                        <Divider type="vertical" />
                                        <Icon type="arrow-down" style={{ cursor: i === list.length - 1 ? 'not-allowed' : 'pointer' }} title="向下移动一行"
                                            onClick={() => {
                                                if (i === list.length - 1) return
                                                const index1 = i + 1;
                                                const index2 = i;
                                                list.splice(index2, 1, list[index1])
                                                list[index1] = el
                                                this.store.details.updateData('messageDataAreas', list)
                                            }}
                                        />
                                        <Divider type="vertical" />
                                        <a title="编辑"
                                            disabled={el.general !== '1'}
                                            onClick={() => {
                                                this.store.edit.updateData('index', i)
                                                this.store.edit.updateData('messageDataAreas', el)
                                                this.store.edit.updateData('visible', true)
                                            }}
                                        >编辑通用包体</a>
                                    </div>
                                    rs.push(el)
                                })

                                return rs
                            })()}
                            pagination={false}
                        />
                        <Button
                            style={{ marginTop: '10px' }}
                            type="dashed"
                            block
                            onClick={() => {
                                this.store.details.add()
                            }}>新增数据包</Button>

                    </div>

                    <Modal
                        destroyOnClose
                        title={`${common.isEmpty(this.store.edit.getData.index) ? '新增' : '修改'}字段信息`}
                        visible={this.store.edit.getData.visible}
                        width={1000}
                        onCancel={() => this.store.edit.updateData('visible', false)}
                        footer={[
                            <Button key="back" onClick={() => this.store.edit.updateData('visible', false)}>
                                关闭
                            </Button>,
                        ]}
                    >
                        <Content />
                    </Modal>

                    <Modal
                        destroyOnClose
                        title={`${common.isEmpty(this.store.edit2.getData.nodeKey) ? '新增' : '修改'}字段信息`}
                        visible={this.store.edit2.getData.visible}
                        onOk={() => {
                            let field = this.store.edit2.getData.field
                            let currentNodeKey = this.store.edit2.getData.nodeKey
                            let messageDataAreas = this.store.details.getData.messageDataAreas

                            // 空校验
                            const { name, outCode, inCode, needInput, dataType, length, alignment, fillCharacter } = field
                            if (common.isEmpty(name)) { message.warning('字段名称 - 不能为空'); return }
                            if (common.isEmpty(outCode)) { message.warning('字段代码（外部）- 不能为空'); return }
                            if (common.isEmpty(inCode)) { message.warning('字段代码（内部）- 不能为空'); return }
                            if (common.isEmpty(needInput)) { message.warning('是否必输 - 不能为空'); return }
                            if (common.isEmpty(dataType)) { message.warning('数据类型 - 不能为空'); return }
                            if (common.isEmpty(length)) { message.warning('长度 - 不能为空'); return }
                            if (common.isEmpty(alignment)) { message.warning('对齐方式 - 不能为空'); return }
                            if (common.isEmpty(fillCharacter)) { message.warning('填充字符 - 不能为空'); return }

                            //寻找当前编辑的节点
                            let targetNode = null
                            let findTargetNode = (node) => {
                                if (node.key === currentNodeKey) {
                                    targetNode = node
                                } else {
                                    if (!common.isEmpty(node.child)) {
                                        for (let i = 0; i < node.child.length; i++) {
                                            findTargetNode(node.child[i])
                                        }
                                    }
                                }
                            }
                            if (!messageDataAreas[this.store.edit.getData.index].messageDataAreaFields) messageDataAreas[this.store.edit.getData.index].messageDataAreaFields = []
                            messageDataAreas[this.store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                findTargetNode(el);
                            })
                            if (targetNode) {
                                for (const key in field) {
                                    if (field.hasOwnProperty(key)) {
                                        const element = field[key];
                                        targetNode[key] = element
                                    }
                                }
                            } else {
                                messageDataAreas[this.store.edit.getData.index].messageDataAreaFields.push(field)
                            }
                            this.store.details.updateData('messageDataAreas', messageDataAreas)
                            this.store.resetNodeKey()
                            this.store.edit2.updateData('visible', false)
                        }}
                        onCancel={() => {
                            this.store.edit2.updateData('visible', false)
                        }}
                    >
                        <EditModal />
                    </Modal>

                    <FormButtonGroup />

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
        title: '数据包名',
        dataIndex: 'name_',
        key: 'name_',
        width: 200
    },
    {
        title: '数据包代码',
        dataIndex: 'encode_',
        key: 'encode_'
    },
    {
        title: '数据包类型',
        dataIndex: 'type_',
        key: 'type_'
    },
    {
        title: '是否必选',
        dataIndex: 'need_',
        key: 'need_'
    },
    {
        title: '是否通用',
        dataIndex: 'general_',
        key: 'general_'
    },
    {
        title: '是否循环体',
        dataIndex: 'loop_',
        key: 'loop_'
    },
    {
        title: '循环体长度代码',
        dataIndex: 'lengthCode_',
        key: 'lengthCode_'
    },
    {
        title: '说明',
        dataIndex: 'remark_',
        key: 'remark_'
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 150
    }];



