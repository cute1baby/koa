<template>
    <div>
        <quill-editor 
            id="editor"
            class="editor df dfdir"
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)" 
        />
        <div class="df dfaic dfjend up-bottom">
            <p class="s-tag">选择标签：<span>前端</span></p>
            <el-button>确定并发布</el-button>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    data(){
        return {
            content: null,
            editorOption: {
              modules: {
                toolbar: [
                  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"], // 引用  代码块
                  [{ header: 1 }, { header: 2 }], // 1、2 级标题
                  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                  [{ script: "sub" }, { script: "super" }], // 上标/下标
                  [{ indent: "-1" }, { indent: "+1" }], // 缩进
                  // [{'direction': 'rtl'}],                         // 文本方向
                  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ["clean"], // 清除文本格式
                  ["link", "image", "video"] // 链接、图片、视频
                ], //工具菜单栏配置
              },
              placeholder: '请在这里添加产品描述', //提示
              readyOnly: false, //是否只读
              theme: 'snow', //主题 snow/bubble
              syntax: true, //语法检测
            }
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    },
    created(){
        this.controlHead('.main-header', 'none')
    },
    destroyed() {
        this.controlHead('.main-header', 'block')
    },
    mounted() {
        // console.log('this is my editor',this.editor);
    },
    methods: {
        controlHead(oDiv, status){
            const oDivDom = document.querySelector(oDiv)
            if(oDivDom){
                oDivDom.style.display = status
            }
        },
        // 失去焦点
        onEditorBlur(editor) {},
        // 获得焦点
        onEditorFocus(editor) {},
        // 开始
        onEditorReady(editor) {},
        // 值发生变化
        onEditorChange(editor) {
            this.content = editor.html;
            console.log(editor);
        }
    },
    components: {
        quillEditor
    }
}
</script>

<style lang="less" scoped>
#editor {
    line-height: normal !important;
    height: 400px;
    /deep/ .ql-snow{
        &.ql-toolbar{
            height: 42px;
            flex-basis: 42px;
        }
        &.ql-container {
            flex: 1;
        }
        [data-mode=link]{
            &::before {
                content: "请输入链接地址:";
            }
        }
        .ql-action{
            &::after {
                border-right: 0px;
                content: '保存';
                padding-right: 0px;
            }
        }
        [data-mode=video]{
            &::before {
                content: "请输入视频地址:";
            }
        }
        .ql-size{
            .ql-picker-label{
                &::before{
                    content: '14px';
                }
                &[data-value=small]{
                    &::before{
                        content: '10px';
                    } 
                }
                &[data-value=large]{
                    &::before{
                        content: '18px';
                    } 
                }
                &[data-value=huge]{
                    &::before{
                        content: '32px';
                    } 
                }
            }

            .ql-picker-item{
                &::before{
                    content: '14px';
                } 
                &[data-value=small]{
                    &::before{
                        content: '10px';
                    } 
                }
                &[data-value=large]{
                    &::before{
                        content: '18px';
                    } 
                }
                &[data-value=huge]{
                    &::before{
                        content: '32px';
                    } 
                }
            }
        }
        
        .ql-header{
            .ql-picker-label{
                &::before{
                    content: '文本';
                } 
                &[data-value="1"]{
                    &::before{
                        content: '标题1';
                    }
                }
                &[data-value="2"]{
                    &::before{
                        content: '标题2';
                    }
                }
                &[data-value="3"]{
                    &::before{
                        content: '标题3';
                    }
                }
                &[data-value="4"]{
                    &::before{
                        content: '标题4';
                    }
                }
                &[data-value="5"]{
                    &::before{
                        content: '标题5';
                    }
                }
                &[data-value="6"]{
                    &::before{
                        content: '标题6';
                    }
                }
            }
            
            .ql-picker-item{
                &::before{
                    content: '文本';
                } 
                &[data-value="1"]{
                    &::before{
                        content: '标题1';
                    }
                }
                &[data-value="2"]{
                    &::before{
                        content: '标题2';
                    }
                }
                &[data-value="3"]{
                    &::before{
                        content: '标题3';
                    }
                }
                &[data-value="4"]{
                    &::before{
                        content: '标题4';
                    }
                }
                &[data-value="5"]{
                    &::before{
                        content: '标题5';
                    }
                }
                &[data-value="6"]{
                    &::before{
                        content: '标题6';
                    }
                }
            }
        }

        .ql-font{
            .ql-picker-label{
                &::before{
                    content: '标准字体';
                }
                &[data-value=serif]{
                    &::before{
                        content: '衬线字体';
                    } 
                }
                &[data-value=monospace]{
                    &::before{
                        content: '等宽字体';
                    } 
                }
            }

            .ql-picker-item{
                &::before{
                    content: '标准字体';
                } 
                &[data-value=serif]{
                    &::before{
                        content: '衬线字体';
                    } 
                }
                &[data-value=monospace]{
                    &::before{
                        content: '等宽字体';
                    } 
                }
            }
        }

        .ql-editor.ql-blank{
            &::before{
                font-style: normal;
                font-size: 16px;
            }
        }
        
    }

}
.up-bottom{
    margin: 30px;
    .s-tag{
        margin-right: 20px;
    }
}
</style>