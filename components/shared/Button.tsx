import {FC} from "react"
import styled, {css} from "styled-components"

interface Props {
    onClick: () => void,
    filled?: boolean,
    type?: "button" | "submit" | "reset"
}

const Button: FC<Props> = (props) => {
    return <CustomButton
        onClick={props.onClick}
        type={props?.type ?? "button"}
        filled={props?.filled ?? true}
    >
        {props.children}
    </CustomButton>
}

const CustomButton = styled.button<Props>`
  padding: 0.5rem 1rem;
  ${props => props.filled ? css`
    background: ${props => props.theme.colors.primary};
    color: white;
    border: 2px solid ${props => props.theme.colors.primary};
  ` : css`
    font-weight: bold;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
  `}
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
`

export default Button;