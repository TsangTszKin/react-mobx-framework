/*
 * @Author: zengzijian
 * @Date: 2018-07-24 15:48:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-31 10:47:04
 * @Description: 路由配置文件
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/delay-loading/Index'

//系统管理
const _3rdSysList = Loadable({ loader: () => import('@/routers/3rdSys/Index'), loading: DelayLoading, delay: 3000 });
const _3rsSysSave = Loadable({ loader: () => import('@/routers/3rdSys/Save'), loading: DelayLoading, delay: 3000 });

export default [
    {
        'path': '/mock/sysapi/sys',
        'component': _3rdSysList,
        'meta': {
            'title': '系统管理',
            'descript': '',
            'nav': [{ 'name': '系统及接口', 'path': '/mock/sysapi/sys' }, { 'name': '系统管理', 'path': null }]
        }
    },
    {
        'path': '/mock/sysapi/sys/save/:id?',
        'component': _3rsSysSave,
        'meta': {
            'title': '系统保存',
            'descript': '',
            'nav': [{ 'name': '系统及接口', 'path': '/mock/sysapi/sys' }, { 'name': '系统管理', 'path': '/mock/sysapi/sys' }, { 'name': '保存', 'path': null }]
        }
    },
];