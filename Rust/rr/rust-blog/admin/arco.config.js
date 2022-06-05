module.exports = {
    // globs to your packages
    // e.g. [ 'packages/*' ]
    packages: [],
    // command you want to replace 'arco subCommand'
    // e.g. publish: 'lerna publish'
    alias: {
        publish: '',
    },
    // initial meta for 'arco generate'
    initialMeta: {
        group: 0,
    },
    // path of arco block insertion, relative to /src ('myPath' will be resolved as '/src/myPath')
    // pathBlockInsert: 'pathRelativeToSrc',

    // devServer: {
    //配置跨域
    // proxy: {
    //     '/api': {
    //         target: 'http://127.0.0.1:8000',  //后台接口地址
    //         changOrigin: true,  //允许跨域
    //         pathRewrite: {
    //             '^/api': 'api'
    //         }
    //     },
    // }
    // }
};
