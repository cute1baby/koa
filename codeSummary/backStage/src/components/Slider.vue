<template>
    <div class="slider">
        <div class="slider-inner">
            <div class="df dfjend">
                <p class="operation df dfc"></p>
            </div>

            <!-- 菜单目录  @select="handleSlect"-->
            <el-menu
                default-active="1-4-1"
                class="el-menu-vertical-demo"
                :router="true"
                :unique-opened="true"
                :default-openeds="initialPath.split('/')"
            >
                <el-submenu index="home">
                    <template slot="title">
                        <span slot="title">自有数据管理</span>
                    </template>
                    <el-menu-item-group>
                        <div v-for="(m,i) in menuList.homeList" :key="i">
                            <el-menu-item 
                                v-if="m.belongPathList"
                                :index="'/'+m.baseUrl+'/'+m.path"
                                :class="isBelongClass(m.belongPathList)"  
                            >
                                {{m.name}}
                            </el-menu-item>
                        </div>
                        
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import {
    homeList
} from '@/config/menu.js'
export default {
    props: ['initialPath'],
    data() {
        return {
            menuList: {
                homeList
            }
        };
    },
    create(){
        // console.log(this.$route)
    },
    methods: {
        isBelongClass(belongPaths){
            const initialPath = this.initialPath
            const status = belongPaths.some(item => initialPath.includes(item))
            return status ? 'itemActive' : ''
        }
    },
};
</script>

<style lang="less" scoped>
.slider{
    position: relative;
    z-index: 1;
    background: #485465;
    overflow-y: auto;
    .slider-inner{
        .operation{
            width: 64px;
            height: 54px;
            font-size: 18px;
            color: #fff;
        }
        /deep/ .el-menu{
            background: transparent;
            border-right: none;
            .el-submenu{
                .el-submenu__title{
                    font-size: 16px;
                    color: #fff;
                    height: 54px;
                    line-height: 54px;
                    padding: 0 54px 0 25px;
                    .el-submenu__icon-arrow{
                        font-size: 18px;
                        color: #fff;
                    }
                    &:hover{
                        background: transparent;
                    }
                }
                .el-menu-item-group{
                    .el-menu-item-group__title{
                        display: none;
                    }
                    .el-menu-item{
                        height: 54px;
                        line-height: 54px;
                        font-size: 16px;
                        color: #fff;
                        &:hover{
                            background: #fff;
                            color: #485465;
                        }
                    }
                    .itemActive{
                        background: #fff;
                        color: #485465;
                    }
                }
            }
        }
    }

}
</style>
