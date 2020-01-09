/* eslint-disable no-unused-vars */
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 16:02:45
 * @LastEditTime : 2020-01-09 11:26:59
 * @LastEditors  : Please set LastEditors
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
    get3rdSysList(page, size, query = {}) {
        let params = [];
        params.push(`pageNo=${page}`)
        params.push(`pageSize=${size}`)
        for (const key in query) {
            params.push(`${key}=${query[key]}`)
        }
        params = params.join('&')
        return axios.get(`/system/system/SystemInfo/list`).catch(errorHandler)
        // return axios.get(`/system/system/SystemInfo/list?${params}`).catch(errorHandler)
    },
    get3rdSysDetails(query = {}) {
        let params = [];
        for (const key in query) {
            params.push(`${key}=${query[key]}`)
        }
        params = params.join('&')
        return axios.get(`/system/system/SystemInfo/get`).catch(errorHandler)
        // return axios.get(`/system/system/SystemInfo/get?${params}`).catch(errorHandler)
    },
    getListPageSelection() {
        return axios.get(`/system/system/SystemInfo/list/dropDownBox`).catch(errorHandler)
    },
    getAddPageSelection() {
        return axios.get(`/system/system/SystemInfo/save/dropDownBox`).catch(errorHandler)
        // return axios.get(`/system/api/list?${params}`).catch(errorHandler)
    },
    save(params) {
        return axios.put(`/system/system/SystemInfo`, params).catch(errorHandler)
        // return axios.get(`/system/api/list?${params}`).catch(errorHandler)
    },
    delete(id) {
        return axios.delete(`/system/system/SystemInfo/delete`).catch(errorHandler)
        // return axios.get(`/system/api/list?${params}`).catch(errorHandler)
    },
}