import React from 'react';
import { Table, Tag } from 'antd';
// import styles from './index.less';
import { connect } from 'dva';

// const Index = ({users}) => {
class Index extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            questionList: []
        }
    }
    //加载数据
    componentWillMount(){
        this.getQuestionList()
    }
    getQuestionList(){
        const { dispatch } = this.props;
        dispatch({
            type: "users/getQuestionList",
            payload: {}
        }).then(result => {
            const data = result.data.data
            if(data.resultTypeId === 1){
                this.setState({
                    questionList: data.list
                })
            }
        });
    }
    render(){
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age'
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address'
            },
            {
              title: 'Tags',
              key: 'tags',
              dataIndex: 'tags',
              render: tags => (
                <>
                  {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <div size="middle">
                  <a>Invite {record.name}</a>
                  <a>Delete</a>
                </div>
              ),
            },
        ];
        const {users} = this.props
        const {questionList} = this.state
        // 返回值
        return (
            <div className="list-table" >
                {
                    questionList.length && 
                    <Table columns={columns} dataSource={questionList} />
                }
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Index)
// export default Index