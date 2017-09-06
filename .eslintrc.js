const eslintrc = {
    "extends": ["eslint-config-airbnb"],
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true, //允许对象的解构赋值
        }
    },
    "rules": {
        //"linebreak-style": [2, "windows"],
        "indent": [2, 4, {
            "SwitchCase": 1
        }], // 4格缩进
        "react/self-closing-comp": [2, {
            "html": false,
        }], // 关闭html标签自闭合
        "react/jsx-filename-extension": [1, {
            "extensions": [".js", ".jsx"],
        }], // 允许在js和jsx文件写入jsx代码
        "react/jsx-indent": [2, 4],
        "react/prop-types": [0], // react/props无验证
    }
};
module.exports = eslintrc;
