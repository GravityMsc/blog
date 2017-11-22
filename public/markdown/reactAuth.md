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