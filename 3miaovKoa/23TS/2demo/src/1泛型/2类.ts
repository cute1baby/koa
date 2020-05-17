class MyArray <T> {
    private _data: T[] = []
    constructor() {

    }

    public mypush(v: T): number {
        this._data.push(v)
        return this._data.length;
    }
}

// 对于arr对象这个实例来讲，里面的T就是string
let arr3: MyArray<string> = new MyArray()
arr3.mypush('1')

// 对于arr对象这个实例来讲，里面的T就是number
let arr4: MyArray<number> = new MyArray()
arr4.mypush(5)


