
import React from 'react';
import { Table, Radio, Divider } from 'antd';
import styles from './index.less';

const Column = Table.Column;
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [
                {
                    id: 1,
                    WebNode: 'div',
                    ServerIP: '服务器地址127.0.0.1',
                    Remark: '这是一个新的',
                    action: '做一些操作'
                },
                {
                    id: 2,
                    WebNode: 'div',
                    ServerIP: '服务器地址127.0.0.1',
                    Remark: '这是一个新的',
                    action: '做一些操作'
                },
                {
                    id: 3,
                    WebNode: 'div',
                    ServerIP: '服务器地址127.0.0.1',
                    Remark: '这是一个新的',
                    action: '做一些操作'
                },
                {
                    id: 4,
                    WebNode: 'div',
                    ServerIP: '服务器地址127.0.0.1',
                    Remark: '这是一个新的',
                    action: '做一些操作'
                }
            ]
        }
    }
    render(){
        const { list } = this.state
        return (
            <div>
                <p className={styles.title} >初始化一个table</p>
                <Table 
                    className={styles.boxTable} 
                    rowKey="id" 
                    dataSource={list} 
                    pagination={false} 
                    size="small"
                >
                    <Column
                        title="节点名称"
                        align="center"
                        dataIndex="WebNode"
                        render={(text, record, index) => {
                        return (
                            <span>{text}</span>    
                        );
                        }}
                    />
                    <Column
                        title="服务器IP"
                        align="center"
                        dataIndex="ServerIP"
                        render={(text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                        }}
                    />
                    <Column
                        title="备注"
                        align="center"
                        dataIndex="Remark"
                        render={(text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                        }}
                    />
                    <Column
                        title="操作"
                        align="center"
                        dataIndex="action"
                        width={120}
                        render={(text, record, index) => {
                        return (
                            <span>{text}</span>
                        );
                        }}
                    />
                </Table>
            </div>
        )
        
    }
}

export default Home