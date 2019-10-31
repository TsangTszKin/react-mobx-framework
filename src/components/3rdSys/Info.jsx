import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FormCell from '@/components/FormCell'
import { Select, Descriptions, Input } from 'antd'
import {withRouter} from 'react-router-dom';

@withRouter @inject('store') @observer
class Info extends Component {

    constructor(props) {
        super(props)
        this.changeData = this.changeData.bind(this);
    }

    changeData(key, value) {
        this.props.store.details.updateData(key, value);
    }

    render() {
        const { store } = this.props
        if (this.props.match.params.id) {

            return (
                <Descriptions title="接口基础信息">
                    <Descriptions.Item label="服务端系统名称">
                        {store.details.getData.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属地市">
                        {store.details.getData.cityName}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属单位">
                        {store.details.getData.unitName}
                    </Descriptions.Item>
                    <Descriptions.Item label="协议类型">
                        {store.details.getData.protocolTypeName}
                    </Descriptions.Item>
                    <Descriptions.Item label="报文格式">
                        {store.details.getData.messageFormatName}
                    </Descriptions.Item>
                    <Descriptions.Item label="编码方式">
                        {store.details.getData.encodeName}
                    </Descriptions.Item>
                </Descriptions>
            );

        } else {
            return (
                <Descriptions title="接口基础信息">
                    <Descriptions.Item label="服务端系统名称">
                        <Input style={{ width: '200px' }} size="small" placeholder="请输入" value={store.details.getData.name}
                            onChange={(e) => this.changeData('name', e.target.value)}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="所属地市">
                        <Select style={{ width: '200px' }} size="small" placeholder="请选择" value={store.details.getData.cityName}
                            onChange={(value, option) => {
                                this.changeData('city', option.props.value);
                                this.changeData('cityName', option.props.name);
                            }}
                        >
                            {
                                store.helper.getData.city.map((item, i) =>
                                    <Select.Option {...item} key={i} >{item.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="所属单位">
                        <Select style={{ width: '200px' }} size="small" placeholder="请选择" value={store.details.getData.unitName}
                            onChange={(value, option) => {
                                this.changeData('thirdSystemName', value);
                                this.changeData('unitName', option.props.name);
                            }}
                        >
                            {
                                store.helper.getData.unit.map((item, i) =>
                                    <Select.Option {...item} key={i} >{item.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="协议类型">
                        <Select style={{ width: '200px' }} size="small" placeholder="请选择" value={store.details.getData.protocolTypeName}
                            onChange={(value, option) => {
                                this.changeData('protocolType', option.props.value);
                                this.changeData('protocolTypeName', option.props.name);
                            }}
                        >
                            {
                                store.helper.getData.protocolType.map((item, i) =>
                                    <Select.Option {...item} key={i} >{item.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="报文格式">
                        <Select style={{ width: '200px' }} size="small" placeholder="请选择" value={store.details.getData.messageFormatName}
                            onChange={(value, option) => {
                                this.changeData('messageFormat', option.props.value);
                                this.changeData('messageFormatName', option.props.name);
                            }}
                        >
                            {
                                store.helper.getData.messageFormat.map((item, i) =>
                                    <Select.Option {...item} key={i} >{item.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Descriptions.Item>
                    <Descriptions.Item label="编码方式">
                        <Select style={{ width: '200px' }} size="small" placeholder="请选择" value={store.details.getData.encodeName}
                            onChange={(value, option) => {
                                this.changeData('encode', option.props.value);
                                this.changeData('encodeName', option.props.name);
                            }}
                        >
                            {
                                store.helper.getData.encode.map((item, i) =>
                                    <Select.Option {...item} key={i} >{item.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Descriptions.Item>
                </Descriptions>
            );
        }
    }
}

Info.propTypes = {

};

export default Info;

const style = {
    searchPanel: {
        marginBottom: '20px'
    }
}