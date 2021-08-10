/* eslint-disable camelcase */
window.onload = function () {
    // menu
    const menubar = document.querySelector('#nav-icon');
    const menulist = document.querySelector('.menu-list');

    if (menubar) {
        menubar.addEventListener('click', () => {
            menubar.classList.toggle('open');
            menulist.classList.toggle('active');
        });
    }

    // form login

    // const btn_login = document.querySelector('.btn-login');
    // const login_form = document.querySelector('.form-login');

    // const btn_register = document.querySelector('.btn-register');
    // const register_form = document.querySelector('.form-register');

    // const btn_close = document.querySelector('.btn-close');

    // const btn_close_register = document.querySelector('#close-register');

    // const register_mb = document.querySelector('#btn-register');
    // const login_mb = document.querySelector('#btn-login');

    // function handleClickForm(btn, form) {
    //     if (btn) {
    //         btn.addEventListener('click', () => {
    //             form.classList.toggle('active-form');
    //             menubar.classList.remove('open');
    //             menulist.classList.remove('active');
    //         });
    //     }
    // }

    // handleClickForm(btn_login, login_form);
    // handleClickForm(login_mb, login_form);
    // handleClickForm(btn_close, login_form);
    // handleClickForm(btn_register, register_form);
    // handleClickForm(register_mb, register_form);

    // if (btn_close_register) {
    //     btn_close_register.addEventListener('click', () => {
    //         register_form.classList.remove('active-form');
    //     });
    // }
    // button search
    const btn_search = document.querySelector('.btn-search');
    const search = document.querySelector('.search');
    if (btn_search) {
        btn_search.addEventListener('click', () => {
            search.classList.toggle('active');
        });
    }
    // button back to top
    const return_to_top = document.querySelector('.return-to-top');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 300) {
            return_to_top.classList.add('show');
        } else {
            return_to_top.classList.remove('show');
        }
    });

    if (return_to_top) {
        return_to_top.addEventListener('click', () => {
            window.scroll({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
};
