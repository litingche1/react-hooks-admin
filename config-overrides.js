/*
 * @Author: Your name
 * @Date:   2021-01-08 00:17:16
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-11 00:10:53
 */
const { override, adjustStyleLoaders, fixBabelImports } = require("customize-cra");
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd', libraryDirectory: 'es', style: 'css'
    }),
    // ...其他配置...
    adjustStyleLoaders(rule => {
        if (rule.test.toString().includes("scss")) {
            rule.use.push({
                loader: require.resolve("sass-resources-loader"),
                options: {
                    resources: "./src/styles/main.scss" //这里是你自己放公共scss变量的路径
                }
            });
        }
    })
    // ...其他配置...
);