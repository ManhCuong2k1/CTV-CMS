export default ({ $auth, redirect, next }) => {
    if (!$auth.hasScope('admin')) {
        return redirect('/');
    }
    return next;
};
