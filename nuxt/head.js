const meta = [
    {
        charset: 'utf-8',
    },
    {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
    },
    {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
    },
];

const link = [
    {
        rel: 'alternate',
        type: 'application/rss+xml',
        name: 'Camel RSS Feed',
        href: '/rss',
    },
];

const script = [
    {
        type: 'module',
        src: '/js/script.js',
        body: true,
    },
];

export default {
    meta,
    link,
    script,
};
