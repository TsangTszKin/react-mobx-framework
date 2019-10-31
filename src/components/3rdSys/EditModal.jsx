import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FormCell from '@/components/FormCell'
import { Input, Select, InputNumber } from 'antd'
import common from '@/utils/common';

@inject('store') @observer
class EditModal extends Component {

    changeEditData(key, value) {
        let field = this.props.store.edit2.getData.field
        field[key] = value
        this.props.store.edit2.updateData('field', field)
    }


    render() {
        const { store } = this.props
        return (
            <div className="clearfix" style={style.searchPanel}>
                <FormCell name="字段名称" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Input size="small" allowClear={true} style={{ width: '250px' }} placeholder="请输入"
                        value={store.edit2.getData.field.name}
                        onChange={(e) => this.changeEditData('name', e.target.value === undefined ? '' : e.target.value)}
                    />
                </FormCell>
                <FormCell name="字段代码（外部）" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Input size="small" allowClear={true} style={{ width: '250px' }} placeholder="请输入"
                        value={store.edit2.getData.field.outCode}
                        onChange={(e) => this.changeEditData('outCode', e.target.value === undefined ? '' : e.target.value)}
                    />
                </FormCell>
                <FormCell name="字段代码（内部）" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Input size="small" allowClear={true} style={{ width: '250px' }} placeholder="请输入"
                        value={store.edit2.getData.field.inCode}
                        onChange={(e) => this.changeEditData('inCode', e.target.value === undefined ? '' : e.target.value)}
                    />
                </FormCell>
                <FormCell name="是否必输" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Select size="small" dropdownMatchSelectWidth={false} style={{ minWidth: '250px', width: '250px' }} placeholder="请选择"
                        value={common.isEmpty(store.edit2.getData.field.needInput) ? undefined : store.edit2.getData.field.needInput}
                        onChange={(value, option) => {
                            this.changeEditData('needInput', value);
                            this.changeEditData('needInputName', option.props.children);
                        }}>
                        <Select.Option value="1">是</Select.Option>
                        <Select.Option value="0">否</Select.Option>
                    </Select>
                </FormCell>
                <FormCell name="数据类型" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Select size="small" dropdownMatchSelectWidth={false} style={{ minWidth: '250px', width: '250px' }} placeholder="请选择"
                        value={common.isEmpty(store.edit2.getData.field.dataType) ? undefined : store.edit2.getData.field.dataType}
                        onChange={(value) => this.changeEditData('dataType', value)}>
                        {
                            store.helper.getData.dataType.map((item, i) =>
                                <Select.Option key={i} {...item}>{item.name}</Select.Option>
                            )
                        }
                    </Select>
                </FormCell>
                <FormCell name="长度" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <InputNumber size="small" allowClear={true} style={{ width: '250px' }} placeholder="请输入"
                        value={store.edit2.getData.field.length}
                        onChange={(value) => this.changeEditData('length', value === undefined ? '' : value)}
                    />
                </FormCell >
                <FormCell name="对齐方式" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Select size="small" dropdownMatchSelectWidth={false} style={{ minWidth: '250px', width: '250px' }} placeholder="请选择"
                        value={common.isEmpty(store.edit2.getData.field.alignment) ? undefined : store.edit2.getData.field.alignment}
                        onChange={(value, option) => {
                            this.changeEditData('alignment', value);
                            this.changeEditData('alignmentName', option.props.children);
                        }}>
                        <Select.Option value="1">左对齐</Select.Option>
                        <Select.Option value="2">右对齐</Select.Option>
                    </Select>
                </FormCell>
                <FormCell name="填充字符" isNotNull={true} titleStyle={{ minWidth: '150px' }}>
                    <Select size="small" dropdownMatchSelectWidth={false} style={{ minWidth: '250px', width: '250px' }} placeholder="请选择"
                        value={common.isEmpty(store.edit2.getData.field.fillCharacter) ? undefined : store.edit2.getData.field.fillCharacter}
                        onChange={(value, option) => {
                            this.changeEditData('fillCharacter', value);
                            this.changeEditData('fillCharacterName', option.props.children);
                        }}>
                        <Select.Option value="1">0</Select.Option>
                        <Select.Option value="2">空格</Select.Option>
                    </Select>
                </FormCell>
                <FormCell name="说明" isNotNull={false} titleStyle={{ minWidth: '150px', marginBottom: '70px' }}>
                    <Input.TextArea style={{ width: '250px' }} placeholder="请输入" rows={4}
                        value={store.edit2.getData.field.mark}
                        onChange={(e) => this.changeEditData('mark', e.target.value)}
                    />
                </FormCell>
            </div>
        );
    }
}

EditModal.propTypes = {

};

export default EditModal;

const style = {
    searchPanel: {
        width: '100%'
    }
}