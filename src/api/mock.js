/*
 * @Author: zengzijian
 * @Date: 2019-08-26 15:24:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-31 11:15:07
 * @Description: 
 */
import http from '@/config/http'
var Mock = require('mockjs')

const login = Mock.mock(`${http.gwApiPrefix}/api/auth/login`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": {
        "jwtUser": {
            "accountNonExpired": true,
            "accountNonLocked": true,
            "appServerId": 1,
            "credentialsNonExpired": true,
            "domanType": "oa",
            "email": "zhaowd@shinetech-china.com",
            "enabled": true,
            "id": 1,
            "lastPasswordResetDate": 1548319921000,
            "mobile": "13570412412",
            "nickName": "超级管理员",
            "orgName": "运维部",
            "organization": "dev",
            "supperAdmin": true,
            "teamIds": [],
            "tokenExpTimeMs": 1800000,
            "username": "admin"
        },
        "expire": 1567003123183,
        "secretToken": "s1D0TB8fPpmmTLt6XZENF/6SpNRsX9Gy3UIfQuhqKNpUuACz8RWBd1McBsNYqqn6UhbO36gsj9FF3rs45H/xauBWOBh/dg0OxGWKrWgA0B/xddVzBVkwxUJztsVyi841WJobDbmycJ+CkGm2JNILTtUR5F9bBZ/VVD8zoere7lT9FFGDAFhBwThdo8z/zowl+I30rddMid9LhvMTwfRlG1HK5EB8HIhhr+l7X9rT+IGfWJrc64z8OtDLjQtMlgneIWwgUk9CaLiv8CNxr3qE5XGNkbbg1BUMcnCijn7FLXBeM8tRGzRejFqAWbxOeebo",
        "timestamp": 1567001323183,
        "token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6IndlYiIsImlzcyI6IjEiLCJleHAiOjE1NjcwMDMxMjMsImlhdCI6MTU2NzAwMTMyM30.cAk1XD1PqFC0d_oySI5TN1dp-vJcQCQeMlqa22xg5-1KleiJbfl10NcwCeja8zS-ALI0mFfs_NieR5IAGBk3KQ"
    },
});

const getAuthAction = Mock.mock(`${http.gwApiPrefix}/api/auth/getOperAuthSet`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": []
});

const getTopMenu = Mock.mock(`${http.gwApiPrefix}/api/system/admin/resource/topmenu`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": [
        {
            "id": 1,
            "appId": 1,
            "parentId": 0,
            "actions": {},
            "children": [],
            "level": 0,
            "name": "管理系统",
            "description": "管理系统",
            "label": "mock",
            "url": "/mock/api/list",
            "icon": "home",
            "method": "get",
            "orderNum": 1
        },
    ]
});


const getLeftMenu = Mock.mock(`${http.gwApiPrefix}/api/system/admin/resource/leftmenu`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": {
        '1': [
            {
                "id": 1,
                "appId": 1,
                "parentId": 1,
                "actions": {
                },
                "child": [
                    {
                        "id": 34,
                        "appId": 1,
                        "parentId": 37,
                        "actions": {},
                        "child": [],
                        "level": 1,
                        "name": "系统",
                        "label": "mock-sysapi-sys",
                        "url": "/mock/sysapi/sys",
                        "icon": "tool",
                        "method": "",
                        "orderNum": 2
                    },
                ],
                "level": 0,
                "name": "系统管理",
                "description": "系统管理",
                "label": "mock-sysapi",
                "url": "/mock/sysapi",
                "icon": "desktop",
                "method": "ALL"
            },
        ],
    }
});




const _3rdSysList = Mock.mock(`${http.gwApiPrefix}/system/system/SystemInfo/list`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "pageList": {
        "curPageNO": 1,
        "offset": 10,
        "pageCount": 5,
        "sum": 100,
        "resultList|10": [{
            'id': '@natural',
            'name': '@cname',
            'cityName': '@cname',
            'unitName': '@cname',
            'protocolTypeName|1': ['socket', 'http', 'https'],
            'messageFormatName': '定长',
            'encodeName': 'GBK',
            'updateTime': '@date("yyyy-MM-dd")', //日期
            'updatePeople': '@cname',
        }]
    }
});

