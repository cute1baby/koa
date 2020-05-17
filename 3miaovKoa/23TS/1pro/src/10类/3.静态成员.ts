/**
 * 单例
 */
class Mysql {
    // 静态属性，不需要通过实例化，可以直接用类来操作
    public static instance;

    host: string = '127.0.0.1'
    port: number = 3306
    username: string = 'root'
    password: string = ''
    dbname: string = ''

    private constructor(host: string, port: number, username = '李钟', password = '', dbname=''){
        this.host = host
        this.port = port
        this.username = username
        this.password = password
        this.dbname = dbname
    }

    public static getInstance(){
        // 这样就可以保证实例化对象只有一个
        if (!Mysql.instance){
            Mysql.instance = new Mysql('127.0.0.1', 3306)
        }
        return Mysql.instance
    }

    query() { }
    insert(){}
    update() { }
}

/**
 * 创建一个Mysql对象，通过这个对象来操作数据库
 * 如果不加以限制，这个Mysq可以实例化出来多个db，每一个db对象都会占用资源。
 *  通过某种方式控制系统只有一个db对象在工作，所以需要用代码进行约束
 *      分析：
 *      （1）让构造函数编程私有的，类的外部不能访问它
 *      （2）创建一个静态属性instance
 *      （3）创建一个静态方法getInstance，创建其实例赋值给Mysql.instance，并保证实例的唯一性
 *      （4）外部调用getInstance，其实就相当于实例化该类
 *
 */
let db: Mysql = Mysql.getInstance()
db.query()
db.update()
