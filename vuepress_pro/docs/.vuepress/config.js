/**
 * 自定义页面类的配置
 * https://www.vuepress.cn/theme/default-theme-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A1%B5%E9%9D%A2%E7%B1%BB
 */

module.exports = {
    base: '/boke/',
    title: '摩根',
    description: '专业研究小事',
    themeConfig: {  //导航栏配置
        logo: 'http://img.familyli.cn/11.jpg',
        nav: [  // 头部超链接
          { text: '联系我', link: '/pages/concat/' },
          { text: '自我记录', link: '/pages/records/' },
          { text: 'github', link: 'https://github.com/cute1baby' },
        ],
        '/zh/': {  // 侧边栏设置为中文
            sidebar: 'auto'
        },
        sidebar: [ // 侧边栏
            // {
            //   title: 'Group 1',   // 必要的
            //   path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            //   collapsable: false, // 可选的, 默认值是 true,
            //   sidebarDepth: 1,    // 可选的, 默认值是 1
            //   children: [
            //     '/',
            //     '/page-a'
            //   ]
            // },
            // '/concat'
        ],
        // 远端仓库存储地址
        repo: 'vuejs/vuepress',
        // 自定义仓库链接文字
        repoLabel: '查看源码',
        // 启用页面滚动
        smoothScroll: true
    }
}