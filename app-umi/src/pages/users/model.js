// import {Effect, ImmerReducer, Reducer, Subscription} from 'umi'
export default {
    namespace: 'users', // 表示在全局 state 上的 key
    state: {}, // 状态数据
    reducers: {
        save(state, action){
            const data = [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ];
            return data
        }
    }, // 管理同步方法，必须是纯函数
    effects: {

    }, // 管理异步操作，采用了 generator 的相关概念
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
              if (pathname === '/users') {
                dispatch({
                  type: 'save',
                });
              }
            });
        }
    } // 订阅数据源
  };