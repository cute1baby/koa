ast  --  抽象语法树

## ast结构
我认为跟Vnode是差不多的
```javascript
const element1 = {
    type: 1,
    tag: "div",
    attrsList: [{name: "id", value: "app"}],
    attrsMap: {id: "app"},
    parent: undefined,
    children: []
}
```


## 常用的一些正则
- 在文件parser/index.js中
```javascript
/** 在文件parser/index.js */
/*匹配@以及v-on，绑定事件 */
export const onRE = /^@|^v-on:/
/*匹配v-、@以及:*/
export const dirRE = /^v-|^@|^:/
/*匹配v-for中的in以及of*/
export const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/
/*v-for参数中带括号的情况匹配，比如(item, index)这样的参数*/
export const forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/
/*匹配并捕获:开头的属性*/
const argRE = /:(.*)$/
/*匹配v-bind以及:*/
const bindRE = /^:|^v-bind:/
/*根据点来分开各个级别的正则，比如a.b.c.d解析后可以得到.b .c .d*/
const modifierRE = /\.[^.]+/g
```


- 在文件parser/html-parser.js
```javascript
// 匹配一个或多个非空白字符,并捕获匹配到的内容
const singleAttrIdentifier = /([^\s"'<>/=]+)/
// 匹配一个=
const singleAttrAssign = /(?:=)/
// 匹配属性值(包括单引号或双引号内或者不用引号)
const singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
]
// 整合上面3个，用于匹配完整的属性，并允许属性名、等号、属性值之前可以有多个空白字符。
const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)


// 举例下面几个可被匹配的例子：
"href='https://www.imliutao.com'".match(attribute)
" href = 'https://www.imliutao.com'".match(attribute)
' href =https://www.imliutao.com'.match(attribute)


// 匹配的是以a-zA-Z_开头
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
// 匹配ncname开头，紧跟着一个冒号，然后又跟着一个ncname，捕获整体匹配的内容
const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
// 匹配起始标签
const startTagOpen = new RegExp('^<' + qnameCapture)
// 匹配起始标签的结束部分
const startTagClose = /^\s*(\/?)>/
// 匹配双标签的结束标签
const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
/*匹配<!DOCTYPE> 标签*/
const doctype = /^<!DOCTYPE [^>]+>/i
/*匹配注释*/
const comment = /^<!--/
const conditionalComment = /^<!\[/
```


- 在文件parser/text-parser.js
```javascript
// 默认的模板分隔符匹配
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
// 匹配需要转义的字符
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
```

- 在文件parser/filter-parser.js
```javascript
// 匹配字母数字及列出的字符
const validDivisionCharRE = /[\w).+\-_$\]]/
```


## 编译模板

### parse函数的实现
1、保存了一系列options传入的方法
2、执行parseHTML函数(解析模板的功能)
3、返回root（root是什么）

### parseHTML函数的实现
1、保存了一系列options传入的方法
2、一系列的循环




