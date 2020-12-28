// home模块
const ResourceManage = () => import('@/pages/resourceManage')
const AutoReply = () => import('@/pages/autoReply')
const CustomMenu = () => import('@/pages/customMenu')
const TemplateInfo = () => import('@/pages/templateInfo')
const CreateContent = () => import('@/pages/createContent')
const AddArticleType = () => import('@/pages/addArticleType')

/**
 * 菜单栏部分都需要配置belongPathList，即跳转其下面的所有菜单都会被选中状态。
 */
const homeList = [
    {
        path: 'manage',
        baseUrl: 'home',
        belongPathList: ['/home/manage', '/home/wechat/', '/home/addArtType'],
        name: '资源管理',
        meta: { requireAuth: true },
        component: ResourceManage
    },
    {
        path: 'wechat/:id',
        baseUrl: 'home',
        name: '新增文章和视频',
        meta: { requireAuth: true },
        component: CreateContent
    },
    {
        path: 'addArtType',
        baseUrl: 'home',
        name: '新增文章和视频的类型',
        meta: { requireAuth: true },
        component: AddArticleType
    },


    {
        path: 'reply',
        baseUrl: 'home',
        belongPathList: ['/home/reply'],
        name: '生活资料',
        meta: { requireAuth: true },
        component: AutoReply
    },


    {
        path: 'menu',
        baseUrl: 'home',
        belongPathList: ['/home/menu'],
        name: '222',
        meta: { requireAuth: true },
        component: CustomMenu
    },


    {
        path: 'template',
        baseUrl: 'home',
        belongPathList: ['/home/template'],
        name: '444',
        meta: { requireAuth: true },
        component: TemplateInfo
    }
]

export {
    homeList
}