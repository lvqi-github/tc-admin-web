module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 8081,
        disableHostCheck:true,
        proxy: {
            '/api': {
                target: 'http://localhost:8082/serve/admin',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};