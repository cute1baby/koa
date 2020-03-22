const {remote} = require('electron');

let _id = 0;

new Vue({
    el: '#root',
    data: {
        title: 'TODOS',
        type: 'all',    //all, done, undone
        newTodo: '',
        todos: [
            //{title: '任务标题', done: true}
        ]
    },
    computed: {
        showTodos() {
            return this.todos.filter(todo => {
                switch(this.type) {
                    default:
                    case 'all':
                        return true;
                    case 'done':
                        return todo.done;
                    case 'undone':
                        return !todo.done;
                }
            });
        }
    },
    methods: {
        // 关闭应用
        closeApp() {
            // app对象只能通过主线程调用
            remote.app.exit();
        },
        // 最小化应用窗口
        miniApp() {
            // 通过remote下的一个方法来获取当前窗口对象（BrowserWindow）
            remote.getCurrentWindow().minimize();
        },

        // 添加任务
        addTodo() {
            this.todos.push({
                id: _id++,
                title: this.newTodo,
                done: false
            });
            this.newTodo = '';
        },

        // 任务状态切换
        toggle(todo) {
            todo.done = !todo.done;
        },

        // 移除任务
        remove(todo) {
            // 保留下来，todos中与传入的todo不一样的任务
            this.todos = this.todos.filter( item => item != todo );
        },

        // 更改查看的任务类型
        choose(type) {
            this.type = type;
        }
    }
});