<template>
    <el-dialog
        class="askModal"
        title="提示"
        width="460px"
        append-to-body
        :visible.sync="modalStatus"
        :before-close="closeDialog"
    >
        <!-- <span class="askTitle">确定修改当前真实入群人数？</span>{{askContent}} -->
        <span class="askTitle">{{askContent}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="confirmDialog">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        modalStatus: {
            type: Boolean,
            default: false
        },
        askContent: {
            type: String,
            default: ''
        },
        tokeParams: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            tokeParamsclone: JSON.parse(JSON.stringify(this.tokeParams || {}))
        }
    },
    mounted(){
        console.log(this.tokeParams)
    },
    methods: {
        closeDialog(){
            // 关闭弹窗  :before-close="handleClose"
            this.$emit("closeModal");
        },
        confirmDialog(){
            console.log('tokeParams===', this.tokeParamsclone)
            // handleKeepJoinQun
            this.$emit("confirmModal", this.tokeParamsclone);
        }
    }
}
</script>

<style lang="less" scoped>
.askModal{
    // padding: 0 40px 40px;
    /deep/ .el-dialog__header{
        .el-dialog__headerbtn{
            font-size: 30px;
            &:hover .el-dialog__close{
                color: #06609A;
            }
        }
    }
    /deep/ .el-dialog__body{
        .askTitle{
            font-size: 16px;
            color: #333;
        }
    }
}
</style> 
