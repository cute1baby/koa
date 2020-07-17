// let inter1:any = 'ts'
// inter1 = 18;
// rest是一个数组，然后被解构了
function more(fir:string='pr', las?:string, ...rest:any[]):string {
    console.log(rest)
    return rest.toString()
} 
more('dd', '54', 1, 2, 3, 4, 5)


function caculate(x:string|number):string|number{
    if(typeof x === 'string'){
        return `hello, ${x}`;
    }else if(typeof x === 'number'){
        return 10 * x
    }
}


let b2: Boolean = new Boolean(1);

// 元祖类型
let tuple3: [string, number] = ['pr', 30];
tuple3.push(18);
tuple3.push('pr 18');


// 枚举类型
// enum Friends3 { 张三 = 30, 李四 = 10, 王五 };
// console.log(Friends3['张三'])
// enum Friends3_1 { 张三 = '30', 李四 = '18', 王五 = '2' };
// enum Friends3_3 { 张三 = 30, 李四 = '18'};

// enum Friends4 { 张三 = '30', 李四, 王五 };
// enum Friends4_1 { 张三 = <any>'30', 李四, 王五 };
// enum Friends4_2 { 张三, 李四 = <any>'30', 王五 };
// enum Friends4_3 { 张三, 李四 = <any>'30', 王五 = '30' };
// enum Friends4_4 { 张三, 李四, 王五 = <any>'30' };
// enum Friends4_5 { 张三, 李四 = <any>'30', 王五 = <any>'30' };
// enum Friends4_6 { 张三, 李四 = <any>'30', 王五 = 30 };


// 类
// class Star {
//     public name: string = 'pr';
//     protected age: number = 18;
//     private weight: number = 90;
//     readonly gender: string = '女';

//     public constructor(name: string, age: number, weight: number, gender: string) {
//         this.name = name;
//         this.age = age;
//         this.weight = weight;
//         this.gender = gender;
//     }
// }

// class ChinaStar extends Star {
//     constructor(name: string, age: number, weight: number, gender: string) {
//         super(name, age, weight, gender);
//     }

//     showName(){
//         return `我是${this.name}`
//     }

//     showAge(){
//         return `我实际年龄${this.age}`
//     }

//     showWeight(){
//         return `我的体重${this.weight}`
//     }

//     showGender(){
//         return `我的性别${this.gender}`
//     }
// }

// let pr = new ChinaStar('pr', 30, 120, '男');
// pr.name = '江湖再见';
// pr.age = 18;
// pr.weight = 100;
// pr.gender = '女';

// console.log(pr.name);
// console.log(pr.age);
// console.log(pr.weight);
// console.log(pr.gender);

// console.log(pr.showName());
// console.log(pr.showAge());
// console.log(pr.showWeight());
// console.log(pr.showGender());



// // 类接口
// // 拍照
// interface Photo {
//     photo(): string;
// }

// // 闪光灯
// interface Lamp {
//     lampOn(): void;
//     lampOff(): void;
// }

// // 手机超类
// class Phone {}

// // 手机派生类
// class HuaweiPhone extends Phone implements Photo, Lamp {
//     photo(): string {
//         return '华为拍照';
//     }
//     lampOff() {}
//     lampOn() {}
// }

// // 数码相机
// class DigitalCamera implements Photo {
//     photo(): string {
//         console.log('数码拍照')
//         return '数码拍照'
//     }
// }


interface Lamp {
    lampOn(): void;
    lampOff(): void;
}

interface Wx {
    wxNumber: number;
    showWxNumber(): string;
}

// 拍照
interface Photo extends Lamp, Wx  {
    photo(): string;
}

// 华为手机
class HuaweiPhone2 implements Photo {
    public wxNumber: number;
    photo(): string {
        return '华为手机 mate20 pro 拍照就是酷儿';
    }
    lampOn() {};
    lampOff() {};
    constructor(wxNumber: number) {
        this.wxNumber = wxNumber;
    };

    showWxNumber(){
        return `我的微信号：liferzy`;
    }
}

let huaweiPhone = new HuaweiPhone2(13701833766);
console.log(huaweiPhone.showWxNumber()); // 我的微信号：liferzy
console.log(huaweiPhone.photo());



function same3<T>(arg: T): T {
    return arg;
}
console.log(same3(18));

function same3_1<T>(arg: T): T {
    return arg;
}
console.log(same3_1<number>(18));
console.log(same3_1('十八'));



function info2<S extends N, N>(name: S, age: N): [S, N] {
    return [name, age];
}

console.log(info2('pr', 18));
console.log(info2(30, 18));


declare var $: (selector: string) => any;
$('#root');


interface Station {
    name: string;
    time: number;
    showName(): string;
}
interface Station {
    name: string;
    time: number;
    showTime(): string;
}

let station: Station = {
    name: '前端工程师',
    time: 18,
    showName: function() {
        return `我是一名${this.name}`;
    },
    showTime: () => {
        return `工作已有${station.time}年了`;
    }
}

console.log(station.showName()); // 我是一名前端工程师
console.log(station.showTime()); // 工作已有8年了




