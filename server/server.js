/**
 * Module dependencies.
 */
var express = require('express')
var proxy = require('http-proxy-middleware');
var multer = require('multer');
var fileUtils = require('./upload/fileUtils');
var config = require('./config/config')
const ConnectCas = require('connect-cas2');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const path = require('path');
const app = express();
const server = app.listen(config.port);

app.use(session({
    name: 'NSESSIONID',
    secret: 'Hello I am a long long long secret',
    resave: true, //添加这行
    saveUninitialized: true, //添加这行
    store: new MemoryStore() // or other session store
}));

if (config.cas.switch) {
    const casClient = new ConnectCas({
        ignore: [
            /\/ignore/
        ],
        match: [],
        servicePrefix: config.cas.servicePrefix,
        serverPath: config.cas.serverPath,
        paths: {
            validate: '/cas/validate',
            serviceValidate: '/cas/serviceValidate',
            // proxy: '/cas/proxy',
            login: '/cas/login',
            logout: '/cas/logout',
            proxyCallback: ''
        },
        redirect: false,
        gateway: false,
        renew: false,
        slo: true,
        cache: {
            enable: false,
            ttl: 5 * 60 * 1000,
            filter: []
        },
        fromAjax: {
            header: 'x-client-ajax',
            status: 418
        }
    });
    app.use(casClient.core());

    //登出cas
    app.get('/logout', casClient.logout());
}


/**
 * Configure proxy middleware
 */
var proxyConfig = proxy({
    target: config.proxy.target,
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/api': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('AUTH_ID', config.proxy.AUTH_ID);
        if (config.cas.switch) {
            proxyReq.setHeader('AUTH_USER', encodeURI(req.session.cas.user));
        } else {
            proxyReq.setHeader('AUTH_USER', config.proxy.AUTH_USER);
        }
    }
});


/**
 * Add the proxy to express
 */
app.use('/api', proxyConfig)


/**
 * 单文件上传
 */
let uploadSingle = multer({
    dest: 'upload/'
});

app.post('/upload', uploadSingle.single('file'), function (req, res) {

    // 文件信息
    if (!req.file) {
        res.send(req.error);
        return;
    }
    var file = req.file;
    fileUtils.putObject(file.path, file.originalname, file.size, function (err, result) {
        if (err) {
            res.send(500, 'upload fail!');
        } else {
            res.send({
                location: 'https://' + result.Location,
                name: file.originalname
            });
        }
    });
});

//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, 'dist')));



//把路由交给angular管理
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

console.log(`[DEMO] Server: listening on ${config.port} `)