const _3rdSysDetails = Mock.mock(`${http.gwApiPrefix}/system/system/SystemInfo/get`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": {
        "id": '@natural',
        "name": '@cname',
        'city': '地市统一',
        'cityName': '地市统一',
        'thirdSystemName': '南方电网',
        "protocolType|1": [
            'socket',
            'WebService',
            'RMI',
            'RPC',
            'REST',
        ],
        "protocolTypeName|1": [
            'socket',
            'WebService',
            'RMI',
            'RPC',
            'REST',
        ],
        "messageFormat|1": [
            '定长',
            'XML',
            'JSON',
        ],
        "messageFormatName|1": [
            '定长',
            'XML',
            'JSON',
        ],
        "encode|1": [
            'GBK',
            'UTF-8',
        ],
        "encodeName|1": [
            'GBK',
            'UTF-8',
        ],
        "messageDataAreas|3": [
            {
                'id': '@natural',
                'name': '@cname',
                'encode': '@name',
                'need|1': ['1', '0'],
                'general|1': ['1', '0'],
                'loop|1': ['1', '0'],
                'lengthCode': '@name',
                'remark': '@cparagraph',
                'type|1': ['1', '2', '3', '4'],
                'messageDataAreaFields|5': [
                    {
                        'id': '@natural',
                        'name': '@cname',
                        'outCode': '@name',
                        'inCode': '@name',
                        'needInput|1': ['1', '0'],
                        'needInputEnglishLetter|1': ['是', '否'],
                        'dataType': 'varchart',
                        'length': 124,
                        'alignment|1': ['1', '2'],
                        'alignmentName|1': ['是', '否'],
                        'fillCharacter|1': ['1', '2'],
                        'fillCharacterName|1': ['是', '否'],
                        'mark': '@cparagraph',

                        'child|0-2': [
                            {
                                'id': '@natural',
                                'name': '@cname',
                                'outCode': 'afasf',
                                'inCode': 'asfaf',
                                'needInput': '1',
                                'needInputEnglishLetter|1': ['是', '否'],
                                'dataType': 'varchart',
                                'length': 124,
                                'mark': '整个报文长度，不含本字段本身。',
                                'alignment|1': ['1', '2'],
                                'alignmentName|1': ['是', '否'],
                                'fillCharacter|1': ['1', '2'],
                                'fillCharacterName|1': ['是', '否'],

                                'child|0-2': [
                                    {
                                        'id': '@natural',
                                        'name': '@cname',
                                        'outCode': 'afasf',
                                        'inCode': 'asfaf',
                                        'needInput': '1',
                                        'needInputEnglishLetter|1': ['是', '否'],
                                        'dataType': 'varchart',
                                        'length': 124,
                                        'mark': '整个报文长度，不含本字段本身。',
                                        'alignment|1': ['1', '2'],
                                        'alignmentName|1': ['是', '否'],
                                        'fillCharacter|1': ['1', '2'],
                                        'fillCharacterName|1': ['是', '否'],

                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],

    }
});

const _3rdSysListSelection = Mock.mock(`${http.gwApiPrefix}/system/system/SystemInfo/list/dropDownBox`, {
    "result": {
        "unit": [
            {
                "value": "402880f06d707c39016d7094c0ab0006",
                "name": "南方电网"
            },
            {
                "value": "402880f06d707c39016d70954d210007",
                "name": "揭阳市水务局"
            },
            {
                "value": "402880f06d707c39016d7095c3850008",
                "name": "云浮市住建局"
            }
        ],
        "systemName": [
            {
                "value": "银电联网系统",
                "name": "银电联网系统"
            },
            {
                "value": "测试系统",
                "name": "测试系统"
            },
            {
                "value": "20191024测试管理系统",
                "name": "20191024测试管理系统"
            },
            {
                "value": "房价走势模拟系统",
                "name": "房价走势模拟系统"
            },
            {
                "value": "勿删-测试挡板-仿真系统",
                "name": "勿删-测试挡板-仿真系统"
            }
        ],
        "city": [
            {
                "value": "402880f06d707c39016d707f3bdb0000",
                "name": "地市统一"
            },
            {
                "value": "402880f06d707c39016d708a50cc0001",
                "name": "广州"
            },
            {
                "value": "402880f06d707c39016d708bbe880002",
                "name": "佛山"
            }
        ]
    },
    "pageList": null,
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "success": true
});

const _3rdSysDetailsSelection = Mock.mock(`${http.gwApiPrefix}/system/system/SystemInfo/save/dropDownBox`, {
    "result": {
        "encode": [
            {
                "value": "402880f06d6b68f4016d6b7cc6a50005",
                "name": "UTF-8"
            }
        ],
        "fillCharacter": [
            {
                "value": "1",
                "name": "0"
            }
        ],
        "unit": [
            {
                "value": "402880f06d707c39016d7094c0ab0006",
                "name": "南方电网"
            }
        ],
        "messageFormat": [
            {
                "value": "402880f06d6b68f4016d6b7a59240003",
                "name": "定长"
            }
        ],
        "city": [
            {
                "value": "402880f06d707c39016d707f3bdb0000",
                "name": "地市统一"
            }
        ],
        "dataType": [
            {
                "value": "1",
                "name": "Varchar"
            }
        ],
        "protocolType": [
            {
                "value": "402880f06d7bb4f7016d7bb9d4b70002",
                "name": "RPC"
            }
        ],
        "alignment": [
            {
                "value": "1",
                "name": "左对齐"
            }
        ],
        "dataAreaType": [
            {
                "value": "1",
                "name": "包头"
            }
        ]
    },
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "success": true
});


const _3rdSysSave = Mock.mock(`${http.gwApiPrefix}/system/system/SystemInfo`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": {
        "id": '@natural'
    }
});

const _3rdSysDelete = Mock.mock(`${http.gwApiPrefix}/system/system/SystemInfo/delete`, {
    "resultCode": 1000,
    "resultMessage": "操作成功",
    "result": {
    }
});

export {
    login,
    getAuthAction,
    getTopMenu,
    getLeftMenu,
    _3rdSysList,
    _3rdSysDetails,
    _3rdSysListSelection,
    _3rdSysDetailsSelection,
    _3rdSysSave,
    _3rdSysDelete,
}