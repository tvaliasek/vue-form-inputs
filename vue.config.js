module.exports = {
    chainWebpack: config => {
        config.externals(
            (
                (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development')
                    ? {}
                    : {
                        'bootstrap-vue': {
                            umd: 'bootstrap-vue',
                            commonjs: 'bootstrap-vue',
                            commonjs2: 'bootstrap-vue',
                            root: 'BootstrapVue'
                        }
                    })
        )
    }
}
