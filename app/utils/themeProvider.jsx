import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext(undefined);

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');
    return (
        <ThemeContext.Provider value={[theme,setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = () =>{
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export {ThemeProvider, useTheme};

