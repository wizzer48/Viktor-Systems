'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cookies = require('next/headers');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'viktor123';

async function login(password) {
    if (password === ADMIN_PASSWORD) {
        cookies.cookies().set('viktor_admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });
        return { success: true };
    }
    return { success: false, message: 'Geçersiz şifre' };
}

async function logout() {
    cookies.cookies().delete('viktor_admin_session');
    return { success: true };
}

exports.login = login;
exports.logout = logout;
