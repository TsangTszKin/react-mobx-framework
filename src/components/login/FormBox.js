/*
 * @Author: zengzijian
 * @Date: 2019-08-24 09:40:24
 * @LastEditors: zengzijian
 * @LastEditTime: 2019-08-24 15:45:38
 * @Description: 
 */
import React, { Component } from 'react'
import { Form, Input, Button, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
const FormItem = Form.Item

@inject('GlobalStore')
@observer
class FromBox extends Component {
    constructor() {
        super()
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let { form } = this.props
        this.props.submit(form, this.props.GlobalStore.getIsLoading)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{  height: '40px' }} placeholder="admin" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" style={{ height: '40px' }} placeholder="123456" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="l_button" loading={this.props.GlobalStore.getIsLoading} style={{ height: '40px', backgroundColor: '#E44B4E' }}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FromBox);