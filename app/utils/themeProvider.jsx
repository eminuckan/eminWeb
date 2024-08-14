import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {useFetcher} from "@remix-run/react";

const themes = ["light", "dark"];

const ThemeContext = createContext(undefined);

const prefersDarkMQ = '(prefers-color-scheme: dark)';
const getPreferredTheme = () => (window.matchMedia(prefersDarkMQ).matches ? "dark" : "light");

const clientThemeCode = `
// hi there dear reader 👋
// this is how I make certain we avoid a flash of the wrong theme. If you select
// a theme, then I'll know what you want in the future and you'll not see this
// script anymore.
;(() => {
  const theme = window.matchMedia('${prefersDarkMQ}').matches
    ? 'dark'
    : 'light';

  const cl = document.documentElement.classList;
  if (
    cl.contains('light') || cl.contains('dark')
  ) {
    // The theme is already applied...
    // this script shouldn't exist if the theme is already applied!
    console.warn("See theme-provider.tsx>clientThemeCode>cl.contains");
    // Hi there, could you let me know you're seeing this console.warn? Thanks!
  } else {
    cl.add(theme);
  }

  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    meta.content = theme === 'dark' ? 'dark light' : 'light dark';
  } else {
    console.warn("See theme-provider.tsx>clientThemeCode>meta");
    // Hey, could you let me know you're seeing this console.warn? Thanks!
  }
})();
`
    // Remove double slash comments & replace excess white space with a single space.
    .replace(/((?<=[^:])\/\/.*|\s)+/g, " ")
    .trim();

function NonFlashOfWrongThemeEls({ssrTheme}) {

    return (
        <>
            {ssrTheme ? null : (
                <scriptn
                    // NOTE: we cannot use type="module" because that automatically makes
                    // the script "defer". That doesn't work for us because we need
                    // this script to run synchronously before the rest of the document
                    // is finished loading.
                    dangerouslySetInnerHTML={{__html: clientThemeCode}}
                />
            )}
        </>
    )
}

const ThemeProvider = ({children, specifiedTheme}) => {
    const [theme, setTheme] = useState(() => {
        if (specifiedTheme) {
            if (themes.includes(specifiedTheme)) {
                return specifiedTheme;
            } else {
                return null;
            }
        } else {
            getPreferredTheme()
        }
    });
    const persistTheme = useFetcher();
    const persistThemeRef = useRef(persistTheme);

    useEffect(() => {
        persistThemeRef.current = persistTheme;
    }, [persistTheme]);

    const mountRun = useRef(false);

    useEffect(() => {
        if (!mountRun.current) {
            mountRun.current = true;
            return;
        }
        if (!theme) {
            return;
        }

        persistThemeRef.current.submit(
            {theme},
            {action: "action/setTheme", method: "post"},
        );
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(prefersDarkMQ);
        const handleChange = () => {
            setTheme(mediaQuery.matches ? "dark" : "light");
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

const isTheme = (theme) => {
    return themes.includes(theme);
}

export {isTheme, NonFlashOfWrongThemeEls, ThemeProvider, useTheme};

