
## csrf是怎样的？
黑客引诱用户打开黑客的网站，利用用户的登录状态发起的跨站请求，并通过第三方的站点来做一些坏事。


## 打开了黑客的页面后，黑客有三种方式去实施 CSRF 攻击


### 1、自动发起Get请求
比如知道网站的接口如下：
```
abc.com/sendMoney?user=targetName&number=1000
```
此时黑客页面有下面一段HTML代码，将转账请求隐藏在img标签中，但是打开页面时会自动发起img的资源请求，此时就将资金转移到黑客账户上了。
```
<!DOCTYPE html>
<html>
  <body>
    <h1>黑客的站点：CSRF攻击演示</h1>
    <img src="http://abc.com/sendMoney?user=targetName&number=1000">
  </body>
</html>
```

### 2. 自动发起 POST 请求
类似的，黑客构造一个表单页面并自动发送请求，代码如下：
```
<!DOCTYPE html>
<html>
<body>
  <h1>黑客的站点：CSRF攻击演示</h1>
  <form id='hacker-form' action="http://abc.com/sendMoney" method=POST>
    <input type="hidden" name="user" value="hacker" />
    <input type="hidden" name="number" value="100" />
  </form>
  <script> document.getElementById('hacker-form').submit(); </script>
</body>
</html>
```


### 3. 引诱用户点击链接
这种方式通常出现在论坛或者恶意邮件上。黑客会采用很多方式去诱惑用户点击链接，示例代码如下所示：
```
<div>
  <img width=150 src=http://images.xuejuzi.cn/1612/1_161230185104_1.jpg> </img> </div> <div>
  <a href="http://abc.com/sendMoney?user=targetName&number=1000" taget="_blank">
    点击下载美女照片
  </a>
</div>
```



## CSRF攻击和XSS工具的不同
CSRF是诱导用户进入到黑客的网站，利用登录状态发起跨站请求实施攻击；XSS是通过代码注入的方式进行攻击的



## 如何防止CSRF攻击

### 1. 充分利用好Cookie的SameSite属性
如果是从第三方站点发起的请求，那么需要浏览器禁止发送某些关键 Cookie 数据到服务器；
如果是同一个站点发起的请求，那么就需要保证 Cookie 数据正常发送。

即通过 set-cookie 字段设置 Cookie 时，可以带上 SameSite 选项
```
set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none
```

- SameSite 选项通常有 Strict、Lax 和 None 三个值。参考链接如下：https://web.dev/samesite-cookies-explained 。
    - trict: 浏览器会完全禁止第三方 Cookie。
    - Lax: 在第三方站点的链接打开或Get方式的表单都会携带Cookie。
    - None: 任何情况下都发送Cookie。


### 2. 验证请求的来源站点
Referer是HTTP请求头中的一个字段，记录了该HTTP请求的来源地址。

这可以通过 Referer 告诉服务器 HTTP 请求的来源，但是有一些场景是不适合将来源 URL 暴露给服务器的，因此浏览器提供给开发者一个选项，可以不用上传 Referer 值，具体可参考 `Referrer Policy`。

但在服务器端验证请求头中的 Referer 并不是太可靠，于是又制定了Origin属性。Origin属性只包含域名信息，并不包含具体的 URL 路径。


### 3. CSRF Token
分两步执行。

第一步，在浏览器向服务器发起请求时，服务器生成一个 CSRF Token。CSRF Token 其实就是服务器生成的字符串，然后将该字符串植入到返回的页面中。代码示例如下：
```
<!DOCTYPE html>
<html>
<body>
    <form action="https://time.geekbang.org/sendcoin" method="POST">
      <input type="hidden" name="csrf-token" value="nc98P987bcpncYhoadjoiydc9ajDlcn">
      <input type="text" name="user">
      <input type="text" name="number">
      <input type="submit">
    </form>
</body>
</html>
```

第二步，在浏览器端如果要发起转账的请求，那么需要带上页面中的 CSRF Token，然后服务器会验证该 Token 是否合法。如果是从第三方站点发出的请求，那么将无法获取到 CSRF Token 的值。


## 总结
1.CSRF是什么： 跨域请求伪造，通过第三方站点模拟用户请求行为
2.如何防范CSRF攻击： 本质就是识别客户端操作是否是用户本人操作
1>.业务上针对重要操作，需要再次验证，如短信验证码等，确保你是你
2>.公司内部做好文档管理：源码、接口文档等，减少信息泄露
3>.服务端针对cookie、session等敏感头信息设置samesite
4>.敏感接口数据采用加密传输、新增时效性或随机参数，增加请求信息不确定性，比如：CSRF Token参数



