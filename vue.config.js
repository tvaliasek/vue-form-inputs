module.exports = {
    chainWebpack: config => {
        config.externals(
            (
                (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development')
                    ? {}
                    : {
                        'bootstrap-vue': 'bootstrap-vue'
                    })
        )
    }
}
