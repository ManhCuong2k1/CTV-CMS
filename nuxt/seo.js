import { APP_URL } from './env';

const title = 'Battay Admin';
const description = 'Battay';

const meta = [
    {
        name: 'application-name',
        content: 'Battay',
    },
    {
        property: 'og:site_name',
        content: 'Battay',
    },
    {
        hid: 'description',
        name: 'description',
        content: description,
    },
    {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
    },
    {
        hid: 'og:title',
        property: 'og:title',
        content: title,
    },
    {
        hid: 'og:description',
        name: 'og:description',
        content: description,
    },
    {
        hid: 'og:image',
        property: 'og:image',
        content: `${APP_URL}/og-facebook-3.png`,
    },
    {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title,
    },
    {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
    },
    {
        name: 'google-site-verification',
        content: 'RKTOz1S8uxhAZHqaOsf6cSvT_pqnPHEyAnlTnlLiiok',
    },
];

export default {
    title,
    description,
    meta,
};
