/* eslint-disable no-inner-declarations */
/* eslint-disable no-case-declarations */
import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import FormCell from '@/components/FormCell'
import { Table, Button, Icon, Divider, Popconfirm, Modal, TreeSelect } from 'antd'
import common from '@/utils/common';

@inject('store') @observer
class Content extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parentSelection: '',
            currentSelection: ''
        }
    }

    changeData(key, value) {
        let query = this.propsstore.list;
        query[key] = value
        this.propsstore.list.updateData('query', query);
    }

    render() {
        const { store } = this.props
        return (
            <Fragment>
                <div className="clearfix" style={{}}>
                    <FormCell name="数据区名称">
                        <span style={{ width: 'fit-content', height: '32px', lineHeight: '32px', display: 'inline-block' }}>{store.details.getData.messageDataAreas[store.edit.getData.index].name}</span>
                    </FormCell>

                    <Button icon="import">导入数据格式</Button>

                    <Table
                        defaultExpandAllRows
                        childrenColumnName="child"
                        scroll={{ x: store.details.getData.messageDataAreas[store.edit.getData.index].messageDataAreaFields > 0 ? 1100 : 'auto' }}
                        size="small"
                        columns={columns}
                        dataSource={(() => {
                            let self = this
                            let fieldList = store.details.getData.messageDataAreas[store.edit.getData.index].messageDataAreaFields
                            packData(fieldList);
                            //递归方法
                            function packData(list = []) {
                                list.forEach((el, i) => {
                                    el.action = <div style={{ textAlign: 'center' }}>
                                        <Icon type="edit" style={{ cursor: 'pointer' }} title="编辑"
                                            onClick={() => {
                                                store.edit2.updateData('nodeKey', el.key)
                                                store.edit2.updateData('field', el)
                                                store.edit2.updateData('visible', true)
                                            }}
                                        />
                                        <Divider type="vertical" />
                                        <Popconfirm title="确定删除该条数据吗" okText="确定" cancelText="取消"
                                            onConfirm={() => {
                                                let tempArray = el.key.split('-');
                                                let last_key = tempArray.pop();
                                                let parent_nodeKey = tempArray.join('-');
                                                let p_match_node = null
                                                let findNode_p = (node) => {
                                                    if (node.key === parent_nodeKey) {
                                                        p_match_node = node
                                                    } else {
                                                        if (!common.isEmpty(node.child)) {
                                                            for (let i = 0; i < node.child.length; i++) {
                                                                findNode_p(node.child[i])
                                                            }
                                                        }
                                                    }
                                                }

                                                let messageDataAreas = store.details.getData.messageDataAreas
                                                messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                                    findNode_p(el);
                                                })
                                                if (p_match_node) {
                                                    p_match_node.child.splice(last_key, 1)
                                                } else {//根节点
                                                    messageDataAreas[store.edit.getData.index].messageDataAreaFields.splice(last_key, 1)
                                                }
                                                store.details.updateData('messageDataAreas', messageDataAreas)
                                                store.resetNodeKey()

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

                                                let tempArray = el.key.split('-');
                                                tempArray.pop();
                                                let parent_nodeKey = tempArray.join('-');
                                                let p_match_node = null
                                                let findNode_p = (node) => {
                                                    if (node.key === parent_nodeKey) {
                                                        p_match_node = node
                                                    } else {
                                                        if (!common.isEmpty(node.child)) {
                                                            for (let i = 0; i < node.child.length; i++) {
                                                                findNode_p(node.child[i])
                                                            }
                                                        }
                                                    }
                                                }
                                                let messageDataAreas = store.details.getData.messageDataAreas
                                                messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                                    findNode_p(el);
                                                })
                                                if (p_match_node) {
                                                    p_match_node.child = list
                                                } else {//根节点
                                                    messageDataAreas[store.edit.getData.index].messageDataAreas = list
                                                }
                                                store.details.updateData('messageDataAreas', messageDataAreas)
                                                store.resetNodeKey()
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

                                                let tempArray = el.key.split('-');
                                                tempArray.pop();
                                                let parent_nodeKey = tempArray.join('-');
                                                let p_match_node = null
                                                let findNode_p = (node) => {
                                                    if (node.key === parent_nodeKey) {
                                                        p_match_node = node
                                                    } else {
                                                        if (!common.isEmpty(node.child)) {
                                                            for (let i = 0; i < node.child.length; i++) {
                                                                findNode_p(node.child[i])
                                                            }
                                                        }
                                                    }
                                                }
                                                let messageDataAreas = store.details.getData.messageDataAreas
                                                messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                                    findNode_p(el);
                                                })
                                                if (p_match_node) {
                                                    p_match_node.child = list
                                                } else {//根节点
                                                    messageDataAreas[store.edit.getData.index].messageDataAreas = list
                                                }
                                                store.details.updateData('messageDataAreas', messageDataAreas)
                                                store.resetNodeKey()
                                            }}
                                        />
                                        <Divider type="vertical" />
                                        <Icon type="swap" style={{ cursor: 'pointer' }} title="移动层级关系"
                                            onClick={() => {
                                                // 设置改行字段的父节点的nodekey设置为parentSelection
                                                let tempArray = el.key.split('-');
                                                tempArray.pop();
                                                let parent_nodeKey = tempArray.join('-');
                                                let p_match_node = null
                                                let findNode_p = (node) => {
                                                    if (node.key === parent_nodeKey) {
                                                        p_match_node = node
                                                    } else {
                                                        if (!common.isEmpty(node.child)) {
                                                            for (let i = 0; i < node.child.length; i++) {
                                                                findNode_p(node.child[i])
                                                            }
                                                        }
                                                    }
                                                }
                                                let messageDataAreas = store.details.getData.messageDataAreas
                                                messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                                    findNode_p(el);
                                                })
                                                // console.log('p_match_node', p_match_node)
                                                if (p_match_node) {
                                                    self.setState({
                                                        parentSelection: p_match_node.key, currentSelection: el.key
                                                    })
                                                } else {//根节点
                                                    self.setState({
                                                        parentSelection: '根节点', currentSelection: el.key
                                                    })
                                                }


                                                store.edit.updateData('moveVisible', true)
                                            }}
                                        />
                                    </div>
                                    if (el.child) {
                                        packData(el.child);
                                    }
                                })
                            }
                            return fieldList
                        })()}
                        pagination={false}
                    />

                    <Button
                        style={{ marginTop: '10px' }}
                        type="dashed"
                        block
                        onClick={() => {
                            store.edit2.updateData('nodeKey', null)
                            store.edit2.resetField()
                            store.edit2.updateData('visible', true)
                        }}>新增字段</Button>

                    <Modal
                        title='选择上级字段'
                        visible={store.edit.getData.moveVisible}
                        onOk={() => {

                            let parentSelection = this.state.parentSelection;
                            let currentSelection = this.state.currentSelection;
                            let messageDataAreas = store.details.getData.messageDataAreas

                            //寻找原先的节点
                            let currentNode = null
                            let findCurrentNode = (node) => {
                                if (node.key === currentSelection) {
                                    currentNode = node
                                } else {
                                    if (!common.isEmpty(node.child)) {
                                        for (let i = 0; i < node.child.length; i++) {
                                            findCurrentNode(node.child[i])
                                        }
                                    }
                                }
                            }
                            messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                findCurrentNode(el);
                            })

                            //寻找原先的节点的父节点（用于splice函数）
                            let tempArray = currentSelection.split('-');
                            let last_key = tempArray.pop();
                            let parent_nodeKey = tempArray.join('-');
                            let p_match_node = null
                            let findNode_p = (node) => {
                                if (node.key === parent_nodeKey) {
                                    p_match_node = node
                                } else {
                                    if (!common.isEmpty(node.child)) {
                                        for (let i = 0; i < node.child.length; i++) {
                                            findNode_p(node.child[i])
                                        }
                                    }
                                }
                            }
                            messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                findNode_p(el);
                            })
                            // console.log('p_match_node', p_match_node)
                            if (p_match_node) {
                                p_match_node.child.splice(last_key, 1)
                            } else {//根节点
                                messageDataAreas[store.edit.getData.index].messageDataAreaFields.splice(last_key, 1)
                            }

                            //寻找新的父节点
                            let targetNode = null
                            let findTargetNode = (node) => {
                                if (node.key === parentSelection) {
                                    targetNode = node
                                } else {
                                    if (!common.isEmpty(node.child)) {
                                        for (let i = 0; i < node.child.length; i++) {
                                            findTargetNode(node.child[i])
                                        }
                                    }
                                }
                            }
                            messageDataAreas[store.edit.getData.index].messageDataAreaFields.forEach(el => {
                                findTargetNode(el);
                            })
                            if (targetNode) {
                                if (!targetNode.child) targetNode.child = []
                                targetNode.child.push(currentNode)
                            } else {
                                messageDataAreas[store.edit.getData.index].messageDataAreaFields.push(currentNode)
                            }

                            store.details.updateData('messageDataAreas', messageDataAreas)
                            store.edit.updateData('moveVisible', false)
                            store.resetNodeKey()
                        }}
                        onCancel={() => {
                            store.edit.updateData('moveVisible', false)
                        }}
                    >
                        <TreeSelect
                            value={this.state.parentSelection}
                            showSearch
                            style={{ width: 300 }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={(...data) => {
                                console.log('...data', data)
                                this.setState({
                                    parentSelection: data[0]
                                })

                            }}
                            treeNodeLabelProp="title"
                            treeData={(() => {
                                function add_KeyAndTitle(list = [], nodekey = '') {
                                    list.forEach((el, i) => {
                                        if (nodekey === '') {
                                            el.key = `${i}`
                                        } else {
                                            el.key = `${nodekey}-${i}`
                                        }
                                        el.value = el.key
                                        el.title = el.name
                                        el.children = el.child
                                        if (!common.isEmpty(el.child)) add_KeyAndTitle(el.child, el.key)
                                    })
                                }

                                let result = []

                                let messageDataAreas = store.details.getData.messageDataAreas;
                                result = messageDataAreas[store.edit.getData.index].messageDataAreaFields
                                add_KeyAndTitle(result);
                                return [{
                                    key: '-1',
                                    value: '-1',
                                    title: '根节点',
                                    children: result
                                }]
                            })()}
                        />
                    </Modal>

                </div>

            </Fragment>
        );
    }
}

Content.propTypes = {
};

export default Content;


const columns = [
    {
        title: '字段名称',
        dataIndex: 'name',
        key: 'name',
        width: 250
    },
    {
        title: '字段代码（外部）',
        dataIndex: 'outCode',
        key: 'outCode'
    },
    {
        title: '字段代码（内部）',
        dataIndex: 'inCode',
        key: 'inCode'
    },
    {
        title: '是否必输',
        dataIndex: 'needInputName',
        key: 'needInputName'
    },
    {
        title: '数据类型',
        dataIndex: 'dataTypeName',
        key: 'dataTypeName'
    },
    {
        title: '长度',
        dataIndex: 'length',
        key: 'length'
    },
    {
        title: '对齐方式',
        dataIndex: 'alignmentName',
        key: 'alignmentName'
    },
    {
        title: '填充字符',
        dataIndex: 'fillCharacterName',
        key: 'fillCharacterName'
    },
    {
        title: '说明',
        dataIndex: 'mark',
        key: 'mark'
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 80
    }];


