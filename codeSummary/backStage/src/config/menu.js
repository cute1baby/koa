// home模块
const ResourceManage = () => import('@/pages/resourceManage')
const AutoReply = () => import('@/pages/autoReply')
const CustomMenu = () => import('@/pages/customMenu')
const TemplateInfo = () => import('@/pages/templateInfo')
const createContent = () => import('@/pages/createContent')

/**
 * 菜单栏部分都需要配置belongPathList，即跳转其下面的所有菜单都会被选中状态。
 */
const homeList = [
    {
        path: 'manage',
        baseUrl: 'home',
        belongPathList: ['/home/manage', '/home/wechat/'],
        name: '资源管理',
        meta: { requireAuth: true },
        component: ResourceManage
    },
    {
        path: 'reply',
        baseUrl: 'home',
        belongPathList: ['/home/reply'],
        name: '自动回复',
        meta: { requireAuth: true },
        component: AutoReply
    },
    {
        path: 'menu',
        baseUrl: 'home',
        belongPathList: ['/home/menu'],
        name: '自定义菜单',
        meta: { requireAuth: true },
        component: CustomMenu
    },
    {
        path: 'template',
        baseUrl: 'home',
        belongPathList: ['/home/template'],
        name: '模板消息',
        meta: { requireAuth: true },
        component: TemplateInfo
    },
	{
        path: 'wechat/:id',
        baseUrl: 'home',
        name: '新增文章和视频',
        meta: { requireAuth: true },
        component: createContent
    }
]

export {
    homeList
}