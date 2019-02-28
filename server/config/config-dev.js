module.exports = {
    port: '3200',
    cas: {
        servicePrefix: 'http://localhost:3200',
        serverPath: 'http://192.168.111.216:8080',
        switch: false
    },
    proxy: {
        target: 'http://192.168.111.217:8040',
        AUTH_ID: '3316dc67-2517-46f5-958d-1cd46d4eab58',
        AUTH_USER: 'admin'
    }
}