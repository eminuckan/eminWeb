import {css} from "../../styled-system/css";
import {useTheme} from "../utils/themeProvider.jsx";
import {Button} from "../components/Button.jsx"
export const meta = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    const [, setTheme] = useTheme();
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    return (
        <div className={css({color: {base: "primary", dark: "border"}, p: "5rem", display: "flex", flexDirection:"column", alignItems:"start"})}>
            <h1 className={css({
                fontSize: "6rem",
                display: "inline-block",
                textTransform:"uppercase",
                fontWeight: 600
            })}>Merhaba Dünya!</h1>
            <Button onClick={toggleTheme}>
                Merhaba !
            </Button>
        </div>
    );
}
