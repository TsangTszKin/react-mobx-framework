/* eslint-disable no-unused-vars */
/*
 * @Author: your name
 * @Date: 2019-09-17 14:36:09
 * @LastEditTime : 2020-01-09 11:27:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\api\authService.js
 */
import { Modal } from 'antd';
import axios from '@/config/http.filter';
import mockData from '@/api/mock'

const errorHandler = error => {
    // message.error("出错了，请稍候再试");
    Modal.error({
        title: '系统提示',
        content: error,
    });
    console.log("出错信息如下");
    console.log(error);
}
export default {
    login(params) {
        return axios.post(`/api/auth/login`, params).catch(errorHandler);
    },
    logout() {
        return axios.get(`/api/auth/logout`).catch(errorHandler)
    },
    getTopMenu() {
        return axios.get(`/api/system/admin/resource/topmenu`).catch(errorHandler)
    },
    getLeftMenu(topMenuId) {
        return axios.get(`/api/system/admin/resource/leftmenu`).catch(errorHandler)
        // return axios.get(`/api/system/admin/resource/leftmenu/${topMenuId}`).catch(errorHandler)
    },
    getAuthAction() {
        return axios.get(`/api/auth/getOperAuthSet`).catch(errorHandler)
    }
}