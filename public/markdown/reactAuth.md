### 单页应用下，react&react-redux&react-router v4的有关登陆权限认证的想法
目前，如果项目为单页应用，或者再多一步，路由由前端控制的条件下，权限控制就是一个不可避免的问题。  

就token验证来说，接口请求和页面控制都需要做出判定。我们在登录时获取到token字段保存到sessionStorge中