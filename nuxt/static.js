import _find from 'lodash/find';

const contentTypeMap = {
    '.well-known/apple-app-site-association': 'application/json',
};

function getContentType(path) {
    // TODO should check for full file path. But no need to do it for now
    return _find(contentTypeMap, (type, file) => path.endsWith(file));
}

export default {
    setHeaders: (res, path) => {
        const contentType = getContentType(path);
        if (contentType) {
            res.setHeader('content-type', getContentType(path));
        }
    },
};
