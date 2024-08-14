import {createCookieSessionStorage} from '@remix-run/node';
import {isTheme} from "./themeProvider.jsx";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set');
}

const themeStorage = createCookieSessionStorage({
    cookie: {
        name: 'theme',
        secure: true,
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
    },
});

const getThemeSession = async (request) => {
    const session = await themeStorage.getSession(request.headers.get('Cookie'));
    return {
        getTheme: () => {
            const themeValue = session.get('theme');
            return isTheme(themeValue) ? themeValue : null;
        },
        setTheme: (theme) => session.set('theme', theme),
        commit: () => themeStorage.commitSession(session),
    }
}

export {getThemeSession};