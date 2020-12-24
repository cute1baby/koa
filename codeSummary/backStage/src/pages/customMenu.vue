<template>
    <div>
        222
    </div>
</template>

<script>
import AskModal from '@/components/AskModal'
import UploadImg from '@/components/UploadImgV2'
import UploadByBaishan from '@/components/UploadByBaishan'
import {hostAddress, hostAddressDev} from '@/config/index.js'
import axios from '@/utils/fetch'
import nanoid from 'nanoid'

// 基础type的定义
const baseType = ['1', '2', '6']
export default {
    data(){
        const validateTitle = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入标题'));
            } else {
                callback(); 
            }
        }
        const validateDescription = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入描述'));
            } else {
                callback();
            }
        }
        const validateUrl = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入跳转链接'));
            } else {
                callback();
            }
        }
        return {
            wechatId: '',
            wechatList: [],
            currentWechat: {},
            currentFirMenu: {},
            currentSecMenu: {},
            menuList: [],
            type: '1',
            imgUploadTip: false,
            // 上传文件额外携带参数
            UploadExtraParams: {
                type: "image", // 图片（image）语音（voice）视频（video）缩略图（thumb）
                name: "test", // 文件名
                wechatInfoId: "" // 公众号ID
            },
            imageUrl: '',  //图片路径
            showAskModal: false,
            rules: {
                title: [
                    { validator: validateTitle, trigger: 'blur' }
                ],
                description: [
                    { validator: validateDescription, trigger: 'blur' }
                ],
                url: [
                    { validator: validateUrl, trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.initData()
    },
    computed: {
        currentMenu(){
            const status = this.currentSecMenu.key;
            return status ? this.currentSecMenu : this.currentFirMenu
        }
    },
    methods: {
        getImgUrlById(id){
            return axios.get(hostAddress + '/wechat/wechat.material/info', {
                params: {
                    id
                }
            })
        },
        initData(){
            const {pageNum, pageSize } = this
            this.loading = true
            axios.get(hostAddress + '/wechat/wechat.info/list', {
                params: {
                    id: '',
                    wechatName: '',
                    page: pageNum,
                    limit: pageSize
                }
            })
            .then((res) => {
                const data = res.data;
                if(res.status === 200){
                    if(!data.code){
                        this.loading = false
                        this.wechatList = data.data
                    }
                }
            })
            .catch((error) => {
                console.log('获取公众号列表出错：' + error);
            })
        },
        handleChange(id){
            this.currentWechat = this.wechatList.find(e => e.id === id)
            this.UploadExtraParams = {...this.UploadExtraParams, wechatInfoId: id}
            this.getMenuDetails(id)
        },
        // 关闭删除弹窗
        handleAskClose(){
            this.showAskModal = false
        },
        // 确认删除菜单
        handleAskConfirm(e){
            // 修改结构，然后调用一下保存
            console.log('删除菜单===')
            const {currentFirMenu, currentSecMenu} = this
            const {key} = this.currentMenu
            // 删除的是一级菜单
            if(key === currentFirMenu.key){
                this.menuList = this.menuList.filter(menu => menu.key !== currentFirMenu.key)
            }else{
                if(currentFirMenu.sub_button.length){
                    let sub_button = currentFirMenu.sub_button
                    const sub_list =  sub_button.filter(sub => sub.key !== key)
                    this.menuList = this.menuList.map(menu => {
                        if(menu.key === currentFirMenu.key){
                            if(!sub_list.length){
                                return {
                                    ...menu, 
                                    sub_button: [],
                                    reply_type: '1',
                                    reply_content: {
                                        content: '',
                                        imageId: '',
                                        pageUrl: '',
                                        title: '', 
                                        url: '',
                                        description: '',
                                        picurl: ''
                                    },
                                }
                            }
                            return {...menu, sub_button: sub_list}
                        }
                        return menu
                    })
                }      
            }
            this.currentFirMenu = this.currentSecMenu = {}
            this.showAskModal = false
        },
        getMenuDetails(id){
            axios.get(hostAddress + '/wechat/wechat.menu/info', {
                params: {
                    wechatInfoId: id
                }
            })
            .then((res) => {
                const data = res.data;
                if(res.status === 200){
                    if(!data.code){
                        const { menu_admin } = data.data
                        if(menu_admin){
                            const menu = JSON.parse(menu_admin)
                            function integraData(item){
                                const reply_c = item.reply_content;
                                const reply_content = {
                                    content: '',
                                    imageId: '',
                                    pageUrl: '',
                                    title: '', 
                                    url: '',
                                    description: '',
                                    picurl: '',
                                    ...reply_c
                                }
                                return {...item, reply_content}
                            }
                            this.menuList = menu.button.map(item => {
                                if(item.type){
                                    return integraData(item)
                                }else{
                                    if(item.sub_button.length){
                                        item.sub_button = item.sub_button.map(sub => {
                                            return integraData(sub)
                                        })
                                        return item
                                    }
                                }
                                
                            });
                            this.menuList.length > 0 ? this.currentFirMenu = this.menuList[0] : ''
                            if(this.currentFirMenu.reply_content){
                                const r_type = this.currentFirMenu.reply_type
                                this.handleTab(r_type)
                            }
                        }else{
							// 如何菜单为空，进行数据重置
                            this.menuList = []
                            this.currentFirMenu = this.currentSecMenu = {}
                        }
                    }
                }
            })
            .catch((error) => {
                console.log('获取菜单列表出错：' + error);
            })
        },
        // 计算二级菜单subMenu的top定位值
        formatSubMenuTop(list){
            const lens = list.length
            return lens >= 5 ? -255 : -51 * (lens + 1)
        },
        // 设置状态（是否为二级菜单）
        setStatus(status){
            const {currentFirMenu} = this
            this.currentFirMenu = {...currentFirMenu, isSec: status}
        },
        // 添加一级，二级菜单
        addMenu(e, id){
            const {wechatId} = this
            if(!wechatId){
                return this.$message('请先选择一个公众号')
            }
            // 如果没有id则是一级菜单
            if(!id){
                // 默认添加二级菜单空数组，为了UI显示
                const base = {
                    name: '添加菜单',
                    type: 'click',
                    key: nanoid(17),
                    reply_type: '1',
                    reply_content: {
                        content: '',
                        imageId: '',
                        pageUrl: '',
                        title: '', 
                        url: '',
                        description: '',
                        picurl: ''
                    },
                    sub_button: []
                }
                this.menuList.push(base)
                this.currentFirMenu = base
                this.currentSecMenu = {}  //清空当前二级菜单
                this.setStatus(false)
            }else{
                // 存在id则是二级菜单
                const secBase = {
                    name: '二级菜单',
                    type: 'click',
                    key: nanoid(17),
                    reply_type: '1',
                    reply_content: {
                        content: '',
                        imageId: '',
                        pageUrl: '',
                        title: '', 
                        url: '',
                        description: '',
                        picurl: ''
                    },
                    sub_button: []
                }
                this.menuList = this.menuList.map(menu => {
                    if(menu.key === id){
                        menu.type = ''
                        delete menu.reply_type
                        delete menu.reply_content
                        menu.sub_button.push(secBase)
                    }
                    return menu
                })
                this.currentSecMenu = secBase
                this.setStatus(true)
            }
        },

        // 编辑菜单（一级菜单，二级菜单）
        modifyMenu(type, obj, cb){
            const {currentFirMenu, currentSecMenu} = this
            this.imgUploadTip = false
            if(type===1){
                this.currentFirMenu = JSON.parse(JSON.stringify(obj))
                this.currentSecMenu = {}  //当前二级菜单重置
                this.setStatus(false)
                if(this.currentFirMenu.reply_content){
                    const r_type = this.currentFirMenu.reply_type
                    this.handleTab(r_type)
                }
            }else{
                // 二级菜单
                if(currentSecMenu.key === obj.key){
                    return;
                }
                this.currentSecMenu = JSON.parse(JSON.stringify(obj))
                this.setStatus(true)
                if(this.currentSecMenu.reply_content){
                    const r_type = this.currentSecMenu.reply_type
                    this.handleTab(r_type)
                }
            }

            // 显示编辑时的type
            baseType.includes(obj.reply_type) ? this.type = '1' : this.type = '7'

            cb && cb()
        },
        handleRadioChange(radio){
            if(radio==='1'){
                this.handleSetting({
                    type: 'click',
                    reply_type: radio
                })
            }else{
                this.handleSetting({
                    type: 'view',
                    reply_type: radio
                })
            }
        },
        async handleTab(tab){
            const {reply_type, reply_content} = this.currentMenu
            this.imageUrl = ''
            // 图片
            if(reply_content.imageId && tab === '2'){
                const {data} = await this.getImgUrlById(reply_content.imageId)
                const {url} = data.data
                this.imageUrl = url
            }
            // 图文（目的是用id换url）
            // if(reply_content.graphicId && tab === '6'){
            //     const {data} = await this.getImgUrlById(reply_content.graphicId)
            //     const {url} = data.data
            //     this.imageUrl = url
            //     console.log('data====', url)
            // }
            this.handleSetting({reply_type: tab})

        },
        // 修改菜单名称
        handleInputChange(name){
            this.handleSetting({name})
        },// 上传图片回调
        handlePicComplete(imgId) {
            this.handleReplyContentVal('imageId', imgId)
            console.log('图片好了：' + imgId)
        },
        // 上传图文回调
        handleGraphicComplete(picurl) {
            this.handleReplyContentVal('picurl', picurl)
            this.imgUploadTip = false
            console.log('图文图片好了：' + picurl)
        },
        handleReplyContentVal(key, val){
            const p_set = {[key]: val}
            const { content, pageUrl, imageId, title, url, description, picurl } = this.currentMenu.reply_content
            const reply_content = {
                imageId,
                pageUrl,
                content,
                title, 
                url,
                description,
                picurl,
                ...p_set
            }
            this.handleSetting({reply_content})
        },
        // 修改设置
        handleSetting(params){
            const {currentFirMenu, currentSecMenu} = this
            const {key} = this.currentMenu
            // 修改的是一级菜单
            if(key === currentFirMenu.key){
                this.currentFirMenu = {...currentFirMenu, ...params}
                this.menuList = this.menuList.map(menu => {
                    if(menu.key === currentFirMenu.key){
                        menu = this.currentFirMenu
                    }
                    return menu
                })
            }else{
                this.currentSecMenu = {...currentSecMenu, ...params}
                this.menuList = this.menuList.map(menu => {
                    if(menu.key === currentFirMenu.key){
                        menu.sub_button = menu.sub_button.map(sub => {
                            if(sub.key === currentSecMenu.key){
                                sub = this.currentSecMenu
                            }
                            return sub
                        })
                    }
                    return menu
                })
            }
        },
        
        validateItem(type, element, firstEle){
            const {imageId, content, pageUrl, title, url, description, picurl} = element.reply_content
            if(!element.name){
                this.$message('请先完善菜单名称')
                firstEle ? this.modifyMenu(1, firstEle) : ''
                this.modifyMenu(type, element)
                return false
            }
            if(element.reply_type === '1'){
                if(!content){
                    this.$message('请先完善['+ element.name +']的文本消息')
                    firstEle ? this.modifyMenu(1, firstEle) : ''
                    this.modifyMenu(type, element)
                    return false
                }
            }
            if(element.reply_type === '2'){
                if(!imageId){
                    this.$message('请先完善['+ element.name +']的图片消息')
                    firstEle ? this.modifyMenu(1, firstEle) : ''
                    this.modifyMenu(type, element)
                    return false
                }
            }
            if(element.reply_type === '6'){
                // 在这里校验
                if(!title || !url || !description || !picurl){
                    // this.$message('请先完善['+ element.name +']的图文消息')
                    firstEle ? this.modifyMenu(1, firstEle) : ''
                    this.modifyMenu(type, element, () => {
                        this.$nextTick(() => {
                            // 表单校验
                            this.submitForm('ruleForm')
                        })
                        
                    })
                    
                    return false
                }
            }
            if(element.reply_type === '7'){
                if(!pageUrl){
                    this.$message('请先完善['+ element.name +']的网页地址')
                    firstEle ? this.modifyMenu(1, firstEle) : ''
                    this.modifyMenu(type, element)
                    return false
                }
            }
            return true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.currentMenu.reply_content.picurl){
                        this.imgUploadTip = true
                    }
                } else {
                    console.log('提交参数错误');
                }
            });
        },
        // 提交表单校验
        validate(){
            const {menuList} = this
            let validateSattus = true
            for (let index = 0; index < menuList.length; index++) {
                const element = menuList[index];
                // 一级菜单
                if(!element.sub_button.length){
                    validateSattus = this.validateItem(1, element)
                    if(!validateSattus){
                        return validateSattus
                    }
                }else{
                    // 带有二级菜单的一级和二级
                    if(!element.name){
                        this.$message('请先完善菜单名称')
                        this.modifyMenu(type, element)
                        return false
                    }
                    const sub_button = element.sub_button
                    for (let j = 0; j < sub_button.length; j++) {
                        const sub = sub_button[j];
                        validateSattus = this.validateItem(2, sub, element)
                        if(!validateSattus){
                            return validateSattus
                        }
                    }
                }
            }
            return validateSattus
        },
        formatMenulist(Menus){
            const setBaseData = (menu, type) => {
                const params = type ?  {sub_button: menu.sub_button} : {}
                return {
                    key: menu.key,
                    name: menu.name,
                    type: menu.type,
                    reply_type: menu.reply_type,
                    reply_content: menu.reply_content,
                    ...params
                }
            }
            return Menus.map(menu => {
                if(menu.sub_button.length){
                    menu.sub_button = menu.sub_button.map(sub => {
                        return setBaseData(sub)
                    })
                    return setBaseData(menu, 1)
                }else{
                    return setBaseData(menu)
                }
            })
        },
        // 保存菜单数据
        saveData(){
            const {wechatId, currentWechat, menuList} = this
            if(!wechatId){
                return this.$message('请先选择一个公众号')
            }
            // 校验
            if(this.validate()){
                console.log('校验成功')
                // return
                this.loading = true
                const list = this.formatMenulist(menuList)
                axios.post(hostAddress + '/wechat/wechat.menu/save', {
                    wechatInfoId: currentWechat.id,
                    content: JSON.stringify({ button: list })
                })
                .then((res) => {
                    const data = res.data;
                    if(res.status === 200){
                        if(!data.code){
                            this.loading = false
                            this.$message({
                                type: 'success',
                                message: '菜单保存成功'
                            })
                            // 数据重置
                            this.type = '1'
                            this.currentFirMenu = this.currentSecMenu = {}
                            this.getMenuDetails(wechatId)
                        }
                    }
                })
                .catch((error) => {
                    console.log('菜单保存出错：' + error);
                })
            }
        }
    },
    components: {
        AskModal,
        UploadImg,
        UploadByBaishan
    }
}
</script>

