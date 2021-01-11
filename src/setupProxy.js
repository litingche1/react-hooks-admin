const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use([process.env.REACT_APP_API],
        createProxyMiddleware({
            target: 'http://www.web-jshtml.cn/api/react',
            changeOrigin: true,
            pathRewrite: {
                [`^${process.env.REACT_APP_API}`]: ""
            }
        })
    )
}