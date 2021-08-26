import path from 'path';
import favicon from './nuxt/favicon';
import fonts from './nuxt/fonts';
import seo from './nuxt/seo';
import head from './nuxt/head';

import {
    APP_ENV,
    HOST,
    PORT,
    APP_URL,
    API_HOST,
    API_PATH,
    IMAGE_BASE_URL,
    GOOGLE_ANALYTICS_ID,
    isProduction,
} from './nuxt/env';

export default {
    ssr: false,

    telemetry: false,

    components: false,

    dev: !isProduction,

    basic: {
        name: process.env.BASIC_AUTH,
        pass: process.env.BASIC_PASS,
        enabled: !isProduction,
    },

    srcDir: path.resolve(__dirname, 'src'),

    loading: '~/components/Loading.vue',

    loadingIndicator: {
        name: 'cube-grid',
        color: '#0c5d9e',
    },

    env: {
        APP_URL,
        API_HOST,
        API_PATH,
        IMAGE_BASE_URL,
        GOOGLE_ANALYTICS_ID,
    },

    head: {
        htmlAttrs: {
            lang: 'vi',
        },
        title: seo.title,
        meta: [...head.meta, ...seo.meta, ...favicon.meta],
        link: [...head.link, ...fonts.link, ...favicon.link],
        script: head.script,
    },

    css: [
        'element-ui/lib/theme-chalk/index.css',
    ],

    plugins: [
        '@/plugins/constants',
        '@/plugins/element-ui',
        '@/plugins/filters',
        '@/plugins/mixins/validation',
        '@/plugins/mixins/user',
        '@/plugins/axios',
        { src: '@/plugins/rating.js', mode: 'client' },
        { src: '@/plugins/persistedState.js' },
    ],

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/style-resources',
        '@nuxtjs/google-analytics',
        '@nuxtjs/fontawesome',
    ],

    modules: [
        '@nuxtjs/recaptcha',
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/robots',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxt/content',
        ['cookie-universal-nuxt', { parseJSON: false }],
        'nuxt-basic-auth-module',
    ],

    fontawesome: {
        icons: {
            solid: true,
            regular: true,
            light: [],
            duotone: [],
            brands: ['faFacebook'],
        },
    },

    recaptcha: {
        hideBadge: false,
        siteKey: '6LfcPq0aAAAAAEVPjhwWxSDledPJhOmWjlU2p-1n',
        version: 3,
    },

    auth: {
        scopeKey: 'scope',
        strategies: {
            local: {
                endpoints: {
                    login: { url: 'admin/auth/login', method: 'post', propertyName: 'token' },
                    user: { url: 'admin/auth/me', method: 'get', propertyName: false },
                    logout: { url: 'admin/auth/logout', method: 'post' },
                },
            },
        },
        redirect: {
            login: '/login',
            home: '/admin',
        },
        plugins: [
            './plugins/auth',
        ],
    },

    tailwindcss: {
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        jit: true,
    },

    robots: [
        {
            UserAgent: '*',
            Disallow: APP_ENV === 'production'
                ? [
                    '/*.json',
                    '/*.xml',
                ]
                : '/',
        },
    ],

    styleResources: {
        scss: [
            '~/assets/styles/utilities/*.scss',
        ],
    },

    server: {
        host: HOST,
        port: PORT,
    },

    render: {
        http2: {
            push: true,
        },
    },

    publicRuntimeConfig: {
        googleAnalytics: {
            id: GOOGLE_ANALYTICS_ID,
        },
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    // content: {},

    axios: {
        baseURL: API_HOST,
        browserBaseURL: API_PATH,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: isProduction,
        transpile: [/^element-ui/],
        babel: {
            plugins: [
                ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
            ],
        },
    },

    privateRuntimeConfig: {
        secretKey: process.env.GOOGLE_SECRET,
    },

};
