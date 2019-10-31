/* eslint-disable no-undef */
/*
 * @Author: zengzijian
 * @Date: 2018-07-24 15:45:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-19 09:47:59
 * @Description: 根节点入口
 */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routers from './routers/Index';
import '@/normalize/index'
import "babel-polyfill";

class App extends React.Component {

    state = {
        isLoading: false,
        loadingIndex: 0
    }

    componentWillMount() {
        var timer = setInterval(function () {
            if (window.layui) {
                layui.use(['layer', 'laydate', 'jquery'], function () {
                    window.layer = layui.layer;
                    window.laydate = layui.laydate;
                    window.$ = layui.$;
                });
                window.clearInterval(timer);
            }
        }, 100);
    }

    componentDidMount() {

    }
    
    render() {
        return (
            // <ConfigProvider snowyButton={true}>
            <HashRouter>
                <Routers />
            </HashRouter >
            // </ConfigProvider>
        )
    }
}


render(<App />, document.getElementById('root'))
if (module.hot) {
    module.hot.accept()
}