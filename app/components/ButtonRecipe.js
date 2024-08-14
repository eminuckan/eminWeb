import {cva} from "../../styled-system/css";

export const buttonRecipe = cva({
    className: "button",
    description: "Styles for button component",
    base: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontWeight: "medium",
        transition: "colors",
        cursor: "pointer",
        gap: '2'
    },
    _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        focusRingWidth: '2',
        focusRingColor: 'ring',
        focusRingOffsetWidth: '2',
    },

    _disabled: {
        pointerEvents: 'none',
        opacity: '50%',
    },
    variants: {
        variant: {
            default: {
                transition: "background 0.3s",
                background: "url('/border.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
                backgroundPosition: "center center",
                _hover:{
                    background: "url('/hoverBorder.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                    backgroundPosition: "center center",
                }
            }
        },
        size: {
            default: {
                height: 'auto'
            }
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});