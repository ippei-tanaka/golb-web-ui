module.exports = {
    //parser: 'sugarss',
    /*
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        //'autoprefixer': {},
        //'cssnano': {}
    },
    */
    plugins: [
        require('precss'),
        require('autoprefixer')
    ]
};
