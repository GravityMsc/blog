## webpack@3  
### entry&output  
我们以一个最简单的配置为例：
```
    entry: {
        index:'./src/index.js',
    },
    output:{
        path: __dirname + '/dist',
        filename: '[name]__[chunkHash:8].js',
        chunkFilename: "[name]__[chunkHash:5]_chunk.js",
        publicPath: '/',
    }
```
首先看entry部分，该参数由若干键值对键值对构成，其中value部分可以传递数组，如：  
```
vendors:['react',react-dom]
```
大多数简单情况下，可以对entry配置两组键值对，其中一组为入口函数，另一组为所依赖的库文件，以便之后用webpack的插件 `CommonsChunkPlugin` 优化。  
  
output结构与entry相似：
-   path：这里的路径为webpack打包输出后的目录。其中 `__dirname` 属于关键字，可以用 `path` 这个包来替代。
-   filename：打包输出文件。 `[name]` 继承entry中key值，如 `index` , `vendors` 等作为输出文件名。  
    `[chunkhash]` 为该文件所含js模块的hash编码，有别于 `[hash]` 。hash为每次打包后生成的hash码，每当运行webpack时，所有文件重新编译，此hash重新生成，造成打包缓慢。  
    chunkhash为该JS模块的hash码，当编码过程中所修改的部分不涉及其他JS块时，其所对应的chunkhash不会改变，不会重复打包，故用此为好。
-   chunkFilename：模块输出文件名。应用在js文件存在异步加载模块中，以使    用最多的 `require.ensure` 为例：
    ```
        require.ensure([], (require) => {
            const { tip } = require('../common/messageTip');
            tip('require.ensure has been used');
        }, 'messageChunk');
    ```
    `require.ensure` 为异步加载JS代码，只有当执行时才进行获取指定JS文件。我们没有必要在首页加载时进行请求。webpack识别后抽取该代码块，会根据 `chunkFilename` 生成相应文件以便之后调用。
-   publicPath：文件引用路径。与之后 `HtmlwebpackPlugin` 紧密相关，当插件把打包后生成的文件路径插入html中，采取的是此路径。同时，当文件资源分开部署时，你也可以传递url对其引用。