import {FC, MouseEvent} from "react"
import styled, {css} from "styled-components"

interface Props {
    children: object | string,
    onClick: (e: MouseEvent) => void,
    filled?: boolean,
    size?: "medium" | "large"
    type?: "button" | "submit" | "reset"
}

const Button: FC<Props> = (props) => {
    return <CustomButton onClick={props.onClick}
                         type={props?.type ?? "button"}
                         size={props?.size ?? "medium"}
                         filled={props?.filled ?? true}
    >
        {props.children}
    </CustomButton>
}

const CustomButton = styled.button<Props>`
  ${props => props.filled ? css`
    background: ${props => props.theme.colors.primary};
    color: white;
    border: 2px solid ${props => props.theme.colors.primary};
  ` : css`
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
  `}

  ${props => props.size === "large" ? css`
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
  ` : css`
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  `}

  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
`

export default Button;