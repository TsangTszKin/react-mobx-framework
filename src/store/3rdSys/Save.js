/*
 * @Author: zengzijian
 * @Date: 2019-08-26 14:17:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-28 16:14:40
 * @Description: 
 */
import { observable, toJS, action } from 'mobx'
import common from '@/utils/common';
import publicUtils from '@/utils/publicUtils'
import _3rdSysService from '@/api/3rdSysService'

class store {
    constructor() {
        this.getDetailForApi = this.getDetailForApi.bind(this);
        this.resetNodeKey = this.resetNodeKey.bind(this);
        this.getAddPageSelectionForApi = this.getAddPageSelectionForApi.bind(this);
    }

    @observable edit = {
        data: {
            index: null,
            visible: false,
            moveVisible: false,
            messageDataAreas: {
                name: '',
                encode: '',
                need: '',
                general: '',
                loop: '',
                lengthCode: null,
                mark: '',
                messageDataAreaFields: []
            }
        },
        get getData() {
            return toJS(this.data)
        },
        setData(value) {
            this.data = value
        },
        updateData(key, value) {
            this.data[key] = value
        },
        resetField() {
            this.data.messageDataAreas = {
                name: '',
                encode: '',
                need: '',
                general: '',
                loop: '',
                lengthCode: null,
                mark: '',
                messageDataAreaFields: []
            }
        }
    }

    @observable edit2 = {
        data: {
            index: null,
            visible: false,
            nodeKey: null,
            field: {
                name: '',
                outCode: '',
                inCode: '',
                needInput: '1',
                needInputName: '是',
                dataType: '1',
                dataTypeName: 'Varchar',
                length: null,
                mark: '',
                alignment: '1',
                alignmentName: '左对齐',
                fillCharacter: '2',
                fillCharacterName: '空格'
            }
        },
        get getData() {
            return toJS(this.data)
        },
        setData(value) {
            this.data = value
        },
        updateData(key, value) {
            this.data[key] = value
        },
        resetField() {
            this.data.field = {
                name: '',
                outCode: '',
                inCode: '',
                needInput: '1',
                needInputName: '是',
                dataType: '1',
                dataTypeName: 'Varchar',
                length: null,
                mark: '',
                alignment: '1',
                alignmentName: '左对齐',
                fillCharacter: '2',
                fillCharacterName: '空格'
            }
        }
    }

    @observable helper = {
        data: {
            encode: [],
            fillCharacter: [],
            unit: [],
            messageFormat: [],
            city: [],
            dataType: [],
            protocolType: [],
            alignment: [],
            dataAreaType: []
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
    /**
     *列表公共参数
     */
    @observable details = {
        data: {
            "name": '',
            "city": '',
            "cityName": '',
            "thirdSystemName": '',
            "protocolType": '',
            "protocolTypeName": '',
            "messageFormat": '',
            "messageFormatName": '',
            "encode": '',
            "encodeName": '',
            "messageDataAreas": [],
            "unitName": '',
        },
        get getData() {
            return toJS(this.data)
        },
        setData(value) {
            this.data = value
        },
        updateData(key, value) {
            this.data[key] = value
        },
        update_request(index, key, value) {
            this.data.request[index][key] = value
        },
        update_response(index, key, value) {
            this.data.response[index][key] = value
        },
        add() {
            this.data.messageDataAreas.push({
                name: '',
                encode: '',
                need: '1',
                general: '1',
                loop: '0',
                lengthCode: null,
                mark: '',
                messageDataAreaFields: []
            })
        }
    }

    getDetailForApi(id) {
        _3rdSysService.get3rdSysDetails({ id }).then(this.getDetailForApiCallBack)
    }
    @action.bound getDetailForApiCallBack(res) {
        if (!publicUtils.isOk(res)) return
        this.details.setData(res.data.result);
        if (!common.isEmpty(this.details.getData.request)) this.edit.updateData('index', 0)
        this.resetNodeKey()
    }

    resetNodeKey() {
        let detailsData = this.details.getData
        let messageDataAreas = detailsData.messageDataAreas
        messageDataAreas.forEach(el => {
            reset(el.dataArea)
        })
        function reset(list = [], nodekey = '') {
            list.forEach((el, i) => {
                if (nodekey === '') {
                    el.key = `${i}`
                } else {
                    el.key = `${nodekey}-${i}`
                }
                if (!common.isEmpty(el.child)) reset(el.child, el.key)
            })
        }
        this.details.setData(detailsData)
    }

    getAddPageSelectionForApi() {
        _3rdSysService.getAddPageSelection().then(this.getAddPageSelectionForApiCallBack)
    }
    @action.bound getAddPageSelectionForApiCallBack(res) {
        if (!publicUtils.isOk(res)) return
        const { encode, fillCharacter, unit, messageFormat, city, dataType, protocolType, alignment, dataAreaType } = res.data.result;
        this.helper.updateData('encode', encode);
        this.helper.updateData('fillCharacter', fillCharacter);
        this.helper.updateData('unit', unit);
        this.helper.updateData('messageFormat', messageFormat);
        this.helper.updateData('city', city);
        this.helper.updateData('dataType', dataType);
        this.helper.updateData('protocolType', protocolType);
        this.helper.updateData('alignment', alignment);
        this.helper.updateData('dataAreaType', dataAreaType);
    }

}
export default store