/* eslint-disable consistent-return */
export default ({ store, redirect }) => {
    if (store.getters['auth/authenticated']) {
        return redirect('/');
    }
};