import axios from 'axios'

export const fetchData = (fn)=>{
    axios.get('http://a.jspang.com/jestTest.json').then((response)=>{
        fn(response.data)
    })
}