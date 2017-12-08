### 单页应用下，react&react-redux&react-router v4的有关登录权限认证的想法
目前，如果项目为单页应用，路由由前端控制的条件下，路由及权限控制就是一个不可避免的问题。  

1、登录校验  
    就token验证来说，接口请求和路由控制都需要做出判定。由于react-router V4的组件化思想，取消了路由组件本身的钩子，如onEnter,onLeave等，取而代之的是route组件的render函数或者是react组件的生命周期函数。下面分别用两种例子来实现路由的权限控制：  

    首先看官方示例，选择重要部分：
    const AuthRoute = ({component:Component,...rest}) => (
        <Route {...rest} render={(props) => (
            AuthFunction.isLogin? (
                <Component {...props} />
            ):(
                <Redirect to={{
                    pathname:'/login',
                    <!-- 存入之前页面路由，以便登陆后返回到所期望到达的页面路径下 -->
                    state:{from:props.location} 
                }} />
            )
        )} />
    );

    其次是react高阶组件形式：
    const withAuth = Component => (
        class extends React.Component {
            <!-- some operation -->
            render() {
                return (
                    AuthFunction.isLogin? <Component {...this.props} {...newProps} />:
                    <Loading tips="请登录..." />
                )
            }
        }
    );
    用法为：
    <Route path="/" exact component={withAuth(MainPage)} />

2、登录状态保存  
    redux的状态管理，存储在内存中，在页面刷新后就会出现登录状态丢失，导致重新登录的情况。目前的处理措施分为两步：其一，在登录组件登录成功后把必要信息存储在localStorage或者sessionStorage中，做持久化保存；其二，在根组件初始化加载过程中，通过redux dispatch，获取到所存信息并保存在redux中，以便之后调用（或者在已有的fetch，axios之上，再封装一层，每次执行都会拉去所存状态信息，与发送的实际参数合并，完成接口请求）

3、browserRouter、hashRouter
    若使用browserRouter，在后端未作特殊处理时，刷新页面因服务器寻找指定路径资源文件导致404。因为是单页应用，需要我们对后端加以限制，在请求其他路径资源失败时默认返回首页文件（多指index.html等），以满足单页情况下的路由选择；hashRouter的优势在于不用对后端进行限制，路径以'#'分隔。在react-router v4中，history也出现变化，详细使用可参考官方示例。同时在一些刷新情况下，可以添加history监听，以便根据location决定当前情况下的一些状态变化。

4、补充 location,history,match等
    