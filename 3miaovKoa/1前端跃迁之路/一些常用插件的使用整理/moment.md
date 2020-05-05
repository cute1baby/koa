- 安装
```
npm i moment --save
```

-

- 设置年月日时分秒的时间格式
```
return moment(this.getDataValue('create_at')).format('YYYY-MM-DD HH:mm:ss');
```

- 没看懂这是啥
```
const startDate = moment().month(moment().month() + i).startOf('month').valueOf();
const m = moment(startDate).month() + 1;
console.log(m)
```

