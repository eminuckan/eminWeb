import { json } from '@remix-run/node';
import { getThemeSession } from "../utils/theme.server.js";
import { isTheme } from "../utils/themeProvider.jsx";

export const action = async ({request}) => {
    const themeSession = await getThemeSession(request);
    const requestText = await request.text();
    const form = new URLSearchParams(requestText);
    const theme = form.get('theme');

    if (!isTheme(theme)){
        return json({
            success: false,
            message: `theme value of ${theme} is not a valid theme`
        })
    }
    await themeSession.setTheme(theme);
    return json({ success: true }, { headers: { 'Set-Cookie': await themeSession.commit() } });
}


export const loader = () => {
    return json({ success: false, message: 'This route does not support GET requests' }, { status: 405 });
}