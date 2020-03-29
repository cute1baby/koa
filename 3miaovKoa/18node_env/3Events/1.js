const EventEmitter = require('events');

class Person extends EventEmitter {
    constructor(name){
        super();
        this.name = name;
        this.age = 0;
        this.growup();
    }

    growup(){
        const t = setInterval(() => {
            this.age++;
            // 调用eventEmitter.emit方法，触发growup事件
            if(this.age > 5){
                clearInterval(t)
            }
            this.emit('growup');
        }, 1000)
    }
}

const p1 = new Person("小江");

//设置监听数量最大为2
p1.setMaxListeners(2);  // 设置监听的数量超过最大的限制，控制台会有报错提示。
// 绑定事件growup
p1.addListener('growup', function() {
    console.log("I grow up 1 year");
})
// 添加到前面
p1.prependListener('growup', function () {
    console.log("插入到前面...");
})
console.log(p1.getMaxListeners());