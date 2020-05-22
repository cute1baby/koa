- 安装
```
npm i moment --save
```

-

- 设置年月日时分秒的时间格式
```
return moment(this.getDataValue('create_at')).format('YYYY-MM-DD HH:mm:ss');
```

- 计算开始月、周和结束月、周
```
// 计算开始月和结束月
const startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
const endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

// 国外一周从周日算起，所以开始和结束都加1天
const startWeek = moment().startOf('week').add(1,'day').format('YYYY-MM-DD HH:mm:ss')
const endWeek = moment().endOf('week').add(1,'day').format('YYYY-MM-DD HH:mm:ss')
```

