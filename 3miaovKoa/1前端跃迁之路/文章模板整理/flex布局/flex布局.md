### 父容器属性
|- flex-direction  row、row-reverse、column、column-reverse  //主轴方向
|- flex-wrap  nowrap、wrap、wrap-reverse  // 换行结果

|- flex-flow  flex-flow是flex-direction和flex-wrap属性的简写形式，默认值为row nowrap

|- justify-content  flex-start、center、flex-end、space-between、space-around  // 水平对齐方式
|- align-items  flex-start、center、flex-end、baseline、stretch  // 垂直对齐方式
|- align-content  flex-start、center、flex-end、space-between、space-around、stretch  // 多行子项在容器内整体垂直对齐方式


### 子项属性
order  <number>  // 项目的排列顺序，值越小越靠前
flex-grow  <number>  // 宽度拉伸的比例
flex-shrink  <number>  // 宽度缩小的比例
flex-basis  <number>或百分比   // 项目占据的主轴空间

flex  默认值为0 1 auto  // flex-grow, flex-shrink 和 flex-basis的简写

align-self  flex-start、center、flex-end、baseline、stretch	   // 单个项目垂直方向对齐方式





