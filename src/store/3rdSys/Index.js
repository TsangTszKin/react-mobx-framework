/*
 * @Author: zengzijian
 * @Date: 2019-08-26 14:17:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-25 21:15:45
 * @Description: 
 */
import { observable, toJS, action } from 'mobx'
import common from '@/utils/common';
import publicUtils from '@/utils/publicUtils'
import _3rdSysService from '@/api/3rdSysService'
import { message } from 'antd';
import PageList from '@/store/common/PageList'

class store extends PageList{
    constructor(props) {
        super(props)
        this.getListForApi = this.getListForApi.bind(this);
        this.getSelectionForApi = this.getSelectionForApi.bind(this);
        this.deleteForApi = this.deleteForApi.bind(this);
    }

    @observable helper = {
        data: {
            city: city,
            company: company,
            system: system
        },
        get getData() {
            return toJS(this.data)
        },
        setData(value) {
            this.data = value
        },
        updateData(key, value) {
            this.data[key] = value
        }
    }

    getListForApi() {
        this.list.updateData('loading', true);
        _3rdSysService.get3rdSysList(this.list.getData.pageNum, this.list.getData.pageSize, this.list.getData.query).then(this.getListForApiCallBack)
    }
    @action.bound getListForApiCallBack(res) {
        this.list.updateData('loading', false);
        if (!publicUtils.isOk(res)) return

        let pageNum = res.data.pageList.sum === 0 ? 1 : res.data.pageList.curPageNO;
        let total = res.data.pageList.sum;
        let dataSource = res.data.pageList.resultList;
        this.list.updateData('pageNum', pageNum);
        this.list.updateData('total', total);
        this.list.updateData('dataSource', dataSource);
    }

    deleteForApi (id) {
        common.loading.show();
        _3rdSysService.delete(id).then(this.deleteForApiCallBack)
    }
    @action.bound deleteForApiCallBack(res){
        common.loading.hide();
        if (!publicUtils.isOk(res)) return
        message.success('删除成功');
        this.getListForApi();
    }

    getSelectionForApi() {
        _3rdSysService.getListPageSelection().then(this.getSelectionForApiCallBack)
    }
    @action.bound getSelectionForApiCallBack(res) {
        if (!publicUtils.isOk(res)) return
        const { unit, systemName, city } = res.data.result;
        this.helper.updateData('city', city)
        this.helper.updateData('system', systemName)
        this.helper.updateData('company', unit)
    }
}
export default store

const city = [
    {
        name: '地级统一',
        value: '地级统一'
    },
    {
        name: '广州',
        value: '广州'
    },
    {
        name: '惠州',
        value: '惠州'
    },
]

const company = [
    {
        name: '南方电网',
        value: '南方电网'
    }
]


const system = [
    {
        name: '银电联网系统',
        value: '银电联网系统'
    }
]
