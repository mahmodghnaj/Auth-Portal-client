
module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: { config: './customization/tailwind.config' },
        autoprefixer: {},
    },
}