<style lang="less" scoped>
.top{
    padding: 30px 22px;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
    label{
        font-size: 18px;
        color: #111C2A;
        margin-right: 12px;
    }
    .self-wechat{
        width: 300px;
        height: 40px;
    }
}

.container{
    background: #fff;
    flex-wrap: wrap;
    padding: 16px;
    .preview{
        width: 294px;
        height: 580px;
        margin: 0 16px 16px 0;
        background-size: contain;
        background-image: url('https://sslfile.ichazuo.cn/1601027200139311.png');
        background-position: left top;
        background-repeat: no-repeat;
        border: 1px solid #e7e7eb;
        position: relative;
        z-index: 5;
        .wechat-name{
            color: #fff;
            text-align: center;
            font-size: 15px;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            margin: 28px 60px;
        }
        .mobild-bd{
            position: absolute;
            bottom: 0;
            left: 0;
            background-image: url('https://sslfile.ichazuo.cn/1601027236590210.png');
            background-position: left top;
            background-repeat: no-repeat;
            width: 100%;
            height: 50px;
            padding-left: 43px;
            border-top: 1px solid #e7e7eb;
            box-sizing: border-box;
            .menu-list{
                .fli{
                    min-width: 33%;
                    line-height: 50px;
                    height: 50px;
                    border-right: 1px solid #e7e7eb;
                    font-size: 14px;
                    color: #616161;
                    flex: 1;
                    cursor: pointer;
                    position: relative;
                    z-index: 3;
                    &:last-child{
                        border-right: none;
                        .sub-menu-list{
                            border-right: none;
                        }
                    }
                    .add-icon{
                        font-size: 20px;
                        font-weight: 600;
                        color: #616161;
                    }
                    .sub-menu-list{
                        position: absolute;
                        left: 0;
                        top: -50px;
                        width: 100%;
                        border: 1px solid #e7e7eb;
                        border-bottom: none;
                        .sli{
                            color: #616161;
                            border-bottom: 1px solid #e7e7eb;
                            &:last-child{
                                // border-bottom: none;
                            }
                        }
                        .active{
                            border-bottom: 1px solid #07c160;
                        }
                    }
                }
                .active{
                    border: 1px solid #07c160;
                    background-color: #fff;
                    height: 48px;
                    line-height: 48px;
                    color: #07c160;
                    &:last-child{
                        border-right: 1px solid #07c160;
                    }
                }
            }
        }
    }
    .setting{
        background: #f4f5f9;
        padding: 0 20px 20px;
        min-width: 540px;
        box-sizing: border-box;
        .s-top{
            padding: 12px 0;
            font-size: 15px;
            border-bottom: 1px solid #e7e7eb;
            .name{
                font-weight: 600;
                color: #353535;
            }
            .delete{
                font-weight: 600;
                color: #576b95;
                cursor: pointer;
            }
        }
        .item{
            margin-top: 20px;
            .menu-name{
                width: 80px;
                font-size: 15px;
                color: #353535;
            }
            .name{
                width: 300px;
                height: 32px;
                /deep/ .el-input__inner{
                    height: 32px;
                    line-height: 32px;
                } 
            }
            /deep/ .el-radio__input{
                &.is-checked{
                    .el-radio__inner{
                        border-color: #07c160;
                        background: #07c160;
                    }
                    &+.el-radio__label{
                        color: #07c160;
                    }
                }
            }
                 
            .tips{  
                margin-top: 4px;
                font-size: 12px;
                color: #9a9a9a;
            }
        }
        .main-con{
            margin-top: 10px;
            background: #fff;
            border: 1px solid #e7e7eb;
            .info{
                .t-header{
                    width: 100%;
                    height: 60px;
                    background: #f6f8f9;
                    span{
                        margin: 0 20px;
                        font-size: 16px;
                        height: 100%;
                        color: #9a9a9a;
                        cursor: pointer;
                        .iconfont{
                            font-size: 20px;
                            margin-right: 4px;
                        }
                        &:hover{
                            color: #07c160;
                        }
                    }
                    .active{
                        color: #07c160;
                    }
                }
                .con{
                    padding: 30px 20px;
                    .txt_description{
                        /deep/ .el-textarea__inner{
                            resize: none;
                            padding: 10px;
                        }
                    }
                    .up_cover{
                        /deep/ .el-form-item__content{
                            line-height: 1;
                        }
                        .up-img{
                            margin-bottom: 4px;
                        }
                        .img-upload-tip{
                            color: #F56C6C;
                            font-size: 12px;
                            line-height: 1;
                        }
                    }
                    
                    .mode{
                        // padding: 30px;
                        font-size: 15px;
                        color: #9a9a9a;
                        /deep/ .el-textarea__inner{
                            resize: none;
                            padding: 10px;
                            font-size: 16px;
                            color: #333;
                            border: none;
                            overflow: hidden;
                            &:focus{
                                border: none;
                            }
                        }
                    }
                }
            }
        }
        .operation{
            margin-top: 40px;
            .save-release{
                width: 116px;
                height: 32px;
                padding: 0;
                background: #07c160;
                border-color: #07c160;
                &:hover{
                    background: #06ad56;
                    border-color: #06ad56;
                }
            }
        }
    }
    .noMenu{
        font-size: 16px;
        color: #9a9a9a;
    }
}
</style>