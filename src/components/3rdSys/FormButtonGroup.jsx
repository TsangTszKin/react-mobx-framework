/*
 * @Author: zengzijian
 * @Date: 2018-08-14 10:42:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-31 11:08:57
 * @Description: 通用的保存或者编辑页面页脚的按钮组，包括“取消”和“保存”按钮
 */
import React, { Component } from 'react';
import { Button, message } from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import _3rdSysService from '@/api/3rdSysService'
import common from '@/utils/common'
import publicUtils from '@/utils/publicUtils'

let timer = 0;

@withRouter @inject('store') @observer
class FormButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                // padding: '10px',
                textAlign: 'right',
                backgroundColor: '#fff',
                position: 'fixed',
                bottom: '0',
                right: '0px',
                boxShadow: '0 -4px 4px rgba(0,21,41,.08)',
                zIndex: '999',
                height: "50px",
                padding: "10px"
            }
        }
        this.save = this.save.bind(this);
        this.delUselessProps = this.delUselessProps.bind(this);
        this.verify = this.verify.bind(this);
    }

    adjustWidth() {
        timer = setInterval(function () {
            let target = window.document.querySelector("#form-button-group")
            if (target) target.style.width = window.document.querySelector("#root .right .panel").offsetWidth + 'px';
        }, 100)
    }

    componentDidMount() {
        this.adjustWidth();
    }

    componentWillUnmount() {
        window.clearInterval(timer);
    }


    delUselessProps(child = []) {
        child.forEach(el => {
            delete el.action;
            if (el.child) this.delUselessProps(el.child)
        })
    }

    verify(data) {
        const { name, city, thirdSystemName, protocolType, messageFormat, encode, messageDataAreas } = data
        if (common.isEmpty(name)) { message.warning("服务端系统名称不能为空"); return false }
        if (common.isEmpty(city)) { message.warning("所属地市不能为空"); return false }
        if (common.isEmpty(thirdSystemName)) { message.warning("所属单位不能为空"); return false }
        if (common.isEmpty(protocolType)) { message.warning("协议类型不能为空"); return false }
        if (common.isEmpty(messageFormat)) { message.warning("报文格式不能为空"); return false }
        if (common.isEmpty(encode)) { message.warning("编码方式不能为空"); return false }
        for (let i = 0; i < messageDataAreas.length; i++) {
            const element = messageDataAreas[i];
            const { name, encode, type, need, general, loop, lengthCode, messageDataAreaFields } = element
            if (common.isEmpty(name)) { message.warning("数据包结构 - 数据包名 不能为空"); return false }
            if (common.isEmpty(encode)) { message.warning("数据包结构 - 数据包代码 不能为空"); return false }
            if (common.isEmpty(type)) { message.warning("数据包结构 - 数据包类型 不能为空"); return false }
            if (common.isEmpty(need)) { message.warning("数据包结构 - 是否必选 不能为空"); return false }
            if (common.isEmpty(general)) { message.warning("数据包结构 - 是否通用 不能为空"); return false }
            if (common.isEmpty(loop)) { message.warning("数据包结构 - 是否循环体 不能为空"); return false }
            if (loop === '1' && common.isEmpty(lengthCode)) { message.warning("数据包结构 - 循环体长度代码 不能为空"); return false }
        }

        return true
    }

    save() {

        // 去掉无用属性
        let data = this.props.store.details.getData
        if (!this.verify(data)) return
        if (!common.isEmpty(data.messageDataAreas)) {
            data.messageDataAreas.forEach(el => {
                delete el.action
                delete el.dataArea
                delete el.encode_
                delete el.general_
                delete el.lengthCode_
                delete el.loop_
                delete el.name_
                delete el.need_
                delete el.remark_
                delete el.type_
                this.delUselessProps(el.messageDataAreaFields);
            })
        }
        common.loading.show();
        _3rdSysService.save(data).then(res => {
            common.loading.hide();
            this.props.store.details.setData(data);
            if (!publicUtils.isOk(res)) return
            message.success('保存成功');
            const { id } = res.data.result
            this.props.history.push(`/mock/sysapi/sys/save/${id}`);
            this.props.store.getDetailForApi(id);
        }).catch(() => common.loading.hide())
    }

    render() {
        return (
            <div style={this.state.style} id="form-button-group">
                <Button style={{ marginRight: '20px' }} onClick={() => this.props.history.push('/mock/sysapi/sys')}>返回</Button>
                <Button type="primary"
                    onClick={() => {
                        this.save()
                    }}
                >保存</Button>
            </div>
        )
    }
}
FormButtonGroup.propTypes = {
}
FormButtonGroup.defaultProps = {
}
export default FormButtonGroup;