export default [
    {
        title: '总览',
        url:'/dashboard',
        onlyAdmin: true,
    },
    {
        title: '材料管理',
        url:'/main',
        onlyAdmin: false,
    },
    {
        title:'用户管理',
        url:'/user',
        onlyAdmin: true,

    },
    {
        title:'日志列表',
        url:'/log',
        onlyAdmin: true,

    },
    {
        title:'更多操作',
        onlyAdmin: false,
        children:[
            {
                title:'材料分类管理',
                url:'/classify',
                onlyAdmin: true,
            },
            {
                title:'重置密码列表',
                url:'/rest/password',
                onlyAdmin: true,
            },
            {
                title:'邀请码管理',
                url:'/invite-code',
                onlyAdmin: true,
            },
            {
                title:'个人设置',
                url:'/profile',
                onlyAdmin: false,
            }
        ]

    }
]