import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLoaderData,
} from "@remix-run/react";

import styles from "./index.css?url"

import {useTheme, ThemeProvider, NonFlashOfWrongThemeEls} from "./utils/themeProvider.jsx";
import {getThemeSession} from "./utils/theme.server.js";
import {json} from "@remix-run/node";


export const loader = async ({request}) => {
    const themeSession = await getThemeSession(request);
    if (themeSession.getTheme() === null) {
        themeSession.setTheme("dark");
    }
    return json({
        theme: themeSession.getTheme(),
    });
}

export const links = () => [
    {rel: "stylesheet", href: styles},
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
    },

];


export function ChildLayout({children}) {
    const [theme] = useTheme();

    const data = useLoaderData();
    return (
        <html lang="tr" className={theme}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        <NonFlashOfWrongThemeEls ssrTheme={data.theme}/>
        </body>
        </html>
    );
}

export function Layout({children}) {
    const data = useLoaderData();
    return (
        <ThemeProvider specifiedTheme={data.theme}>
            <ChildLayout>
                {children}
            </ChildLayout>
        </ThemeProvider>
    )
}

export default function App() {

    return (
        <Outlet/>
    );
}
