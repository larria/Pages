# Pages.js - 动态分页组件

### 资源引用

``` html
<link rel="stylesheet" href="pages.css" />
<script src="pages-min.js"></script>
```

### 初始化参数

- **wrap** : 初始化外层容器

- **total** : 总共页码数

- maxShow : 每次最多显示页码数量，默认为999

- onIndex : 初始化默认页码，默认为1

- onPGReady : 组件实例渲染完毕回调

- onEachPage : 组件实例当前页码变化回调；**注意：基于灵活性，组件初始化渲染完毕不会执行onEachPage**

### 状态值，组件实例通过```this.status```访问，只读不写

- total : 总共页码数

- onIndex : 当前页码

- from : gotoPage后，记录跳转来源页码

### 公有方法

- gotoPage :跳转页面(para：Number-跳转页数)。

- addPages :手动添加页数(para：Number-添加页数, Function-一次性回调函数)。

- enable :启用/禁用组件(para：Boolean-可选, 是否启用组件, true为启用)。一般用于异步操作，如ajax分页。

- destructor :组件析构。

------------

### [demo](/../index.html)

##### 示例1：```完整调用```

``` javascript
var page = new Pages({
    wrap: 'pages-demo',
    total: 11,
    maxShow: 5,
    onIndex: 3,
    onPGReady: function (){
    },
    onEachPage: function (){
    }
});
```

##### 示例2：```实现ajax分页(伪代码)```

``` javascript
var page = new Pages({
    // ...其他必填参数
    // 初始化后根据初始页码制定ajax
    onPGReady : function (){
        _ajaxByPage.call(this);
    },
    // 页码改变时根据当前页码制定ajax
    onEachPage : function (){
        _ajaxByPage.call(this);
    }
});
// ajax伪代码
function _ajaxByPage (){
    var me = this;
    // ajax时暂时disable分页
    this.enable(false);
    // ajax请求, 使用this.status.onIndex获取当前页码数作为参数
    ajax(url, this.status.onIndex, {
        success : function (){
            // ...成功后的回调
            // 重新enable分页
            me.enable(true);
        }
    });
}
```