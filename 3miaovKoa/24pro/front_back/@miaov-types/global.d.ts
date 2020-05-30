import {Model} from 'sequelize'

declare global {
    interface IConf {
        [key: string]: any;
        [index: number]: any;
    }
    interface IDB {
        [key: string]: any;
        [index: number]: any;
    }
}