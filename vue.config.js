module.exports = {
    devServer: {
        port: 8080,
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