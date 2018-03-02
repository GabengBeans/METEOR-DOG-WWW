import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export const serviceColumns = [
    {
        title: 'ID',
        key: 'id',
        width: 70,
    },
    {
        title: '服务标题',
        key: 'title',
    },
    {
        title: '姓名/昵称',
        key: 'nickname',
    },
    {
        title: '手机号',
        key: 'phone',
    },
    {
        title: '发布时间',
        key: 'createTime',
        render: (h, params) => {

            return new Date(params.row.createTime).toLocaleString();
        }
    },
    {
        title: '审核时间',
        key: 'auditTime',
        render: (h, params) => {
            return params.row.auditTime ? new Date(params.row.auditTime).toLocaleString() : null;
        }
    },
    {
        title: '服务状态',
        key: 'businessStatus',
        width: 150,
        render: (h, params) => {
            const row = params.row.businessStatus;

            let color = '';
            let text  = '';
            switch (row) {
                case 1:
                    color   = '#ccc';
                    text    = '待审核';
                    break;
                case 2:
                    color   = '#C1FFC1';
                    text    =  '审核中';
                    break;
                case 3:
                    color   = 'green';
                    text    = '已发布';
                    break;
                case 4:
                    color   = '#5E5E5E';
                    text    = '已过期';
                    break;
                case 5:
                    color   = '#FF7256';
                    text    = '审核未通过';
                    break;
                case 6:
                    color   = '#CD4F39';
                    text    = '已取消';
                    break;
            }


            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        }
    },
    {
        title: '状态',
        key: 'status',
        width: 130,
        render: (h, params) => {
            const row = params.row;
            const color = row.status === 1 ? 'green' : 'red';
            const text = row.status === 1 ? '正常' :  '禁用';

            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        }
    },
    {
        title: '操作',
        align: 'center',
        width: 240,
        key: 'handle',
        handle: [
            {options:'detail' , name:'service-detail'},
            {options:'edit', name:'service-edit'}
            // {options:'delete', path:'service/delete'}
        ]
    }
];

export const serviceData = function(pageNo){
    pageNo      = pageNo > 1 ? pageNo : util.getConfig.pageNo;
    let pageSize    = util.getConfig.pageSize;

   return new Promise((resolve, reject) => {
        util.ajax.post(
            util.getConfigUri.serviceList+'?pageNo='+pageNo+'&pageSize='+pageSize,
            {"businessStatus":"0","status":"-1"},
            {
                headers: {
                    'token': Cookies.get('token')
                }
            }).then(response => {
                if (response.data.success) {
                    resolve(response.data.data);
                }
            })
        });
}


const tableData = {
    serviceColumns: serviceColumns,
    serviceData: serviceData
}

export default tableData;