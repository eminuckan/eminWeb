import {Slot} from "@radix-ui/react-slot";
import {styled} from "../../styled-system/jsx";
import {buttonRecipe} from "./ButtonRecipe";
import {forwardRef} from "react";
import {css} from "../../styled-system/css";

const BaseButton = forwardRef(({as = "button", asChild = false, ...rest}, ref) => {
    const Comp = asChild ? Slot : as
    return <Comp ref={ref} {...rest}>
        <span className={css({
            px: "1rem",
            py: "1rem",

        })}>
            {rest.children}
        </span>
    </Comp>
})

BaseButton.displayName = 'Button'

export const Button = styled(BaseButton, buttonRecipe);
